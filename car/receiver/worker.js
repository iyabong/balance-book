/**
 * Torque Pro 데이터 수신용 Cloudflare Worker
 * 
 * [Secret 세팅]
 * 1. 설정 파일 생성 - wrangler.toml
 * 2. npx wrangler login
 * 3. npx wrangler secret put UPSTASH_URL
 * 4. npx wrangler secret put UPSTASH_TOKEN
 * 5. npx wrangler deploy
 */

export default {
  async fetch(request, env, ctx) {
    
    const params = Object.fromEntries(new URL(request.url).searchParams);
    if (Object.keys(params).length === 0) return new Response("No Data", { status: 400 });

    // Upstash REST API 설정
    const UPSTASH_URL = env.UPSTASH_URL;
    const UPSTASH_TOKEN = env.UPSTASH_TOKEN;

    const sessionKST = getFormattedKst(parseInt(params.session));
    const torqueKST = getFormattedKst(parseInt(params.time));
    const workerKST = getFormattedKst(Date.now());

    // 2. 데이터 가공 (PID 매핑)
    const cleanData = {
      sessionTime: sessionKST,                        // KEY
      torqueTime: torqueKST,                          // TORQUE API CALL TIME
      workerTime : workerKST,                         // CLOUD WORKER RECEIVE TIME

      rpm: parseFloat(params.kc),                     // Engine RPM
      speed: parseFloat(params.kff100),               // Vehicle Speed
      lat: parseFloat(params.kff1006),                // Latitude
      lon: parseFloat(params.kff1005),                // Longitude
      
      url: request.url // for debugging
    };


    const headers = {
      "Authorization": `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json"
    };

      try {
        const res = await fetch(`${UPSTASH_URL}/pipeline`, {
          method: "POST",
          headers,
          body: JSON.stringify([
            ["RPUSH", "car:logs", JSON.stringify(cleanData)],
            ["HSET", "car:session", "sessionTime", sessionKST, "workerTime", workerKST]
          ])
        });

        if (res.ok) {
          return new Response("OK!", { status: 200 });
        } else {
          const errorText = await res.text();
          return new Response(`에러 발생!\n${errorText}`, { status: 500 });
        }
      } catch (error) {
        return new Response("Worker Error", { status: 500 });
      }
  },
}; 

function getFormattedKst(timestamp) {
  const dt = new Date(timestamp);
  dt.setHours(dt.getHours() + 9);
  return dt.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
}