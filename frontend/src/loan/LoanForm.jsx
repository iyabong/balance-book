import React, { useState } from "react";

const LoanForm = ({onLend, onRepay, onCancel}) => {
    const [amount, setAmount] = useState('');

    const handleAction = (type) => {
        const value = parseInt(amount, 10);
        if (isNaN(value) || value < 0) {
            return;
        }
        if (type === 'lend') {
                onLend(value);  // 부모의 onLend 호출
        }
        if (type === 'repay') {
            onRepay(value);  // 부모의 onLend 호출
        }
    };

    return (
        <div>
            <input
                type="number"
                step="1"
                placeholder="금액 입력"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={() => handleAction('lend')}>대출</button>
            <button onClick={() => handleAction('repay')}>수금</button>
            <button onClick={onCancel}>취소</button>
        </div>
    );
};

export default LoanForm;