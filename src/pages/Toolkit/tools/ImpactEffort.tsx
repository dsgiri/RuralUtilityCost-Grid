import { useState } from 'react';

interface Task { id: string; title: string; quadrant: 'q1'|'q2'|'q3'|'q4'; }

export function ImpactEffort() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Clean out scrap metal pile', quadrant: 'q1' },
    { id: '2', title: 'Build new hay barn', quadrant: 'q2' },
    { id: '3', title: 'Update spreadsheet records', quadrant: 'q3' },
    { id: '4', title: 'Manually dig irrigation trench', quadrant: 'q4' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: any) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, quadrant: 'q1' }]);
    setNewTask('');
  };

  const Quad = ({ title, q, color, headerColor }: any) => (
    <div className={`p-4 flex flex-col h-[200px] ${color}`}>
       <h4 className={`font-bold text-[11px] uppercase tracking-wider mb-3 ${headerColor}`}>{title}</h4>
       <div className="flex-1 overflow-y-auto space-y-2 pr-1">
         {tasks.filter(t => t.quadrant === q).map((t: Task) => (
           <div key={t.id} className="bg-white border border-stone-200 p-2 rounded shadow-sm text-[13px] flex items-start justify-between group">
             <span className="truncate pr-2 leading-tight">{t.title}</span>
             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
               <button onClick={() => setTasks(tasks.map(x=>x.id===t.id?{...x, quadrant: (t.quadrant === 'q1' ? 'q2' : (t.quadrant === 'q3' ? 'q4' : (t.quadrant === 'q2' ? 'q1' : 'q3'))) as any}:x))} title="Toggle Impact" className="text-[10px] px-1.5 py-0.5 bg-stone-100 rounded text-stone-500 hover:bg-stone-200 font-bold">I</button>
               <button onClick={() => setTasks(tasks.map(x=>x.id===t.id?{...x, quadrant: (t.quadrant === 'q1' ? 'q3' : (t.quadrant === 'q2' ? 'q4' : (t.quadrant === 'q3' ? 'q1' : 'q2'))) as any}:x))} title="Toggle Effort" className="text-[10px] px-1.5 py-0.5 bg-stone-100 rounded text-stone-500 hover:bg-stone-200 font-bold">E</button>
               <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))} title="Delete" className="text-[10px] px-1.5 py-0.5 bg-red-100 rounded text-red-500 hover:bg-red-200 font-bold">×</button>
             </div>
           </div>
         ))}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-6">
       <div className="flex justify-end mb-2">
         <form onSubmit={addTask} className="flex gap-2 w-full md:w-auto">
           <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add project..." className="flex-1 md:w-64 p-2.5 border border-stone-300 rounded shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
           <button className="bg-stone-800 text-white px-5 font-bold text-sm tracking-wide rounded hover:bg-stone-700 transition-colors shrink-0">Add Project</button>
         </form>
       </div>
       <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-1 bg-stone-300 border-4 border-stone-300 rounded-xl overflow-hidden shadow-md mx-auto w-full max-w-3xl">
         <div className="bg-white p-2"></div>
         <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-[10px]">Low Effort</div>
         <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-[10px]">High Effort</div>
         
         <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-[10px] flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>High Impact</div>
         <Quad q="q1" title="Quick Wins" color="bg-emerald-50" headerColor="text-emerald-700" />
         <Quad q="q2" title="Major Projects" color="bg-blue-50" headerColor="text-blue-700" />
         
         <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-[10px] flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>Low Impact</div>
         <Quad q="q3" title="Fill-ins" color="bg-yellow-50" headerColor="text-yellow-700" />
         <Quad q="q4" title="Thankless Tasks" color="bg-red-50" headerColor="text-red-700" />
       </div>
    </div>
  );
}
