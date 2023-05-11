import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import {useState} from 'react';
import axios from 'axios';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendLoginRequest(username, password);
  };

  const sendLoginRequest = async (username, password) => {
    const response = await fetch('http://localhost:3000/login/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data)
    // Handle the response data here
    if (data === 1){alert('user not found')} else {
      if(data === 0 )alert('password uncorrect')
      else 
      {
        console.log(data)
        alert(data.mess)
        localStorage.setItem('token', data.data)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        window.location.assign('/car')
      }
    }
  };
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleFormSubmit}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" value={username} name="username" onChange={handleUsernameChange} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" value={password} name="password" onChange={handlePasswordChange} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" >Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
