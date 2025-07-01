import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function EventManager() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDetails: '',
    date: '',
    time: '',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await axios.put(`/api/events/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const updated = events.map(ev => ev._id === editingId ? res.data : ev);
        setEvents(updated);
      } else {
        const res = await axios.post('/api/events', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents([...events, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(ev => ev._id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleEdit = event => {
    setFormData({
      title: event.title,
      shortDescription: event.shortDescription,
      fullDetails: event.fullDetails,
      date: event.date,
      time: event.time,
      imageUrl: event.imageUrl || ''
    });
    setEditingId(event._id);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      shortDescription: '',
      fullDetails: '',
      date: '',
      time: '',
      imageUrl: ''
    });
    setEditingId(null);
  };

  return (
    <div className="manager">
      <h2>Upcoming Events</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
        <input name="shortDescription" placeholder="Short Description" value={formData.shortDescription} onChange={handleChange} required />
        <textarea name="fullDetails" placeholder="Full Details" value={formData.fullDetails} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Event</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="entries">
        {events.map(event => (
          <div className="entry" key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.shortDescription}</p>
            {event.imageUrl && <img className="entry-image" src={event.imageUrl} alt="Event" />}
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <div className="member-actions">
              <button className="edit-btn" onClick={() => handleEdit(event)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventManager;
