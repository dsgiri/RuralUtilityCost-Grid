import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGridStore } from '../store/useGridStore';
import { Grid, GridOption, GridCriteria } from '../types';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Disclaimer } from './Disclaimer';

export function WeightedGridView({ grid }: { grid: Grid }) {
  const { updateGrid } = useGridStore();
  
  const [editingCriteria, setEditingCriteria] = useState<string | null>(null);
  const [editingOption, setEditingOption] = useState<string | null>(null);

  const criteria = grid.criteria || [];
  
  const addCriteria = () => {
    const newCriteria: GridCriteria = {
      id: uuidv4(),
      name: `Criteria ${criteria.length + 1}`,
      weight: 5,
    };
    updateGrid(grid.id, { criteria: [...criteria, newCriteria] });
    setEditingCriteria(newCriteria.id);
  };

  const updateCriteria = (id: string, updates: Partial<GridCriteria>) => {
    updateGrid(grid.id, {
      criteria: criteria.map(c => c.id === id ? { ...c, ...updates } : c)
    });
  };

  const deleteCriteria = (id: string) => {
    updateGrid(grid.id, {
      criteria: criteria.filter(c => c.id !== id)
    });
  };

  const addOption = () => {
    const newOption: GridOption = {
      id: uuidv4(),
      name: `Option ${grid.options.length + 1}`,
      scores: {},
    };
    updateGrid(grid.id, { options: [...grid.options, newOption] });
    setEditingOption(newOption.id);
  };

  const updateOptionName = (id: string, name: string) => {
    updateGrid(grid.id, {
      options: grid.options.map(o => o.id === id ? { ...o, name } : o)
    });
  };

  const deleteOption = (id: string) => {
    updateGrid(grid.id, {
      options: grid.options.filter(o => o.id !== id)
    });
  };

  const updateOptionScore = (optId: string, critId: string, score: number) => {
    updateGrid(grid.id, {
      options: grid.options.map(o => {
        if (o.id === optId) {
          return {
            ...o,
            scores: { ...(o.scores || {}), [critId]: score }
          };
        }
        return o;
      })
    });
  };

  const calculateTotal = (opt: GridOption) => {
    if (!criteria.length) return 0;
    let total = 0;
    criteria.forEach(c => {
      const score = (opt.scores || {})[c.id] || 0;
      total += score * c.weight;
    });
    return total;
  };

  // Find max score to highlight winners
  const totals = grid.options.map(o => ({ id: o.id, total: calculateTotal(o) }));
  const maxTotal = totals.length > 0 ? Math.max(...totals.map(t => t.total)) : 0;

  return (
    <div className="space-y-8">
      {/* Configuration Section */}
      {!grid.isTemplate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex-grow">Evaluation Criteria</h3>
              <button onClick={addCriteria} className="text-slate-900 hover:bg-slate-100 p-1.5 transition-colors ml-2 border border-slate-200">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {criteria.map(c => (
                <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-slate-200 p-3 rounded-lg bg-slate-50 relative group">
                  <div className="flex-grow">
                    {editingCriteria === c.id ? (
                      <input 
                        type="text"
                        value={c.name}
                        onChange={(e) => updateCriteria(c.id, { name: e.target.value })}
                        className="w-full text-sm font-medium border border-slate-300 rounded px-2 py-1 mb-2"
                        autoFocus
                        onBlur={() => setEditingCriteria(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingCriteria(null)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900 text-sm">{c.name}</span>
                        <button onClick={() => setEditingCriteria(c.id)} className="text-slate-400 hover:text-blue-600 hidden group-hover:block p-1">
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <label className="text-xs text-slate-500 whitespace-nowrap">Weight</label>
                    <input 
                      type="range" min="1" max="10" 
                      value={c.weight}
                      onChange={(e) => updateCriteria(c.id, { weight: parseInt(e.target.value) })}
                      className="w-24 accent-blue-600"
                    />
                    <span className="text-sm font-bold text-slate-700 w-4 text-center">{c.weight}</span>
                    <button onClick={() => deleteCriteria(c.id)} className="text-slate-400 hover:text-red-600 hidden group-hover:block p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {criteria.length === 0 && <p className="text-sm text-slate-500 italic text-center py-2">Add criteria to weight options.</p>}
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex-grow">Options to Compare</h3>
              <button onClick={addOption} className="text-slate-900 hover:bg-slate-100 p-1.5 transition-colors ml-2 border border-slate-200">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {grid.options.map(opt => (
                <div key={opt.id} className="flex items-center justify-between border border-slate-200 p-3 rounded-lg bg-slate-50 relative group">
                  {editingOption === opt.id ? (
                    <input 
                      type="text"
                      value={opt.name}
                      onChange={(e) => updateOptionName(opt.id, e.target.value)}
                      className="flex-grow text-sm font-medium border border-slate-300 rounded px-2 py-1"
                      autoFocus
                      onBlur={() => setEditingOption(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingOption(null)}
                    />
                  ) : (
                    <span className="font-medium text-slate-900 text-sm">{opt.name}</span>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <button onClick={() => setEditingOption(opt.id)} className="text-slate-400 hover:text-blue-600 hidden group-hover:block p-1">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteOption(opt.id)} className="text-slate-400 hover:text-red-600 hidden group-hover:block p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {grid.options.length === 0 && <p className="text-sm text-slate-500 italic text-center py-2">Add options to compare.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid View */}
      <div className="bg-white border-y md:border border-slate-200 overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] text-slate-500 uppercase tracking-[1px] bg-slate-50 border-b border-slate-300">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 border-r border-slate-200">
                  Criteria
                  <div className="text-[10px] text-slate-400 mt-0.5">Weight multiplier</div>
                </th>
                {grid.options.map(opt => (
                  <th key={opt.id} scope="col" className="px-6 py-4 border-r border-slate-200 font-semibold text-center min-w-[150px]">
                    <div className="text-slate-900 truncate max-w-[150px] font-serif text-[14px] normal-case" title={opt.name}>{opt.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Score (1-10)</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((c, idx) => (
                <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-4 border-b border-slate-100 font-medium text-slate-800">
                    {c.name}
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      x{c.weight}
                    </span>
                  </td>
                  {grid.options.map(opt => {
                    const score = (opt.scores || {})[c.id] || 0;
                    return (
                      <td key={`${c.id}-${opt.id}`} className="px-6 py-4 border-b border-l border-slate-100 text-center">
                        {grid.isTemplate ? (
                          <div className="font-medium text-slate-700">{score || '-'}</div>
                        ) : (
                          <input
                            type="number"
                            min="1" max="10"
                            value={score || ''}
                            onChange={(e) => updateOptionScore(opt.id, c.id, parseInt(e.target.value) || 0)}
                            className="w-16 text-center border-b border-slate-300 focus:border-blue-500 focus:outline-none bg-transparent font-medium"
                            placeholder="-"
                          />
                        )}
                        <div className="text-[10px] text-slate-400 mt-1">
                          Points: {score * c.weight}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-slate-900 border-t-4 border-slate-900">
                <td className="px-6 py-4 font-bold text-white text-right text-[12px] uppercase tracking-[1px]">
                  Total Score
                </td>
                {grid.options.map(opt => {
                  const total = calculateTotal(opt);
                  const isWinner = total === maxTotal && total > 0 && maxTotal > 0;
                  return (
                    <td key={`total-${opt.id}`} className="px-6 py-4 border-l border-slate-700 text-center">
                      <div className={`text-2xl font-serif font-bold ${isWinner ? 'text-winner-text' : 'text-slate-300'}`}>
                        {total}
                      </div>
                      {isWinner && <div className="text-[10px] text-winner-text border-winner-border font-bold uppercase tracking-[1px] mt-1 border inline-block px-2 py-0.5">Recommended</div>}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
          {criteria.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              Add criteria and options to build your matrix.
            </div>
          )}
        </div>
      </div>
      <Disclaimer />
    </div>
  );
}
