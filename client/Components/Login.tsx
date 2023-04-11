import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps{
    setIsLoggedIn: (IsLoggedIn: boolean)=>void
}
// import { Dispatch, SetStateAction } from "react";

// interface IProps {
//   setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
// }

 function Login({ setIsLoggedIn }: LoginProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    function loginSubmit (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        console.log('logging in')
        console.log(username, password);

        fetch('http://localhost:3000/api/login', {
            method: 'POST', 
            // mode: 'no-cors',
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
            console.log(res)
            if (res.match){
                setIsLoggedIn(true)
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
        
    <div>
        <form>
            <input type='text' placeholder='username' onChange={(e) =>{setUsername(e.target.value)}}/>
            <input type='password' placeholder='password' onChange={(e) =>{setPassword(e.target.value)}}/>
            <button type='submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => loginSubmit(e)}>Login</button>
            <br></br>
            <p><Link to='/signup'>Click Here to Sign Up</Link></p>
        </form>
        {/* <div>Incorrect Username or Password</div> */}
    </div>

    )

}

export default Login;