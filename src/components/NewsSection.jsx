import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsSection.css';

function NewsSection() {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    fetchNews();
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get('/api/news');
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

  return (
    <section className="news" id="news">
      <h2 className="news-title">News & Updates</h2>

      <div className="news-wrapper">
        {currentIndex > 0 && (
          <button className="news-arrow left" onClick={prevSlide}>◀</button>
        )}

        <div className="news-slider">
          {visibleNews.map(news => (
            <div key={news._id} className="news-card" onClick={() => setSelectedNews(news)}>
              <img src={news.imageUrls?.[0] || '/default-news.jpg'} alt={news.title} className="news-image" />
              <h3>{news.title}</h3>
              <p>{news.description}</p>
            </div>
          ))}
        </div>

        {currentIndex + cardsPerView < newsData.length && (
          <button className="news-arrow right" onClick={nextSlide}>▶</button>
        )}
      </div>

      {selectedNews && (
        <div className="news-modal-overlay" onClick={() => setSelectedNews(null)}>
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedNews.imageUrls?.[0] || '/default-news.jpg'}
              alt={selectedNews.title}
              className="modal-image"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <h3>{selectedNews.title}</h3>
            <p><strong>{selectedNews.time}</strong> — by {selectedNews.author}</p>
            <div className="modal-text">
              {selectedNews.fullText}
            </div>
            <button onClick={() => setSelectedNews(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default NewsSection;
