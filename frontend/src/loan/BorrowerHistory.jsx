import { useParams } from "react-router-dom";

export default function BorrowerHistory() {
    const { borrowerId } = useParams();

    return (
        <div>
            <h1> 대출/상환 이력</h1>
            <p>Borrower ID: {borrowerId}</p>
        </div>
    );
}