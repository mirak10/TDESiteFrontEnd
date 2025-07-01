// src/admin/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; 

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
    const res = await axios.post('${import.meta.env.VITE_API_BASE_URL}/api/admin/login', formData, {
    headers: {
        'Content-Type': 'application/json'
    }
    });
        console.log(res.data);
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminName', res.data.fullname);
        localStorage.setItem('adminRole', res.data.role);
      navigate('/admin/AdminDashboard'); // or '/dashboard' if you split routes later
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
