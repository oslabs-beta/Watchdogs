import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// import { Dispatch, SetStateAction } from "react";

// interface IProps {
//   setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
// }

 function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
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