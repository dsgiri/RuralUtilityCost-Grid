import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Grid } from '../types';
import { defaultTemplates } from '../data/templates';

interface GridState {
  grids: Grid[];
  favorites: string[];
  addGrid: (grid: Grid) => void;
  updateGrid: (id: string, updates: Partial<Grid>) => void;
  deleteGrid: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useGridStore = create<GridState>()(
  persist(
    (set) => ({
      grids: [...defaultTemplates],
      favorites: [],
      addGrid: (grid) =>
        set((state) => ({ grids: [...state.grids, grid] })),
      updateGrid: (id, updates) =>
        set((state) => ({
          grids: state.grids.map((g) => (g.id === id ? { ...g, ...updates, updatedAt: Date.now() } : g)),
        })),
      deleteGrid: (id) =>
        set((state) => ({ grids: state.grids.filter((g) => g.id !== id) })),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'grid-storage',
      version: 1,
    }
  )
);
