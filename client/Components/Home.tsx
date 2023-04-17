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
    region: '',
    password: '',
    username: '',
    __v: 0,
    _id: '',
  });
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Particles Initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const options: any = loginParticles;

  // Get User Info Logic
  function getUserInfo(): void {
    setLoading(true);
    fetch('/api/user')
      .then((res) => {
        if (res.redirected) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
      });
  }

    function refreshInfo(): void {
    setLoading(true);
    fetch('/api/refresh')
      .then(res => res.json())
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
      });
  }
  // Check For User Info
  useEffect(() => {
    getUserInfo();
  }, []);

  // Render Componenets
  return (
    <>
      <Particles options={options} init={particlesInit} />

      <nav>
        <Link to="/home">Functions</Link>
        <Link to="warmlist">Warm List</Link>
        <Link to="errorlogs">Error Logs</Link>
        <Link to="userinfo">User Info</Link>
      </nav>

      <div id="loading-section">
        <div className="loadingio-spinner-reload-95c95vxnjuq">
          <div className="ldio-7c2ii3644jj">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<FunctionsList user={user} metrics={metrics} getUserInfo={getUserInfo} loading={loading} setLoading={setLoading} setUser={setUser} setMetrics={setMetrics} refreshInfo={refreshInfo}/>}></Route>
        <Route path="/warmlist" element={<WarmList />}></Route>
        <Route path="/errorlogs" element={<ErrorLogs />}></Route>
        <Route path="/userinfo" element={<UserInfo user={user} loading={loading} setLoading={setLoading} setUser={setUser} setMetrics={setMetrics} />}></Route>
      </Routes>
    </>
  );
}

export default Home;
