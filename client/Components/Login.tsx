// React Imports
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from '../assets/login-particles.json';

// Styles and Assets Imports
import logo from '../assets/watchdogs-black.png';
import '../scss/Login.scss';

// Main Function
function Login() {
  //
  // State Declaration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //Initialize Particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const options: any = loginParticles;

  // Login Form Submission
  function loginSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.match) {
          navigate('/home');
        } else {
          window.alert('Incorrect username and/or password');
        }
      })
      .catch((err) => {
        console.log('Error in login fetch request:', err);
      });
  }

  // Render Components
  return (
    <main id="main-login-container">
      <Particles options={options} init={particlesInit} />

      <div id="login-container">
        <img src={logo} alt="Watchdogs logo" />
        <form>
          <div>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement>) => loginSubmit(e)}>
            Login
          </button>
          <br></br>
          <Link to="/signup">Click Here to Sign Up</Link>
        </form>
      </div>
    </main>
  );
}

export default Login;
