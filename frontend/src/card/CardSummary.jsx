import React, {useEffect, useState} from 'react';
import CardItem from './CardItem';
import { getAllCards, getCardHistory } from './CardService';
import { insertTransaction } from './CardService';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async() => {
      try {
        const data = await getAllCards();

        // TEMP
        // const enriched = data.map(c => ({
        //   ...c, // 기존 필드 유지
        //   history: [
        //     {type: 'charge', amount: 10, date: '2025-05-01'},
        //     {type: 'payment', amount: 1.2, date: '2025-05-02'}
        //   ]
        // }))
        const enriched = await Promise.all(
          data.map(async (card) => {
            try {
              const history = await getCardHistory(card.id);
              console.log(history);
              return {...card, history};
            }catch(err) {
              console.warn(`카드 ${card.id} 이력 불러오기 실패`, err);
              return { ...card, history: []};
            }
          })
        );

        setCards(enriched);
      }catch(error) {
        console.error('카드 가져오기 실패');
      }finally {
        setLoading(false);
      }
    };
    fetch();
  },[]);

  const handlePay = async (cardId, amount) => {
    try {
      const updatedCard = await insertTransaction(cardId, amount, 'payment');

      const updated = cards.map((c) =>
        c.id === cardId ? { ...updatedCard, history: c.history} : c
      );
      setCards(updated)
    }catch (err) {
      alert(err.message);
    }
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