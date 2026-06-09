import { Link } from 'react-router-dom';
import { Internship } from '../types';

interface Props {
  internships: Internship[];
}

function InternshipList({ internships }: Props) {
  if (!internships.length) {
    return <div className="card">Ничего не найдено. Попробуйте другой запрос.</div>;
  }

  return (
    <div className="grid" style={{ gap: '18px' }}>
      {internships.map((internship) => (
        <article key={internship.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <strong>{internship.title}</strong>
              <div style={{ color: '#475569', margin: '10px 0' }}>{internship.organization}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
                <span className="interest-chip">{internship.type}</span>
                <span className="interest-chip">{internship.location}</span>
                <span className="interest-chip">{internship.remote ? 'Remote' : 'On-site'}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', minWidth: '120px' }}>
              <div style={{ fontSize: '0.95rem', color: '#475569' }}>Крайний срок</div>
              <div>{internship.deadline}</div>
            </div>
          </div>
          <p style={{ marginTop: '18px', color: '#334155' }}>{internship.description}</p>
          <div style={{ marginTop: '18px' }}>
            <strong>Acceptance rate</strong>
            <div className="progress-line">
              <div className="progress-bar" style={{ width: `${internship.acceptanceRate}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', color: '#475569', fontSize: '0.95rem' }}>
              <span>{internship.acceptanceRate}% шанс</span>
              <span>{internship.mentor}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '22px', flexWrap: 'wrap' }}>
            <Link to={`/internship/${internship.id}`} className="button">
              Подробнее
            </Link>
            {internship.applyLink ? (
              <a href={internship.applyLink} target="_blank" rel="noreferrer" className="button secondary" style={{ color: '#1f2937' }}>
                Подать заявку
              </a>
            ) : null}
            <span className="badge">{internship.reward}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export default InternshipList;
