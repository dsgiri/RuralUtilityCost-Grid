import { useState } from 'react';

interface Rule {
  id: string;
  ifStmt: string;
  thenStmt: string;
  reason: string;
}

export function IfThenLogic() {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', ifStmt: 'Cash preservation matters most', thenStmt: 'Lease or finance the equipment.', reason: 'Keeps cash on hand for unpredictable feed/fertilizer spikes.' },
    { id: '2', ifStmt: 'Long-term lowest cost matters most', thenStmt: 'Buy used equipment with cash.', reason: 'Avoids interest payments and heavy initial depreciation.' },
    { id: '3', ifStmt: 'Uptime and reliability is critical', thenStmt: 'Buy or lease new with comprehensive dealer warranty.', reason: 'Downtime during harvest costs more than the premium of new equipment.' },
  ]);

  const addRule = () => {
    setRules([...rules, { id: Date.now().toString(), ifStmt: 'New condition...', thenStmt: 'New action...', reason: 'Because...' }]);
  };

  const updateRule = (id: string, updates: Partial<Rule>) => {
    setRules(rules.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-sm">
         <p className="text-sm text-slate-700">Read down the left column. When you find your primary constraint, look right for the logical action.</p>
         <button onClick={addRule} className="text-[12px] bg-slate-900 text-white px-4 py-2 rounded-sm hover:bg-slate-800 font-medium tracking-wide">
           + Add Rule
         </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rules.map((rule, idx) => (
          <div key={rule.id} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 rounded-sm bg-white hover:border-slate-300 transition-colors group">
             <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[1px] text-slate-400">If...</label>
                <input 
                  className="w-full text-[15px] font-medium text-slate-900 border-none bg-transparent focus:ring-0 p-0"
                  value={rule.ifStmt}
                  onChange={e => updateRule(rule.id, { ifStmt: e.target.value })}
                />
             </div>
             
             <div className="hidden md:flex items-center text-slate-300 px-2 font-light text-2xl">
                →
             </div>

             <div className="flex-1 space-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
                <label className="text-[10px] font-bold uppercase tracking-[1px] text-slate-400">Then...</label>
                <input 
                  className="w-full text-[15px] font-bold text-blue-700 border-none bg-transparent focus:ring-0 p-0"
                  value={rule.thenStmt}
                  onChange={e => updateRule(rule.id, { thenStmt: e.target.value })}
                />
                <input 
                  className="w-full text-[13px] text-slate-500 border-none bg-transparent focus:ring-0 p-0 mt-1"
                  value={rule.reason}
                  onChange={e => updateRule(rule.id, { reason: e.target.value })}
                  placeholder="Reasoning..."
                />
             </div>
             <button onClick={() => setRules(rules.filter(r => r.id !== rule.id))} className="text-slate-300 hover:text-red-500 md:opacity-0 group-hover:opacity-100 transition-opacity p-2">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
