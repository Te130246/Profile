import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // ใช้ useLocation เพื่อตรวจสอบเส้นทางปัจจุบัน
import '../css/Sidebar.css';

function Sidebar() {
  const location = useLocation(); // รับข้อมูลเส้นทางปัจจุบัน
  const [activeIndex, setActiveIndex] = useState(null);

  // ฟังก์ชันเพื่อกำหนดดัชนีของปุ่มที่ถูกคลิก
  const getActiveIndex = (href) => {
    return location.pathname === href; // ถ้าเส้นทางตรงกับ href ให้แสดงกรอบ
  };

  const handleClick = (index) => {
    setActiveIndex(index); // ตั้งค่าดัชนีของปุ่มที่ถูกคลิก
  };

  return (
    <>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2" id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
          <a className="navbar-brand px-4 py-3 m-0" href="https://demos.creative-tim.com/material-dashboard/pages/dashboard" target="_blank" rel="noopener noreferrer">
            <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img" width={26} height={26} alt="main_logo" />
            <span className="ms-1 text-sm text-dark">Creative Tim</span>
          </a>
        </div>
        <hr className="horizontal dark mt-0 mb-2" />
        <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            {[
              { name: 'Dashboard', icon: 'dashboard', href: '/Dashboard' },
              { name: 'Tables', icon: 'table_view', href: '../pages/tables.html' },
              { name: 'Billing', icon: 'receipt_long', href: '../pages/billing.html' },
              { name: 'Virtual Reality', icon: 'view_in_ar', href: '../pages/virtual-reality.html' },
              { name: 'RTL', icon: 'format_textdirection_r_to_l', href: '../pages/rtl.html' },
              { name: 'Notifications', icon: 'notifications', href: '../pages/notifications.html' },
              { name: 'Profile', icon: 'person', href: '/Profile' }
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${getActiveIndex(item.href) || activeIndex === index ? 'border border-dark bg-dark text-white' : 'text-dark'}`}
                  href={item.href}
                  onClick={() => handleClick(index)} // เรียกใช้ handleClick เมื่อคลิก
                >
                  <i className={`material-symbols-rounded opacity-5`}>{item.icon}</i>
                  <span className="nav-link-text ms-1">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          {/* เพิ่มลูกเล่นการเลื่อน */}
          <div className={`active-indicator ${activeIndex !== null ? 'active' : ''}`} style={{ transform: `translateY(${activeIndex * 50}px)` }} />
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0 ">
          <div className="mx-3">
            <a className="btn bg-gradient-dark w-100" type="button">Logout</a>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
