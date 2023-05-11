import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import {useState} from 'react';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendLoginRequest(username, password);
  };

  const sendLoginRequest = async (username, password) => {
    const response = await fetch('http://localhost:3000/login/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    // Handle the response data here
    console.log(data)
    if(data === 1){
        alert('Tai khoan da ton tai')
    }else{
        if(data === 0){
            alert('Dinh dang email khong chinh xac')
        }else{
            alert('Them moi tai khoan thanh cong')
            window.location.assign('/login')
        }
    }


}

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form >
                <p>
                    <label>Username</label><br/>
                    <input type="text" value={username} name="first_name" onChange={handleUsernameChange} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" value={email} name="email" onChange={handleEmailChange} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" value={password} name="password" onChange={handlePasswordChange} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={handleFormSubmit}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
