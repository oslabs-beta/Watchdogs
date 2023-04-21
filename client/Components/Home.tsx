// React Imports
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from '../assets/login-particles.json';

// Type Imports
import { UserDataType, MetricType, ResponseDataType } from '../types';

// Component Imports
import UserInfo from './UserInfo';
import WarmList from './WarmList';
import FunctionsList from './FunctionsList';
import '../scss/Home.scss';

// Asset Imports
import logo from '../assets/logo.png';
import icon from '../assets/icon.png';

// Main Function
function Home() {
  // State Declaration
  const [user, setUser] = useState({} as UserDataType);
  const [metrics, setMetrics] = useState({} as MetricType);
  const [loading, setLoading] = useState(false as boolean);
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
      .then((res): Promise<ResponseDataType> | undefined => {
        if (res.redirected) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res == undefined) {
          return;
        }
        if (res.badArn) window.alert('Invalid ARN')
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
      });
  }

  // Refresh Functions
  function refreshInfo(): void {
    setLoading(true);
    fetch('/api/refresh')
      .then((res): Promise<ResponseDataType> => res.json())
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
      });
  }

  // Check For User Info on Refresh
  useEffect(() => {
    getUserInfo();
  }, []);

  // Render Componenets
  return (
    <>
      <Particles options={options} init={particlesInit} />
      <nav>
        <div id="lock-left">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <Link to="/">Functions</Link>
          <Link to="warmlist">Warm List</Link>
        </div>
        <div id="lock-right">
          <Link to="userinfo">
            <img src={icon}></img>
            {user.username}
          </Link>
        </div>
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
        <Route path="/" element={<FunctionsList user={user} metrics={metrics} getUserInfo={getUserInfo} loading={loading} refreshInfo={refreshInfo} />}></Route>
        <Route path="/warmlist" element={<WarmList />}></Route>
        <Route path="/userinfo" element={<UserInfo user={user} loading={loading} setLoading={setLoading} setUser={setUser} setMetrics={setMetrics} />}></Route>
      </Routes>
    </>
  );
}

export default Home;
