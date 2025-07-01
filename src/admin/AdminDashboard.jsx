import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import './Admin.css';

import TeamManager from './TeamManager'; 
import NewsManager from './NewsManager'; 
import EventsManager from './EventsManager'; 
import AdminProfile from './AdminProfile';
import AdminManager from './AdminManager';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
    const adminRole = localStorage.getItem('adminRole'); // <-- Add this line


  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  

  const renderContent = () => {
    switch (activeTab) {
      case 'team':
        return <TeamManager />;
      case 'news':
        return <NewsManager />;
      case 'events':
        return <EventsManager />;
      case 'admins':
        return adminRole === 'super' ? <AdminManager /> : <p>Access denied.</p>;
      case 'profile':
        return <AdminProfile />;
      default:
        return <TeamManager />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="admin-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminDashboard;
