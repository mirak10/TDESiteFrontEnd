import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsSection.css';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Swipe detection state
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
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

  const totalPages = Math.ceil(events.length / cardsPerView);
  const currentPage = Math.floor(currentIndex / cardsPerView);

  const goToPage = (pageIdx) => {
    setCurrentIndex(pageIdx * cardsPerView);
  };

  const visibleEvents = events.slice(currentIndex, currentIndex + cardsPerView);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      // Swiped left
      if (currentIndex + cardsPerView < events.length) {
        setCurrentIndex(currentIndex + cardsPerView);
      }
    }
    if (distance < -50) {
      // Swiped right
      if (currentIndex - cardsPerView >= 0) {
        setCurrentIndex(currentIndex - cardsPerView);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className="slideshow-section" id="events">
      <h2>Upcoming Events</h2>
      <div className="slideshow-wrapper">
        <div
          className="slideshow-grid"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {visibleEvents.map((event) => (
            <div key={event._id} className="slide-card" onClick={() => setSelectedEvent(event)}>
              <img src={event.imageUrl} alt={event.title} className="slide-img" />
              <h3>{event.title}</h3>
              <p>{event.shortDescription}</p>
            </div>
          ))}
        </div>
        {/* Pagination dots for events */}
        {totalPages > 1 && (
          <div className="events-dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`events-dot${currentPage === idx ? ' active' : ''}`}
                onClick={() => goToPage(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="slide-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="slide-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="modal-img" />
            <h3>{selectedEvent.title}</h3>
            <p>
              <strong>{selectedEvent.date} – {selectedEvent.time}</strong>
              <br />by {selectedEvent.author || 'Organizers'}
            </p>
            <div className="modal-description">
              {selectedEvent.fullDetails.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventsSection;