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
  const [region, setRegion] = useState('');

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
        region,
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
          <select
            name="Select Region"
            id="region-selector"
            onChange={(e) => {
              setRegion(e.target.value);
            }}>
            <option value="us-east-1">US East 1 (N. Virginia)</option>
            <option value="us-east-2">US East 2 (Ohio)</option>
            <option value="us-west-1">US West 1 (N. California) </option>
            <option value="us-west-2">US West 2 (Oregon)</option>
            <option value="ap-south-1">AP South 1 (Mumbai)</option>
            <option value="ap-northeast-1">AP Northeast 1 (Tokyo)</option>
            <option value="ap-northeast-2">AP Northeast 2 (Seoul)</option>
            <option value="ap-northeast-3">AP Northeast 3 (Osaka)</option>
            <option value="ap-southeast-1">AP Southeast 1 (Singapore)</option>
            <option value="ap-southeast-2">AP Southeast 2 (Sydney)</option>
            <option value="ca-central-1">CA Central 1 (Canada)</option>
            <option value="eu-central-1">Europe Central 1 (Frankfurt)</option>
            <option value="eu-west-1">Europe West 1 (Ireland)</option>
            <option value="eu-west-2">Europe West 2 (London)</option>
            <option value="eu-west-3">Europe West 3 (Paris)</option>
            <option value="eu-north-1">EU North 1 (Stockholm)</option>
            <option value="sa-east-1">SA East 1 (Sao Paulo)</option>
          </select>
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              signupSubmit(e);
            }}>
            Signup
          </button>
        </form>
      </div>
    </main>
  );
}

export default Signup;
