import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from "./Components/Home.js";
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';



function App() {

  return (
      <Routes>
        <Route path='home/*' element={<Home/>}></Route>
        <Route path ='/login' element={<Login />}></Route>
        <Route path ='/signup' element={<Signup/>}></Route>
      </Routes>
  )
}

export default App
