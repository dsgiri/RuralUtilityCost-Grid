import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGridStore } from '../store/useGridStore';
import { Grid, GridOption } from '../types';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export function Matrix2x2View({ grid }: { grid: Grid }) {
  const { updateGrid } = useGridStore();
  const [editingOption, setEditingOption] = useState<string | null>(null);
  const [xAxisLabel, setXAxisLabel] = useState(grid.xAxisLabel || 'X Axis');
  const [yAxisLabel, setYAxisLabel] = useState(grid.yAxisLabel || 'Y Axis');

  const addOption = () => {
    const newOption: GridOption = {
      id: uuidv4(),
      name: `New Option ${grid.options.length + 1}`,
      xScore: 5,
      yScore: 5,
    };
    updateGrid(grid.id, { options: [...grid.options, newOption] });
    setEditingOption(newOption.id);
  };

  const updateOption = (optId: string, updates: Partial<GridOption>) => {
    updateGrid(grid.id, {
      options: grid.options.map(o => o.id === optId ? { ...o, ...updates } : o)
    });
  };

  const deleteOption = (optId: string) => {
    updateGrid(grid.id, {
      options: grid.options.filter(o => o.id !== optId)
    });
  };

  const handleAxesUpdate = () => {
    updateGrid(grid.id, { xAxisLabel, yAxisLabel });
  };

  // For quadrant visualization
  // X: 1-10, Y: 1-10
  // Q1: Top Right (High X, High Y)
  // Q2: Top Left (Low X, High Y)
  // Q3: Bottom Left (Low X, Low Y)
  // Q4: Bottom Right (High X, Low Y)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Option List Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900">Options</h3>
            {!grid.isTemplate && (
              <button onClick={addOption} className="text-blue-700 hover:bg-blue-50 p-1.5 rounded-md transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {grid.options.map((opt) => (
              <div key={opt.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 relative group">
                {editingOption === opt.id && !grid.isTemplate ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={opt.name}
                      onChange={(e) => updateOption(opt.id, { name: e.target.value })}
                      className="w-full text-sm font-medium border border-slate-300 rounded px-2 py-1"
                      autoFocus
                      onBlur={() => setEditingOption(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingOption(null)}
                    />
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="text-xs text-slate-500 mb-1 block">X: {grid.xAxisLabel}</label>
                        <input
                          type="range"
                          min="1" max="10"
                          value={opt.xScore || 5}
                          onChange={(e) => updateOption(opt.id, { xScore: parseInt(e.target.value) })}
                          className="w-full accent-blue-600"
                        />
                        <div className="text-right text-xs font-medium text-slate-700">{opt.xScore}</div>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-slate-500 mb-1 block">Y: {grid.yAxisLabel}</label>
                        <input
                          type="range"
                          min="1" max="10"
                          value={opt.yScore || 5}
                          onChange={(e) => updateOption(opt.id, { yScore: parseInt(e.target.value) })}
                          className="w-full accent-blue-600"
                        />
                        <div className="text-right text-xs font-medium text-slate-700">{opt.yScore}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium text-slate-900 pr-12">{opt.name}</h4>
                    <div className="text-xs text-slate-500 mt-1">
                      X: <span className="font-medium text-slate-700">{opt.xScore}</span> | 
                      Y: <span className="font-medium text-slate-700">{opt.yScore}</span>
                    </div>
                    {!grid.isTemplate && (
                      <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1">
                        <button onClick={() => setEditingOption(opt.id)} className="text-slate-400 hover:text-blue-600 p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteOption(opt.id)} className="text-slate-400 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {grid.options.length === 0 && (
              <p className="text-sm text-slate-500 italic text-center py-4">No options added yet.</p>
            )}
          </div>
        </div>

        {!grid.isTemplate && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Axes Labels</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">X-Axis (Horizontal)</label>
                <input
                  type="text"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  onBlur={handleAxesUpdate}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Y-Axis (Vertical)</label>
                <input
                  type="text"
                  value={yAxisLabel}
                  onChange={(e) => setYAxisLabel(e.target.value)}
                  onBlur={handleAxesUpdate}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid Canvas */}
      <div className="lg:col-span-2">
        <div className="bg-white/50 h-[600px] flex flex-col relative overflow-hidden mt-8">
          {/* Y Axis Label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[11px] font-bold text-slate-900 tracking-[2px] uppercase">
            {grid.yAxisLabel} 
          </div>
          {/* X Axis Label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-900 tracking-[2px] uppercase">
            {grid.xAxisLabel}
          </div>

          <div className="flex-grow ml-12 mb-16 relative border-l-[2px] border-b-[2px] border-slate-900 pt-4 pr-4">
            {/* Grid lines */}
            <div className="absolute w-full h-full inset-0">
              <div className="absolute w-full h-px bg-slate-300 top-1/2 border-dashed"></div>
              <div className="absolute w-px h-full bg-slate-300 left-1/2 border-dashed"></div>
              
              {/* Quadrant labels */}
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[1px] text-slate-500">Low {grid.xAxisLabel} / High {grid.yAxisLabel}</div>
              <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[1px] text-slate-500">High {grid.xAxisLabel} / High {grid.yAxisLabel}</div>
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[1px] text-slate-500">Low {grid.xAxisLabel} / Low {grid.yAxisLabel}</div>
              <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[1px] text-slate-500">High {grid.xAxisLabel} / Low {grid.yAxisLabel}</div>
            </div>

            {/* Scatter Plot Points */}
            <div className="absolute w-full h-full inset-0">
              {grid.options.map((opt) => {
                const xPercent = ((opt.xScore || 1) - 1) / 9 * 100;
                const yPercent = 100 - (((opt.yScore || 1) - 1) / 9 * 100);
                
                return (
                  <div 
                    key={opt.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-700 text-white font-medium text-[12px] rounded-full shadow-[0_4px_12px_rgba(46,90,136,0.2)] z-10 cursor-pointer hover:bg-slate-900 transition-colors"
                    style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                    onClick={() => setEditingOption(opt.id)}
                  >
                    {opt.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
