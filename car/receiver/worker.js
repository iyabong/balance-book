// /**
//  * Torque Pro 데이터 수신용 Cloudflare Worker
//  */

export default {
  async fetch(request, env, ctx) {

    // Upstash REST API 설정
    const UPSTASH_URL = env.UPSTASH_URL;
    const UPSTASH_TOKEN = env.UPSTASH_TOKEN;

    const url = new URL(request.url);

    // 1. Torque Pro가 보낸 데이터 파싱 (?eml=...&v=...&kff1005=...)
    const params = Object.fromEntries(url.searchParams);

    // 데이터가 없으면 무시
    if (Object.keys(params).length === 0) {
      return new Response("No Data", { status: 400 });
    }

    // 2. 데이터 가공 (PID 매핑)
    // Torque는 GPS를 kff1005, kff1006 같은 코드로 보냅니다.
    const cleanData = {
      ts: Date.now(),
      session: params.session || "unknown", // 세션 ID (앱 설정 필요)
      email: params.eml,
      
      // 핵심 데이터 매핑 (Torque 설정에 따라 키값이 다를 수 있음 - 확인 필요)
      speed: parseFloat(params.kff1001 || params.v || 0), // 속도
      rpm: parseFloat(params.kff1005 || params.rpm || 0), // RPM
      
      // 위도/경도 (Torque 기본값)
      lat: parseFloat(params.kff1006 || 0), 
      lon: parseFloat(params.kff1005 || 0),
      
      raw: params // 디버깅용 원본 저장
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
