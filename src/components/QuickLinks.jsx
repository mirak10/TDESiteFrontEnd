import React, { useState } from 'react';
import './QuickLinks.css';
import {
  FaUserPlus,
  FaBookOpen,
  FaBriefcase,
  FaMapMarkerAlt
} from 'react-icons/fa';

function QuickLinks() {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showConstitutionModal, setShowConstitutionModal] = useState(false);

  return (
    <section className="quick-links" id="quicklinks">
      <h2>eServices</h2>
      <div className="links-grid">
        {/* Join Us */}
        <a
          href="https://forms.gle/your-google-form-link" // Replace with actual form
          target="_blank"
          rel="noopener noreferrer"
          className="link-card"
        >
          <FaUserPlus className="link-icon" />
          <p>Join Us</p>
        </a>

        {/* Constitution */}
        <a
          href="#"
          className="link-card"
          onClick={(e) => {
            e.preventDefault();
            setShowConstitutionModal(true);
          }}
        >
          <FaBookOpen className="link-icon" />
          <p>Constitution</p>
        </a>

        {/* Trade & Investment */}
        <a
          href="#"
          className="link-card"
          onClick={(e) => {
            e.preventDefault();
            setShowInvestmentModal(true);
          }}
        >
          <FaBriefcase className="link-icon" />
          <p>Trade & Investment</p>
        </a>

        {/* Visit Tanzania */}
        <a
          href="https://www.tanzaniatourism.go.tz/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card"
        >
          <FaMapMarkerAlt className="link-icon" />
          <p>Visit Tanzania</p>
        </a>
      </div>

      {/* Constitution Modal */}
      {showConstitutionModal && (
        <div className="investment-modal-overlay" onClick={() => setShowConstitutionModal(false)}>
          <div className="investment-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Our Union, Our Strength</h3>
            <p style={{ textAlign: 'justify' }}>
              The Constitution of the Tanzanian Diaspora is more than just a document—it is a shared promise among Tanzanians living abroad to uphold unity, dignity, and national pride. Though we may be spread across continents, we remain connected by the values that built our homeland. This Constitution gives every member of the diaspora a voice and a role in shaping a brighter future for our communities and for Tanzania.
            </p>
            <p style={{ textAlign: 'justify' }}>
              It lays the foundation for collective action, cultural preservation, and inclusive representation. Whether through professional networks, cultural events, or social support systems, the Constitution encourages us to work together, uplift one another, and serve as ambassadors of Tanzanian excellence. It reflects the strength found in diversity, and the hope born from solidarity.
            </p>
            <p style={{ textAlign: 'justify' }}>
              As proud members of this extended family, it is our duty to cherish and uphold this union. Let the Constitution be your guide, your inspiration, and your reminder that even far from home, you are still part of something powerful. Click below to read the full document and stay connected with our national journey.
            </p>

            <div className="modal-buttons">
              <button
                onClick={() => window.open('https://drive.google.com/file/d/your-file-id/view', '_blank')}
              >
                Download
              </button>
              <button onClick={() => setShowConstitutionModal(false)}>Close</button>
            </div>
            </div>
        </div>
      )}

      {/* Trade & Investment Modal */}
      {showInvestmentModal && (
        <div className="investment-modal-overlay" onClick={() => setShowInvestmentModal(false)}>
          <div className="investment-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Why Invest in Tanzania?</h3>
            <p>
              Tanzania places strong emphasis on trade as a powerful engine for sustainable development,
              poverty eradication, and structural economic transformation. With a stable political
              environment, strategic location within East and Southern Africa, and access to major ports,
              Tanzania is a gateway for regional and global trade.
            </p>
            <p>
              Investors benefit from a competitive package of fiscal and trade incentives, especially in
              priority sectors such as agriculture, tourism, manufacturing, mining, petroleum, and gas.
              For most sectors (excluding petroleum and gas), capital goods and equipment imports are
              zero-rated for duty, and VAT is deferred. In agriculture, research expenses are tax-deductible,
              and capital acquisitions can be fully expensed.
            </p>
            <p>
              Additionally, Tanzania has signed <a href="https://www.tra.go.tz/index.php/treaties-agreements" target="_blank" rel="noopener noreferrer">double taxation treaties</a> with countries including the UK, India,
              Kenya, Sweden, and Norway, making cross-border investment more efficient.
            </p>
            <p>
              Key investment sectors include: <strong>Agriculture & Agro-processing, Mining, Petroleum & Gas, Tourism, Manufacturing, Infrastructure, and Real Estate Development</strong>.
              For full investment guidelines and sector-specific information, you can visit the
              <a href="https://www.tic.go.tz/" target="_blank" rel="noopener noreferrer"> Tanzania Investment Centre (TIC)</a>.
            </p>
            <p>
              For diaspora support and trade inquiries in Egypt, feel free to reach out to the Tanzanian
              Diaspora in Egypt (TDE) team via their official email:
              <a href="mailto:diaspora@tde.org" target="_blank" rel="noopener noreferrer"> diaspora@tzinegypt.org </a>.
            </p>
            <button onClick={() => setShowInvestmentModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default QuickLinks;
