import React from 'react';
import logo from '../assets/logo.png';
import github from '../assets/github-mark.png';
import icon from '../assets/icon.png';
import linkedin from '../assets/linkedin-logo.png';
import oslabs from '../assets/oslabs.png'
import medium from '../assets/medium.png'
import '../scss/About.scss';

//replace medium article link
function About() {
  return (
    <>
      <div id="main-about-page">
        <div id="about-page">
          <h3>Thank you for using Watchdogs!</h3>
          <p>To learn more about how Watchdogs can help you optimize your workflow, check out our Medium article!</p>
          <form action="https://medium.com/@contact_33429/introducing-astrospect-4498d423b055" target="blank" id="medium-form">
            <button type="submit">
              <img src={medium} id="medium-logo"></img>
              <img src={logo}></img>

            </button>
          </form>
          <p>If you wish to contribute to this project, please feel free to stop by our Github page to learn more.</p>
          <form action="https://github.com/oslabs-beta/Watchdogs" target="blank" id="github-link">
            <button type="submit" className="github-link-button">
              <img src={github} id="github-logo"></img>
              <img src={logo}></img>
            </button>
          </form>
          <p>If you are interested in connecting with our team, do not hesitate to connect with us on LinkedIn!</p>
          <div id="linkedin-section">           
            <form action="https://www.linkedin.com/company/watchdogsmetrics/" target="blank" id="linkedin-form">
              <button type='submit'>
                <img src={linkedin} id="linkedin-logo"></img>
              </button>
            </form>            
            <div>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/company/watchdogsmetrics/" target="blank" id="watchdogs-linkedin-link">
                    Watchdogs
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/benjamin-hergenroeder/" target="blank">
                    Benjamin Hergenroeder
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/john-saehwan-lee/" target="blank">
                    John Lee
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/peterfeng96/" target="blank">
                    Peter Feng
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/westoclark/" target="blank">
                    Weston Clark
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p>This product was developed in partnership with OSLabs. To learn more about OSLabs and how they can help accelerate your products, please visit their website!</p>
    
          <form action="https://www.opensourcelabs.io/" target="blank" id="oslabs-form">
            <button type='submit'>
              <img src={oslabs} id="oslabs-logo"></img>
            </button>
          </form>       
          <h3>Thank You</h3>
          <img src={icon} id="about-icon"></img>
        </div>
      </div>
    </>
  );
}

export default About;


