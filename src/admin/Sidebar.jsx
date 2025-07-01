import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Sidebar({ setActiveTab }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
  };

  const adminName = localStorage.getItem('adminName');
  const adminRole = localStorage.getItem('adminRole');

  return (
    <>
      {/* Hamburger button for small screens */}
      <button
        className="admin-hamburger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        &#9776;
      </button>
      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        <h2>
          {adminRole === 'super' ? 'Super Admin' : 'Admin'}: <p>{adminName}</p>
        </h2>
        <ul>
          <li onClick={() => { setActiveTab('team'); setOpen(false); }}>Team</li>
          <li onClick={() => { setActiveTab('news'); setOpen(false); }}>News</li>
          <li onClick={() => { setActiveTab('events'); setOpen(false); }}>Events</li>
          <li onClick={() => { setActiveTab('profile'); setOpen(false); }}>Profile</li>
          {adminRole === 'super' && (
            <li onClick={() => { setActiveTab('admins'); setOpen(false); }}>Admins</li>
          )}
          <li onClick={() => { handleLogout(); setOpen(false); }} className="logout-btn">Logout</li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;