import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [goingHome, setGoingHome] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email || !password) {
            setError('이메일, 비번 입력하세요');
            return;
        }

        const {error} = isSignUp ? await supabase.auth.signUp({ email, password})
                                       : await supabase.auth.signInWithPassword({email, password});

        if(error) {
            setError(error.message);
        }else {
            setMessage(isSignUp ? '가입 완료! 이메일을 확인해주세요.' : '로그인 성공!');
            setGoingHome(true);
            
            setTimeout(() => {
                navigate('/');
            }, 3000);

        }
    }

    return (
        <div>
            <h2>{isSignUp ? '📝 회원가입 화면' : '🔐 로그인 화면'}</h2>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                <input type='password' placeholder='비번' value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
                <button type='submit'>{isSignUp? '가입하기' : '로그인'}</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {message && <p style={{color: 'green'}}>{message}</p>}
            {goingHome && <p>홈으로 이동 중...</p>}
            <p style={{color: 'blue',textDecoration: 'underline'}} onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? '로그인 화면으로' : '회원가입 화면으로'}
            </p>

        </div>
    )
};