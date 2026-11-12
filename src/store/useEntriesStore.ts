import { create } from 'zustand';
import type { LearningEntry } from '../types';

interface EntriesState {
  entries: LearningEntry[];
  setEntries: (entries: LearningEntry[]) => void;
}

export const useEntriesStore = create<EntriesState>((set) => ({
  entries: [],
  setEntries: (entries) => set({ entries }),
}));