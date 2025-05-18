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

export const getCardHistory = async(cardId) => {
    const res = await fetch(`${API_BASE}/api/card/history/${cardId}`);
    if (!res.ok) {
        throw new Error('카드 충전/결제 이력 불러오기 실패');
    }
    return await res.json();
}

export const insertTransaction =  async(cardId, amount, type) => {
    const res = await fetch(`${API_BASE}/api/card/transaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardId,
            amount,
            type // "charge", "payment"
        })
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error("충전/결제 실패: " + text)
    }

    return await res.json(); // 갱신된 정보 반환
};