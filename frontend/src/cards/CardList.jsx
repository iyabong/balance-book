import React, {useState} from 'react';
import CardItem from './CardItem';

const CardList = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'A', balance: 100000},
    { id: 2, name: 'S', balance: 100000}   
  ]);

  const handleUseClick = (card) => {
    alert(`'${card.name}' 카드 사용 클릭`);
  };

  return (
    <div>
      <h2>카드 목록</h2>
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onUseClick={handleUseClick} />
        ))}
    </div>
  )
};

export default CardList;