import { useState } from 'react';

export function FiveWhys() {
  const [problem, setProblem] = useState('The irrigation pump seized and burned out the motor.');
  const [whys, setWhys] = useState(['Because the intake line pulled in heavy mud.', 'Because the foot valve was resting on the pond floor.', 'Because the float broke off during the recent storm.', 'Because we used cheap, non-UV resistant zip ties to secure the float.', 'Because we didn\'t have stainless steel clamps in the truck on install day.']);
  const [root, setRoot] = useState('Lack of proper field inventory checklists leading to cut-corners on installation.');

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-6">
        <label className="text-[10px] font-bold uppercase text-red-700 tracking-[1px] mb-2 block">Problem Statement</label>
        <textarea className="w-full bg-transparent border-b border-red-200 focus:border-red-500 focus:ring-0 p-0 text-xl font-serif text-slate-900 resize-none" value={problem} onChange={e => setProblem(e.target.value)} />
      </div>

      <div className="space-y-4 pl-4 border-l-2 border-slate-200 ml-4 relative">
        {whys.map((why, i) => (
          <div key={i} className="flex gap-4 items-start relative">
            <div className="absolute -left-[30px] top-4 w-6 h-0.5 bg-slate-200"></div>
            <div className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-1 z-10 text-xs shadow-sm">
              W{i+1}
            </div>
            <div className="flex-1 bg-white p-4 border border-slate-200 shadow-sm">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[1px] mb-1 block">Why did that happen?</label>
              <textarea className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-slate-800 resize-none h-10" value={why} onChange={e => {
                 const n = [...whys]; n[i] = e.target.value; setWhys(n);
              }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-6">
        <label className="text-[10px] font-bold uppercase text-green-700 tracking-[1px] mb-2 block">Root Cause & Action</label>
        <textarea className="w-full bg-transparent border-b border-green-200 focus:border-green-500 focus:ring-0 p-0 text-[15px] font-medium text-slate-900 resize-none" value={root} onChange={e => setRoot(e.target.value)} rows={3} />
      </div>
    </div>
  );
}
