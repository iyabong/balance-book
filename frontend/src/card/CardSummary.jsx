import React, {useEffect, useState} from 'react';
import CardItem from './CardItem';
import { getAllCards } from './CardService';

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetch = async() => {
      try {
        const data = await getAllCards();
        setCards(data);
      }catch(error) {
        console.error('카드 가져오기 실패');
      }
    };
    fetch();
  },[]);

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