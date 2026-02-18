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

    // 2. 데이터 가공 (PID 매핑)
    const cleanData = {
      recordedAt: params.time,                       // 실제 주행 시간 (Main)
      receivedAt: Date.now(),                        // 서버 도착 시간 (Debug)
      sessionId: params.session || "unknown", 
      email: params.eml,
      
      rpm: parseFloat(params.kc),                     // Engine RPM
      speed: parseFloat(params.kff100),               // Vehicle Speed
      lat: parseFloat(params.kff1006),                // Latitude
      lon: parseFloat(params.kff1005),                // Longitude
      
      raw: params // for debugging
    };

    // 3. Upstash로 전송 (REST API 사용)
    const response = await fetch(UPSTASH_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cleanData)
    });

    if (response.ok) {
      return new Response("OK!", { status: 200 });
    } else {
      return new Response("Redis Error", { status: 500 });
    }
  },
};
