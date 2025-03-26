import React, {useState} from 'react';
import CardItem from './CardItem';

const CardList = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'A', balance: 100000},
    { id: 2, name: 'S', balance: 100000}   
  ]);

  const handlePay = (cardId, amount) => {
    const updated = cards.map((card) =>
      card.id === cardId 
            ? { ...card, balance: card.balance - amount} 
            : card
    );
      setCards(updated);
  }

  return (
    <div>
      <h2>카드 목록</h2>
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onPay={handlePay} />
        ))}
    </div>
  );
};

export default CardList;