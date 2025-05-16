import React from "react";

const CardHistory = ({history}) => {
  if (!history || history.length === 0) {
    return <p>사용 이력이 없습니다.</p>
  }

  return (
    <div>
      <h4>사용 이력</h4>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            [{item.date}] {item.type === 'charge' ? '충전' : '결제'} - {item.amount}원
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardHistory;