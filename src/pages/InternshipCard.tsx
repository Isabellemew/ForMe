import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Internship } from '../types';

const sampleInternships: Internship[] = [
  {
    id: 'cern-quantum',
    organization: 'CERN Quantum Lab',
    title: 'Summer Research Internship in Quantum Computing',
    location: 'Geneva, Switzerland',
    acceptanceRate: 6,
    type: 'Research / Physics',
    deadline: '2026-10-01',
    description: 'Участвуйте в разработке квантовых алгоритмов для обработки данных экспериментов в CERN.',
    tags: ['Quantum', 'Physics', 'AI'],
    mentor: 'Dr. Elsie Mora',
    reward: 'Стипендия + проживание',
    remote: false,
    applyLink: 'https://careers.cern.ch/en/apply',
  },
  {
    id: 'deep-startup-ai',
    organization: 'Deep Venture Lab',
    title: 'AI Product Research Internship',
    location: 'Berlin, Germany',
    acceptanceRate: 12,
    type: 'Startup / AI',
    deadline: '2026-09-12',
    description: 'Разработка MVP и исследований связанных с генеративным ИИ для продуктов глубокой аналитики.',
    tags: ['AI', 'Startup', 'Data Science'],
    mentor: 'Natalia Köhler',
    reward: 'Гонорар + опционы',
    remote: true,
    applyLink: 'https://deepventurelab.example.com/apply',
  },
];

function InternshipCard() {
  const { id } = useParams();
  const [internship, setInternship] = useState<Internship | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/internships');
        const json = await response.json();
        const found = json?.internships?.find((item: Internship) => item.id === id);
        if (found) {
          setInternship(found);
          return;
        }
      } catch {
        const fallback = sampleInternships.find((item) => item.id === id) ?? null;
        setInternship(fallback);
      }
    }
    load();
  }, [id]);

  if (!internship) {
    return (
      <div className="card">
        <p>Стажировка не найдена.</p>
        <Link to="/" className="button secondary">
          Вернуться к списку
        </Link>
      </div>
    );
  }

  return (
    <article className="card">
      <div className="section-title">
        <div>
          <h2>{internship.title}</h2>
          <p>{internship.organization}</p>
        </div>
        <Link to="/" className="button secondary">
          Назад
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <span className="badge">{internship.type}</span>
          <span className="badge">{internship.location}</span>
          <span className="badge">{internship.remote ? 'Remote' : 'On-site'}</span>
          <span className="badge">Acceptance {internship.acceptanceRate}%</span>
        </div>

        <div>
          <strong>Описание</strong>
          <p>{internship.description}</p>
        </div>

        <div>
          <strong>Ментор</strong>
          <p>{internship.mentor}</p>
        </div>

        <div>
          <strong>Вознаграждение</strong>
          <p>{internship.reward}</p>
        </div>

        <div>
          <strong>Ключевые навыки</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {internship.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {internship.applyLink ? (
          <a
            href={internship.applyLink}
            target="_blank"
            rel="noreferrer"
            className="button"
            style={{ justifySelf: 'start' }}
          >
            Подать заявку
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default InternshipCard;
