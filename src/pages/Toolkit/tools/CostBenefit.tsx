import { useState } from 'react';

interface Entry { id: string; text: string; weight: number; }

export function CostBenefit() {
  const [pros, setPros] = useState<Entry[]>([{id: '1', text: "Lower upfront cost", weight: 4}, {id: '2', text: "Keeps historical aesthetic", weight: 2}]);
  const [cons, setCons] = useState<Entry[]>([{id: '3', text: "Higher ongoing maintenance", weight: 3}, {id: '4', text: "Drafty for livestock in winter", weight: 5}]);
  
  const totalPros = pros.reduce((sum, i) => sum + i.weight, 0);
  const totalCons = cons.reduce((sum, i) => sum + i.weight, 0);
  
  const difference = totalPros - totalCons;
  const tilt = Math.max(-25, Math.min(25, difference * 3));

  const updateItem = (list: any, setList: any, id: string, text?: string, weight?: number) => {
      setList(list.map((item: any) => item.id === id ? { ...item, ...(text !== undefined && {text}), ...(weight !== undefined && {weight}) } : item));
  };
  
  const deleteItem = (list: any, setList: any, id: string) => {
      setList(list.filter((item: any) => item.id !== id));
  };

  const addItem = (list: any, setList: any) => {
      setList([...list, { id: Date.now().toString(), text: 'New item...', weight: 3 }]);
  };

  const ListEditor = ({ items, setItems, title, colorClass, inputClass, headerTitleColor }: any) => (
      <div className={`flex-1 p-6 rounded-xl border bg-white ${colorClass}`}>
          <h3 className={`text-[15px] font-bold mb-4 flex justify-between items-center ${headerTitleColor} uppercase tracking-wide`}>
              {title} <span className="font-mono bg-white border px-2 py-0.5 rounded text-stone-500 shadow-sm text-xs">Score: {items.reduce((s:any, i:any)=>s+i.weight,0)}</span>
          </h3>
          <div className="space-y-3 mb-4">
              {items.map((item: any) => (
                  <div key={item.id} className="flex gap-2 items-center group">
                      <input type="text" value={item.text} onChange={(e) => updateItem(items, setItems, item.id, e.target.value)} className="flex-1 bg-stone-50 border border-stone-200 rounded p-2 text-[13px] text-stone-700 outline-none focus:ring-1 focus:ring-stone-300" />
                      <div className="flex flex-col items-center">
                          <select value={item.weight} onChange={(e) => updateItem(items, setItems, item.id, undefined, parseInt(e.target.value))} className={`border rounded p-1.5 text-xs ${inputClass} outline-none font-bold text-center`}>
                              {[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}</option>)}
                          </select>
                      </div>
                      <button onClick={() => deleteItem(items, setItems, item.id)} className="text-stone-400 hover:text-red-500 px-1 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                  </div>
              ))}
          </div>
          <button onClick={() => addItem(items, setItems)} className="text-[11px] font-bold text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded bg-stone-50 hover:bg-stone-100 transition-colors">
            + Add item
          </button>
      </div>
  );

  return (
      <div className="mx-auto">
          {/* The Visual Scale */}
          <div className="py-12 flex justify-center mb-8 overflow-hidden relative">
              <div className="w-1.5 h-32 bg-stone-300 absolute bottom-0 left-1/2 -translate-x-1/2 z-0 rounded-t"></div>
              <div className="w-8 h-8 rounded-full bg-stone-400 absolute bottom-32 left-1/2 -translate-x-1/2 z-10 shadow border-4 border-white"></div>
              <div 
                  className="w-4/5 max-w-lg h-4 bg-stone-700 absolute bottom-[140px] left-1/2 -translate-x-1/2 origin-center transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 rounded-full flex justify-between items-center px-1"
                  style={{ transform: `translateX(-50%) rotate(${tilt}deg)` }}
              >
                  {/* Pro Weight Indicator */}
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold transform translate-y-6 shadow-lg border-4 border-white">{totalPros}</div>
                  {/* Con Weight Indicator */}
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold transform translate-y-6 shadow-lg border-4 border-white">{totalCons}</div>
              </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-16 px-4">
              <ListEditor items={pros} setItems={setPros} title="Pros (Benefits)" colorClass="border-emerald-200" inputClass="text-emerald-700 bg-emerald-50 border-emerald-200" headerTitleColor="text-emerald-800" />
              <ListEditor items={cons} setItems={setCons} title="Cons (Costs/Risks)" colorClass="border-red-200" inputClass="text-red-700 bg-red-50 border-red-200" headerTitleColor="text-red-800" />
          </div>
      </div>
  );
}
