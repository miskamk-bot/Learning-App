import React from 'react';
import type { LearningEntry } from '../types';

interface LearningEntryProps {
  entry: LearningEntry;
}

export const LearningEntryCard: React.FC<LearningEntryProps> = ({ entry }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', margin: '10px 0' }}>
      <h3>{entry.topic}</h3>
      <p><strong>Päivämäärä:</strong> {entry.date}</p>
      <p><strong>Opittu asia:</strong> {entry.learned}</p>
      <p><strong>Osaamistaso (1-5):</strong> {entry.confidence}</p>
      <p><strong>Lisätiedot:</strong> {entry.notes}</p>
    </div>
  );
};