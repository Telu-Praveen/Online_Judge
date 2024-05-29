import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Solve from './pages/Solve.jsx';


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>
      
      <Route exact path="/solve/:id" element={<Solve/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
