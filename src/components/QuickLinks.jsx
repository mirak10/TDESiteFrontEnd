import './QuickLinks.css';
import { FaUserPlus, FaBookOpen, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';

function QuickLinks() {
  return (
    <section className="quick-links" id="quicklinks">
      <h2>eServices</h2>
      <div className="links-grid">
        <a href="#" className="link-card">
          <FaUserPlus className="link-icon" />
          <p>Join Us</p>
        </a>
        <a href="#" className="link-card">
          <FaBookOpen className="link-icon" />
          <p>Constitution</p>
        </a>
        <a href="#" className="link-card">
          <FaLightbulb className="link-icon" />
          <p>Suggestions</p>
        </a>
        <a href="#" className="link-card">
          <FaQuestionCircle className="link-icon" />
          <p>Help Desk</p> {/* Placeholder – can update later */}
        </a>
      </div>
    </section>
  );
}

export default QuickLinks;
