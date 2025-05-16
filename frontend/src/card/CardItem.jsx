import React, {useState} from 'react';
import PaymentForm from './PaymentForm';
import CardHistory from './CardHistory';

const CardItem = ({ card, onPay}) => {
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // 결제 금액 확인되면 부모에게 알림
  const handleConfirm = (amount) => {
      onPay(card.id, amount); // 카드id와 금액 전달
      setShowForm(false);   // 폼 닫기
  };

  return (
      <div className="card-item">
        <h3>카드명: {card.name} - 잔액: {card.balance}원</h3>
        <button onClick={() => setShowForm(isShow => !isShow)}>
          {showForm ? '사용폼 닫기' : '사용폼 열기'}
        </button>
        &nbsp;  
        <button onClick={() => setShowHistory(isShow => !isShow)}>
          {showHistory ? '이력 닫기' : '이력 열기'}
        </button>

        {showForm && (
          <PaymentForm
            onConfirm={handleConfirm}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showHistory && (
          <CardHistory history={card.history} />
        )}
        <br/>
        <br/>
    </div>
  );
};

export default CardItem;