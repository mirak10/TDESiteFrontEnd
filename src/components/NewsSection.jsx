import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsSection.css';



function NewsSection() {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Swipe detection state
const [touchStartX, setTouchStartX] = useState(null);
const [touchEndX, setTouchEndX] = useState(null);

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
    if (currentIndex + cardsPerView < newsData.length) {
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

  useEffect(() => {
    fetchNews();
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
    // eslint-disable-next-line
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/news`);
      setNewsData(res.data);
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const updateCardsPerView = () => {
    const width = window.innerWidth;
    if (width < 768) setCardsPerView(1);
    else if (width < 1024) setCardsPerView(2);
    else setCardsPerView(3);
  };

  const visibleNews = newsData.slice(currentIndex, currentIndex + cardsPerView);

  const nextSlide = () => {
    if (currentIndex + cardsPerView < newsData.length) {
      setCurrentIndex(currentIndex + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (currentIndex - cardsPerView >= 0) {
      setCurrentIndex(currentIndex - cardsPerView);
    }
  };

  // Reset modal image index when opening a new modal
  const handleOpenModal = (news) => {
    setSelectedNews(news);
    setModalImageIndex(0);
  };

  // Fullscreen image on click in modal
  const handleModalImageClick = () => {
    if (selectedNews?.imageUrls?.[modalImageIndex]) {
      window.open(selectedNews.imageUrls[modalImageIndex], '_blank');
    }
  };

  return (
  <section className="news" id="news">
    <h2 className="news-title">News & Updates</h2>

    <div className="news-wrapper">
      <div className="news-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}

      >
        {visibleNews.map(news => (
          <div key={news._id} className="news-card" onClick={() => handleOpenModal(news)}>
            <img
              src={news.imageUrls?.[0] || '/default-news.jpg'}
              alt={news.title}
              className="news-image"
            />
            <h3>{news.title}</h3>
            <p>{news.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* 🔵 Dot navigation */}
    {newsData.length > cardsPerView && (
      <div className="news-dots">
        {Array.from({ length: Math.ceil(newsData.length / cardsPerView) }).map((_, idx) => (
          <button
            key={idx}
            className={`news-dot${currentIndex / cardsPerView === idx ? ' active' : ''}`}
            onClick={() => setCurrentIndex(idx * cardsPerView)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    )}

    {/* 📰 Modal */}
    {selectedNews && (
      <div className="news-modal-overlay" onClick={() => setSelectedNews(null)}>
        <div className="news-modal" onClick={e => e.stopPropagation()}>
          {selectedNews.imageUrls?.length > 0 && (
            <>
              <img
                src={selectedNews.imageUrls[modalImageIndex]}
                alt={`${selectedNews.title} ${modalImageIndex + 1}`}
                className="modal-image"
                style={{ maxHeight: '200px', objectFit: 'cover', cursor: 'zoom-in' }}
                onClick={handleModalImageClick}
                title="Click to view full image"
              />
              {selectedNews.imageUrls.length > 1 && (
                <div className="news-dots">
                  {selectedNews.imageUrls.map((_, idx) => (
                    <button
                      key={idx}
                      className={`news-dot${modalImageIndex === idx ? ' active' : ''}`}
                      onClick={() => setModalImageIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          <h3>{selectedNews.title}</h3>
          <p><strong>{selectedNews.time}</strong> — by {selectedNews.author}</p>
          <div className="modal-text">
            {selectedNews.fullText.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <button onClick={() => setSelectedNews(null)}>Close</button>
        </div>
      </div>
    )}
  </section>
);

}

export default NewsSection;