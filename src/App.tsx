import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import InternshipCard from './pages/InternshipCard';
import Professors from './pages/Professors';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <h1>ForMe</h1>
          <p>Выбирайте лучшие стажировки и исследовательские проекты с поддержкой Google Gemini.</p>
        </div>
        <nav>
          <Link to="/">Стажировки</Link>
          <Link to="/professors">Профессора</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Найди свою стажировку в CERN, стартапе или исследовательской лаборатории.</h2>
          <p>
            Автоматически собираем топовые программы, ранжируем по acceptance rate и
            помогаем оценить шансы с помощью ИИ на базе Google Gemini.
          </p>
          <div className="hero-actions">
            <Link to="/" className="button">Начать поиск</Link>
            <Link to="/professors" className="button secondary">Профессора</Link>
          </div>
          <div className="hero-badge">Поддержка: Google Gemini</div>
        </div>
      </section>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internship/:id" element={<InternshipCard />} />
          <Route path="/professors" element={<Professors />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
