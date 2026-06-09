import React, { useState } from 'react';
import { Layout } from '../components/Layout';
// --- FORMAT 1: X/Y Decision Matrix (2x2 Grid) ---
const XYDecisionMatrix = () => {
    return (
        <div className="animate-fade-in mx-auto flex flex-col items-center bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-stone-200">
            <h2 className="text-xl font-bold mb-8 text-stone-800 text-center">Available Capital vs. Expected Lifespan</h2>
            
            {/* X/Y Grid container */}
            <div className="relative w-full max-w-2xl aspect-square md:aspect-[4/3] flex">
                
                {/* Y-Axis Label */}
                <div className="w-12 flex flex-col justify-between items-center py-4 text-sm font-bold text-stone-500">
                    <span className="-rotate-90 whitespace-nowrap mb-8">High Cash</span>
                    <span className="-rotate-90 whitespace-nowrap tracking-widest text-emerald-700">&larr; CAPITAL &rarr;</span>
                    <span className="-rotate-90 whitespace-nowrap mt-8">Low Cash</span>
                </div>

                {/* The 2x2 Grid */}
                <div className="flex-1 flex flex-col border-l-4 border-b-4 border-stone-800 relative">
                    
                    {/* Top Row */}
                    <div className="flex-1 flex border-b-2 border-stone-300 border-dashed">
                        <div className="flex-1 border-r-2 border-stone-300 border-dashed bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer group">
                            <h3 className="font-bold text-xl text-blue-800 group-hover:scale-110 transition-transform">Used Buy</h3>
                            <p className="text-sm text-blue-600 mt-2 hidden md:block">Cheaper upfront, own it outright, lower risk if tech changes.</p>
                        </div>
                        <div className="flex-1 bg-emerald-50 hover:bg-emerald-100 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer group">
                            <h3 className="font-bold text-xl text-emerald-800 group-hover:scale-110 transition-transform">Cash Buy</h3>
                            <p className="text-sm text-emerald-600 mt-2 hidden md:block">Lowest lifetime cost. Highest long-term equity.</p>
                        </div>
                    </div>
                    
                    {/* Bottom Row */}
                    <div className="flex-1 flex">
                        <div className="flex-1 border-r-2 border-stone-300 border-dashed bg-orange-50 hover:bg-orange-100 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer group">
                            <h3 className="font-bold text-xl text-orange-800 group-hover:scale-110 transition-transform">Lease</h3>
                            <p className="text-sm text-orange-600 mt-2 hidden md:block">Keep cash flowing, easy upgrade path, covered maintenance.</p>
                        </div>
                        <div className="flex-1 bg-purple-50 hover:bg-purple-100 transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer group">
                            <h3 className="font-bold text-xl text-purple-800 group-hover:scale-110 transition-transform">Finance / Loan</h3>
                            <p className="text-sm text-purple-600 mt-2 hidden md:block">Keep cash now, but eventually own for the long haul.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            {/* X-Axis Label */}
            <div className="w-full max-w-2xl pl-12 flex justify-between pt-4 text-sm font-bold text-stone-500">
                <span>Short-term Use (1-3 yrs)</span>
                <span className="tracking-widest text-emerald-700 hidden sm:inline">&larr; LIFESPAN &rarr;</span>
                <span>Long-term Use (7+ yrs)</span>
            </div>
        </div>
    );
};

// --- FORMAT 2: If / Then Logic ---
const IfThenLogic = () => {
    const [selectedIf, setSelectedIf] = useState(0);
    
    const ifThenRules = [
        { if: "I need to preserve my upfront cash", then: "LEASE", reason: "Leasing requires little to no down payment, keeping your working capital free for daily farm operations." },
        { if: "I want the lowest total cost over 10 years", then: "BUY", reason: "Buying avoids leasing premiums and interest rates, resulting in the cheapest lifetime cost." },
        { if: "I want to upgrade to new tech in 3 years", then: "LEASE", reason: "Leases allow you to easily hand back old equipment and sign a new lease for the latest model." },
        { if: "I want to build equity and own the asset", then: "BUY", reason: "When the payments are done, you own a physical asset with resale value." },
        { if: "I don't want to worry about major repairs", then: "LEASE", reason: "Many leases include comprehensive maintenance packages, shifting the repair risk to the dealer." }
    ];

    return (
        <div className="animate-fade-in max-w-3xl mx-auto">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-stone-800">Select your top priority:</h2>
            </div>
            
            <div className="flex flex-col gap-3 mb-8">
                {ifThenRules.map((rule, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setSelectedIf(idx)}
                        className={`text-left p-4 rounded-xl border-2 transition-all shadow-sm focus:outline-none ${selectedIf === idx ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:border-emerald-300 bg-white'}`}
                    >
                        <span className="font-bold text-stone-400 mr-3">IF</span>
                        <span className="font-semibold text-stone-800">{rule.if}...</span>
                    </button>
                ))}
            </div>

            <div className="bg-stone-800 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl font-black transform translate-x-4 -translate-y-4">?</div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <span className="text-2xl font-bold text-stone-400">THEN</span>
                    <span className={`text-5xl font-black tracking-tight ${ifThenRules[selectedIf].then === 'BUY' ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {ifThenRules[selectedIf].then}
                    </span>
                </div>
                <p className="text-stone-300 text-lg leading-relaxed max-w-2xl relative z-10">
                    {ifThenRules[selectedIf].reason}
                </p>
            </div>
        </div>
    );
};

// --- FORMAT 3: Weighted Scoring Matrix ---
const WeightedScoring = () => {
    const criteria = [
        { id: 'c1', name: 'Upfront Cost', weight: 3 },
        { id: 'c2', name: 'Horsepower', weight: 2 },
        { id: 'c3', name: 'Maintenance Ease', weight: 2 },
        { id: 'c4', name: 'Resale Value', weight: 1 }
    ];
    
    interface ScoresType {
        [key: string]: { [key: string]: number };
    }
    
    const [scores, setScores] = useState<ScoresType>({
        'opt1': { c1: 4, c2: 3, c3: 5, c4: 3 },
        'opt2': { c1: 2, c2: 5, c3: 2, c4: 4 },
        'opt3': { c1: 3, c2: 4, c3: 4, c4: 5 }
    });

    const options = [
        { id: 'opt1', name: 'Used Utility Tractor (40hp)' },
        { id: 'opt2', name: 'New Heavy Tractor (75hp)' },
        { id: 'opt3', name: 'Refurbished Mid-size (60hp)' }
    ];

    const handleScoreChange = (optId: string, critId: string, val: string) => {
        const newScores = { ...scores };
        newScores[optId][critId] = parseInt(val) || 0;
        setScores(newScores);
    };

    const calculateTotal = (optId: string) => {
        return criteria.reduce((sum, crit) => sum + (scores[optId][crit.id] * crit.weight), 0);
    };

    const totals = options.map(opt => ({ ...opt, total: calculateTotal(opt.id) }));
    const maxScore = Math.max(...totals.map(t => t.total));

    return (
        <div className="animate-fade-in overflow-x-auto bg-white rounded-xl shadow-sm border border-stone-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                        <th className="p-4 font-semibold text-stone-600">Options</th>
                        {criteria.map(c => (
                            <th key={c.id} className="p-4 font-semibold text-stone-600 text-center">
                                {c.name}<br/>
                                <span className="text-xs text-stone-400 font-normal">Weight: x{c.weight}</span>
                            </th>
                        ))}
                        <th className="p-4 font-bold text-stone-800 text-right bg-stone-100">Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    {options.map(opt => {
                        const total = calculateTotal(opt.id);
                        const isWinner = total === maxScore;
                        return (
                            <tr key={opt.id} className={`border-b border-stone-100 ${isWinner ? 'bg-emerald-50/50' : 'hover:bg-stone-50'}`}>
                                <td className="p-4 font-medium text-stone-800">
                                    {opt.name}
                                    {isWinner && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Top Pick</span>}
                                </td>
                                {criteria.map(c => (
                                    <td key={c.id} className="p-4 text-center">
                                        <select 
                                            value={scores[opt.id][c.id]} 
                                            onChange={(e) => handleScoreChange(opt.id, c.id, e.target.value)}
                                            className="block w-16 mx-auto rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-1 border text-center outline-none"
                                        >
                                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </td>
                                ))}
                                <td className={`p-4 text-right font-bold text-lg ${isWinner ? 'text-emerald-600' : 'text-stone-600'} bg-stone-50/50`}>
                                    {total}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// --- FORMAT 4: Interactive Decision Tree ---
const DecisionTree = () => {
    type TreeNode = { q?: string; y?: string; n?: string; result?: string; type?: string };
    const tree: Record<string, TreeNode> = {
        start: { q: "Does the calf have diarrhea (scours)?", y: "n2", n: "n3" },
        n2: { q: "Is the calf showing signs of severe dehydration (sunken eyes, won't stand)?", y: "r1", n: "r2" },
        n3: { q: "Is the calf breathing heavily or coughing?", y: "r3", n: "r4" },
        r1: { result: "URGENT: Call vet immediately. Administer IV fluids. Isolate calf.", type: "danger" },
        r2: { result: "Moderate: Administer oral electrolytes. Monitor closely for 12 hours. Isolate.", type: "warning" },
        r3: { result: "Check temperature. Likely respiratory infection (Pneumonia). Consult vet for antibiotics.", type: "warning" },
        r4: { result: "Monitor normal behavior. Ensure adequate colostrum/milk intake.", type: "success" }
    };

    const [history, setHistory] = useState<string[]>(['start']);
    const currentNodeId = history[history.length - 1];
    const node = tree[currentNodeId];

    const handleChoice = (nextId?: string) => {
        if(nextId) setHistory([...history, nextId]);
    };

    const reset = () => setHistory(['start']);

    return (
        <div className="animate-fade-in max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-stone-200 text-center relative overflow-hidden">
            {history.length > 1 && (
                <button onClick={() => setHistory(history.slice(0, -1))} className="absolute top-4 left-4 text-sm text-stone-400 hover:text-stone-600 font-medium transition-colors">
                    &larr; Back
                </button>
            )}
            
            <div key={currentNodeId} className="animate-fade-in py-8">
                {node.q ? (
                    <div>
                        <h3 className="text-xl font-medium text-stone-800 mb-8">{node.q}</h3>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => handleChoice(node.y)} className="px-8 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 font-bold transition-transform hover:scale-105 shadow-md">Yes</button>
                            <button onClick={() => handleChoice(node.n)} className="px-8 py-3 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 font-bold transition-transform hover:scale-105 shadow-md">No</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                            node.type === 'danger' ? 'bg-red-100 text-red-600' : 
                            node.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className={`text-2xl font-bold mb-6 ${
                            node.type === 'danger' ? 'text-red-700' : 
                            node.type === 'warning' ? 'text-amber-700' : 'text-emerald-700'
                        }`}>{node.result}</h3>
                        <button onClick={reset} className="text-stone-500 underline hover:text-stone-800 transition-colors">Start Over</button>
                    </div>
                )}
            </div>
            
            {/* Progress dots */}
            <div className="mt-8 flex justify-center gap-2">
                {history.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === history.length - 1 ? 'bg-emerald-500' : 'bg-stone-200'}`}></div>
                ))}
            </div>
        </div>
    );
};

