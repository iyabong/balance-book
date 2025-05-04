const API_BASE = process.env.NODE_ENV === 'development'
               ? 'http://localhost:5000'
               : process.env.REACT_APP_API_BASE_URL;

export const getAllCards = async() => {
    const res = await fetch(`${API_BASE}/api/card`);
    if (!res.ok) {
        throw new Error('카드 목록 불러오기 실패');
    }
    return await res.json();
}