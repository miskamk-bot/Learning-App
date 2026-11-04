import express, { Request, Response } from 'express';
import cors from 'cors';
import type { LearningEntry } from './src/types';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Kolme esimerkkimerkintää vaaditulla lisäkentällä (notes)
const exampleEntries: LearningEntry[] = [
  {
    id: '1',
    topic: 'React Basics',
    date: '2026-11-01',
    learned: 'Komponentit ja JSX perusteet',
    confidence: 4,
    notes: 'Hyvin hallussa'
  },
  {
    id: '2',
    topic: 'State and Forms',
    date: '2026-11-02',
    learned: 'useState ja kontrolloidut lomakkeet',
    confidence: 3,
    notes: 'Kertausta tarvitaan vielä'
  },
  {
    id: '3',
    topic: 'Express Backend',
    date: '2026-11-04',
    learned: 'GET-reittien rakentaminen Expressillä',
    confidence: 4,
    notes: 'Palvelin toimii odotetusti'
  }
];

// GET /api/entries
app.get('/api/entries', (_req: Request, res: Response) => {
  res.json(exampleEntries);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});