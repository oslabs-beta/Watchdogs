// React Imports
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Type Imports
import { UserDataType, MetricType, ResponseDataType, SelectedFuncs } from '../types';

// Component Imports
import UserInfo from './UserInfo';
import Incubator from './Incubator';
import FunctionsList from './FunctionsList';
import About from './About';

// Style Imports
import '../scss/Home.scss';

// Asset Imports
import logo from '../assets/logo.png';
import icon from '../assets/icon.png';

function Home() {
  // State Declaration
  const [user, setUser] = useState({} as UserDataType); // User Info
  const [metrics, setMetrics] = useState({} as MetricType); // Metric Data
  const [loading, setLoading] = useState(false as boolean); // Loading State used to display the Loading Component
  const [timeframe, setTimeframe] = useState('10800000' as string); // Timeframe filter
  const [incrementOptions, setIncrementOptions] = useState(['10min', '30min'] as string[]); // Increment Values
  const [increment, setIncrement] = useState('10min' as string); // Current Increment(breaks down to period and unit states)
  const [period, setPeriod] = useState(10 as number); // Number units for chartjs
  const [unit, setUnit] = useState('minute' as false | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | undefined); // Time units for chartJS display
  const [dropdownOptions, setDropdownOptions] = useState([] as SelectedFuncs[]); // Functions Display Options
  const [nofunc, setNofunc] = useState(false as boolean); // Displays noFunc component if user has no functions

  const navigate = useNavigate();

  // Get User Info
  function getUserInfo(): void {
    setLoading(true);
    fetch(`/api/user/${timeframe}/${increment}`)
      .then((res): Promise<ResponseDataType> | undefined => {
        // Redirects to login page if no existing cookie
        if (res.redirected) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res == undefined) {
          return;
        }
        if (res.badArn) window.alert('Invalid ARN, please update');
        if (res.nofunc) {
          setNofunc(true);
        }
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
        // Updates display filter dropdown menu based on existing Lambda functions
        const options: SelectedFuncs[] = [{ label: 'All Functions', value: 'all' }];
        for (const func in res.metrics) {
          options.push({ value: func, label: func });
        }
        setDropdownOptions(options);
      });
  }

  // Refreshes metrics, flushes and updates redis cache for selected timeframe/increment 
  function refreshMetrics(): void {
    setLoading(true);
    fetch(`/api/refresh/${timeframe}/${increment}`)
      .then((res): Promise<ResponseDataType> => res.json())
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
        // Updates display filter dropdown menu based on existing Lambda functions
        const options: SelectedFuncs[] = [{ label: 'All functions', value: 'all' }];
        for (const func in res.metrics) {
          options.push({ value: func, label: func });
        }
        setDropdownOptions(options);
      });
  }

  // Update increment options based on selected timeframe 
  useEffect(() => {
    if (timeframe === '10800000') {
      setIncrement('10min');
      setIncrementOptions(['10min', '30min']);
    } else if (timeframe === '43200000') {
      setIncrement('30min');
      setIncrementOptions(['30min', '1hr']);
    } else if (timeframe === '86400000') {
      setIncrement('1hr');
      setIncrementOptions(['1hr', '3hr', '6hr']);
    } else if (timeframe === '604800000') {
      setIncrement('12hr');
      setIncrementOptions(['12hr', '1d']);
    } else if (timeframe === '2629800000') {
      setIncrement('1d');
      setIncrementOptions(['1d']);
    }
  }, [timeframe]);


  // Break current increment state into period (number) and unit (string) for chartJS
  useEffect(() => {
    if (increment === '10min') {
      setPeriod(10);
      setUnit('minute');
    }
    if (increment === '30min') {
      setPeriod(30);
      setUnit('minute');
    }
    if (increment === '1hr') {
      setPeriod(1);
      setUnit('hour');
    }
    if (increment === '3hr') {
      setPeriod(3);
      setUnit('hour');
    }
    if (increment === '6hr') {
      setPeriod(6);
      setUnit('hour');
    }
    if (increment === '12hr') {
      setPeriod(12);
      setUnit('hour');
    }
    if (increment === '1d') {
      setPeriod(1);
      setUnit('day');
    }
    getUserInfo();
  }, [increment]);

  // Render Componenets
  return (
    <>
      <nav>
        <div id="lock-left">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <Link to="/">Functions</Link>
          <Link to="incubator">Incubator</Link>
          <Link to="about">About</Link>
        </div>
        <div id="lock-right">
          <Link to="userinfo">
            <img src={icon}></img>
            {user.username}
          </Link>
        </div>
      </nav>

      {/* React Router path definitions */}
      <Routes>
        <Route
          path="/"
          element={
            <FunctionsList
              user={user}
              metrics={metrics}
              loading={loading}
              refreshMetrics={refreshMetrics}
              timeframe={timeframe}
              period={period}
              unit={unit}
              setIncrement={setIncrement}
              setTimeframe={setTimeframe}
              incrementOptions={incrementOptions}
              dropdownOptions={dropdownOptions}
              nofunc={nofunc}
            />
          }></Route>
        <Route path="/incubator" element={<Incubator />}></Route>
        <Route path="/userinfo" element={<UserInfo user={user} loading={loading} setLoading={setLoading} setUser={setUser} setMetrics={setMetrics} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default Home;
