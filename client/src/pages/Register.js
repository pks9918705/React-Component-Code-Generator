import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[navigate])

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        password,
      });
       

      console.log('Signup successful:', response.data);

       

      // Redirect to CodeGenerate component on successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      setError('Signup failed. Please check your information and try again.');
    }
  };
  const handleLogin=() => {
    navigate('/login');
  }

  return (
    <div className='signup'>
      <h1>Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
           
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id='register-btn' type="button" onClick={handleSignup}>
          Signup
        </button>
        <h3 onClick={handleLogin}> Already have an account ?</h3>

    </div>
  );
};

export default Register;
