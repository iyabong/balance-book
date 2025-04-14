import React, {useEffect, useState} from "react";
import { getAllUsers, getBalanceByUser} from './LoanService';
import { Link } from 'react-router-dom';

const LoanSummary = () => {
    const [usersWithBalance, setUsersWithBalance] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const users = await getAllUsers();
            const enriched = await Promise.all( 
                users.map(async (user) => {
                    const balance = await getBalanceByUser(user.id);
                    return { ...user, balance};
                })
            );
            setUsersWithBalance(enriched);
        };
        fetch();
    }, []);

    return (
        <div>
            <h1>대출자 목록</h1>
            <ul>
                {usersWithBalance.map((user) => (
                    <li key={user.id}>
                        {user.name} - 남은 금액: {user.balance}
                        {" "}<Link to={`./${user.id}`}>이력 보기</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanSummary;