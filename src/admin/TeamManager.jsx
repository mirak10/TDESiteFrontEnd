import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const positions = [
  'Chairman',
  'Secretary General',
  'Finance Secretary',
  'Social Secretary',
  'Sports Secretary'
];

function TeamManager() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/team`)
      .then(res => setTeam(res.data))
      .catch(err => console.error('Error fetching team:', err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const request = editingId
      ? axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/team/${editingId}`, formData, headers)
      : axios.post('${import.meta.env.VITE_API_BASE_URL}/api/team', formData, headers);

    request
      .then(res => {
        const updatedList = editingId
          ? team.map(member => member._id === editingId ? res.data : member)
          : [...team, res.data];
        setTeam(updatedList);
        resetForm();
      })
      .catch(err => console.error('Error submitting member:', err));
  };

  const handleEdit = member => {
    setFormData({
      name: member.name,
      position: member.position,
      imageUrl: member.imageUrl || ''
    });
    setEditingId(member._id);
  };

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => setTeam(team.filter(member => member._id !== id)))
        .catch(err => console.error('Error deleting member:', err));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', position: '', imageUrl: '' });
    setEditingId(null);
  };

  return (
    <div className="manager">
      <h2>Team Manager</h2>
      <form onSubmit={handleSubmit} className="team-form">

        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Position --</option>
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Member</button>
        {editingId && (
          <button type="button" onClick={resetForm}>Cancel</button>
        )}
      </form>

      <div className="entries">
        {team.map(member => (
          <div key={member._id} className="entry">
            {member.imageUrl && (
              <img src={member.imageUrl} alt={member.name} className="entry-image" />
            )}
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <div className="member-actions">
              <button className="edit-btn" onClick={() => handleEdit(member)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(member._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamManager;
