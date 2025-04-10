// import React, {useEffect} from 'react';
// import CardList from './cards/CardList';
// import LoanList from './loans/LoanList';
// import {insertLoan, fetchLoans} from './loans/LoanService';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './Home';
import CardSummary from './card/CardSummary';
import LoanSummary from './loan/LoanSummary';
import BorrowerHistory from './loan/BorrowerHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<CardSummary />} />
        <Route path="/loan" element={<LoanSummary />} />
        <Route path="/loan/:borrowerId" element={<BorrowerHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
