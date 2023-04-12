import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Particles from "react-particles";
import { loadFull } from 'tsparticles';
import logo from '../assets/watchdogs-black.png';
import '../scss/Login.scss'
import { Engine } from 'tsparticles-engine';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const options: any = {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#d98918"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 4,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.8996283114607908,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3.945738208161363,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6.413648243462092,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 596.8428232695622,
              "size": 227.36869457888088,
              "duration": 1.5428589989281203,
              "opacity": 0.6983467047779912,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }
    const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
    }, []);


    function loginSubmit (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        fetch('/api/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.match){
                navigate('/home')
            } else {
                window.alert('Incorrect username and/or password')
            }
        })
        .catch(err => {
            console.log('Error in login fetch request:', err)
        })
    }

    return (
        <main id='main-container'>
            <Particles options={options} init={particlesInit} />
            <div id='login-containter'>
                <img src={logo} alt="Watchdogs logo" />
                <form>
                    <div>
                    <input type='text' placeholder='username' onChange={(e) =>{setUsername(e.target.value)}}/>
                    <input type='password' placeholder='password' onChange={(e) =>{setPassword(e.target.value)}}/>
                    </div>
                    <button type='submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => loginSubmit(e)}>Login</button>
                    <br></br>
                    <Link to='/signup'>Click Here to Sign Up</Link>
                </form>
            </div>
        </main>
    )

}

export default Login;