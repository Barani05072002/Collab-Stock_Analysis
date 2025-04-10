import React, { useState } from 'react'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CandlestickChart from './pages/CandleStickchart';

function App() {

    const [email,setEmail] = useState("");

  return (
    // <LoginPage/>
    <CandlestickChart />
    // <SignupPage/>
  )
}

export default App