import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';
import type { LearningEntry } from './src/types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /api/entries: Hakee kaikki rivit MariaDB:stä
app.get('/api/entries', async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT id, topic, date, learned, confidence, notes FROM entries');

    const formattedRows: LearningEntry[] = rows.map((row: any) => ({
      id: String(row.id),
      topic: row.topic,
      date: row.date,
      learned: row.learned,
      confidence: Number(row.confidence),
      notes: row.notes || ''
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/entries: Tallentaa uuden merkinnän parametroidulla INSERT-lauseella
app.post('/api/entries', async (req: Request, res: Response) => {
  const { topic, date, learned, confidence, notes } = req.body;

  // Validaatio
  if (!topic || !date || !learned || topic.trim() === '' || learned.trim() === '') {
    return res.status(400).json({ error: 'Topic, date, and learned are required' });
  }

  const numericConfidence = Number(confidence);
  if (isNaN(numericConfidence) || numericConfidence < 1 || numericConfidence > 5) {
    return res.status(400).json({ error: 'Confidence must be between 1 and 5' });
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // Parametroitu kysely (? estää SQL-injektiot)
    const sql = 'INSERT INTO entries (topic, date, learned, confidence, notes) VALUES (?, ?, ?, ?, ?)';
    const result = await conn.query(sql, [
      topic.trim(),
      date,
      learned.trim(),
      numericConfidence,
      notes ? notes.trim() : ''
    ]);

    const newEntry: LearningEntry = {
      id: String(result.insertId),
      topic: topic.trim(),
      date,
      learned: learned.trim(),
      confidence: numericConfidence,
      notes: notes ? notes.trim() : ''
    };

    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ error: 'Failed to save entry to database' });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});