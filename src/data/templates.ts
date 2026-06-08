import { Grid } from '../types';

export const defaultTemplates: Grid[] = [
  {
    id: 'template-buy-lease',
    title: 'Buy vs Lease Equipment',
    description: 'Compare the long-term impact of purchasing versus leasing heavy machinery.',
    type: 'weighted',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isTemplate: true,
    options: [
      {
        id: 'opt-buy',
        name: 'Buy Outright',
        scores: { 'crit-1': 8, 'crit-2': 3, 'crit-3': 9, 'crit-4': 7 },
      },
      {
        id: 'opt-lease',
        name: 'Lease Agreement',
        scores: { 'crit-1': 4, 'crit-2': 9, 'crit-3': 2, 'crit-4': 4 },
      },
    ],
    criteria: [
      { id: 'crit-1', name: 'Total Cost Over Time', weight: 9 },
      { id: 'crit-2', name: 'Upfront Cash Required', weight: 8 },
      { id: 'crit-3', name: 'Ownership value at end', weight: 6 },
      { id: 'crit-4', name: 'Maintenance Responsibility', weight: 7 },
    ],
  },
  {
    id: 'template-effort-impact',
    title: 'Effort vs Impact',
    description: 'A 2x2 matrix to prioritize projects or operational changes based on effort required vs potential impact.',
    type: '2x2',
    xAxisLabel: 'Effort (Low to High)',
    yAxisLabel: 'Impact (Low to High)',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isTemplate: true,
    options: [
      { id: 'opt-1', name: 'Automate feeding', xScore: 8, yScore: 9 },
      { id: 'opt-2', name: 'Repair old barn door', xScore: 2, yScore: 3 },
      { id: 'opt-3', name: 'Switch software provider', xScore: 7, yScore: 6 },
    ],
    criteria: [],
  },
  {
    id: 'template-repair-replace',
    title: 'Repair vs Replace',
    description: 'Evaluate whether to fix aging infrastructure or invest in a new replacement.',
    type: 'weighted',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isTemplate: true,
    options: [
      {
        id: 'opt-repair',
        name: 'Repair Current Option',
        scores: { 'crit-1': 8, 'crit-2': 4, 'crit-3': 3 },
      },
      {
        id: 'opt-replace',
        name: 'Buy New Replacement',
        scores: { 'crit-1': 2, 'crit-2': 9, 'crit-3': 8 },
      },
    ],
    criteria: [
      { id: 'crit-1', name: 'Short-term Cost', weight: 8 },
      { id: 'crit-2', name: 'Long-term Reliability', weight: 9 },
      { id: 'crit-3', name: 'Efficiency Gains', weight: 7 },
    ],
  }
];
