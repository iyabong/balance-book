import { useState } from "react";
import LoanItem from './LoanItem';

const LoanList = () => {
    const [loans, setLoans] = useState([
        { id: 1, name: '철수', amount: 20000},
        { id: 2, name: '영희', amount: 15000}
    ]);

    const handleAdd = (loanId,amount) => {
        setLoans(loans.map(loan => 
            loan.id === loanId
                ?   {...loan, amount: loan.amount + amount}
                :   loan
        ));
    };

    const handleCollect = (loanId, amount) => {
        setLoans(loans.map(loan =>
            loan.id === loanId
                ?  {...loan, amount: loan.amount - amount}
                :  loan
        ));
    }


    return (
        <div>
            <h2>대출 목록</h2>
            {loans.map(loan => (
                <LoanItem
                    key={loan.id}
                    loan={loan}
                    onAdd={handleAdd}
                    onCollect={handleCollect}
                />
            ))}
        </div>
    );
};

export default LoanList;