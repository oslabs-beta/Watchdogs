// React Imports
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Particles Imports
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import loginParticles from '../assets/login-particles.json';

// Type Imports
import { UserDataType, MetricType, ResponseDataType, SelectedFuncs } from '../types';

// Component Imports
import UserInfo from './UserInfo';
import WarmList from './WarmList';
import FunctionsList from './FunctionsList';
import '../scss/Home.scss';

// Asset Imports
import logo from '../assets/logo.png';
import icon from '../assets/icon.png';

// Main Function
function Home() {
  // State Declaration
  const [user, setUser] = useState({} as UserDataType);
  const [metrics, setMetrics] = useState({} as MetricType);
  const [loading, setLoading] = useState(false as boolean);
  const [timeframe, setTimeframe] = useState("10800000" as string);
  const [incrementOptions, setIncrementOptions] = useState([
    "10min",
    "30min",
  ] as string[]);
  const [increment, setIncrement] = useState("10min" as string);
  const [period, setPeriod] = useState(10 as number);
  const [unit, setUnit] = useState(
    "minute" as
      | false
      | "millisecond"
      | "second"
      | "minute"
      | "hour"
      | "day"
      | "week"
      | "month"
      | "quarter"
      | "year"
      | undefined
  );
  const [dropdownOptions, setDropdownOptions] = useState([] as SelectedFuncs[])
  const [selectedFuncs, setSelectedFuncs] = useState([] as SelectedFuncs[]);



  const navigate = useNavigate();

  // Particles Initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const options: any = loginParticles;

  // Get User Info Logic
  function getUserInfo(): void {
    console.log(timeframe, increment)
    setLoading(true);
    fetch(`/api/user/${timeframe}/${increment}`)
      .then((res): Promise<ResponseDataType> | undefined => {
        if (res.redirected) {
          navigate("/login");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res == undefined) {
          return;
        }
        if (res.badArn) window.alert("Invalid ARN");
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
        const options: SelectedFuncs[] = [{ label: "Select All", value: "all" }]
        for (const func in res.metrics){
          options.push({value: func, label: func})
        }
        setDropdownOptions(options)
      });
  }

  // Refresh Functions
  function refreshInfo(): void {
    setLoading(true);
    fetch(`/api/refresh/${timeframe}/${increment}`)
      .then((res): Promise<ResponseDataType> => res.json())
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        setMetrics(res.metrics);
        const options: SelectedFuncs[] = [{ label: "Select All", value: "all" }]
        for (const func in res.metrics){
          options.push({value: func, label: func})
        }
        setDropdownOptions(options)
      });
  }

  useEffect(() => {
    if (timeframe === "10800000") {
      setIncrement("10min");
      setIncrementOptions(["10min", "30min"]);
    } else if (timeframe === "43200000") {
      setIncrement("30min");
      setIncrementOptions(["30min", "1hr"]);
    } else if (timeframe === "86400000") {
      setIncrement("1hr");
      setIncrementOptions(["1hr", "3hr", "6hr"]);
    } else if (timeframe === "604800000") {
      setIncrement("12hr");
      setIncrementOptions(["12hr", "1d"]);
    } else if (timeframe === "2629800000") {
      setIncrement("1d");
      setIncrementOptions(["1d"]);
    }
  }, [timeframe]);

  useEffect(() => {
    if (increment === "10min") {
      setPeriod(10);
      setUnit("minute");
    }
    if (increment === "30min") {
      setPeriod(30);
      setUnit("minute");
    }
    if (increment === "1hr") {
      setPeriod(1);
      setUnit("hour");
    }
    if (increment === "3hr") {
      setPeriod(3);
      setUnit("hour");
    }
    if (increment === "6hr") {
      setPeriod(6);
      setUnit("hour");
    }
    if (increment === "12hr") {
      setPeriod(12);
      setUnit("hour");
    }
    if (increment === "1d") {
      setPeriod(1);
      setUnit("day");
    }
    getUserInfo();
  }, [increment]);

 
  // Render Componenets
  return (
    <>
      <Particles options={options} init={particlesInit} />
      <nav>
        <div id="lock-left">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <Link to="/">Functions</Link>
          <Link to="warmlist">Warm List</Link>
        </div>
        <div id="lock-right">
          <Link to="userinfo">
            <img src={icon}></img>
            {user.username}
          </Link>
        </div>
      </nav>
    
      <div id="loading-section">
        <div className="loadingio-spinner-reload-95c95vxnjuq">
          <div className="ldio-7c2ii3644jj">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <FunctionsList
              user={user}
              metrics={metrics}
              getUserInfo={getUserInfo}
              loading={loading}
              refreshInfo={refreshInfo}
              timeframe={timeframe}
              period={period}
              unit={unit}
              setIncrement={setIncrement}
              setTimeframe={setTimeframe}
              incrementOptions={incrementOptions}
              dropdownOptions={dropdownOptions}
            />
          }
        ></Route>
        <Route path="/warmlist" element={<WarmList />}></Route>
        <Route
          path="/userinfo"
          element={
            <UserInfo
              user={user}
              loading={loading}
              setLoading={setLoading}
              setUser={setUser}
              setMetrics={setMetrics}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default Home;
