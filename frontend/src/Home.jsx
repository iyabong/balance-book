import React from 'react';
import {Link } from 'react-router-dom';
import { getNodeEnv } from './utils/env';
import { getVercelEnv } from './utils/env';

const walletLogo = getNodeEnv() === "production" && getVercelEnv() === 'production' ? '/wallet.svg' : '/wallet_dev.svg';


const Home = ({user})  => (
  <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
    
    <img src={walletLogo} alt="wallet" 
      style={{ width: '6em', height: '6em'}}
    />   
    <h1>Balance Book</h1>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
      {/*
      <Link to="/login">
        <button style={{ width: '90%', padding: '0.75rem' }}>{user ? '로그아웃' : '로그인'}</button>
      </Link>
      <Link to="/routine">
        <button style={{ width: '90%', padding: '0.75rem' }}>루틴</button>
      </Link>
      */}
      <Link to="/card">
        <button style={{ width: '90%', padding: '0.75rem' }}>카드 현황</button>
      </Link>
      <Link to="/loan">
        <button style={{ width: '90%', padding: '0.75rem' }}>대출 현황</button>
      </Link>
      <a href="/resume">
        <button style={{ width: '90%', padding: '0.75rem' }}>이력 관리</button>
      </a>   
    </div>

    <footer style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
      🔗 <a href="https://github.com/iyabong/balance-book" target="_blank" rel="noopener noreferrer">
        github.com/iyabong/balance-book
      </a>
    </footer>

  </div>
);

export default Home;