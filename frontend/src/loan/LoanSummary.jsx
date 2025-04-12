import React, {useEffect, useState} from "react";
import { getAllUsers, getBalanceByUser} from './LoanService';

const LoanSummary = () => {
    const [usersWithBalance, setUsersWithBalance] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const users = await getAllUsers();
            console.log('[users]', users); 
            const enriched = await Promise.all(
                users.map(async (user) => {
                    const balance = await getBalanceByUser(user.id);
                    return { ...user, balance};
                })
            );
            console.log('[usersWithBalance]', enriched); //
            setUsersWithBalance(enriched);
        };
        fetch();
    }, []);

    return (
        <div>
            <h1>대출 사용자 목록</h1>
            <ul>
                {usersWithBalance.map((user) => (
                    <li key={user.id}>
                        {user.name} - 남은 금액: {user.balance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanSummary;