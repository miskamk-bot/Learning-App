import { useState } from 'react';
import type { LearningEntry } from './types';
import { LearningEntryCard } from './components/LearningEntryCard';

function App() {
  const [entries, setEntries] = useState<LearningEntry[]>([
    {
      id: '1',
      topic: 'React-komponentit',
      date: '2026-11-01',
      learned: 'Opettelin tekemään komponentin ja jakamaan käyttöliittymän osiin.',
      confidence: 4,
      notes: 'Tuntuu jo melko sujuvalta.',
    },
    {
      id: '2',
      topic: 'TypeScript ja Propsit',
      date: '2026-11-03',
      learned: 'Lisäsin tyypit propseille ja loin selkeät rajapinnat.',
      confidence: 3,
      notes: 'Vaatii vielä hieman harjoittelua.',
    },
  ]);

  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [learned, setLearned] = useState('');
  const [confidence, setConfidence] = useState<number>(3);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!topic.trim() || !learned.trim() || !date.trim()) {
      setErrorMessage('Aihe, päivämäärä ja opittu asia ovat pakollisia kenttiä.');
      return;
    }

    if (confidence < 1 || confidence > 5) {
      setErrorMessage('Confidence-arvon tulee olla väliltä 1–5.');
      return;
    }

    const newEntry: LearningEntry = {
      id: Date.now().toString(),
      topic: topic.trim(),
      date,
      learned: learned.trim(),
      confidence: Number(confidence),
      notes: notes.trim(),
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);

    setTopic('');
    setDate('');
    setLearned('');
    setConfidence(3);
    setNotes('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Miska Koivuniemi</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>Lisää uusi merkintä</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
        <h2>Merkinnät</h2>
        {entries.map((entry) => (
          <LearningEntryCard key={entry.id} entry={entry} />
        ))}
      </main>
    </div>
  );
}

export default App;
