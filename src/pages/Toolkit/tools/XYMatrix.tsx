import { useState } from 'react';

interface Point {
  id: string;
  name: string;
  x: number; // 0-100
  y: number; // 0-100
}

export function XYMatrix() {
  const [xAxis, setXAxis] = useState('Capital Cost (Low to High)');
  const [yAxis, setYAxis] = useState('Expected Lifespan (Short to Long)');
  
  const [points, setPoints] = useState<Point[]>([
    { id: '1', name: 'Buy Used Tractor', x: 40, y: 50 },
    { id: '2', name: 'Finance New Tractor', x: 90, y: 90 },
    { id: '3', name: 'Lease Skid Steer', x: 20, y: 30 },
  ]);

  const [editId, setEditId] = useState<string | null>(null);

  const addPoint = () => {
    setPoints([...points, { id: Date.now().toString(), name: 'New Option', x: 50, y: 50 }]);
  };

  const updatePoint = (id: string, updates: Partial<Point>) => {
    setPoints(points.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Controls */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
           <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">X-Axis Label</label>
           <input className="w-full p-2 border border-slate-300 rounded-sm text-sm" value={xAxis} onChange={e => setXAxis(e.target.value)} />
        </div>
        <div>
           <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">Y-Axis Label</label>
           <input className="w-full p-2 border border-slate-300 rounded-sm text-sm" value={yAxis} onChange={e => setYAxis(e.target.value)} />
        </div>
        <hr className="border-slate-200" />
        <div>
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-slate-800">Options to Plot</h3>
             <button onClick={addPoint} className="text-[11px] bg-slate-900 text-white px-3 py-1 rounded-sm hover:bg-slate-800">Add Option</button>
           </div>
           <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
             {points.map(p => (
                <div key={p.id} className="p-3 border border-slate-200 bg-slate-50 rounded-sm relative">
                  <input 
                    className="w-full mb-2 p-1 border border-slate-300 rounded-sm text-sm font-medium" 
                    value={p.name} 
                    onChange={e => updatePoint(p.id, { name: e.target.value })} 
                  />
                  <div className="flex space-x-2 text-xs">
                     <div className="flex-1">
                        <label className="block text-[10px] text-slate-500 mb-1">X: {p.x}</label>
                        <input type="range" min="0" max="100" value={p.x} onChange={e => updatePoint(p.id, { x: parseInt(e.target.value) })} className="w-full" />
                     </div>
                     <div className="flex-1">
                        <label className="block text-[10px] text-slate-500 mb-1">Y: {p.y}</label>
                        <input type="range" min="0" max="100" value={p.y} onChange={e => updatePoint(p.id, { y: parseInt(e.target.value) })} className="w-full" />
                     </div>
                  </div>
                  <button onClick={() => setPoints(points.filter(opt => opt.id !== p.id))} className="absolute top-2 right-2 text-slate-400 hover:text-red-600">×</button>
                </div>
             ))}
           </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="w-full lg:w-2/3 h-[500px] bg-slate-50 border border-slate-200 rounded-sm relative mt-6 lg:mt-0">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
             <div className="border-b border-r border-slate-300 bg-red-50/30"></div>
             <div className="border-b border-slate-300 bg-green-50/30"></div>
             <div className="border-r border-slate-300 bg-yellow-50/30"></div>
             <div className="bg-blue-50/30"></div>
          </div>
          
          {/* Axis Labels */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 tracking-wide bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 pointer-events-none">
             High {yAxis.split('(')[0]}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 tracking-wide bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 pointer-events-none">
             Low {yAxis.split('(')[0]}
          </div>
          
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-bold text-slate-500 tracking-wide bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 pointer-events-none origin-bottom-right rotate-90 whitespace-nowrap">
             High {xAxis.split('(')[0]}
          </div>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-xs font-bold text-slate-500 tracking-wide bg-white/80 px-2 py-0.5 rounded shadow-sm z-10 pointer-events-none origin-bottom-left -rotate-90 whitespace-nowrap">
             Low {xAxis.split('(')[0]}
          </div>

          {/* Points */}
          {points.map((p, i) => (
             <div 
               key={p.id} 
               className="absolute w-4 h-4 bg-slate-900 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all"
               style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
             >
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded shadow border border-slate-700 whitespace-nowrap z-30">
                  {p.name}
                </div>
             </div>
          ))}
      </div>
    </div>
  );
}
