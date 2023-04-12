// React Imports
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from '../assets/login-particles.json';

// Styles and Assets Imports
import logo from '../assets/watchdogs-black.png';
import '../scss/Signup.scss';

// Main Function
function Signup() {
  //
  // State Declaration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [arn, setArn] = useState('');
  const navigate = useNavigate();

  // Initialize Particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const options: any = loginParticles;

  //Signup Form Submission
  function signupSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        arn,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user) {
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
    <main id="main-signup-container">
      <Particles options={options} init={particlesInit} />
      <div id="signup-container">
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
          <input
            id="arn"
            type="text"
            placeholder="ARN"
            onChange={(e) => {
              setArn(e.target.value);
            }}
          />
          <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement>) => signupSubmit(e)}>
            Signup
          </button>
        </form>
      </div>
    </main>
  );
}

export default Signup;
