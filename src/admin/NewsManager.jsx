import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function NewsManager() {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullText: '',
    imageUrls: [''],
    author: '',
    time: '', // will set current time if left blank
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get('/api/news')
      .then(res => {
        console.log('📰 News response:', res.data);
        setNews(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error('Error fetching news:', err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updated = [...formData.imageUrls];
    updated[index] = value;
    setFormData({ ...formData, imageUrls: updated });
  };

  const addImageField = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  };

  const removeImageField = index => {
    const updated = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, imageUrls: updated });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      fullText: '',
      imageUrls: [''],
      author: '',
      time: '',
    });
    setEditingId(null);
  };

  const handleSubmit = e => {
  e.preventDefault();

  const dataToSend = {
    ...formData,
    time: formData.time || new Date().toLocaleString(), // Set current datetime if not set
  };

  const method = editingId ? 'put' : 'post';
  const url = editingId ? `/api/news/${editingId}` : '/api/news';
  const token = localStorage.getItem('adminToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  };

  axios[method](url, dataToSend, config)
    .then(res => {
      if (editingId) {
        const updated = news.map(item =>
          item._id === editingId ? res.data : item
        );
        setNews(updated);
      } else {
        setNews([...news, res.data]);
      }
      resetForm();
    })
    .catch(err => {
      console.error('Error saving news:', err);
      alert('Failed to save news. Check console for more info.');
    });
};

  const handleEdit = item => {
    setFormData({
      title: item.title,
      description: item.description,
      fullText: item.fullText,
      imageUrls: item.imageUrls,
      author: item.author,
      time: item.time,
    });
    setEditingId(item._id);
  };

  return (
    <div className="manager">
      <h2>News Manager</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} />
        <textarea name="fullText" placeholder="Full Text" value={formData.fullText} onChange={handleChange} />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        <input name="time" placeholder="Custom Time (optional)" value={formData.time} onChange={handleChange} />

        <div className="image-url-inputs">
          {formData.imageUrls.map((url, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={e => handleImageChange(index, e.target.value)}
              />
              <button type="button" onClick={() => removeImageField(index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={addImageField}>+ Add Image</button>
        </div>

        <button type="submit">{editingId ? 'Update' : 'Add'} News</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="entries">
        {news.map(item => (
          <div key={item._id} className="entry">
            <h3>{item.title}</h3>
            <p><strong>{item.description}</strong></p>
            <p>{item.fullText}</p>
            <p><strong>Author:</strong> {item.author}</p>
            <p><em>{item.time}</em></p>
            {item.imageUrls?.length > 0 && (
              <div className="event-images">
                {item.imageUrls.map((img, i) => (
                  <img key={i} src={img} alt={`img-${i}`} />
                ))}
              </div>
            )}
            <div className="member-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsManager;
