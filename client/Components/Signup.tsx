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
import '../scss/Signup.scss';

//Types Imports
import { SignupBodyType, SignupErrorType } from '../types';


// Main Function
function Signup() {
  // State Declaration
  const [username, setUsername] = useState('' as string);
  const [password, setPassword] = useState('' as string);
  const [arn, setArn] = useState('' as string);
  const [region, setRegion] = useState('us-east-1' as string);
  const navigate = useNavigate();

  
  // Initialize Particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const options: any = loginParticles;

  //Signup Form Submission
  function signupSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!username.length || !password.length || !arn.length || !region.length) {
      const errorDisplay: HTMLElement | null = document.getElementById('user-already-exists');
      if (errorDisplay) {
        errorDisplay.innerHTML = 'Username or Password cannot be empty';
        errorDisplay.style.display = '';
      }
      return;
    }

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
      } as SignupBodyType),
    })
      .then((res): Promise<SignupErrorType> => res.json())
      .then((res) => {
        if (res.code == 11000) {
          const errorDisplay: HTMLElement | null = document.getElementById('user-already-exists');
          if (errorDisplay) {
            errorDisplay.innerHTML = 'Username already exists';
          }
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log('Error in signup fetch request:', err);
      });
  }

  // Render Components
  return (
    <main id="main-signup-container">
      <Particles options={options} init={particlesInit} />
      <div id="signup-container">
        <img src={logo} alt="Watchdogs logo" />
        <p id="user-already-exists"></p>
        <form>
          <div>
            <input
              id="signup-username"
              type="text"
              placeholder="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
            <input
              id="signup-password"
              type="password"
              placeholder="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              id="arn"
              type="text"
              placeholder="ARN"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setArn(e.target.value);
              }}
            />
            <select
              name="Select Region"
              id="region-selector"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
          </div>
          <a
            id="arn-setup"
            target="blank"
            href='https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/quickcreate?templateURL=https://cf-templates-u6isxdthhcp5-us-east-2.s3.us-east-2.amazonaws.com/2023-04-18T184812.186Z6q4-WatchDogTemplate&stackName=WatchDogsStack'>
            Connect Your AWS Account
          </a>
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              signupSubmit(e);
            }}>
            Signup
          </button>
          <Link to="/login">Back to Login</Link>
        </form>
      </div>
    </main>
  );
}

export default Signup;
