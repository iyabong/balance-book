export const getAllCards = async() => {
    const res = await fetch('http://localhost:5000/api/card');
    if (!res.ok) {
        throw new Error('카드 목록 불러오기 실패');
    }
    return await res.json();
}