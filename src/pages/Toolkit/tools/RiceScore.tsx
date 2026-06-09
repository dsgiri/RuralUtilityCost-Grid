import { useState } from 'react';

export function RiceScore() {
  const [ideas, setIdeas] = useState([
    { id: '1', name: 'Roadside Farm Stand', r: 50, i: 3, c: 80, e: 4 },
    { id: '2', name: 'Local Restaurant Wholesale', r: 5, i: 5, c: 50, e: 8 },
    { id: '3', name: 'Agritourism Pumpkin Patch', r: 500, i: 2, c: 60, e: 10 },
  ]);

  const score = (r:number, i:number, c:number, e:number) => ((r * i * (c/100)) / (e||1)).toFixed(1);

  return (
    <div className="overflow-x-auto">
       <table className="w-full border-collapse text-left whitespace-nowrap bg-white border border-slate-200">
         <thead>
           <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-[1px] text-slate-500">
             <th className="p-4">Idea</th>
             <th className="p-4 text-center" title="Reach: How many people will this affect?">Reach</th>
             <th className="p-4 text-center" title="Impact: 3=Massive, 2=High, 1=Medium, 0.5=Low">Impact</th>
             <th className="p-4 text-center" title="Confidence: Percentage 0-100%">Conf %</th>
             <th className="p-4 text-center" title="Effort: Person-months or Relative weight">Effort</th>
             <th className="p-4 text-center bg-blue-50 text-blue-800">RICE Score</th>
           </tr>
         </thead>
         <tbody>
           {ideas.map((idea, idx) => (
             <tr key={idea.id} className="border-b border-slate-100 hover:bg-slate-50">
               <td className="p-4">
                 <input className="w-full p-2 border border-slate-200 text-sm font-medium" value={idea.name} onChange={e => {
                   const n = [...ideas]; n[idx].name = e.target.value; setIdeas(n);
                 }} />
               </td>
               <td className="p-4 text-center">
                 <input type="number" className="w-20 p-2 border border-slate-200 text-sm text-center" value={idea.r} onChange={e => {
                   const n = [...ideas]; n[idx].r = Number(e.target.value)||0; setIdeas(n);
                 }} />
               </td>
               <td className="p-4 text-center">
                 <input type="number" step="0.5" className="w-16 p-2 border border-slate-200 text-sm text-center" value={idea.i} onChange={e => {
                   const n = [...ideas]; n[idx].i = Number(e.target.value)||0; setIdeas(n);
                 }} />
               </td>
               <td className="p-4 text-center">
                 <input type="number" min="0" max="100" className="w-16 p-2 border border-slate-200 text-sm text-center" value={idea.c} onChange={e => {
                   const n = [...ideas]; n[idx].c = Number(e.target.value)||0; setIdeas(n);
                 }} />
               </td>
               <td className="p-4 text-center">
                 <input type="number" min="1" className="w-16 p-2 border border-slate-200 text-sm text-center" value={idea.e} onChange={e => {
                   const n = [...ideas]; n[idx].e = Number(e.target.value)||1; setIdeas(n);
                 }} />
               </td>
               <td className="p-4 text-center bg-blue-50/30">
                 <span className="text-xl font-bold text-blue-700">{score(idea.r, idea.i, idea.c, idea.e)}</span>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
       <div className="mt-4 flex justify-between">
          <p className="text-xs text-slate-500 bg-slate-100 px-3 py-1 scale-100 border border-slate-200 rounded">Formula: (Reach × Impact × Confidence%) ÷ Effort</p>
          <button onClick={() => setIdeas([...ideas, {id: Date.now().toString(), name:'New Idea', r:100, i:1, c:50, e:1}])} className="text-xs font-bold bg-slate-900 text-white px-4 py-2 hover:bg-slate-800">Add Idea</button>
       </div>
    </div>
  );
}
