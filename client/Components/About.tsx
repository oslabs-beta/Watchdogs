import React, { useEffect } from 'react'
import { AboutPropsType } from '../types';
import logo from '../assets/logo.png'
import github from '../assets/github-mark.png'
import '../scss/About.scss'

function About(props: AboutPropsType){
    // Show/Hide Loading Display
    const { loading } = props;
  useEffect(() => {
    const loadingSection = document.getElementById('loading-section') as HTMLDivElement;
    const userInfo = document.getElementById('about-page') as HTMLDivElement;

    if (loading) {
      loadingSection.style.display = '';
      userInfo.style.display = 'none';
    } else {
      loadingSection.style.display = 'none';
      userInfo.style.display = '';
    }
  });

    return (
        <>
        <div id="about-page">
            <div>About page</div>
            <p>Thank you for using our open-source project Watchdogs! This app was developed in partnership with OSLabs.
                If you wish to help contribute to this projects, please feel free to stop by our Github page to learn more.
            </p>
            <form action='https://github.com/oslabs-beta/Watchdogs' target='blank' className='github-link'>
                <button type='submit' className='github-link'>
                    <img src={github} id='github-logo'></img>
                    <img src={logo}></img>
                </button> 
            </form>

        </div>
        </>
    )
}

export default About