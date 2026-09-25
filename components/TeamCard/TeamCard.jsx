import SpotlightCard from '../SpotlightCard/SpotlightCard';
import './TeamCard.css';

export default function TeamCard({ name, role, initials, photo, index }) {
  const num = String((index || 0) + 1).padStart(2, '0');

  return (
    <SpotlightCard className="team-card-spotlight" style={{ transitionDelay: `${(index || 0) * 0.1}s`, display: 'block' }}>
      <div className="team-card">
        <div className="team-card-image">
        {photo ? (
          <img src={photo} alt={name} loading="lazy" />
        ) : (
          <div className="team-card-avatar">
            <span>{initials}</span>
          </div>
        )}
        <div className="team-card-star">✦</div>
        <div className="team-card-overlay">
          <span className="team-card-overlay-role">{role}</span>
        </div>
      </div>
      <div className="team-card-info">
        <h4 className="team-card-name">{name}</h4>
        <p className="team-card-role">{role}</p>
      </div>
      <div className="team-card-accent-bar" />
      </div>
    </SpotlightCard>
  );
}
