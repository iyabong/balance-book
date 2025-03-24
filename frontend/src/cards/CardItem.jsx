import React from 'react';

const CardItem = ({ card, onUseClick}) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px', borderRadius: '8px' }}>
        <h3>{card.name}</h3>
        <p>잔액: ₩{card.balance.toLocaleString()}</p>
        <button onClick={() => onUseClick(card)}>사용</button>
      </div>
    );
};

export default CardItem;