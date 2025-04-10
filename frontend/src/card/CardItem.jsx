import React, {useState} from 'react';
import PaymentForm from './PaymentForm';

const CardItem = ({ card, onPay}) => {
  const [showForm, setShowForm] = useState(false);

  // 결제 금액 확인되면 부모에게 알림
  const handleConfirm = (amount) => {
      onPay(card.id, amount); // 카드id와 금액 전달
      setShowForm(false);   // 폼 닫기
  };

  return (
      <div className="card-item">
      <h3>카드명: {card.name}</h3>
      <p>잔액: {card.balance}원</p>
      <button onClick={() => setShowForm(true)}>사용</button>

      {showForm && (
        <PaymentForm
          onConfirm={handleConfirm}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default CardItem;