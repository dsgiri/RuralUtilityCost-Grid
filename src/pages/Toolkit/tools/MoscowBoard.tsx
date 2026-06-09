import { useState } from 'react';

interface Req { id: string; title: string; col: 'm'|'s'|'c'|'w'; }

export function MoscowBoard() {
  const [reqs, setReqs] = useState<Req[]>([
    { id: '1', title: 'Start in cold weather without grid plug', col: 'm' },
    { id: '2', title: 'Lift 2500lb round bales', col: 'm' },
    { id: '3', title: 'Enclosed cab with heat', col: 's' },
    { id: '4', title: 'Air conditioning for summer brush hogging', col: 'c' },
    { id: '5', title: 'GPS auto-steer', col: 'w' },
  ]);
  const [newReq, setNewReq] = useState('');

  const addReq = (e: any) => {
    e.preventDefault();
    if (!newReq.trim()) return;
    setReqs([...reqs, { id: Date.now().toString(), title: newReq, col: 'c' }]);
    setNewReq('');
  };

  const Col = ({ title, cKey, color }: any) => (
    <div className={`p-4 border border-slate-200 bg-white flex flex-col h-[400px]`}>
       <h3 className={`text-sm font-bold uppercase tracking-[1px] mb-4 pb-2 border-b-4 ${color}`}>{title}</h3>
       <div className="flex-1 overflow-y-auto space-y-2">
         {reqs.filter(r => r.col === cKey).map(r => (
           <div key={r.id} className="bg-slate-50 border border-slate-200 p-2 text-[13px] flex flex-col group relative pr-6">
             <span>{r.title}</span>
             <select 
               className="absolute right-0 top-1 text-[10px] opacity-0 group-hover:opacity-100 cursor-pointer"
               value={r.col}
               onChange={e => {
                 if(e.target.value==='d') setReqs(reqs.filter(x=>x.id!==r.id));
                 else setReqs(reqs.map(x=>x.id===r.id ? {...x, col: e.target.value as any}:x));
               }}
             >
               <option value="m">Must</option>
               <option value="s">Should</option>
               <option value="c">Could</option>
               <option value="w">Won't</option>
               <option value="d">Delete</option>
             </select>
           </div>
         ))}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-6">
       <form onSubmit={addReq} className="flex gap-2">
         <input type="text" value={newReq} onChange={e => setNewReq(e.target.value)} placeholder="Add requirement..." className="flex-1 p-3 border border-slate-300 rounded-sm text-sm" />
         <button className="bg-slate-900 text-white px-6 font-bold text-sm tracking-wide rounded-sm hover:bg-slate-800">Add</button>
       </form>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 border border-slate-200">
         <Col cKey="m" title="Must Have" color="border-red-500" />
         <Col cKey="s" title="Should Have" color="border-yellow-500" />
         <Col cKey="c" title="Could Have" color="border-blue-500" />
         <Col cKey="w" title="Won't Have" color="border-slate-300" />
       </div>
    </div>
  );
}
