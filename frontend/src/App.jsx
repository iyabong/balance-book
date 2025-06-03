import './App.css'; 

import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { useEffect, useState} from 'react';
import supabase from './supabase';

import Home from './Home';
import Login from './pages/Login';
import CardSummary from './card/CardSummary';
import LoanSummary from './loan/LoanSummary';

// Header 컴포넌트를 통해 로그인 상태 및 로그아웃 표시
function Header({user}) {
  const handleLogout = async() => {
    await supabase.auth.signOut();
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
      <div>
        <Link to="/">홈</Link> | <Link to="/card">카드</Link> | <Link to="/loan">대출</Link>
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

// App 컴포넌트에서 로그인 상태 추적 및 페이지 렌더링
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data}) => {
      setUser(data.session?.user ?? null );
    });
    const { data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    });
    return () => listener?.subscription.unsubscribe();

  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/card" element={<CardSummary user={user}/>} />
        <Route path="/loan" element={<LoanSummary user={user}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
