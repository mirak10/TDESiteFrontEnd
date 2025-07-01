import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsSection.css';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const updateCardsPerView = () => {
    const width = window.innerWidth;
    if (width < 768) setCardsPerView(1);
    else if (width < 1024) setCardsPerView(2);
    else setCardsPerView(4);
  };

  const nextSlide = () => {
    if (currentIndex + cardsPerView < events.length) {
      setCurrentIndex(currentIndex + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (currentIndex - cardsPerView >= 0) {
      setCurrentIndex(currentIndex - cardsPerView);
    }
  };

  const visibleEvents = events.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="slideshow-section" id="events">
      <h2>Upcoming Events</h2>
      <div className="slideshow-wrapper">
        {currentIndex > 0 && <button className="arrow left" onClick={prevSlide}>◀</button>}
        <div className="slideshow-grid">
          {visibleEvents.map((event) => (
            <div key={event._id} className="slide-card" onClick={() => setSelectedEvent(event)}>
              <img src={event.imageUrl} alt={event.title} className="slide-img" />
              <h3>{event.title}</h3>
              <p>{event.shortDescription}</p>
            </div>
          ))}
        </div>
        {currentIndex + cardsPerView < events.length && (
          <button className="arrow right" onClick={nextSlide}>▶</button>
        )}
      </div>

      {selectedEvent && (
        <div className="slide-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="slide-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="modal-img" />
            <h3>{selectedEvent.title}</h3>
            <p><strong>{selectedEvent.date} – {selectedEvent.time}</strong><br />by {selectedEvent.author || 'Organizers'}</p>
            <div className="modal-description">{selectedEvent.fullDetails}</div>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventsSection;
