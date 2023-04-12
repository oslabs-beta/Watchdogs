// React Imports
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Component Imports
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';

// Main Function
function App() {
  return (
    <Routes>
      <Route path="home/*" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default App;
