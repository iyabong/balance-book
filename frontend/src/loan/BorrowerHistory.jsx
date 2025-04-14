import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { getTransactionsByUser } from './LoanService';

const BorrowerHistory = () => {
    const { userId} = useParams();
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const data = await getTransactionsByUser(userId);
            setTransactions(data);
        };
        fetch();
    }, [userId]);

    return (
        <div>
            <h1>대출/상환 내역</h1>
            <ul>
                {transactions.map((tx) => (
                    <li key={tx.id}>
                        [{tx.type}] {tx.amount} - {new Date(tx.created_at).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerHistory;