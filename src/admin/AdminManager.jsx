import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    password: '',
    role: 'admin',
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchAdmins();
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this admin?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchAdmins();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleEdit = (admin) => {
    setForm({
      username: admin.username,
      fullname: admin.fullname,
      password: '',
      role: admin.role,
    });
    setEditingId(admin._id);
  };

  const resetForm = () => {
    setForm({ username: '', fullname: '', password: '', role: 'admin' });
    setEditingId(null);
  };

  return (
    <div className="manager">
      <h2>Admin Manager</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required={!editingId} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="super">Super Admin</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'} Admin</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="entries">
        {admins.map((admin) => (
          <div className="entry" key={admin._id}>
            <strong>{admin.fullname}</strong> — {admin.username} ({admin.role})
            <div className="member-actions">
              <button className="edit-btn" onClick={() => handleEdit(admin)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(admin._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminManager;
