import React, { useState } from 'react'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {

    const [email,setEmail] = useState("");

  return (
    <LoginPage/>
    // <SignupPage/>
  )
}

export default App