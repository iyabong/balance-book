import './App.css'; 

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './Home';
import Login from './pages/Login';
import CardSummary from './card/CardSummary';
import LoanSummary from './loan/LoanSummary';
import BorrowerHistory from './loan/BorrowerHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/card" element={<CardSummary />} />
        <Route path="/loan" element={<LoanSummary />} />
        <Route path="/loan/:userId" element={<BorrowerHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
