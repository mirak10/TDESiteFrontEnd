import React, { useState, useEffect } from 'react';
import './NavBar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className={`navbar-left${scrolled ? ' hide-on-scroll' : ''}`}>
        <img src="https://res.cloudinary.com/dlxoa0rcl/image/upload/v1751323174/tz-flag_pfplqc.png" alt="Tanzania Flag" className="flag" />
        <img src="https://res.cloudinary.com/dlxoa0rcl/image/upload/v1751323172/eg-flag_nnogxb.png" alt="Egypt Flag" className="flag" />

      </div>

      <div className="navbar-center">
        <h1 className="site-title">Tanzanian Diaspora in Egypt</h1>

        <button className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#quicklinks" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#news" onClick={() => setMenuOpen(false)}>News</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>Our Team</a>
        </div>
      </div>

      <div className={`navbar-right${scrolled ? ' hide-on-scroll' : ''}`}>
        <a href="#">
            <img src="https://res.cloudinary.com/dlxoa0rcl/image/upload/v1751323173/logo_ppleby.jpg" alt="Site Logo" className="logo" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;