import React, { useState } from 'react';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css';
import "./Loginsignup.css";
import "bootstrap/dist/css/bootstrap.css";
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Dashboard1 from './Dashboard1';
import Logout from './Logout';
import Admin from './Admin';

import Addinfo from './Addinfo';
import Employe from './Employe';
import Employeuser from './Employeuser';




const App = () => {
  


  return (

    <div>
       <BrowserRouter>
       <Routes>
        <Route path='/logout'element={<Logout />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard1' element={<Dashboard1/>} />
        <Route path='/admin'element={<Admin />} />
   
        <Route path='/employe' element={<Employe />} />
        <Route path='/addinfo' element={<Addinfo/>} />
        <Route path='/employeuser' element={<Employeuser />} />
       </Routes>
        </BrowserRouter>
       
     </div>
  );
}

export default App;
