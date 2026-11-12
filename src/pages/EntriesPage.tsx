import { EntryForm } from '../components/EntryForm';
import { LearningEntryCard } from '../components/LearningEntryCard';
import { useEntriesStore } from '../store/useEntriesStore';
import type { LearningEntry } from '../types';

interface EntriesPageProps {
  loading: boolean;
  error: string;
  onAddEntry: (newEntry: Omit<LearningEntry, 'id'>) => Promise<void>;
}

export function EntriesPage({ loading, error, onAddEntry }: EntriesPageProps) {
  // Luetaan jaettu merkintälista suoraan Zustand-storesta
  const entries = useEntriesStore((state) => state.entries);

  return (
    <div>
      <h1>Oppimismerkinnät</h1>

      {/* Lomake uuden merkinnän tallentamiseen */}
      <EntryForm onAddEntry={onAddEntry} />

      <hr style={{ margin: '2rem 0' }} />

      {/* Lista Zustand-storeen ladatuista merkinnöistä */}
      <h2>Tallennetut merkinnät ({entries.length})</h2>
      {loading && <p>Ladataan merkintöjä...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && entries.length === 0 && <p>Ei vielä tallennettuja merkintöjä.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {entries.map((entry) => (
          <LearningEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}