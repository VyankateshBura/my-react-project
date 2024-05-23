import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file for additional styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("call");
    
    navigate('/course/all');
  };

  return (
    <div className="container justify-content-center align-items-center my-5" style={{margin:'auto',width:"30%",height:"20%"}}>
      <div className="card shadow-sm border">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="email"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary d-block mx-auto">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;