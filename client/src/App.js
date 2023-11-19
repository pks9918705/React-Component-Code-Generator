 
// src/App.js

import React from 'react';
import { UserProvider } from './userContext';
// import Login from './pages/Login'
 
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import History from './pages/History';
import CodeOutput from './pages/CodeOutput';
import Register from './pages/Register';
 
const App = () => {
  return (
    <UserProvider>
      <Router>
      <Routes>

        <Route path="/" element={<Home />} />
         
        
         <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} /> 

        <Route path="/history" element={<History />} />
        <Route path="/code/:id" element={<CodeOutput />} />
        {/* <Route path="/code-output/:id" element={<CodeOutput2 />} /> */}

      </Routes>

    </Router>
    </UserProvider>

    
  );
};

export default App;
