// React Imports
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// Styles and Assets Imports
import logo from '../assets/watchdogs-black.png';
import github from '../assets/github-mark.png'
import '../scss/Login.scss';

// Types Imports
import { LoginResponseType, LoginBodyType } from '../types';

function Login() {
  // State Declaration
  const [username, setUsername] = useState('' as string); // Updated as user types into input field
  const [password, setPassword] = useState('' as string); // Updated as user types into input field

  const navigate = useNavigate();

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
          navigate('/'); // Navigates to Home page on successful signin
        } else {
          const invalidDisplay = document.getElementById('invalid-display'); 
          if (invalidDisplay) {
            invalidDisplay.innerHTML = 'Invalid Username or Password'; // Insert text into empty div
          }
        }
      })
      .catch((err) => {
        console.log('Error in login fetch request:', err);
      });
  }

  // Render Components
  return (
    <main id="main-login-container">

      <div id="login-container">
        <img src={logo} alt="Watchdogs logo" />
        <div id="invalid-display">
          {/* Empty div to be populated on unsuccessful login */}
        </div>
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
        <div id='login-github-link'>
          <a href='https://github.com/oslabs-beta/Watchdogs' target='blank'>Check us out on Github</a>
          <img src={github}></img>
        </div>
      </div>
    </main>
  );
}

export default Login;
