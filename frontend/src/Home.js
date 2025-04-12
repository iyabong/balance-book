import React from 'react';
import {Link } from 'react-router-dom';

const Home = ()  => (
    <div>
        <h1>Balance Book</h1>
        <ul>
            <li><Link to="/card">카드</Link></li>
            <li><Link to="/loan">대출</Link></li>
        </ul>
    </div>
);

export default Home;