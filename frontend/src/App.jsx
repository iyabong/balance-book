import './App.css'; 

import { BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import { useEffect, useState} from 'react';
import { pickApiBase } from './card/CardService'; // 헬스체크 함수
import supabase from './supabase';

import Home from './Home';
import Login from './pages/Login';
import CardSummary from './card/CardSummary';
import LoanSummary from './loan/LoanSummary';
import BorrowerHistory from './loan/BorrowerHistory';
import RoutineCalendar from './routine/RoutineCalendar';

// Header 컴포넌트
function Header({user}) {
  const navigate = useNavigate();
  
  const handleLogout = async() => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.log('로그아웃 중 에러');
      return;
    }
    
    navigate('/');
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
      <div>
        <Link to="/">홈</Link> {/*| <Link to="/routine">루틴</Link>*/} | <Link to="/card">카드</Link> | <Link to="/loan">대출</Link>
      </div>
      <div>
        {user ? (
          <>
             <span>현재 로그인: {user.email}</span> | <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
            <Link to="/login">로그인</Link>
        )}
      </div>

    </div>
  );
}

/* App 컴포넌트 */
function App() {
  const [user, setUser] = useState(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const baseReady = pickApiBase(); // 병렬 시작
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      await baseReady;
      setAppReady(true);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  if (!appReady) return null; 

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<Login />} />     
        <Route path="/routine" element={<RoutineCalendar />} />
        <Route path="/card" element={<CardSummary user={user}/>} />
        <Route path="/loan" element={<LoanSummary user={user}/>} />
        <Route path="/loan/:userId" element={<BorrowerHistory />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
