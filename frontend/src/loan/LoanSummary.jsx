import { Link } from "react-router-dom";

export default function LoanSummary() {
    // 예시 데이터
    const borrowers = [
        { id: '1', name: '김철수'},
        { id: '2', name: '이영희'}
    ];

    return (
        <div>
            <h1>대출 요약</h1>
            <ul>
                {borrowers.map(b => (
                    <li key={b.id}>
                        <Link to={`/loan/${b.id}`}>{b.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}