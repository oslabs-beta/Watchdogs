import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Signup () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [arn, setArn] = useState('');
    const navigate = useNavigate();

    function loginSubmit (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        fetch('/api/signup', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                arn
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.user){
                navigate('/home');
            } else {
                window.alert('Incorrect username and/or password')
            }
        })
        .catch(err => {
            console.log('Error in login fetch request:', err)
        })
    }
    return(
        <div>
            <form>
                <input type='text' placeholder='username' onChange={(e) =>{setUsername(e.target.value)}}/>
                <input type='password' placeholder='password' onChange={(e) =>{setPassword(e.target.value)}}/>
                <input type='text' placeholder='ARN' onChange={(e) =>{setArn(e.target.value)}}/>
                <button type='submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => loginSubmit(e)}>Signup</button>
            </form>
        </div>
    )
}

export default Signup;