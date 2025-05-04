const API_BASE = process.env.NODE_ENV === 'development'
               ? 'http://localhost:5000'
               : process.env.REACT_APP_API_BASE_URL;

export const getAllCards = async() => {
    console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);
    console.log('API_BASE:' + API_BASE);
    const res = await fetch(`${API_BASE}/api/card`);
    if (!res.ok) {
        throw new Error('카드 목록 불러오기 실패');
    }
    return await res.json();
}