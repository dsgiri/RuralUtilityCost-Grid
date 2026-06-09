import { FC } from 'react';

export interface ToolMetadata {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  whenToUse: string;
  whenNotToUse: string;
  keywords: string[];
}

export const decisionTools: ToolMetadata[] = [
  {
    id: 'xy-matrix',
    name: 'XY Decision Matrix',
    shortName: 'XY Matrix',
    icon: '⊞',
    description: 'Plot decisions on two axes to quickly visualize tradeoffs like Risk vs Return or Capital vs Lifespan.',
    whenToUse: 'When choosing between multiple distinct options with two clear competitive factors.',
    whenNotToUse: 'When you have more than two main criteria affecting the choice.',
    keywords: ['quadrant', 'matrix', 'comparison', 'tradeoffs']
  },
  {
    id: 'if-then',
    name: 'If-Then Logic Map',
    shortName: 'If-Then',
    icon: '⑂',
    description: 'Map a single guiding priority to a recommended action to cut through noise and establish rules.',
    whenToUse: 'When you know your top priority but keep getting distracted by minor details.',
    whenNotToUse: 'When the decision requires a complex financial breakdown.',
    keywords: ['logic', 'rules', 'mapping', 'priority']
  },
  {
    id: 'weighted-score',
    name: 'Weighted Scoring Matrix',
    shortName: 'Weighted',
    icon: '☰',
    description: 'Compare multiple options against weighted criteria to find the mathematical front-runner.',
    whenToUse: 'When multiple factors matter but some matter twice as much as others.',
    whenNotToUse: 'When you are evaluating purely qualitative or emotional choices.',
    keywords: ['score', 'weighted', 'calculate', 'compare']
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree Triager',
    shortName: 'Triage Tree',
    icon: '⭣',
    description: 'Guide step-by-step troubleshooting or triage branching out to clear final action states.',
    whenToUse: 'When developing standard operating procedures for recurring issues.',
    whenNotToUse: 'When every problem is entirely unique and unpredictable.',
    keywords: ['troubleshoot', 'triage', 'path', 'tree']
  },
  {
    id: 'priority-matrix',
    name: 'Priority Matrix (Eisenhower)',
    shortName: 'Urgent/Important',
    icon: '✓',
    description: 'Sort tasks by Urgent vs Important to determine what to do, schedule, delegate, or drop.',
    whenToUse: 'When the task list is overwhelming and everything feels like an emergency.',
    whenNotToUse: 'For planning the sequence of a single complex project.',
    keywords: ['eisenhower', 'urgent', 'important', 'tasks']
  },
  {
    id: 'cost-benefit',
    name: 'Cost-Benefit Balance Scale',
    shortName: 'Cost/Benefit',
    icon: '⚖',
    description: 'Weigh benefits against costs and risks visually to see which side tips the scale.',
    whenToUse: 'When weighing a major Go/No-Go decision.',
    whenNotToUse: 'When comparing 5 different competitive quotes against each other.',
    keywords: ['scale', 'balance', 'pros', 'cons']
  },
  {
    id: 'swot',
    name: 'SWOT Analysis Grid',
    shortName: 'SWOT',
    icon: '◰',
    description: 'A strategic framing of Strengths, Weaknesses, Opportunities, and Threats.',
    whenToUse: 'When planning a new business venture or major operational pivot.',
    whenNotToUse: 'For day-to-day tactical task sorting.',
    keywords: ['strengths', 'weaknesses', 'strategy', 'planning']
  },
  {
    id: 'radar',
    name: 'Radar Chart Profiling',
    shortName: 'Radar Profile',
    icon: '⎈',
    description: 'Compare options visually across several attributes simultaneously.',
    whenToUse: 'When comparing livestock breeds, seed varieties, or feed performance across balanced traits.',
    whenNotToUse: 'When you only care about a single metric (like lowest price).',
    keywords: ['radar', 'spider', 'profile', 'compare']
  },
  {
    id: 'impact-effort',
    name: 'Impact vs Effort Matrix',
    shortName: 'Impact/Effort',
    icon: '↗',
    description: 'Prioritize projects based on payoff versus the work required.',
    whenToUse: 'When choosing which farm improvement projects to tackle this season.',
    whenNotToUse: 'When tasks are mandatory compliance regardless of effort.',
    keywords: ['impact', 'effort', 'projects', 'payoff']
  },
  {
    id: 'moscow',
    name: 'MoSCoW Prioritization',
    shortName: 'MoSCoW',
    icon: '☷',
    description: 'Separate Must-haves from Nice-to-haves (Must, Should, Could, Wont).',
    whenToUse: 'When determining requirements for a new building, equipment buy, or contract.',
    whenNotToUse: 'When deciding between two identical commodities.',
    keywords: ['requirements', 'must-have', 'scope', 'features']
  },
  {
    id: 'rice',
    name: 'RICE Scoring Model',
    shortName: 'RICE Score',
    icon: '★',
    description: 'Rank larger ideas by Reach, Impact, Confidence, and Effort.',
    whenToUse: 'When evaluating new revenue streams like a farm stand vs wholesale contracts.',
    whenNotToUse: 'For troubleshooting immediate mechanical breakdowns.',
    keywords: ['reach', 'impact', 'ideas', 'ranking']
  },
  {
    id: 'force-field',
    name: 'Force Field Analysis',
    shortName: 'Force Field',
    icon: '⇋',
    description: 'Evaluate change momentum (driving forces) versus resistance (restraining forces).',
    whenToUse: 'When implementing a major change that affects routine, family, or employees.',
    whenNotToUse: 'When evaluating technical specifications of a tractor.',
    keywords: ['change', 'resistance', 'driving', 'restraining']
  },
  {
    id: 'five-whys',
    name: 'Five Whys Root Cause',
    shortName: 'Five Whys',
    icon: '⤋',
    description: 'Find the root cause behind a recurring failure by drilling down through "Why?".',
    whenToUse: 'When equipment breaks the same way repeatedly or a process keeps failing.',
    whenNotToUse: 'When the cause is an obvious "Act of God" like a hailstorm.',
    keywords: ['root cause', 'failure', 'why', 'drill-down']
  },
  {
    id: 'smart-goals',
    name: 'SMART Goals Builder',
    shortName: 'SMART Goal',
    icon: '🎯',
    description: 'Turn vague intentions into actionable plans (Specific, Measurable, Achievable, Relevant, Time-bound).',
    whenToUse: 'When setting quarterly or annual operational goals for the farm.',
    whenNotToUse: 'For writing down a quick grocery list.',
    keywords: ['goals', 'specific', 'measurable', 'planning']
  },
  {
    id: 'pestle',
    name: 'PESTLE Analysis',
    shortName: 'PESTLE',
    icon: '🌐',
    description: 'Assess macro external conditions (Political, Economic, Social, Technological, Legal, Environmental).',
    whenToUse: 'When mapping out the feasibility of expanding into a highly regulated market.',
    whenNotToUse: 'When choosing where to sink a fence post.',
    keywords: ['macro', 'external', 'factors', 'environment']
  },
  {
    id: 'raci',
    name: 'RACI Accountability',
    shortName: 'RACI Matrix',
    icon: '👥',
    description: 'Clarify roles (Responsible, Accountable, Consulted, Informed) for complex operations.',
    whenToUse: 'When multiple people are involved in an operation and communication keeps dropping.',
    whenNotToUse: 'When you are a solo operator doing everything.',
    keywords: ['roles', 'accountability', 'communication', 'team']
  },
  {
    id: 'allocation-ring',
    name: 'Resource Allocation Ring',
    shortName: 'Allocation',
    icon: '◎',
    description: 'Divide a finite resource proportionally and visually.',
    whenToUse: 'When splitting a budget, allocating acreage, or dividing labor hours.',
    whenNotToUse: 'When resources are uncapped or irrelevant.',
    keywords: ['budget', 'split', 'proportional', 'pie chart']
  },
  {
    id: 'timeline',
    name: 'Project Timeline Visualizer',
    shortName: 'Timeline',
    icon: '⧖',
    description: 'Show milestone sequence over time for a seasonal push or build project.',
    whenToUse: 'When coordinating planting season, calving, or a barn construction schedule.',
    whenNotToUse: 'When deciding what to do today.',
    keywords: ['schedule', 'milestones', 'time', 'sequence']
  }
];
