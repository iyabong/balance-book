import React, { useState } from "react";
import LoanForm from './LoanForm';

const LoanItem = ({ loan, onAdd, onCollect}) => {
    const [showForm, setShowForm] = useState(false);

    const handleLend = (value) => {
        onAdd(loan.id, value);
        setShowForm(false);
    };
    const handleRepay = (value) => {
        onCollect(loan.id, value);
        setShowForm(false);
    };

    return (
        <div className="loan-item">
            <h3>대출인: {loan.name}</h3>
            <p>받을 금액: {loan.amount}원</p>
            <button onClick={() => setShowForm(true)}>대출/수금</button>
      
            {showForm && (
                <LoanForm
                    onLend={handleLend}           
                    onRepay={handleRepay}
                    onCancel={() => setShowForm(false)}  // 폼 닫기
                />
            )}
        </div>
    )
};

export default LoanItem;