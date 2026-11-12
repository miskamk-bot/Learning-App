import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
      <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
        Home
      </Link>
      <Link to="/entries" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
        Entries
      </Link>
    </nav>
  );
}