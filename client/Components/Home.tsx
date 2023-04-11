import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
    

function Home () {
        return (
      <>
        <nav>
          <ul>
            <li> <Link to='/'></Link></li>
            <li> <Link to='/warmlist'></Link></li>
            <li> <Link to='/errorlogs'></Link></li>
            <li> <Link to='/userinfo'></Link></li>
          </ul>
        </nav>
      </>
        )
    }
    
    export default Home;
    
    