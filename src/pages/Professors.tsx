import { useEffect, useState } from 'react';
import { Professor } from '../types';
import { fetchProfessorsFromFirebase } from '../services/firebaseService';

const sampleProfessors: Professor[] = [
  {
    id: 'prof-karenova',
    name: 'Проф. Екатерина Каренова',
    title: 'Профессор физики частиц',
    department: 'CERN',
    researchAreas: ['Анализ данных', 'Физика частиц', 'Квантовые вычисления'],
    availability: 'Открыта к сотрудничеству',
    bio: 'Ведущий исследователь CERN, заинтересована в перспективных студентах для исследований в области данных и физических моделей.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prof-stone',
    name: 'Проф. Алексей Стон',
    title: 'Доцент компьютерных наук',
    department: 'Стартап-лаборатория AI',
    researchAreas: ['Генеративный ИИ', 'Нейронные сети', 'Оптимизация'],
    availability: 'Готов принять студентов весной',
    bio: 'Опыт в создании стартапов на пересечении ИИ и продуктовой аналитики.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
];

function Professors() {
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProfessorsFromFirebase();
        if (data.length) {
          setProfessors(data);
          return;
        }
      } catch (error) {
        console.warn('Firebase fetch failed for professors, using sample data.', error);
      }
      setProfessors(sampleProfessors);
    }
    load();
  }, []);

  return (
    <div className="grid" style={{ gap: '24px' }}>
      <div className="card">
        <div className="section-title">
          <div>
            <h2>Профессора и научные руководители</h2>
            <p>Секция преподавателей, готовых вести исследовательские проекты со студентами.</p>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {professors.map((prof) => (
          <article key={prof.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <strong>{prof.name}</strong>
                <div style={{ color: '#475569', marginTop: '6px' }}>{prof.title}</div>
                <div style={{ marginTop: '10px', color: '#334155' }}>{prof.bio}</div>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div className="badge">{prof.department}</div>
              <div style={{ marginTop: '10px' }}>
                <strong>Направления:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {prof.researchAreas.map((area) => (
                    <span key={area} className="badge">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ marginTop: '14px', fontSize: '0.95rem', color: '#475569' }}>{prof.availability}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Professors;
