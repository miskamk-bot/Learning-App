import { useState, useEffect } from 'react';
import type { LearningEntry } from './types';
import { LearningEntryCard } from './components/LearningEntryCard';

const API_URL = 'http://localhost:3001/api/entries';

function App() {
  const [entries, setEntries] = useState<LearningEntry[]>([]);
  const [fetchError, setFetchError] = useState('');

  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [learned, setLearned] = useState('');
  const [confidence, setConfidence] = useState<number>(3);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const fetchEntries = async () => {
    setFetchError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Palvelinvirhe: ${response.status}`);
      }
      const data: LearningEntry[] = await response.json();
      setEntries(data);
    } catch (err: any) {
      setFetchError(err.message || 'Tietojen haku epäonnistui.');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!topic.trim() || !learned.trim() || !date.trim()) {
      setFormError('Aihe, päivämäärä ja opittu asia ovat pakollisia kenttiä.');
      return;
    }

    if (confidence < 1 || confidence > 5) {
      setFormError('Confidence-arvon tulee olla väliltä 1–5.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          date,
          learned: learned.trim(),
          confidence: Number(confidence),
          notes: notes.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Virhe tallennuksessa: ${response.status}`);
      }

      const createdEntry: LearningEntry = await response.json();
      setEntries((prevEntries) => [...prevEntries, createdEntry]);

      setTopic('');
      setDate('');
      setLearned('');
      setConfidence(3);
      setNotes('');
    } catch (err: any) {
      setFormError(err.message || 'Virhe tallennettaessa tietoja.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Miska Koivuniemi</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>Lisää uusi merkintä</h2>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <label>Topic: </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Aihe"
            />
          </div>

          <div>
            <label>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label>Learned: </label>
            <input
              type="text"
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              placeholder="Mitä opit?"
            />
          </div>

          <div>
            <label>Confidence (1–5): </label>
            <input
              type="number"
              min="1"
              max="5"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Notes: </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Lisätiedot"
            />
          </div>

          <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
            Lisää merkintä
          </button>
        </form>
      </section>

      <main>
        <h2>Merkinnät tietokannasta</h2>
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
        {entries.length === 0 && !fetchError ? (
          <p>Ei merkintöjä tietokannassa.</p>
        ) : (
          entries.map((entry) => (
            <LearningEntryCard key={entry.id} entry={entry} />
          ))
        )}
      </main>
    </div>
  );
}

export default App;