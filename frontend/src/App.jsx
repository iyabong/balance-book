import React, {useEffect} from 'react';
import CardList from './cards/CardList';
import LoanList from './loans/LoanList';
import {insertLoan, fetchLoans} from './loans/LoanService';


function App() {
  useEffect(() => {
    const test = async() => {
      await insertLoan({name: 'W', amount: 100});
      const loans = await fetchLoans();
      console.log('loans:', loans)
    };

    test();
  }, []);

  return (
    <div className="App">
      <CardList />
      <LoanList />
      <h1>Supabase 테스트 중</h1>
    </div>
  );
}

export default App;
