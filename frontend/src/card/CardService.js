const PRIMARY_BASE = process.env.REACT_APP_API_BASE_PRIMARY;
const FALLBACK_BASE = process.env.REACT_APP_API_BASE_FALLBACK;

let selectedBase = PRIMARY_BASE;

export async function pickApiBase() {
  try {
    const res = await fetch(`${PRIMARY_BASE}/api/system/health`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error();
    selectedBase = PRIMARY_BASE;
  } catch {
    console.warn('Primary Down됨. fallback으로 전환!');
    selectedBase = FALLBACK_BASE;
  }
}

// 공통로직 Wrapping
async function fetchWithBase(path, options = {}) {
  const res = await fetch(`${selectedBase}${path}`, options);
  if (!res.ok) throw new Error(`API 호출 실패: ${path}`);
  return await res.json();
}

export const getAllCards = async() => {
  return await fetchWithBase('/api/card');
}

export const getCardHistory = async(cardId) => {
    return await fetchWithBase(`/api/card/history/${cardId}`);
}

export const insertTransaction =  async(cardId, amount, type) => {
  return await fetchWithBase('/api/card/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardId, amount, type }),
  });    
};