import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { getTransactionsByUser, insertTransaction } from './LoanService';

const BorrowerHistory = () => {
    const { userId} = useParams();
    const [ transactions, setTransactions ] = useState([]);
    const [ amount, setAmount] = useState('');

    const fetchTransactions = async() => {
        const data = await getTransactionsByUser(userId);
        setTransactions(data);
    };

    useEffect(() => {
        // const fetch = async() => {
        //     const data = await getTransactionsByUser(userId);
        //     setTransactions(data);
        // };
        // fetch();
        fetchTransactions();
    }, [userId]);

    const handleAction = async (type) => {
        if (!amount) return;
        await insertTransaction (userId, parseFloat(amount), type);
        setAmount('');
        fetchTransactions(); // 새로고침
    }

    return (
        <div>
            <h1>대출/상환 이력</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='금액 입력'
            />
            <button onClick={() => handleAction('loan')}>대출</button>
            <button onClick={() => handleAction('repayment')}>상환</button>
            <ul>
                {transactions.map((tx) => (
                    <li key={tx.id}>
                        [{tx.type}] {tx.amount}원 - {new Date(tx.created_at).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerHistory;