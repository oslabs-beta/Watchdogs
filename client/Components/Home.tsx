import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo.js';
import WarmList from './WarmList.js';
import ErrorLogs from './ErrorLogs.js';
import FunctionsList from './FunctionsList.js'
import '../scss/Home.scss'

function Home () {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/user')
      .then((res) => {
        if (res.redirected){
          navigate('/login')
        } else {
          return res.json();
        }
      })
      .then(res => {
        setUser(res)
      })
  }, []) 

  return (
    <>
      <nav>
        <Link to='/home'>Home</Link>
        <Link to='warmlist'>Warm List</Link>
        <Link to='errorlogs'>Error Logs</Link>
        <Link to='userinfo'>User Info</Link>
      </nav>

      <Routes>
        <Route path='/' element={<FunctionsList/>}></Route>
        <Route path='/warmlist' element={<WarmList/>}></Route>
        <Route path='/errorlogs' element={<ErrorLogs/>}></Route>
        <Route path='/userinfo' element={<UserInfo/>}></Route>
      </Routes>
    </>
  )
}
    
export default Home;
    
    