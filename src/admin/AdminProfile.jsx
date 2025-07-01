import { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

function AdminProfile() {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setFormData({
          fullname: res.data.fullname,
          username: res.data.username,
          password: '', // Leave empty for security
        });
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/admin/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setSuccess(res.data.message);
      if (formData.fullname) {
        localStorage.setItem('adminName', formData.fullname);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="manager">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="New Password (leave blank to keep old)"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default AdminProfile;
