import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed. Please try again.');
        return;
      }

      const data = await response.json();
      alert('Login successful! Token: ' + data.token);
      // เก็บ token ใน localStorage
      localStorage.setItem('token', data.token);
      // เปลี่ยนเส้นทางไปที่หน้า Dashboard
      navigate('/addProfile');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleClick = () => {
    navigate('/Register'); // ใช้ navigate แทน history.push
  };

  return (
    <>
      <main className="main-content mt-0">
        <div className="page-header align-items-start min-vh-100" style={{backgroundImage: 'url("https://cdn.pixabay.com/photo/2019/08/20/01/17/baker-street-tube-4417559_1280.jpg")'}}>
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start" onSubmit={handleLogin}>
                      <div className="input-group input-group-outline my-3">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember me</label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign in</button>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        Don't have an account?
                        <a onClick={handleClick} className="text-primary text-gradient font-weight-bold" style={{ cursor: 'pointer' }}>Sign up</a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;













