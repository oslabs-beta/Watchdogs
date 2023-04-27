// React Imports
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from '../assets/login-particles.json';

// Styles and Assets Imports
import logo from '../assets/watchdogs-black.png';
import '../scss/Login.scss';

//Types Imports
import { LoginResponseType, LoginBodyType } from '../types';

// Main Function
function Login() {
  //
  // State Declaration
  const [username, setUsername] = useState('' as string);
  const [password, setPassword] = useState('' as string);

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
      } as LoginBodyType),
    })
      .then((res): Promise<LoginResponseType> => res.json())
      .then((res) => {
        if (res.match) {
          navigate('/');
        } else {
          const invalidDisplay = document.getElementById('invalid-display');
          if (invalidDisplay) {
            invalidDisplay.innerHTML = 'Invalid Username or Password';
          }
        }
      })
      .catch((err) => {
        console.log('Error in login fetch request:', err);
      });
  }

  // useEffect(() => {

  // })

  // Render Components
  return (
    <main id="main-login-container">
      <Particles options={options} init={particlesInit} />

      <div id="login-container">
        <img src={logo} alt="Watchdogs logo" />
        <div id="invalid-display"></div>
        <form>
          <div>
            <input
              id="login-username"
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              id="login-password"
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