// --- FORMAT 5: Action Priority Matrix ---
const PriorityMatrix = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Fix broken pasture fence", urgent: true, important: true },
        { id: 2, text: "Order next month's feed", urgent: false, important: true },
        { id: 3, text: "Call regarding tractor warranty", urgent: true, important: false },
        { id: 4, text: "Repaint barn trim", urgent: false, important: false },
    ]);
    const [newTask, setNewTask] = useState("");

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, urgent: true, important: true }]);
        setNewTask("");
    };

    const toggleStatus = (id: number, field: 'urgent' | 'important') => {
        setTasks(tasks.map(t => t.id === id ? { ...t, [field]: !t[field] } : t));
    };

    const renderQuadrant = (title: string, u: boolean, i: boolean, bgClass: string, headerClass: string) => {
        const filtered = tasks.filter(t => t.urgent === u && t.important === i);
        return (
            <div className={`${bgClass} p-4 flex flex-col min-h-[160px]`}>
                <h4 className={`font-bold text-sm uppercase tracking-wider mb-3 ${headerClass}`}>{title}</h4>
                <ul className="space-y-2 flex-1">
                    {filtered.map(t => (
                        <li key={t.id} className="bg-white p-2 rounded shadow-sm text-sm border border-stone-100 flex justify-between items-start group">
                            <span>{t.text}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button type="button" onClick={() => toggleStatus(t.id, 'urgent')} title="Toggle Urgency" className="text-xs px-1.5 py-0.5 bg-stone-100 rounded text-stone-500 hover:text-stone-800">U</button>
                                <button type="button" onClick={() => toggleStatus(t.id, 'important')} title="Toggle Importance" className="text-xs px-1.5 py-0.5 bg-stone-100 rounded text-stone-500 hover:text-stone-800">I</button>
                            </div>
                        </li>
                    ))}
                    {filtered.length === 0 && <li className="text-stone-400 text-sm italic">Drop task here...</li>}
                </ul>
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6 flex justify-end">
                <form onSubmit={addTask} className="flex gap-2 w-full md:w-auto">
                    <input type="text" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Add a new task..." className="flex-1 md:w-64 px-3 py-2 border border-stone-300 rounded shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                    <button type="submit" className="px-4 py-2 bg-stone-800 text-white rounded text-sm font-medium hover:bg-stone-700 transition-colors">Add Task</button>
                </form>
            </div>

            <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-1 bg-stone-300 border-4 border-stone-300 rounded-xl overflow-hidden shadow-lg mx-auto">
                {/* Headers */}
                <div className="bg-white p-2"></div>
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs">Urgent</div>
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs">Not Urgent</div>
                
                {/* Row 1 */}
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs writing-vertical flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>Important</div>
                {renderQuadrant("Do First", true, true, "bg-red-50", "text-red-700")}
                {renderQuadrant("Schedule", false, true, "bg-blue-50", "text-blue-700")}
                
                {/* Row 2 */}
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs writing-vertical flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>Not Important</div>
                {renderQuadrant("Delegate", true, false, "bg-amber-50", "text-amber-700")}
                {renderQuadrant("Eliminate", false, false, "bg-stone-100", "text-stone-500")}
            </div>
        </div>
    );
};

