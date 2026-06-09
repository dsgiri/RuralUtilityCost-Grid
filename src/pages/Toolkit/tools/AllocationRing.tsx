import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function AllocationRing() {
  const [data, setData] = useState([
    { name: 'Feed & Supplements', value: 45000, color: '#3b82f6' },
    { name: 'Veterinary Care', value: 8000, color: '#ea580c' },
    { name: 'Fuel & Maintenance', value: 12000, color: '#eab308' },
    { name: 'Capital Improvements', value: 25000, color: '#22c55e' },
    { name: 'Insurance & Taxes', value: 10000, color: '#64748b' },
  ]);

  const total = data.reduce((s,d)=>s+d.value,0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
       <div className="w-full lg:w-1/2 space-y-4">
         <div className="flex justify-between items-center mb-4">
           <h3 className="font-bold text-slate-900 border-b border-slate-200 w-full pb-2">Allocations</h3>
         </div>
         {data.map((d, i) => (
           <div key={i} className="flex gap-4 items-center">
             <div className="w-4 h-4 rounded" style={{ backgroundColor: d.color }}></div>
             <input className="flex-1 border-b border-slate-200 p-1 text-sm bg-transparent" value={d.name} onChange={e => {
                const n = [...data]; n[i].name = e.target.value; setData(n);
             }} />
             <div className="relative">
                <span className="absolute left-2 top-1.5 text-slate-400 text-sm">$</span>
                <input type="number" className="w-32 border border-slate-300 p-1 pl-6 text-sm text-right" value={d.value} onChange={e => {
                   const n = [...data]; n[i].value = Number(e.target.value)||0; setData(n);
                }} />
             </div>
             <div className="w-12 text-right text-xs text-slate-500 font-bold">
               {total > 0 ? Math.round((d.value/total)*100) : 0}%
             </div>
           </div>
         ))}
         <div className="pt-4 flex justify-between font-bold">
           <span>Total Allocation:</span>
           <span className="text-xl text-slate-900">${total.toLocaleString()}</span>
         </div>
       </div>
       <div className="w-full lg:w-1/2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie 
                 data={data} 
                 cx="50%" cy="50%" 
                 innerRadius="60%"
                 outerRadius="80%" 
                 paddingAngle={2}
                 dataKey="value"
               >
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
               <Legend />
             </PieChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
}
