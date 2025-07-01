import { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamSection.css';

function TeamSection() {
  const [chairman, setChairman] = useState(null);
  const [otherMembers, setOtherMembers] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get('/api/team');
      const members = res.data;

      const chairmanMember = members.find((m) =>
        m.position.toLowerCase() === 'chairman'
      );
      const rest = members.filter(
        (m) => m.position.toLowerCase() !== 'chairman'
      );

      setChairman(chairmanMember);
      setOtherMembers(rest);
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  return (
    <section className="team-section" id="team">
      <h2>Our Team</h2>

      {/* Chairman Row */}
      {chairman && (
        <div className="team-row center">
          <div className="team-card">
            <img src={chairman.imageUrl} alt={chairman.name} />
            <h3>{chairman.name}</h3>
            <p>{chairman.position}</p>
          </div>
        </div>
      )}

      {/* Other Members Row */}
      <div className="team-row">
        {otherMembers.map((member) => (
          <div className="team-card" key={member._id}>
            <img src={member.imageUrl} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
