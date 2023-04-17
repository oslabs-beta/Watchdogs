// React Imports
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from '../assets/login-particles.json';

// Component Imports
import UserInfo from './UserInfo';
import WarmList from './WarmList';
import ErrorLogs from './ErrorLogs';
import FunctionsList from './FunctionsList';
import '../scss/Home.scss';

// Main Function
function Home() {
  //
  // State Declaration
  const [user, setUser] = useState({
    arn: '',
    password: '',
    username: '',
    __v: 0,
    _id: '',
  });
  const [metrics, setMetrics] = useState({})
  const navigate = useNavigate();

  // Particles Initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const options: any = loginParticles;

  // Check For User Info
  useEffect(() => {
    fetch('/api/user')
      .then((res) => {
        if (res.redirected) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        setUser(res.user);
        setMetrics(res.metrics)
      });
  }, []);

  //Render Componenets
  return (
    <>
      <Particles options={options} init={particlesInit} />

      <nav>
        <Link to="/home">Functions</Link>
        <Link to="warmlist">Warm List</Link>
        <Link to="errorlogs">Error Logs</Link>
        <Link to="userinfo">User Info</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FunctionsList user={user} metrics={metrics}/>}></Route>
        <Route path="/warmlist" element={<WarmList user={user} />}></Route>
        <Route path="/errorlogs" element={<ErrorLogs user={user} />}></Route>
        <Route path="/userinfo" element={<UserInfo user={user} />}></Route>
      </Routes>
    </>
  );
}

export default Home;
