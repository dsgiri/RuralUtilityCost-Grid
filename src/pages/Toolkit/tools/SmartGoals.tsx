import { useState } from 'react';

export function SmartGoals() {
  const [goal, setGoal] = useState({
    s: 'Install 5000 feet of high-tensile perimeter fencing for the north pasture.',
    m: 'Tracked by 5 segments of 1000 feet, completing one segment per week.',
    a: 'We have the equipment, budget is secured, and soil is soft enough right now.',
    r: 'Essential for expanding our rotational grazing capacity and reducing feed costs.',
    t: 'Finished before the first freeze in November (5 weeks from start).',
  });

  const readinessScore = Object.values(goal).filter(v => v.trim().length > 10).length * 20;

  const Field = ({ label, letter, val, keyName, placeholder, helper }: any) => (
    <div className="bg-slate-50 border border-slate-200 p-4 relative group">
       <div className="absolute -left-3 -top-3 w-8 h-8 rounded bg-slate-900 text-white font-serif font-bold flex items-center justify-center text-lg">{letter}</div>
       <div className="pl-6">
         <h3 className="font-bold text-sm uppercase tracking-[1px] mb-1">{label}</h3>
         <p className="text-[11px] text-slate-500 mb-2">{helper}</p>
         <textarea 
           className="w-full bg-white border border-slate-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
           rows={2}
           placeholder={placeholder}
           value={val}
           onChange={e => setGoal({ ...goal, [keyName]: e.target.value })}
         />
       </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/3 space-y-4 pt-2 ml-3">
        <Field letter="S" label="Specific" keyName="s" val={goal.s} placeholder="What exactly needs to be done?" helper="Who, what, where, why?" />
        <Field letter="M" label="Measurable" keyName="m" val={goal.m} placeholder="How will you track progress?" helper="How much? How many? How will you know when it is accomplished?" />
        <Field letter="A" label="Achievable" keyName="a" val={goal.a} placeholder="Is this realistic?" helper="Do you have the resources, skills, and time?" />
        <Field letter="R" label="Relevant" keyName="r" val={goal.r} placeholder="Why does this matter right now?" helper="Does this align with your broader goals and current priorities?" />
        <Field letter="T" label="Time-bound" keyName="t" val={goal.t} placeholder="When is the deadline?" helper="Exactly when should this be completed?" />
      </div>
      
      <div className="w-full lg:w-1/3 mt-3">
         <div className="bg-white border border-slate-200 shadow-sm sticky top-[80px]">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white">
              <h3 className="font-bold text-sm uppercase tracking-[1px] flex justify-between items-center">
                 Goal Summary
                 <span className={`px-2 py-1 text-[10px] rounded font-bold transition-colors ${readinessScore === 100 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-slate-900'}`}>{readinessScore}% Ready</span>
              </h3>
            </div>
            <div className="p-6 prose prose-slate prose-sm text-slate-700">
               <p className={goal.s ? 'text-black font-semibold' : 'text-slate-400 italic'}>{goal.s || '[Specific definition missing]'}</p>
               <p className={goal.m ? '' : 'text-slate-400 italic'}><strong>Measure:</strong> {goal.m || '...'}</p>
               <p className={goal.a ? '' : 'text-slate-400 italic'}><strong>Feasibility:</strong> {goal.a || '...'}</p>
               <p className={goal.r ? '' : 'text-slate-400 italic'}><strong>Relevance:</strong> {goal.r || '...'}</p>
               <p className={goal.t ? 'text-blue-700 font-medium' : 'text-slate-400 italic'}><strong>Deadline:</strong> {goal.t || '...'}</p>
            </div>
         </div>
      </div>
    </div>
  );
}
