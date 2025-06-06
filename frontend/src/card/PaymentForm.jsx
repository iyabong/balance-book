import { useState } from 'react';

const PaymentForm = ({ onConfirm, onCancel}) => {
    const [amount, setAmount] = useState('');

    const handlesubmit  = (e) => {
        e.preventDefault();
        if (window.confirm(`${amount}포인트 결제 하시겠습니까?`)) 
        {
            onConfirm(amount); // 상위로 전달
            alert("결제되었습니다.");
        }
    };

    return (
        <form onSubmit={handlesubmit}>
            <input type="number"
                    step="0.01"
                    min="0.01"
                    max="99"     
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