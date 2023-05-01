// React Imports
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Styles and Assets Imports
import logo from '../assets/watchdogs-black.png';
import '../scss/Signup.scss';

// Types Imports
import { SignupBodyType, SignupErrorType } from '../types';

function Signup() {
  // State Declaration
  const [username, setUsername] = useState('' as string); 
  const [password, setPassword] = useState('' as string);
  const [arn, setArn] = useState('' as string);
  const [region, setRegion] = useState('us-east-1' as string); 
  const navigate = useNavigate();

  // Signup Form Submission
  function signupSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    
    // Populate error display div if any fields are missing
    if (!username.length || !password.length || !arn.length || !region.length) {
      const errorDisplay: HTMLElement | null = document.getElementById('invalid-signup');
      if (errorDisplay) {
        errorDisplay.innerHTML = 'All fields required';
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
        if (res.code == 11000) {//res.code number is returned by MongoDB as the duplicate key error code
          const errorDisplay: HTMLElement | null = document.getElementById('invalid-signup');
          if (errorDisplay) {
            errorDisplay.innerHTML = 'Username already exists';
          }
        } else {
          // Navigate to Home on successful signup
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
      <div id="signup-container">
        <img src={logo} alt="Watchdogs logo" />
        <p id="invalid-signup"></p>
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
            {/* AWS Region options */}
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
          {/* Link to Watchdogs permissions stack */}
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
