import { Link } from 'react-router-dom';
import type { LearningEntry } from '../types';

interface HomePageProps {
  entries: LearningEntry[];
}

export function HomePage({ entries }: HomePageProps) {
  return (
    <div>
      <h1>Learning App – Oppimispäiväkirja</h1>
      <p>
        Tervetuloa seuraamaan oppimistasi! Tämän sovelluksen avulla voit kirjata ylös uusia aiheita,
        arvioida omaa osaamistasoasi (1–5) ja selata aiempia merkintöjäsi.
      </p>

      <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Tilastot</h3>
        <p>Tallennettuja oppimismerkintöjä tietokannassa: <strong>{entries.length} kpl</strong></p>
      </div>

      <Link
        to="/entries"
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.2rem',
          backgroundColor: '#2563eb',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
        }}
      >
        Siirry merkintöihin ja lisää uusi &rarr;
      </Link>
    </div>
  );
}