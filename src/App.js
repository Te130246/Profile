import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Login from './page/Login';
import Register from './page/Register';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import AddProfile from './components/AddProfile';
import EditProfile from './components/EditProfile';




function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้า Login และ Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/addProfile" element={<AddProfile />} />
        <Route path="/register" element={<Register />} />

        {/* เส้นทางที่มี Sidebar และ Topbar */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Dashboard" element={
          <div className="g-sidenav-show  bg-gray-100">
            <Sidebar />
            <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              <Navbar />
              <div className="g-sidenav-show  bg-gray-100">
                <Main />
              </div>
            </div>
          </div>
        } />
                <Route path="/Profile" element={
          <div className="g-sidenav-show  bg-gray-100">
            <Sidebar />
            <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              <Navbar />
              <div className="g-sidenav-show  bg-gray-100">
                <Profile />

              </div>
            </div>
          </div>
        } />
                        <Route path="/EditProfile" element={
          <div className="g-sidenav-show  bg-gray-100">
            <Sidebar />
            <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              <Navbar />
              <div className="g-sidenav-show  bg-gray-100">
                <EditProfile />

              </div>
            </div>
          </div>
        } />



      
      </Routes>
    </Router>
  );
}

export default App;
