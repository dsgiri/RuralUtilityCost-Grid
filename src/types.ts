export type GridType = '2x2' | 'weighted' | 'pugh';

export interface GridOption {
  id: string;
  name: string;
  description?: string;
  xScore?: number; // 1-10
  yScore?: number; // 1-10
  scores?: Record<string, number>; // criteriaId -> score
}

export interface GridCriteria {
  id: string;
  name: string;
  weight: number; // 1-10
}

export interface Grid {
  id: string;
  title: string;
  description: string;
  type: GridType;
  xAxisLabel?: string;
  yAxisLabel?: string;
  options: GridOption[];
  criteria: GridCriteria[];
  createdAt: number;
  updatedAt: number;
  isTemplate?: boolean;
}
