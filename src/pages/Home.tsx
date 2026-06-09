import { useEffect, useMemo, useState } from 'react';
import { Internship } from '../types';
import InternshipList from '../components/InternshipList';
import AIChat from '../components/AIChat';

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

function Home() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [filterRemote, setFilterRemote] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/internships');
        const json = await response.json();
        if (json?.internships?.length) {
          setInternships(json.internships);
          return;
        }
      } catch (error) {
        console.warn('API fetch failed, using sample data.', error);
      }
      setInternships(sampleInternships);
    }

    load();
  }, []);

  const filtered = useMemo(
    () =>
      internships.filter((item) => {
        const normalized = `${item.title} ${item.organization} ${item.tags.join(' ')}`.toLowerCase();
        const matchesSearch = normalized.includes(search.toLowerCase());
        const matchesRemote = filterRemote ? item.remote : true;
        return matchesSearch && matchesRemote;
      }),
    [internships, search, filterRemote]
  );

  return (
    <div className="grid" style={{ gap: '28px' }}>
      <section className="card">
        <div className="section-title">
          <div>
            <h2>Найди стажировку с помощью ИИ</h2>
            <p>Комплексный поиск по лабораториям, стартапам и research-программам. Прямо сейчас на Google Gemini.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
          <input
            type="text"
            placeholder="Поиск по организации, теме или ключевому слову"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={filterRemote}
              onChange={(event) => setFilterRemote(event.target.checked)}
            />
            Только удалённые стажировки
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="card" style={{ padding: '18px' }}>
              <strong>Google Gemini</strong>
              <p>Оценка резюме и подсказки по улучшению профиля.</p>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <strong>Ежедневные подборки</strong>
              <p>Новые стажировки из CERN, MIT, LAM и AI стартапов.</p>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <strong>Acceptance Rate</strong>
              <p>Показываем реальный шанс попадания в программу.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <InternshipList internships={filtered} />
        </div>
        <div className="card">
          <h3>Оценка шансов</h3>
          <p>Загрузите CV и поговорите с ИИ-чатом, который опирается на Google Gemini.</p>
          <AIChat />
        </div>
      </section>
    </div>
  );
}

export default Home;
