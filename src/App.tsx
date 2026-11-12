import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { LearningEntry } from './types';
import { useEntriesStore } from './store/useEntriesStore';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { EntriesPage } from './pages/EntriesPage';
import './App.css';

const API_URL = 'http://localhost:3001/api/entries';

export function App() {
  const entries = useEntriesStore((state) => state.entries);
  const setEntries = useEntriesStore((state) => state.setEntries);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hakee merkinnät tietokannasta (GET) ja lataa ne Zustand-storeen
  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Merkintöjen haku epäonnistui');
      }
      const data: LearningEntry[] = await response.json();
      setEntries(data);
    } catch (err: any) {
      setError(err.message || 'Virhe ladattaessa tietoja');
    } finally {
      setLoading(false);
    }
  }, [setEntries]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Tallentaa uuden merkinnän tietokantaan (POST) ja päivittää storen listan (GET)
  const handleAddEntry = async (newEntry: Omit<LearningEntry, 'id'>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Tallennus epäonnistui');
    }

    // Haetaan päivitetty lista tietokannasta Zustand-storeen
    await fetchEntries();
  };

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage entries={entries} />} />
          <Route
            path="/entries"
            element={
              <EntriesPage
                loading={loading}
                error={error}
                onAddEntry={handleAddEntry}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;