// --- FORMAT 6: Cost-Benefit Balance Scale ---
const TChart = () => {
    type ItemType = {id: number, text: string, weight: number};
    const [pros, setPros] = useState<ItemType[]>([{id: 1, text: "Lower upfront cost", weight: 4}, {id: 2, text: "Keeps historical aesthetic", weight: 2}]);
    const [cons, setCons] = useState<ItemType[]>([{id: 1, text: "Higher ongoing maintenance", weight: 3}, {id: 2, text: "Drafty for livestock in winter", weight: 5}]);
    
    const totalPros = pros.reduce((sum, i) => sum + i.weight, 0);
    const totalCons = cons.reduce((sum, i) => sum + i.weight, 0);
    
    // Calculate rotation. Max tilt is roughly 25 degrees.
    const difference = totalPros - totalCons;
    const tilt = Math.max(-25, Math.min(25, difference * 3));

    const updateItem = (list: ItemType[], setList: (v: ItemType[]) => void, id: number, val: string) => {
        setList(list.map(item => item.id === id ? { ...item, weight: parseInt(val) } : item));
    };

    const ListEditor = ({ items, setItems, title, colorClass, inputClass }: {items: ItemType[], setItems: (v: ItemType[]) => void, title: string, colorClass: string, inputClass: string}) => (
        <div className={`flex-1 p-6 rounded-xl border-2 bg-white ${colorClass}`}>
            <h3 className="text-xl font-bold mb-4 flex justify-between">
                {title} <span className="text-stone-400">Score: {items.reduce((s, i)=>s+i.weight,0)}</span>
            </h3>
            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-center">
                        <input type="text" value={item.text} readOnly className="flex-1 bg-stone-50 border border-stone-200 rounded p-2 text-sm text-stone-700 outline-none" />
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase font-bold text-stone-400">Weight</span>
                            <select value={item.weight} onChange={(e) => updateItem(items, setItems, item.id, e.target.value)} className={`border rounded p-1 text-sm ${inputClass} outline-none font-bold`}>
                                {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in mx-auto">
            {/* The Visual Scale */}
            <div className="py-12 flex justify-center mb-4 overflow-hidden relative">
                <div className="w-1 h-32 bg-stone-300 absolute bottom-0 left-1/2 -translate-x-1/2 z-0"></div>
                <div className="w-8 h-8 rounded-full bg-stone-400 absolute bottom-32 left-1/2 -translate-x-1/2 z-10"></div>
                <div 
                    className="w-3/4 max-w-lg h-4 bg-stone-700 absolute bottom-[140px] left-1/2 -translate-x-1/2 origin-center scale-transition z-20 rounded-full flex justify-between items-center px-2"
                    style={{ transform: `translateX(-50%) rotate(${tilt}deg)`, transition: 'transform 0.5s ease-out' }}
                >
                    {/* Pro Weight Indicator */}
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold transform -translate-y-6 shadow-lg">{totalPros}</div>
                    {/* Con Weight Indicator */}
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold transform -translate-y-6 shadow-lg">{totalCons}</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-8">
                <ListEditor items={pros} setItems={setPros} title="Pros (Benefits)" colorClass="border-emerald-200" inputClass="text-emerald-700 bg-emerald-50" />
                <ListEditor items={cons} setItems={setCons} title="Cons (Costs/Risks)" colorClass="border-red-200" inputClass="text-red-700 bg-red-50" />
            </div>
        </div>
    );
};

// --- FORMAT 7: SWOT Analysis Grid ---
const SWOTAnalysis = () => {
    const initial = {
        s: "Existing customer base at local market\nOwned extraction equipment\nDebt-free operation",
        w: "Limited time (weekend only)\nLack of commercial transport vehicle\nNo marketing budget",
        o: "Local grocery store looking for local honey\nRising price of commercial sugar\nState grant for agriculture available",
        t: "Increasing Varroa mite resistance\nDrought affecting nectar flow\nNew commercial apiary opened 10 miles away"
    };

    return (
        <div className="animate-fade-in mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-xl p-6 border-l-8 border-emerald-500 shadow-sm">
                <h3 className="text-xl font-bold text-emerald-800 mb-2 uppercase tracking-wide flex items-center justify-between">
                    Strengths <span className="text-xs bg-emerald-200 px-2 py-1 rounded text-emerald-900">Internal / Helpful</span>
                </h3>
                <textarea defaultValue={initial.s} className="w-full h-32 p-3 rounded bg-white/60 border-emerald-200 text-stone-700 outline-none focus:ring-2 focus:ring-emerald-400 resize-none"></textarea>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-6 border-l-8 border-amber-500 shadow-sm">
                <h3 className="text-xl font-bold text-amber-800 mb-2 uppercase tracking-wide flex items-center justify-between">
                    Weaknesses <span className="text-xs bg-amber-200 px-2 py-1 rounded text-amber-900">Internal / Harmful</span>
                </h3>
                <textarea defaultValue={initial.w} className="w-full h-32 p-3 rounded bg-white/60 border-amber-200 text-stone-700 outline-none focus:ring-2 focus:ring-amber-400 resize-none"></textarea>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-l-8 border-blue-500 shadow-sm">
                <h3 className="text-xl font-bold text-blue-800 mb-2 uppercase tracking-wide flex items-center justify-between">
                    Opportunities <span className="text-xs bg-blue-200 px-2 py-1 rounded text-blue-900">External / Helpful</span>
                </h3>
                <textarea defaultValue={initial.o} className="w-full h-32 p-3 rounded bg-white/60 border-blue-200 text-stone-700 outline-none focus:ring-2 focus:ring-blue-400 resize-none"></textarea>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-l-8 border-red-500 shadow-sm">
                <h3 className="text-xl font-bold text-red-800 mb-2 uppercase tracking-wide flex items-center justify-between">
                    Threats <span className="text-xs bg-red-200 px-2 py-1 rounded text-red-900">External / Harmful</span>
                </h3>
                <textarea defaultValue={initial.t} className="w-full h-32 p-3 rounded bg-white/60 border-red-200 text-stone-700 outline-none focus:ring-2 focus:ring-red-400 resize-none"></textarea>
            </div>
        </div>
    );
};

// --- FORMAT 8: Radar Chart Profiling ---
const RadarChart = () => {
    const labels = ["Protein Content", "Energy (TDN)", "Cost Efficiency", "Local Availability", "Palatability"];
    
    const [profileA, setProfileA] = useState([8, 9, 4, 5, 8]); // Custom Mix
    const [profileB, setProfileB] = useState([6, 7, 8, 9, 6]); // Bulk Commercial
    
    const maxVal = 10;
    const size = 300;
    const center = size / 2;
    const radius = (size / 2) - 40;

    const getPoints = (values: number[]) => {
        return values.map((val, i) => {
            const angle = (Math.PI / 2) - (2 * Math.PI * i / labels.length);
            const r = (val / maxVal) * radius;
            const x = center + r * Math.cos(angle);
            const y = center - r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    };

    return (
        <div className="animate-fade-in mx-auto flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
            <div className="flex-1 w-full">
                <div className="space-y-6">
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <h4 className="font-bold text-emerald-800 mb-2">Option A: Custom Feed Mix</h4>
                        {labels.map((label, i) => (
                            <div key={'a'+i} className="flex items-center text-sm mb-1">
                                <span className="w-32 truncate">{label}</span>
                                <input type="range" min="1" max="10" value={profileA[i]} onChange={(e) => {
                                    const newP = [...profileA]; newP[i] = parseInt(e.target.value); setProfileA(newP);
                                }} className="flex-1 ml-2 accent-emerald-500" />
                                <span className="w-6 text-right ml-2 font-mono text-stone-500">{profileA[i]}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2">Option B: Commercial Bulk</h4>
                        {labels.map((label, i) => (
                            <div key={'b'+i} className="flex items-center text-sm mb-1">
                                <span className="w-32 truncate">{label}</span>
                                <input type="range" min="1" max="10" value={profileB[i]} onChange={(e) => {
                                    const newP = [...profileB]; newP[i] = parseInt(e.target.value); setProfileB(newP);
                                }} className="flex-1 ml-2 accent-blue-500" />
                                <span className="w-6 text-right ml-2 font-mono text-stone-500">{profileB[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SVG Canvas for Radar Chart */}
            <div className="w-full max-w-[350px] aspect-square flex-shrink-0 relative">
                <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible drop-shadow-sm">
                    {/* Draw Grid (concentric polygons) */}
                    {[2,4,6,8,10].map(level => {
                        const pts = labels.map((_, i) => {
                            const angle = (Math.PI / 2) - (2 * Math.PI * i / labels.length);
                            const r = (level / maxVal) * radius;
                            return `${center + r * Math.cos(angle)},${center - r * Math.sin(angle)}`;
                        }).join(' ');
                        return <polygon key={level} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    })}

                    {/* Draw Axes & Labels */}
                    {labels.map((label, i) => {
                        const angle = (Math.PI / 2) - (2 * Math.PI * i / labels.length);
                        const x = center + radius * Math.cos(angle);
                        const y = center - radius * Math.sin(angle);
                        const labelX = center + (radius + 25) * Math.cos(angle);
                        const labelY = center - (radius + 15) * Math.sin(angle);
                        
                        return (
                            <g key={'axis'+i}>
                                <line x1={center} y1={center} x2={x} y2={y} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
                                <text x={labelX} y={labelY} textAnchor="middle" alignmentBaseline="middle" fill="#57534e" fontSize="11" fontWeight="bold">
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Plot Data A */}
                    <polygon points={getPoints(profileA)} fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="3" style={{transition: 'all 0.5s ease'}} />
                    
                    {/* Plot Data B */}
                    <polygon points={getPoints(profileB)} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="3" style={{transition: 'all 0.5s ease'}} />
                </svg>
            </div>
        </div>
    );
};

// --- FORMAT 9: Impact vs Effort Matrix ---
const ImpactEffortMatrix = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Install automatic waterers", impact: true, effort: false },
        { id: 2, text: "Build new hay barn", impact: true, effort: true },
        { id: 3, text: "Fix loose gate hinge", impact: false, effort: false },
        { id: 4, text: "Hand-weed back pasture", impact: false, effort: true },
    ]);
    const [newTask, setNewTask] = useState("");

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, impact: true, effort: false }]);
        setNewTask("");
    };

    const toggleStatus = (id: number, field: 'impact'|'effort') => {
        setTasks(tasks.map(t => t.id === id ? { ...t, [field]: !t[field] } : t));
    };

    const renderQuadrant = (title: string, imp: boolean, eff: boolean, bgClass: string, headerClass: string) => {
        const filtered = tasks.filter(t => t.impact === imp && t.effort === eff);
        return (
            <div className={`${bgClass} p-4 flex flex-col min-h-[160px]`}>
                <h4 className={`font-bold text-sm uppercase tracking-wider mb-3 ${headerClass}`}>{title}</h4>
                <ul className="space-y-2 flex-1">
                    {filtered.map(t => (
                        <li key={t.id} className="bg-white p-2 rounded shadow-sm text-sm border border-stone-100 flex justify-between items-start group">
                            <span>{t.text}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button type="button" onClick={() => toggleStatus(t.id, 'impact')} title="Toggle Impact" className="text-xs px-1.5 py-0.5 bg-stone-100 rounded text-stone-500 hover:text-stone-800">I</button>
                                <button type="button" onClick={() => toggleStatus(t.id, 'effort')} title="Toggle Effort" className="text-xs px-1.5 py-0.5 bg-stone-100 rounded text-stone-500 hover:text-stone-800">E</button>
                            </div>
                        </li>
                    ))}
                    {filtered.length === 0 && <li className="text-stone-400 text-sm italic">Drop task here...</li>}
                </ul>
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6 flex justify-end">
                <form onSubmit={addTask} className="flex gap-2 w-full md:w-auto">
                    <input type="text" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Add project..." className="flex-1 md:w-64 px-3 py-2 border border-stone-300 rounded shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                    <button type="submit" className="px-4 py-2 bg-stone-800 text-white rounded text-sm font-medium hover:bg-stone-700 transition-colors">Add Project</button>
                </form>
            </div>

            <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-1 bg-stone-300 border-4 border-stone-300 rounded-xl overflow-hidden shadow-lg mx-auto">
                <div className="bg-white p-2"></div>
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs">Low Effort</div>
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs">High Effort</div>
                
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs writing-vertical flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>High Impact</div>
                {renderQuadrant("Quick Wins", true, false, "bg-emerald-50", "text-emerald-700")}
                {renderQuadrant("Major Projects", true, true, "bg-blue-50", "text-blue-700")}
                
                <div className="bg-white p-2 text-center font-bold text-stone-500 uppercase tracking-widest text-xs writing-vertical flex items-center justify-center rotate-180" style={{ writingMode: 'vertical-rl' }}>Low Impact</div>
                {renderQuadrant("Fill-ins", false, false, "bg-amber-50", "text-amber-700")}
                {renderQuadrant("Thankless Tasks", false, true, "bg-red-50", "text-red-700")}
            </div>
        </div>
    );
};

// --- FORMAT 10: MoSCoW Prioritization ---
const MoscowBoard = () => {
    const [items, setItems] = useState([
        { id: 1, text: "4WD / Front Wheel Assist", category: "must" },
        { id: 2, text: "Front End Loader", category: "must" },
        { id: 3, text: "Enclosed Cab with A/C", category: "should" },
        { id: 4, text: "Air Ride Seat", category: "could" },
        { id: 5, text: "GPS Auto-steer", category: "wont" },
    ]);
    const [newItem, setNewItem] = useState("");
    const [newCat, setNewCat] = useState("must");

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newItem.trim()) return;
        setItems([...items, { id: Date.now(), text: newItem, category: newCat }]);
        setNewItem("");
    };

    const changeCategory = (id: number, cat: string) => {
        setItems(items.map(i => i.id === id ? { ...i, category: cat } : i));
    };

    const columns = [
        { id: "must", title: "Must Have", desc: "Non-negotiable", color: "border-red-500", bg: "bg-red-50", text: "text-red-800" },
        { id: "should", title: "Should Have", desc: "Important, not vital", color: "border-amber-500", bg: "bg-amber-50", text: "text-amber-800" },
        { id: "could", title: "Could Have", desc: "Nice to have", color: "border-blue-500", bg: "bg-blue-50", text: "text-blue-800" },
        { id: "wont", title: "Won't Have", desc: "Out of scope for now", color: "border-stone-400", bg: "bg-stone-100", text: "text-stone-600" }
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-6 flex justify-end">
                <form onSubmit={addItem} className="flex gap-2 w-full md:w-auto">
                    <input type="text" value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder="Requirement..." className="flex-1 md:w-48 px-3 py-2 border border-stone-300 rounded shadow-sm text-sm focus:ring-emerald-500 outline-none" />
                    <select value={newCat} onChange={e=>setNewCat(e.target.value)} className="px-2 py-2 border border-stone-300 rounded shadow-sm text-sm bg-white outline-none focus:ring-emerald-500">
                        <option value="must">Must</option>
                        <option value="should">Should</option>
                        <option value="could">Could</option>
                        <option value="wont">Won't</option>
                    </select>
                    <button type="submit" className="px-4 py-2 bg-stone-800 text-white rounded text-sm font-medium hover:bg-stone-700 transition-colors">Add</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map(col => (
                    <div key={col.id} className={`rounded-xl border-t-8 ${col.color} bg-white shadow-sm flex flex-col overflow-hidden`}>
                        <div className={`${col.bg} p-3 border-b border-stone-100`}>
                            <h3 className={`font-bold ${col.text}`}>{col.title}</h3>
                            <p className="text-xs text-stone-500">{col.desc}</p>
                        </div>
                        <div className="p-3 flex-1 min-h-[200px] space-y-2 bg-stone-50/50">
                            {items.filter(i => i.category === col.id).map(item => (
                                <div key={item.id} className="bg-white p-3 rounded border border-stone-200 shadow-sm text-sm relative group">
                                    {item.text}
                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 bg-white/90 p-1 rounded shadow z-10">
                                        {columns.filter(c => c.id !== col.id).map(c => (
                                            <button type="button" key={c.id} onClick={() => changeCategory(item.id, c.id)} className="text-[10px] uppercase font-bold text-stone-400 hover:text-stone-800 text-left px-1">
                                                → {c.title.split(' ')[0]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- FORMAT 11: RICE Scoring Model ---
const RiceScoring = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: "Start roadside farm stand", reach: 500, impact: 4, confidence: 80, effort: 2 },
        { id: 2, name: "Wholesale to local restaurant", reach: 50, impact: 5, confidence: 90, effort: 1 },
        { id: 3, name: "Build commercial greenhouse", reach: 1000, impact: 4, confidence: 50, effort: 12 },
    ]);

    const updateField = (id: number, field: string, val: string) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: Number(val) || 0 } : p));
    };

    const calculateRice = (p: any) => {
        if (p.effort === 0) return 0;
        return ((p.reach * p.impact * (p.confidence / 100)) / p.effort).toFixed(1);
    };

    const sortedProjects = [...projects].sort((a, b) => Number(calculateRice(b)) - Number(calculateRice(a)));

    return (
        <div className="animate-fade-in overflow-x-auto bg-white rounded-xl shadow-sm border border-stone-200">
            <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                        <th className="p-4 font-semibold text-stone-600">Project / Idea</th>
                        <th className="p-4 font-semibold text-stone-600 w-24">Reach<br/><span className="text-xs font-normal text-stone-400">(Customers)</span></th>
                        <th className="p-4 font-semibold text-stone-600 w-24">Impact<br/><span className="text-xs font-normal text-stone-400">(1-5)</span></th>
                        <th className="p-4 font-semibold text-stone-600 w-24">Confidence<br/><span className="text-xs font-normal text-stone-400">(%)</span></th>
                        <th className="p-4 font-semibold text-stone-600 w-24">Effort<br/><span className="text-xs font-normal text-stone-400">(Months)</span></th>
                        <th className="p-4 font-bold text-stone-800 text-right bg-emerald-50">RICE Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProjects.map((p, idx) => {
                        const score = calculateRice(p);
                        return (
                            <tr key={p.id} className="border-b border-stone-100 hover:bg-stone-50">
                                <td className="p-4 font-medium text-stone-800 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-200 text-xs font-bold text-stone-500">{idx + 1}</span>
                                    {p.name}
                                </td>
                                <td className="p-4"><input type="number" value={p.reach} onChange={(e) => updateField(p.id, 'reach', e.target.value)} className="w-full border rounded p-1 text-center outline-none focus:border-emerald-400" /></td>
                                <td className="p-4"><input type="number" min="1" max="5" value={p.impact} onChange={(e) => updateField(p.id, 'impact', e.target.value)} className="w-full border rounded p-1 text-center outline-none focus:border-emerald-400" /></td>
                                <td className="p-4"><input type="number" min="1" max="100" value={p.confidence} onChange={(e) => updateField(p.id, 'confidence', e.target.value)} className="w-full border rounded p-1 text-center outline-none focus:border-emerald-400" /></td>
                                <td className="p-4"><input type="number" min="0.1" step="0.1" value={p.effort} onChange={(e) => updateField(p.id, 'effort', e.target.value)} className="w-full border rounded p-1 text-center outline-none focus:border-emerald-400" /></td>
                                <td className="p-4 text-right font-bold text-xl text-emerald-600 bg-emerald-50/30">
                                    {score}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// --- FORMAT 12: Force Field Analysis ---
const ForceField = () => {
    type ForceItem = { id: number, text: string, score: number };
    const [driving, setDriving] = useState<ForceItem[]>([
        { id: 1, text: "Eliminate monthly electric bills", score: 5 },
        { id: 2, text: "USDA Rural Energy Grants", score: 4 },
        { id: 3, text: "Energy independence", score: 3 }
    ]);
    const [restraining, setRestraining] = useState<ForceItem[]>([
        { id: 1, text: "High initial hardware cost", score: 5 },
        { id: 2, text: "Battery maintenance lifecycle", score: 3 },
        { id: 3, text: "Learning curve for system", score: 2 }
    ]);

    const updateScore = (list: ForceItem[], setList: (v: ForceItem[]) => void, id: number, val: string) => {
        setList(list.map(item => item.id === id ? { ...item, score: parseInt(val) } : item));
    };

    const totalDrive = driving.reduce((s, i) => s + i.score, 0);
    const totalRestrain = restraining.reduce((s, i) => s + i.score, 0);
    const totalForce = totalDrive + totalRestrain;
    const drivePercentage = totalForce === 0 ? 50 : (totalDrive / totalForce) * 100;

    const ForceColumn = ({ title, items, setItems, colorCls, bgCls, isDrive }: any) => (
        <div className={`flex-1 p-5 rounded-xl border-2 bg-white ${colorCls}`}>
            <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
                {title}
                <span className={`px-3 py-1 rounded-full text-white font-black text-lg ${bgCls}`}>
                    {items.reduce((s: number, i: any) => s + i.score, 0)}
                </span>
            </h3>
            <div className="space-y-3">
                {items.map((item: any) => (
                    <div key={item.id} className="flex gap-2 items-center bg-stone-50 p-2 rounded border border-stone-200">
                        {!isDrive && <select value={item.score} onChange={e=>updateScore(items, setItems, item.id, e.target.value)} className="p-1 border rounded text-red-700 bg-red-50 font-bold outline-none"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>}
                        <input type="text" value={item.text} readOnly className="flex-1 bg-transparent text-sm text-stone-700 outline-none" />
                        {isDrive && <select value={item.score} onChange={e=>updateScore(items, setItems, item.id, e.target.value)} className="p-1 border rounded text-emerald-700 bg-emerald-50 font-bold outline-none"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in mx-auto">
            {/* The Visual Tug-of-War */}
            <div className="bg-stone-200 rounded-full h-8 mb-8 relative overflow-hidden flex shadow-inner">
                <div className="h-full bg-emerald-500 transition-all duration-500 ease-in-out flex items-center" style={{ width: `${drivePercentage}%` }}>
                    {drivePercentage > 10 && <span className="text-white font-bold px-4 text-sm">&rarr; PUSH</span>}
                </div>
                <div className="h-full bg-red-500 transition-all duration-500 ease-in-out flex items-center justify-end" style={{ width: `${100 - drivePercentage}%` }}>
                    {(100 - drivePercentage) > 10 && <span className="text-white font-bold px-4 text-sm">RESIST &larr;</span>}
                </div>
                {/* Center marker */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-stone-800 z-10 transform -translate-x-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <ForceColumn title="Driving Forces" items={driving} setItems={setDriving} colorCls="border-emerald-200" bgCls="bg-emerald-500" isDrive={true} />
                <ForceColumn title="Restraining Forces" items={restraining} setItems={setRestraining} colorCls="border-red-200" bgCls="bg-red-500" isDrive={false} />
            </div>
        </div>
    );
};

// --- FORMAT 13: 5 Whys (Root Cause Analysis) ---
const FiveWhys = () => {
    const [problem, setProblem] = useState("The new calf got sick with scours.");
    const [whys, setWhys] = useState([
        "Because it didn't get enough colostrum in the first 12 hours.",
        "Because the mother rejected it and walked away.",
        "Because the mother was a first-time heifer and stressed.",
        "Because she calved in the open pasture during a winter storm instead of the barn.",
        "Because we didn't track her breeding date closely enough to pen her up in time."
    ]);

    const updateWhy = (index: number, value: string) => {
        const newWhys = [...whys];
        newWhys[index] = value;
        setWhys(newWhys);
    };

    return (
        <div className="animate-fade-in mx-auto bg-white p-6 rounded-xl shadow-lg border border-stone-200">
            <div className="mb-6 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <label className="block text-xs font-bold text-red-700 uppercase tracking-wide mb-1">The Problem (Symptom)</label>
                <input type="text" value={problem} onChange={(e) => setProblem(e.target.value)} className="w-full bg-white border border-red-200 rounded p-2 text-stone-800 outline-none focus:border-red-400 font-semibold" />
            </div>

            <div className="space-y-4 relative">
                {/* Visual connecting line */}
                <div className="absolute top-0 bottom-8 left-6 w-1 bg-stone-200 -z-10"></div>
                
                {whys.map((why, index) => (
                    <div key={index} className="flex gap-4 items-start group">
                        <div className="w-12 h-12 rounded-full bg-stone-800 text-white flex items-center justify-center font-black flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                            W{index + 1}
                        </div>
                        <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-3 relative">
                            <div className="absolute top-1/2 -left-4 w-4 h-0.5 bg-stone-200"></div>
                            <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Why did that happen?</label>
                            <textarea 
                                rows={2} 
                                value={why} 
                                onChange={(e) => updateWhy(index, e.target.value)} 
                                className="w-full bg-white border border-stone-200 rounded p-2 text-sm text-stone-700 outline-none focus:ring-2 focus:ring-stone-400 resize-none"
                            ></textarea>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500 shadow-inner">
                <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-1">Root Cause & Action Plan</h4>
                <p className="text-stone-700"><strong>Root Cause:</strong> {whys[4] || "Keep digging..."}</p>
                <div className="mt-3">
                    <input type="text" placeholder="e.g., Buy a gestation tracking app or whiteboard..." className="w-full bg-white border border-emerald-200 rounded p-2 text-sm text-stone-800 outline-none focus:border-emerald-400" />
                </div>
            </div>
        </div>
    );
};

// --- FORMAT 14: SMART Goal Builder ---
const SmartGoal = () => {
    const [smart, setSmart] = useState({
        s: "Transition 20 acres to rotational grazing.",
        m: "Install 4,000 feet of high-tensile electric fencing and 4 mobile water points.",
        a: "Using $5,000 from the spring cattle sale and doing the labor ourselves on weekends.",
        r: "To improve soil health, increase forage yield, and reduce winter hay costs.",
        t: "Have infrastructure completed by April 1st before spring turnout."
    });

    const update = (field: string, val: string) => setSmart({...smart, [field]: val});

    return (
        <div className="animate-fade-in mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border-l-8 border-blue-500 shadow-sm flex flex-col">
                    <label className="font-bold text-blue-800 uppercase flex justify-between items-center mb-2">Specific <span className="text-xs font-normal text-stone-400">What exactly?</span></label>
                    <textarea value={smart.s} onChange={e=>update('s', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none h-20"></textarea>
                </div>
                <div className="bg-white p-4 rounded-xl border-l-8 border-emerald-500 shadow-sm flex flex-col">
                    <label className="font-bold text-emerald-800 uppercase flex justify-between items-center mb-2">Measurable <span className="text-xs font-normal text-stone-400">How much/many?</span></label>
                    <textarea value={smart.m} onChange={e=>update('m', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded p-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none h-20"></textarea>
                </div>
                <div className="bg-white p-4 rounded-xl border-l-8 border-amber-500 shadow-sm flex flex-col">
                    <label className="font-bold text-amber-800 uppercase flex justify-between items-center mb-2">Achievable <span className="text-xs font-normal text-stone-400">Resources needed?</span></label>
                    <textarea value={smart.a} onChange={e=>update('a', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded p-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 resize-none h-20"></textarea>
                </div>
            </div>
            <div className="space-y-4 flex flex-col">
                <div className="bg-white p-4 rounded-xl border-l-8 border-purple-500 shadow-sm flex flex-col">
                    <label className="font-bold text-purple-800 uppercase flex justify-between items-center mb-2">Relevant <span className="text-xs font-normal text-stone-400">Why does it matter?</span></label>
                    <textarea value={smart.r} onChange={e=>update('r', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded p-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 resize-none h-20"></textarea>
                </div>
                <div className="bg-white p-4 rounded-xl border-l-8 border-red-500 shadow-sm flex flex-col">
                    <label className="font-bold text-red-800 uppercase flex justify-between items-center mb-2">Time-Bound <span className="text-xs font-normal text-stone-400">By when?</span></label>
                    <textarea value={smart.t} onChange={e=>update('t', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded p-2 text-sm outline-none focus:ring-2 focus:ring-red-400 resize-none h-20"></textarea>
                </div>
                
                <div className="mt-auto bg-stone-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black rotate-12 group-hover:rotate-6 transition-transform">🎯</div>
                    <h4 className="text-stone-400 font-bold uppercase tracking-wider text-xs mb-2">Final Goal Statement</h4>
                    <p className="text-lg leading-relaxed font-medium">
                        I will {smart.s.toLowerCase().replace(/\.$/, '')} by implementing {smart.m.toLowerCase().replace(/\.$/, '')}. I will do this using {smart.a.toLowerCase().replace(/\.$/, '')} in order to {smart.r.toLowerCase().replace(/\.$/, '')}. This will be completed by {smart.t.toLowerCase().replace(/\.$/, '')}.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- FORMAT 15: PESTLE Analysis ---
const PestleAnalysis = () => {
    const initial = {
        p: "Local zoning laws on commercial livestock operations.\nAgricultural tax exemptions and deadlines.",
        e: "Rising inflation affecting diesel and fertilizer prices.\nInterest rates on ag-loans.",
        s: "Growing local consumer demand for grass-fed meat.\nCommunity pushback against farm smells/noise.",
        t: "Availability of automated GPS steering for used tractors.\nNew frost-resistant crop genetics.",
        l: "FDA/USDA regulations for raw milk or direct meat sales.\nFarm liability insurance requirements.",
        env: "Increasing frequency of severe drought.\nSoil erosion and runoff management compliance."
    };

    const PestleCard = ({ title, color, data, letter }: any) => (
        <div className={`bg-white rounded-xl shadow-sm border-t-8 ${color} overflow-hidden flex flex-col h-full`}>
            <div className="bg-stone-50 p-3 border-b border-stone-100 flex items-center gap-3">
                <div className={`w-8 h-8 rounded bg-white font-black text-xl flex items-center justify-center shadow-sm text-stone-700`}>{letter}</div>
                <h3 className="font-bold text-stone-800 tracking-wide">{title}</h3>
            </div>
            <textarea defaultValue={data} className="w-full flex-1 p-4 bg-transparent text-sm text-stone-700 outline-none resize-none focus:bg-stone-50 min-h-[120px]"></textarea>
        </div>
    );

    return (
        <div className="animate-fade-in mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PestleCard letter="P" title="Political" color="border-blue-500" data={initial.p} />
            <PestleCard letter="E" title="Economic" color="border-emerald-500" data={initial.e} />
            <PestleCard letter="S" title="Social" color="border-amber-500" data={initial.s} />
            <PestleCard letter="T" title="Technological" color="border-purple-500" data={initial.t} />
            <PestleCard letter="L" title="Legal" color="border-red-500" data={initial.l} />
            <PestleCard letter="E" title="Environmental" color="border-teal-500" data={initial.env} />
        </div>
    );
};

// --- FORMAT 16: RACI Matrix ---
const RaciMatrix = () => {
    const roles = ["Owner/Manager", "Lead Hand", "Seasonal Labor", "Local Vet"];
    const [tasks, setTasks] = useState([
        { id: 1, name: "Order Spring Feed", assignments: ["A", "R", "I", "-"] },
        { id: 2, name: "Calf Pulling / Delivery", assignments: ["A", "R", "C", "I"] },
        { id: 3, name: "Fix Fencing Blowouts", assignments: ["I", "A", "R", "-"] },
        { id: 4, name: "Administer Vaccinations", assignments: ["A", "C", "R", "C"] }
    ]);

    const updateRaci = (taskId: number, roleIndex: number, val: string) => {
        setTasks(tasks.map(t => {
            if (t.id === taskId) {
                const newA = [...t.assignments];
                newA[roleIndex] = val;
                return {...t, assignments: newA};
            }
            return t;
        }));
    };

    const RaciLegend = () => (
        <div className="flex flex-wrap gap-4 text-xs mt-6 bg-white p-4 rounded-lg border border-stone-200">
            <div className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 font-bold rounded">R</span> Responsible (Does the work)</div>
            <div className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-800 font-bold rounded">A</span> Accountable (Signs off)</div>
            <div className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center bg-amber-100 text-amber-800 font-bold rounded">C</span> Consulted (Has input)</div>
            <div className="flex items-center gap-2"><span className="w-6 h-6 flex items-center justify-center bg-stone-100 text-stone-600 font-bold rounded">I</span> Informed (Needs to know)</div>
        </div>
    );

    return (
        <div className="animate-fade-in mx-auto">
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-stone-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 bg-stone-800 text-white font-bold w-1/3 rounded-tl-xl">Operational Task</th>
                            {roles.map((role, idx) => (
                                <th key={idx} className="p-4 bg-stone-700 text-stone-200 font-semibold text-center text-sm">{role}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, rowIdx) => (
                            <tr key={task.id} className="border-b border-stone-100 hover:bg-stone-50">
                                <td className="p-4 font-medium text-stone-800 border-r border-stone-100">
                                    <input type="text" value={task.name} readOnly className="w-full bg-transparent outline-none" />
                                </td>
                                {task.assignments.map((val, colIdx) => {
                                    const bgColors: Record<string, string> = {
                                        'R': 'bg-blue-100 text-blue-800',
                                        'A': 'bg-red-100 text-red-800',
                                        'C': 'bg-amber-100 text-amber-800',
                                        'I': 'bg-stone-100 text-stone-600',
                                        '-': 'bg-transparent text-stone-300'
                                    };
                                    return (
                                        <td key={colIdx} className="p-3 text-center border-r border-stone-50">
                                            <select 
                                                value={val} 
                                                onChange={(e) => updateRaci(task.id, colIdx, e.target.value)}
                                                className={`w-12 h-10 text-center font-bold text-lg rounded appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-emerald-400 ${bgColors[val]}`}
                                            >
                                                <option value="-">-</option>
                                                <option value="R">R</option>
                                                <option value="A">A</option>
                                                <option value="C">C</option>
                                                <option value="I">I</option>
                                            </select>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <RaciLegend />
        </div>
    );
};

// --- FORMAT 17: Resource Allocation Ring (Donut Chart) ---
const ResourceRing = () => {
    const [items, setItems] = useState([
        { id: 1, name: "Equipment & Hardware", percent: 45, color: "#60a5fa" }, // blue-400
        { id: 2, name: "Feed & Seed", percent: 35, color: "#10b981" }, // emerald-500
        { id: 3, name: "Labor / Contractors", percent: 20, color: "#f87171" } // red-400
    ]);

    const total = items.reduce((sum, item) => sum + item.percent, 0);
    
    // Normalize percentages if they don't exactly equal 100
    const normalizedItems = items.map(item => ({
        ...item,
        normalized: total === 0 ? 0 : (item.percent / total) * 100
    }));

    const updateItem = (id: number, newPercent: string) => {
        setItems(items.map(item => item.id === id ? { ...item, percent: Number(newPercent) || 0 } : item));
    };

    // SVG config
    const radius = 15.91549430918954; // Circumference = 100
    let cumulativeOffset = 0;

    return (
        <div className="animate-fade-in mx-auto flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
            
            {/* SVG Donut Chart */}
            <div className="w-full max-w-[320px] aspect-square flex-shrink-0 relative bg-stone-100 rounded-full p-4">
                <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90 drop-shadow-md">
                    <circle cx="21" cy="21" r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth="8"></circle>
                    {normalizedItems.map((item, idx) => {
                        const dashArray = `${item.normalized} ${100 - item.normalized}`;
                        const dashOffset = -cumulativeOffset;
                        cumulativeOffset += item.normalized;
                        
                        return (
                            <circle 
                                key={item.id} 
                                cx="21" cy="21" r={radius} 
                                fill="transparent" 
                                stroke={item.color} 
                                strokeWidth="8" 
                                strokeDasharray={dashArray} 
                                strokeDashoffset={dashOffset}
                                className="transition-all duration-500 ease-in-out"
                            ></circle>
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-stone-800">{total}%</span>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Total</span>
                    {total !== 100 && <span className="text-red-500 text-[10px] font-bold absolute bottom-1/4">Doesn't equal 100</span>}
                </div>
            </div>

            {/* Data Editor */}
            <div className="flex-1 w-full space-y-4">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-stone-800">Resource Allocation</h2>
                    <p className="text-stone-500">Divide a set total across different proportional categories.</p>
                </div>
                
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                            <div className="w-4 h-4 rounded-full shadow-inner flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                            <input 
                                type="text" 
                                value={item.name} 
                                onChange={(e) => setItems(items.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))}
                                className="flex-1 bg-transparent border-none text-stone-700 font-medium outline-none focus:ring-0" 
                            />
                            <div className="flex items-center gap-1">
                                <input 
                                    type="number" 
                                    min="0" max="100" 
                                    value={item.percent} 
                                    onChange={(e) => updateItem(item.id, e.target.value)}
                                    className="w-16 p-2 bg-white border border-stone-300 rounded font-bold text-stone-800 text-center outline-none focus:border-stone-500" 
                                />
                                <span className="text-stone-400 font-bold">%</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="pt-4 flex justify-between items-center px-2">
                    <button className="text-sm font-bold text-stone-500 hover:text-stone-800 transition-colors">+ Add Category</button>
                    <button onClick={() => {
                        const even = Math.floor(100 / items.length);
                        setItems(items.map((item, i) => ({ ...item, percent: i === 0 ? 100 - (even * (items.length - 1)) : even })));
                    }} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Split Evenly</button>
                </div>
            </div>
        </div>
    );
};

// --- FORMAT 18: Project Timeline Visualizer ---
const TimelineVis = () => {
    const [events, setEvents] = useState([
        { id: 1, date: "April 1", title: "Soil Testing", desc: "Collect samples from all 4 pastures." },
        { id: 2, date: "April 15", title: "Order Seed", desc: "Purchase custom cover crop blend." },
        { id: 3, date: "May 10", title: "Tilling & Prep", desc: "Light till and fertilize based on results." },
        { id: 4, date: "May 20", title: "Planting", desc: "Drill seed before forecasted rain." }
    ]);

    return (
        <div className="animate-fade-in mx-auto max-w-6xl">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-light tracking-widest text-stone-800 mb-4 uppercase">Timeline</h2>
                <div className="flex items-center justify-center gap-4 text-stone-400">
                    <div className="h-px bg-stone-800 w-16"></div>
                    <span>★</span>
                    <div className="h-px bg-stone-800 w-16"></div>
                </div>
            </div>

            {/* Timeline Container */}
            <div className="relative pt-24 pb-32 px-4 md:px-8 overflow-x-auto custom-scroll">
                <div className="min-w-[700px] flex items-center relative">
                    
                    {/* The Horizontal Line */}
                    <div className="absolute left-0 right-0 h-1 bg-stone-500 top-1/2 -translate-y-1/2 z-0 shadow-sm"></div>

                    {/* The Nodes */}
                    <div className="flex justify-between w-full relative z-10">
                        {events.map((evt, idx) => {
                            const isUp = idx % 2 === 0;
                            
                            return (
                                <div key={evt.id} className="relative flex flex-col items-center flex-1">
                                    
                                    {/* Node Marker */}
                                    <div className="w-12 h-12 rounded-full border-4 border-teal-500 bg-white shadow-md flex items-center justify-center relative z-20">
                                        <svg className="w-6 h-6 text-stone-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                    </div>

                                    {/* Top Bubble (Even Index) */}
                                    {isUp && (
                                        <div className="absolute bottom-16 mb-2 bubble-up bg-stone-500 text-white p-5 rounded-[2rem] w-48 shadow-lg text-center transform hover:-translate-y-1 transition-transform">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{evt.date}</h4>
                                            <h3 className="font-black text-lg mb-2 leading-tight">{evt.title}</h3>
                                            <p className="text-xs text-stone-200 opacity-90">{evt.desc}</p>
                                        </div>
                                    )}

                                    {/* Bottom Bubble (Odd Index) */}
                                    {!isUp && (
                                        <div className="absolute top-16 mt-2 bubble-down bg-teal-500 text-white p-5 rounded-[2rem] w-48 shadow-lg text-center transform hover:translate-y-1 transition-transform">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-1 opacity-90">{evt.date}</h4>
                                            <h3 className="font-black text-lg mb-2 leading-tight">{evt.title}</h3>
                                            <p className="text-xs text-teal-100">{evt.desc}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export function GridTemplates() {
    const [activeTab, setActiveTab] = useState(0);
    
    // COMPLETE 18-METHOD TOOLKIT
    const tabs = [
        { 
            name: 'X/Y Decision Matrix', shortName: '2x2 Grid', icon: '⊞', 
            desc: 'A visual two-dimensional plot comparing categorical options against two competing, sliding variables (e.g., Capital vs. Expected Lifespan).', 
            whenToUse: 'When evaluating purchasing methods, financial structures, or categorical options based on exactly two distinct scales.', 
            whenNotToUse: 'When dealing with more than two variables or when highly granular numeric scoring is required to break a tie.', 
            component: <XYDecisionMatrix /> 
        },
        { 
            name: 'If / Then Logic', shortName: 'Rule-Based', icon: '➡️', 
            desc: 'A straightforward conditional rule engine that maps specific user priorities directly to recommended actions.', 
            whenToUse: 'For simple, predefined scenarios where a single overarching priority dictates the entire decision (e.g., Buy vs. Lease equipment).', 
            whenNotToUse: 'When evaluating complex, multi-variable problems that require weighted compromises across several different factors.', 
            component: <IfThenLogic /> 
        },
        { 
            name: 'Grid Analysis', shortName: 'Weighted Scoring', icon: '📊', 
            desc: 'Evaluates options across multiple weighted criteria to mathematically determine the best choice.', 
            whenToUse: 'When comparing expensive equipment, choosing livestock breeds, or selecting bulk feed suppliers where some features are more critical than others.', 
            whenNotToUse: 'For simple yes/no decisions, emergency triage, or when all criteria carry the exact same weight.', 
            component: <WeightedScoring /> 
        },
        { 
            name: 'Flowchart', shortName: 'Decision Tree', icon: '🔀', 
            desc: 'A step-by-step diagnostic path mapping conditional questions to specific outcomes.', 
            whenToUse: 'For process-driven troubleshooting like veterinary triage, crop disease identification, or standardizing equipment repair steps.', 
            whenNotToUse: 'For strategic long-term planning, creative brainstorming, or weighing financial investments.', 
            component: <DecisionTree /> 
        },
        { 
            name: 'Priority Matrix', shortName: 'Eisenhower Box', icon: '⏱️', 
            desc: 'Sorts tasks by Urgency and Importance to dictate whether you should Do, Schedule, Delegate, or Eliminate them.', 
            whenToUse: 'Overcoming task paralysis, managing daily homestead chores, planning seasonal labor, or triaging storm prep tasks.', 
            whenNotToUse: 'When evaluating hardware purchases or calculating the financial ROI of long-term operational projects.', 
            component: <PriorityMatrix /> 
        },
        { 
            name: 'Cost-Benefit', shortName: 'T-Chart Scale', icon: '⚖️', 
            desc: 'A visual balance scale weighing the Pros (Benefits) against Cons (Costs/Risks) by assigning importance weights to each factor.', 
            whenToUse: 'Making binary Go/No-Go decisions, such as repairing an old barn vs. building a new one, or deciding whether to transition to organic feed.', 
            whenNotToUse: 'When evaluating more than two mutually exclusive options, or when precise financial forecasting (NPV/ROI) is strictly required.', 
            component: <TChart /> 
        },
        { 
            name: 'SWOT Analysis', shortName: 'Strategic Grid', icon: '🧭', 
            desc: 'Strategic grid breaking down Internal factors (Strengths, Weaknesses) and External factors (Opportunities, Threats).', 
            whenToUse: 'High-level strategic pivots like expanding a hobby apiary into a commercial business, or assessing the viability of leasing neighbor land.', 
            whenNotToUse: 'Day-to-day operational decisions, daily triage, or strict financial hardware cost comparisons.', 
            component: <SWOTAnalysis /> 
        },
        { 
            name: 'Radar Profiling', shortName: 'Spider Web', icon: '🕸️', 
            desc: 'Multi-axis polygon chart that visually compares the holistic "shape" of options across 5 or more different variables.', 
            whenToUse: 'Comparing nutritional profiles of different feed rations, evaluating soil health test results, or judging livestock genetics across multiple traits.', 
            whenNotToUse: 'Simple A/B financial cost decisions or evaluating linear production timelines.', 
            component: <RadarChart /> 
        },
        { 
            name: 'Impact vs Effort', shortName: 'ROI Matrix', icon: '🎯', 
            desc: 'A 2x2 matrix plotting the expected Return on Investment (Impact) against the work/cost required (Effort) to categorize tasks.', 
            whenToUse: 'Prioritizing a backlog of physical farm projects, and separating "Quick Wins" from "Thankless Tasks" before the busy season starts.', 
            whenNotToUse: 'Urgent crisis management, standard maintenance, or routine daily chore scheduling.', 
            component: <ImpactEffortMatrix /> 
        },
        { 
            name: 'MoSCoW Board', shortName: 'Requirements', icon: '📋', 
            desc: 'Categorization framework that strictly separates feature requirements into Must-Haves, Should-Haves, Could-Haves, and Won\'t-Haves.', 
            whenToUse: 'Defining non-negotiable specs for major hardware purchases (e.g., buying a new tractor) or planning custom infrastructure builds.', 
            whenNotToUse: 'When evaluating abstract ideas, or when resources and budget are completely unconstrained.', 
            component: <MoscowBoard /> 
        },
        { 
            name: 'RICE Score', shortName: 'Idea Valuation', icon: '🌾', 
            desc: 'Mathematical scoring model grading projects by Reach, Impact, Confidence, and Effort to output a standardized priority score.', 
            whenToUse: 'Quantifying the value of new expansion ideas, such as comparing a roadside farm stand versus wholesale restaurant sales.', 
            whenNotToUse: 'Small tactical tasks or decisions driven purely by regulatory compliance and safety where ROI does not matter.', 
            component: <RiceScoring /> 
        },
        { 
            name: 'Force Field', shortName: 'Change Feasibility', icon: '🪢', 
            desc: 'Visual tug-of-war identifying the Driving Forces pushing for a change against the Restraining Forces holding it back.', 
            whenToUse: 'Assessing the feasibility of massive operational changes, like transitioning to 100% off-grid solar or changing calving seasons.', 
            whenNotToUse: 'Routine purchases, standard maintenance, or situations where the change is legally mandated anyway.', 
            component: <ForceField /> 
        },
        { 
            name: '5 Whys', shortName: 'Root Cause', icon: '🔍', 
            desc: 'Iterative interrogative technique to drill down past immediate symptoms to identify the systemic root cause of a failure.', 
            whenToUse: 'Operational post-mortems after an equipment breakdown, sudden livestock illness, or crop failure to prevent recurrence.', 
            whenNotToUse: 'Forward-looking strategic planning, financial forecasting, or brainstorming new revenue streams.', 
            component: <FiveWhys /> 
        },
        { 
            name: 'SMART Goals', shortName: 'Goal Builder', icon: '🏆', 
            desc: 'Structured template to transform vague aspirations into Specific, Measurable, Achievable, Relevant, and Time-bound operational plans.', 
            whenToUse: 'Setting annual harvest targets, planning winter infrastructure builds, or defining explicit grant funding objectives.', 
            whenNotToUse: 'Highly fluid, experimental trial phases where rigid metrics might stifle necessary operational pivoting.', 
            component: <SmartGoal /> 
        },
        { 
            name: 'PESTLE Analysis', shortName: 'Macro Environment', icon: '🌍', 
            desc: 'Macro-environmental analysis evaluating external Political, Economic, Social, Technological, Legal, and Environmental constraints.', 
            whenToUse: 'Entering new, heavily regulated markets (raw milk, commercial meat processing) or assessing the long-term viability of a farm location.', 
            whenNotToUse: 'Internal labor management, daily chore delegation, or evaluating localized equipment purchases.', 
            component: <PestleAnalysis /> 
        },
        { 
            name: 'RACI Matrix', shortName: 'Role Delegation', icon: '👥', 
            desc: 'Operational grid clarifying who is Responsible, Accountable, Consulted, and Informed for specific tasks.', 
            whenToUse: 'Managing multiple farmhands, preventing miscommunication during chaotic seasons (harvest, calving), or working with contractors.', 
            whenNotToUse: 'Solo homesteading operations where all roles naturally fall to one single person.', 
            component: <RaciMatrix /> 
        },
        { 
            name: 'Resource Allocation', shortName: 'Donut Chart', icon: '🍩', 
            desc: 'A proportional ring chart used to divide a whole (like budget, time, or land) into fractional parts.', 
            whenToUse: 'Allocating a fixed budget across different farm operations, dividing acreage for crop rotation, or mixing custom feed rations.', 
            whenNotToUse: 'When tracking sequential time events, weighing unconstrained costs, or making binary yes/no decisions.', 
            component: <ResourceRing /> 
        },
        { 
            name: 'Project Timeline', shortName: 'Milestone Map', icon: '⏳', 
            desc: 'A sequential visual roadmap tracking milestones and deadlines across a chronological path.', 
            whenToUse: 'Planning multi-month projects like barn construction, mapping out crop planting/harvesting dates, or tracking livestock gestation phases.', 
            whenNotToUse: 'Evaluating competing choices, weighing financial costs, or troubleshooting an isolated diagnostic problem.', 
            component: <TimelineVis /> 
        },
    ];

    const activeData = tabs[activeTab];

    return (
        <Layout>
            <div className="flex flex-col gap-6 w-full -mt-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Frameworks</h1>
                    <p className="text-slate-500 text-base">Rapidly evaluate agricultural choices using structural frameworks.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                    {/* Mobile Navigation Dropdown */}
                    <div className="md:hidden">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Select a Framework</label>
                        <select 
                            value={activeTab} 
                            onChange={(e) => setActiveTab(Number(e.target.value))}
                            className="w-full p-4 rounded border border-slate-300 bg-white font-bold text-slate-800 shadow-sm outline-none appearance-none"
                        >
                            {tabs.map((tab, idx) => (
                                <option key={idx} value={idx}>{tab.icon} {tab.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Left Navigation Sidebar (Desktop) */}
                    <nav className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r border-slate-200 pr-4 lg:pr-6 custom-scroll overflow-y-auto max-h-[80vh] sticky top-24">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Decision Methods</h3>
                        <div className="flex flex-col gap-1 pb-8">
                            {tabs.map((tab, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`text-left px-4 py-3 rounded transition-all flex items-center gap-4 border ${
                                        activeTab === idx 
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                                        : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm text-slate-600'
                                    }`}
                                >
                                    <span className="text-2xl drop-shadow-sm">{tab.icon}</span>
                                    <div className="flex flex-col">
                                        <span className="font-bold leading-tight">{tab.name}</span>
                                        <span className={`text-[11px] font-medium tracking-wide uppercase mt-0.5 ${activeTab === idx ? 'text-blue-300' : 'text-slate-400'}`}>
                                            {tab.shortName}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Main Action / Tool Area */}
                    <div className="flex-1 min-w-0 flex flex-col gap-8">
                        {/* Dynamic Meta Data Card */}
                        <div className="bg-white border border-slate-200 rounded p-6 lg:p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center text-3xl shadow-inner text-slate-700">
                                    {activeData.icon}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">{activeData.name}</h2>
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{activeData.shortName}</span>
                                </div>
                            </div>
                            
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                {activeData.desc}
                            </p>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="bg-emerald-50/50 border border-emerald-100 rounded p-5">
                                    <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
                                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        When to use
                                    </h4>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{activeData.whenToUse}</p>
                                </div>
                                <div className="bg-red-50/50 border border-red-100 rounded p-5">
                                    <h4 className="font-bold text-red-800 flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                        When NOT to use
                                    </h4>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{activeData.whenNotToUse}</p>
                                </div>
                            </div>
                        </div>

                        {/* The Interactive Tool Component */}
                        <div className="min-h-[400px]">
                            {activeData.component}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
