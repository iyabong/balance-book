import { useState } from 'react';

const PaymentForm = ({ onConfirm, onCancel}) => {
    const [amount, setAmount] = useState('');

    const handlesubmit  = (e) => {
        e.preventDefault();
        const parsed = parseInt(amount, 10);
        if (!isNaN(parsed) && parsed > 0) {
            onConfirm(parsed);  // 입력된 금액을 상위로 전달
        }
    };

    return (
        <form onSubmit={handlesubmit}>
            <input type="number"
                    placeholder="금액 입력"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit">결제</button>
            <button type="button" onClick={onCancel}>취소</button>
        </form>
    );
};

export default PaymentForm;