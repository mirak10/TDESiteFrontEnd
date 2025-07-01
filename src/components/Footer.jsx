import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      {/* Column 1: Contact */}
      <div className="footer-column">
        <h3>Contact Us</h3>
        <p>
          10 Anas Ibn Malek, Mit Akaba, Agouza, Giza Governorate 3752211,<br />
          Cairo, Egypt
        </p>
        <p>+20 11 5242 1264</p>
        <p><a href="mailto:diaspora@tzinegypt.org">diaspora@tzinegypt.org</a></p>

        <div className="socials">
          <a
            href="https://www.facebook.com/profile.php?id=61565984987377"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Column 2: Links */}
      <div className="footer-column">
        <h3>Related Links</h3>
        <ul>
          <li>
            <a href="https://tsue.org" target="_blank" rel="noopener noreferrer">
              TSUE
            </a>
          </li>
          <li>
            <a href="https://superwoman.tz" target="_blank" rel="noopener noreferrer">
              Super Woman
            </a>
          </li>
          <li>
            <a href="https://victoria.tz" target="_blank" rel="noopener noreferrer">
              Victoria Culture Group
            </a>
          </li>
          <li>
            <a href="https://tzembassy.go.tz" target="_blank" rel="noopener noreferrer">
              Tanzania Embassy
            </a>
          </li>
          <li>
          <Link to="/admin/login">Admin</Link>          </li>
        </ul>
      </div>

      {/* Column 3: Logo */}
      <div className="footer-column logo-column">
        <img src="https://res.cloudinary.com/dlxoa0rcl/image/upload/v1751323173/logo_ppleby.jpg" alt="Site Logo" className="footer-logo" />
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Tanzanian Diaspora in Egypt. All rights reserved.
        <p>Developed by Karim Kilimoh</p>
      </div>
    </footer>
  );
}

export default Footer;
