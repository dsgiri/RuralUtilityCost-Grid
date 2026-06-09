import { useState } from 'react';

interface Force { id: string; text: string; weight: number; }

export function ForceField() {
  const [driving, setDriving] = useState<Force[]>([
    { id: 'd1', text: 'Reduce reliance on aging grid infrastructure', weight: 4 },
    { id: 'd2', text: 'Long-term cost savings', weight: 3 },
    { id: 'd3', text: 'Tax incentives available this year', weight: 5 },
  ]);
  const [restraining, setRestraining] = useState<Force[]>([
    { id: 'r1', text: 'High initial capital requirement', weight: 5 },
    { id: 'r2', text: 'Maintenance learning curve', weight: 2 },
    { id: 'r3', text: 'Takes focus away from current harvest', weight: 3 },
  ]);

  const dTotal = driving.reduce((s, d) => s + d.weight, 0);
  const rTotal = restraining.reduce((s, r) => s + r.weight, 0);
  const total = dTotal + rTotal || 1;
  const dPercent = (dTotal / total) * 100;
  
  const addForce = (list: Force[], setList: Function, text: string) => {
    if (!text.trim()) return;
    setList([...list, { id: Date.now().toString(), text, weight: 3 }]);
  };

  const Column = ({ title, items, setItems, color, align, type }: any) => {
    const [input, setInput] = useState('');
    return (
     <div className="flex-1 bg-slate-50 border border-slate-200 p-4">
        <h3 className={`text-sm font-bold uppercase tracking-[1px] mb-4 text-center ${color}`}>{title} (Total: {items.reduce((s:any,i:any)=>s+i.weight,0)})</h3>
        <div className="space-y-2 mb-4">
          {items.map((item: Force) => (
             <div key={item.id} className="flex gap-2 items-center bg-white border border-slate-200 p-2 group">
                {align === 'left' && <div className="text-slate-400 opacity-50 font-bold hidden sm:block">→</div>}
                
                <input 
                  className={`flex-1 border-none focus:ring-0 p-0 text-sm bg-transparent ${align==='right'?'text-right':''}`}
                  value={item.text} 
                  onChange={e => setItems(items.map((i:any) => i.id === item.id ? {...i, text: e.target.value} : i))}
                />
                
                {align === 'right' && <div className="text-slate-400 opacity-50 font-bold hidden sm:block">←</div>}

                <select 
                  className={`border-none bg-slate-100 focus:ring-0 p-1 text-sm font-bold w-12 text-center rounded-sm ${color}`}
                  value={item.weight} 
                  onChange={e => setItems(items.map((i:any) => i.id === item.id ? {...i, weight: parseInt(e.target.value)||1} : i))}
                >
                  {[1,2,3,4,5].map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                
                <button onClick={() => setItems(items.filter((i:any) => i.id !== item.id))} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-2">×</button>
             </div>
          ))}
        </div>
        <div className="flex gap-2">
           <input 
             className="flex-1 border border-slate-300 p-2 text-sm" 
             value={input} 
             onChange={e => setInput(e.target.value)} 
             placeholder={type === 'drive' ? "New driving force..." : "New restraining force..."}
             onKeyDown={e => {
                if (e.key === 'Enter') {
                   addForce(items, setItems, input);
                   setInput('');
                }
             }}
           />
           <button onClick={() => { addForce(items, setItems, input); setInput(''); }} className="bg-slate-900 text-white px-3 py-1 text-xs font-bold uppercase rounded-sm">Add</button>
        </div>
     </div>
    );
  };

  return (
    <div className="space-y-8">
       {/* Visualizer */}
       <div className="bg-white border text-center border-slate-200 p-8 shadow-sm">
           <h3 className="text-lg font-bold text-slate-900 mb-6">Proposed Change: Switch to Off-Grid Solar</h3>
           <div className="h-12 w-full bg-slate-100 border border-slate-300 relative flex text-white font-bold overflow-hidden rounded-sm">
              <div className="h-full bg-green-600 flex justify-start pl-4 items-center transition-all duration-500 whitespace-nowrap" style={{ width: `${dPercent}%` }}>
                 Driving ({dTotal})
              </div>
              <div className="h-full bg-red-600 flex justify-end pr-4 items-center transition-all duration-500 whitespace-nowrap" style={{ width: `${100 - dPercent}%` }}>
                 Restraining ({rTotal})
              </div>
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-900 -translate-x-1/2 z-10 hidden sm:block"></div>
           </div>
           <div className="mt-6 flex justify-between text-[11px] font-bold uppercase tracking-[1px] text-slate-500">
               <span className="text-green-700">← Pushing for Change</span>
               <span className="text-red-700">Resisting Change →</span>
           </div>
       </div>

       <div className="flex flex-col lg:flex-row gap-6">
          <Column title="Driving Forces" items={driving} setItems={setDriving} color="text-green-700" align="left" type="drive" />
          <Column title="Restraining Forces" items={restraining} setItems={setRestraining} color="text-red-700" align="right" type="restrain" />
       </div>
    </div>
  );
}
