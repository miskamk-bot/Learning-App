import { useState, type FormEvent } from 'react';
import type { LearningEntry } from '../types';

interface EntryFormProps {
  onAddEntry: (newEntry: Omit<LearningEntry, 'id'>) => Promise<void>;
}

export function EntryForm({ onAddEntry }: EntryFormProps) {
  // Paikallinen tila (local state): lomakkeen syötekenttiä tarvitaan vain tässä lomakekomponentissa
  // ennen kuin käyttäjä lähettää lomakkeen backendille, joten niitä ei tarvitse jakaa koko sovellukselle.
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [learned, setLearned] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!topic.trim() || !learned.trim() || !date) {
      setError('Täytä aihe, päivämäärä ja opittu asia.');
      return;
    }

    try {
      setSubmitting(true);
      await onAddEntry({
        topic: topic.trim(),
        date,
        learned: learned.trim(),
        confidence: Number(confidence),
        notes: notes.trim(),
      });

      // Tyhjennetään lomake onnistuneen tallennuksen jälkeen
      setTopic('');
      setLearned('');
      setConfidence(3);
      setNotes('');
    } catch (err: any) {
      setError(err.message || 'Tallennus epäonnistui.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '500px', marginBottom: '2rem' }}>
      <h2>Lisää uusi oppimismerkintä</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Aihe (Topic):
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '0.4rem' }}
        />
      </label>

      <label>
        Päivämäärä (Date):
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '0.4rem' }}
        />
      </label>

      <label>
        Mitä opin (Learned):
        <textarea
          value={learned}
          onChange={(e) => setLearned(e.target.value)}
          required
          rows={3}
          style={{ display: 'block', width: '100%', padding: '0.4rem' }}
        />
      </label>

      <label>
        Varmuustaso (1–5):
        <input
          type="number"
          min={1}
          max={5}
          step={1}
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          required
          style={{ display: 'block', width: '100%', padding: '0.4rem' }}
        />
      </label>

      <label>
        Muistiinpanot (valinnainen):
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '0.4rem' }}
        />
      </label>

      <button type="submit" disabled={submitting} style={{ padding: '0.6rem', cursor: 'pointer' }}>
        {submitting ? 'Tallennetaan...' : 'Tallenna merkintä'}
      </button>
    </form>
  );
}