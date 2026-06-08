import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGridStore } from '../store/useGridStore';
import { defaultTemplates } from '../data/templates';
import { Grid } from '../types';

export function NewGrid() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addGrid } = useGridStore();

  useEffect(() => {
    const templateId = searchParams.get('template');
    const type = searchParams.get('type') as '2x2' | 'weighted' || 'weighted';

    let newGrid: Grid;

    if (templateId) {
      const template = defaultTemplates.find(t => t.id === templateId);
      if (template) {
        newGrid = {
          ...template,
          id: uuidv4(),
          title: `${template.title} (Copy)`,
          isTemplate: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
      } else {
        newGrid = createBlankGrid(type);
      }
    } else {
      newGrid = createBlankGrid(type);
    }

    addGrid(newGrid);
    navigate(`/grid/${newGrid.id}`, { replace: true });
  }, [addGrid, navigate, searchParams]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse space-y-4 flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium tracking-wide">Initializing Grid...</p>
      </div>
    </div>
  );
}

function createBlankGrid(type: '2x2' | 'weighted'): Grid {
  return {
    id: uuidv4(),
    title: 'Untitled Grid',
    description: 'A new decision matrix.',
    type,
    ...(type === '2x2' ? { xAxisLabel: 'X Axis', yAxisLabel: 'Y Axis' } : {}),
    options: [],
    criteria: type === 'weighted' ? [] : undefined,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
