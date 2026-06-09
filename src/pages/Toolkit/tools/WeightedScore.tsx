import { useState } from 'react';

interface WeightedOption {
  id: string;
  name: string;
  scores: Record<string, number>;
}

interface Criteria {
  id: string;
  name: string;
  weight: number; // 1-5
}

export function WeightedScore() {
  const [criteria, setCriteria] = useState<Criteria[]>([
    { id: 'c1', name: 'Upfront Cost', weight: 4 },
    { id: 'c2', name: 'Reliability', weight: 5 },
    { id: 'c3', name: 'Resale Value', weight: 2 },
  ]);

  const [options, setOptions] = useState<WeightedOption[]>([
    { id: 'o1', name: 'Used Tractor (Cash)', scores: { c1: 8, c2: 4, c3: 5 } },
    { id: 'o2', name: 'New Tractor (Finance)', scores: { c1: 2, c2: 9, c3: 8 } },
  ]);

  const calculateTotal = (opt: WeightedOption) => {
    return criteria.reduce((sum, c) => sum + ((opt.scores[c.id] || 0) * c.weight), 0);
  };

  const maxTotal = Math.max(...options.map(calculateTotal));

  return (
    <div className="overflow-x-auto">
       <table className="w-full border-collapse text-left whitespace-nowrap">
         <thead>
           <tr>
             <th className="p-4 border-b-2 border-slate-200 bg-slate-50 w-1/4">
                <span className="text-[11px] font-bold uppercase tracking-[1px] text-slate-500">Criteria</span>
             </th>
             <th className="p-4 border-b-2 border-slate-200 bg-slate-50 w-16 text-center">
                <span className="text-[11px] font-bold uppercase tracking-[1px] text-slate-500">Weight</span>
             </th>
             {options.map(opt => (
                <th key={opt.id} className="p-4 border-b-2 border-slate-200 bg-slate-50 border-l border-slate-200">
                  <input 
                    className="font-bold text-slate-900 bg-transparent border-none p-0 focus:ring-0 w-full text-center"
                    value={opt.name}
                    onChange={(e) => {
                      setOptions(options.map(o => o.id === opt.id ? { ...o, name: e.target.value } : o));
                    }}
                  />
                </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {criteria.map(c => (
              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                 <td className="p-4">
                    <input 
                      className="text-sm font-medium text-slate-700 bg-transparent border-none p-0 focus:ring-0 w-full"
                      value={c.name}
                      onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, name: e.target.value } : x))}
                    />
                 </td>
                 <td className="p-4 text-center">
                    <input 
                      type="number" min="1" max="10"
                      className="w-16 p-1 border border-slate-300 rounded text-center text-sm font-medium"
                      value={c.weight}
                      onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, weight: parseInt(e.target.value)||0 } : x))}
                    />
                 </td>
                 {options.map(opt => (
                    <td key={opt.id} className="p-4 border-l border-slate-100 text-center">
                       <input 
                         type="number" min="1" max="10"
                         className="w-16 p-1 border border-slate-200 rounded text-center text-sm"
                         value={opt.scores[c.id] || 0}
                         onChange={(e) => {
                           const val = parseInt(e.target.value) || 0;
                           setOptions(options.map(o => o.id === opt.id ? { ...o, scores: { ...o.scores, [c.id]: val } } : o));
                         }}
                       />
                    </td>
                 ))}
              </tr>
           ))}
           <tr className="bg-slate-50/50">
              <td colSpan={2} className="p-4 text-right font-bold text-slate-900 uppercase tracking-[1px] text-[11px]">
                 Total Weighted Score
              </td>
              {options.map(opt => {
                 const total = calculateTotal(opt);
                 const isWinner = total === maxTotal && total > 0;
                 return (
                   <td key={opt.id} className={`p-4 border-l border-slate-200 text-center ${isWinner ? 'bg-green-50' : ''}`}>
                      <div className={`text-2xl font-serif font-bold ${isWinner ? 'text-green-700' : 'text-slate-400'}`}>
                        {total}
                      </div>
                      {isWinner && <div className="text-[10px] text-green-700 border border-green-700/30 font-bold uppercase tracking-[1px] mt-1 inline-block px-2 py-0.5 bg-white">Winner</div>}
                   </td>
                 );
              })}
           </tr>
         </tbody>
       </table>
       <div className="p-4 text-[12px] text-slate-500 bg-white border-t border-slate-200">
         * Rate each option 1-10. Score is calculated as <code className="bg-slate-100 px-1 py-0.5 rounded">Σ (Score × Weight)</code>.
       </div>
    </div>
  );
}
