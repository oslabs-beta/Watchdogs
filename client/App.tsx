// React Imports
import React, { useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';

//Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from './assets/login-particles.json';

function App() {

    // Particles Background Initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const particleOptions: any = loginParticles;
  
  return (
    <>
      <Particles options={particleOptions} init={particlesInit} />
      {/* Initialize react router paths */}
      <Routes>
        <Route path="/*" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  )
}

export default App;
