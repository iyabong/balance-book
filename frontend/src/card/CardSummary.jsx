import React, {useEffect, useState} from 'react';
import CardItem from './CardItem';
import { getAllCards } from './CardService';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async() => {
      try {
        const data = await getAllCards();

        // TEMP
        const enriched = data.map(c => ({
          ...c, // 기존 필드 유지
          history: [
            {type: 'charge', amount: 10, date: '2025-05-01'},
            {type: 'payment', amount: 1.2, date: '2025-05-02'}
          ]
        }))

        setCards(enriched);
      }catch(error) {
        console.error('카드 가져오기 실패');
      }finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div style={{textAlign: 'center', padding: '2rem'}}>
        <div className='spinner'></div>
        <p>불러오는 중...</p>
      </div>
    )
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