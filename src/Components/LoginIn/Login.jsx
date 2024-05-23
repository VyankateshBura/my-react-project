// src/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("call");
    e.preventDefault();
    // Handle login logic here
    navigate('/course/all');
    // const data =  axios.get('http://localhost:8080/api/course/all').then((response)=> {
    //   setData(response.data)
    //   console.log(response)
    //   history.push('/course')
    // }).catch(e=> console.log(e))
    // console.log(data);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
