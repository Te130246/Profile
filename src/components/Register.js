import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    security_question: '',
    security_answer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  // เพิ่มการเรียก API สำหรับตรวจสอบอีเมลที่ซ้ำกัน
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/check-email?email=${email}`);
      const data = await response.json();
      if (data.exists) {
        alert('This email is already registered. Please use a different email.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === 'email') {
      checkEmailExists(e.target.value);
    }
  };

  return (
    <div className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <p>You are 30 seconds away from earning your own money!</p>
          <input type="submit" name="" defaultValue="Login" /><br />
        </div>
        <div className="col-md-9 register-right">
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input type="text" name="first_name" className="form-control" placeholder="First Name *" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" name="last_name" className="form-control" placeholder="Last Name *" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email *"
                onChange={handleChange}
                onBlur={handleBlur} // เพิ่มการตรวจสอบอีเมลเมื่อผู้ใช้เลิกโฟกัส
                required
              />
            </div>
            <div className="form-group">
              <input type="text" name="phone" className="form-control" placeholder="Your Phone *" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="password" className="form-control" placeholder="Password *" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password *" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <select name="security_question" className="form-control" onChange={handleChange} required>
                <option value="" disabled selected>Please select your Security Question</option>
                <option value="What is your Birthdate?">What is your Birthdate?</option>
                <option value="What is Your old Phone Number">What is Your old Phone Number</option>
                <option value="What is your Pet Name?">What is your Pet Name?</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" name="security_answer" className="form-control" placeholder="Enter Your Answer *" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>
                <input type="radio" name="gender" value="male" onChange={handleChange} defaultChecked /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
              </label>
            </div>
            <input type="submit" className="btnRegister" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
