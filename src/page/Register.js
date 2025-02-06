import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/styles.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // แสดงข้อความแจ้งเตือนเมื่อสมัครสมาชิกสำเร็จ
        navigate('/login'); // เปลี่ยนหน้าไปที่ Login
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error')); // แสดงข้อผิดพลาดถ้ามี
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  };

  const handleClick = () => {
    navigate('/'); // ใช้ navigate แทน history.push
  };

  return (
    <>
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage:
                        'url("https://cdn.pixabay.com/photo/2023/03/17/16/34/train-7859021_1280.jpg")',
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <div className="card card-plain">
                    <div className="card-header">
                      <h4 className="font-weight-bolder">Sign Up</h4>
                      <p className="mb-0">Enter your details to register</p>
                    </div>
                    <div className="card-body">
                      <form role="form" onSubmit={handleRegister}>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label" htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label" htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label" htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-check form-check-info text-start ps-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            I agree to the{' '}
                            <a href="javascript:;" className="text-dark font-weight-bolder">
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-2 text-sm mx-auto">
                        Already have an account?{' '}
                        <a
                          onClick={handleClick}
                          className="text-primary text-gradient font-weight-bold"
                          style={{ cursor: 'pointer' }}
                        >
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
