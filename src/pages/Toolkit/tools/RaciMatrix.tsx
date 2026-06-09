import { useState } from 'react';

export function RaciMatrix() {
  const [roles, setRoles] = useState(['Owner', 'Spouse', 'Ranch Hand', 'Vet', 'Contractor']);
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Order vaccines and supplies', auth: { 0: 'A', 1: 'I', 2: 'R', 3: 'C', 4: '' } as Record<number, string> },
    { id: '2', name: 'Check fences in calving pasture', auth: { 0: 'I', 1: '', 2: 'A', 3: '', 4: '' } },
    { id: '3', name: 'Perform difficult pulls', auth: { 0: 'A', 1: 'I', 2: 'C', 3: 'R', 4: '' } },
    { id: '4', name: 'Build new warning shelter', auth: { 0: 'A', 1: 'C', 2: 'I', 3: '', 4: 'R' } },
  ]);

  const addRole = () => setRoles([...roles, 'New Role']);
  const addTask = () => setTasks([...tasks, { id: Date.now().toString(), name: 'New Task', auth: {} }]);

  const updateRole = (idx: number, name: string) => {
    const r = [...roles]; r[idx] = name; setRoles(r);
  };
  const updateTask = (id: string, name: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, name } : t));
  };
  const updateAuth = (taskId: string, roleIdx: number, val: string) => {
    setTasks(tasks.map(t => {
       if (t.id === taskId) {
          return { ...t, auth: { ...t.auth, [roleIdx]: val } };
       }
       return t;
    }));
  };

  const getBg = (val: string) => {
    switch(val) {
      case 'R': return 'bg-blue-100 text-blue-800 font-bold';
      case 'A': return 'bg-red-100 text-red-800 font-bold';
      case 'C': return 'bg-yellow-100 text-yellow-800 font-bold';
      case 'I': return 'bg-slate-200 text-slate-800 font-bold';
      default: return 'bg-transparent text-slate-400';
    }
  };

  return (
    <div className="space-y-6 overflow-x-auto min-h-[500px]">
       <div className="flex flex-wrap gap-4 bg-slate-50 border border-slate-200 p-4 text-sm mb-4">
         <span className="font-bold uppercase tracking-[1px] text-[11px] text-slate-500 mr-2 flex items-center">Legend:</span>
         <span className="flex items-center"><span className="w-6 h-6 inline-flex justify-center items-center rounded mr-2 bg-blue-100 text-blue-800 font-bold text-xs">R</span> Responsible (Does the work)</span>
         <span className="flex items-center"><span className="w-6 h-6 inline-flex justify-center items-center rounded mr-2 bg-red-100 text-red-800 font-bold text-xs">A</span> Accountable (Final say/approves)</span>
         <span className="flex items-center"><span className="w-6 h-6 inline-flex justify-center items-center rounded mr-2 bg-yellow-100 text-yellow-800 font-bold text-xs">C</span> Consulted (Prior feedback needed)</span>
         <span className="flex items-center"><span className="w-6 h-6 inline-flex justify-center items-center rounded mr-2 bg-slate-200 text-slate-800 font-bold text-xs">I</span> Informed (Notified after)</span>
       </div>

       <div className="border border-slate-200 bg-white rounded-sm">
         <table className="w-full border-collapse text-left whitespace-nowrap">
           <thead>
             <tr className="bg-slate-50 border-b border-slate-200">
               <th className="p-3 w-1/3 min-w-[200px]">
                 <span className="text-[11px] font-bold uppercase tracking-[1px] text-slate-500">Tasks</span>
               </th>
               {roles.map((r, i) => (
                  <th key={i} className="p-2 border-l border-slate-200 min-w-[100px] text-center">
                    <input className="w-full bg-transparent border-none p-1 text-sm font-bold text-slate-900 focus:ring-0 text-center" value={r} onChange={e => updateRole(i, e.target.value)} />
                  </th>
               ))}
               <th className="p-2 border-l border-slate-200 w-10"></th>
             </tr>
           </thead>
           <tbody>
             {tasks.map((t) => (
               <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-3">
                    <input className="w-full p-2 border border-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={t.name} onChange={e => updateTask(t.id, e.target.value)} />
                  </td>
                  {roles.map((_, ridx) => {
                    const val = t.auth[ridx] || '';
                    return (
                      <td key={ridx} className="border-l border-slate-100 p-2 text-center h-full">
                         <select 
                           className={`w-full p-2 border-none focus:ring-0 text-center appearance-none cursor-pointer rounded-sm ${getBg(val)}`}
                           value={val}
                           onChange={e => updateAuth(t.id, ridx, e.target.value)}
                         >
                           <option value="">-</option>
                           <option value="R">R (Responsible)</option>
                           <option value="A">A (Accountable)</option>
                           <option value="C">C (Consulted)</option>
                           <option value="I">I (Informed)</option>
                         </select>
                      </td>
                    );
                  })}
                  <td className="p-2 border-l border-slate-100 text-center">
                     <button onClick={() => setTasks(tasks.filter(x=>x.id!==t.id))} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 font-bold">×</button>
                  </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
       
       <div className="flex gap-4">
         <button onClick={addTask} className="text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-sm hover:bg-slate-800 tracking-wide uppercase">Add Task</button>
         <button onClick={addRole} className="text-xs font-bold text-slate-900 bg-slate-200 px-4 py-2 rounded-sm hover:bg-slate-300 tracking-wide uppercase">Add Role</button>
       </div>
    </div>
  );
}
