import { useState } from 'react';
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
