import { useState } from 'react';

interface Node {
  q?: string;
  y?: string;
  n?: string;
  result?: string;
  type?: 'danger' | 'warning' | 'success';
}

const tree: Record<string, Node> = {
  start: { q: "Does the calf have diarrhea (scours)?", y: "n2", n: "n3" },
  n2: { q: "Is the calf showing signs of severe dehydration (sunken eyes, won't stand)?", y: "r1", n: "r2" },
  n3: { q: "Is the calf breathing heavily or coughing?", y: "r3", n: "r4" },
  r1: { result: "URGENT: Call vet immediately. Administer IV fluids. Isolate calf.", type: "danger" },
  r2: { result: "Moderate: Administer oral electrolytes. Monitor closely for 12 hours. Isolate.", type: "warning" },
  r3: { result: "Check temperature. Likely respiratory infection (Pneumonia). Consult vet for antibiotics.", type: "warning" },
  r4: { result: "Monitor normal behavior. Ensure adequate colostrum/milk intake.", type: "success" }
};

export function DecisionTree() {
  const [history, setHistory] = useState(['start']);
  const currentNodeId = history[history.length - 1];
  const node = tree[currentNodeId];

  const handleChoice = (nextId?: string) => {
      if (nextId) setHistory([...history, nextId]);
  };

  const reset = () => setHistory(['start']);

  if (!node) return null;

  return (
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-200 text-center relative overflow-hidden my-6">
          {history.length > 1 && (
              <button onClick={() => setHistory(history.slice(0, -1))} className="absolute top-4 left-6 text-sm text-stone-400 hover:text-stone-600 font-medium transition-colors">
                  &larr; Back
              </button>
          )}
          
          <div key={currentNodeId} className="transition-all duration-300 py-6">
              {node.q ? (
                  <div>
                      <h3 className="text-[22px] leading-snug font-medium text-stone-900 mb-10">{node.q}</h3>
                      <div className="flex justify-center gap-6">
                          <button onClick={() => handleChoice(node.y)} className="w-32 py-4 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-bold transition-transform hover:scale-[1.02] shadow-sm tracking-wide">YES</button>
                          <button onClick={() => handleChoice(node.n)} className="w-32 py-4 bg-stone-100 text-stone-800 border-2 border-transparent rounded-lg hover:bg-stone-200 font-bold transition-transform hover:scale-[1.02] shadow-sm tracking-wide">NO</button>
                      </div>
                  </div>
              ) : (
                  <div>
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                          node.type === 'danger' ? 'bg-red-100 text-red-600' : 
                          node.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                          {node.type === 'danger' && <span className="text-3xl font-black">!</span>}
                          {node.type === 'warning' && <span className="text-3xl font-black">?</span>}
                          {node.type === 'success' && <span className="text-3xl font-black">✓</span>}
                      </div>
                      <h3 className={`text-2xl font-bold mb-8 leading-snug ${
                          node.type === 'danger' ? 'text-red-700' : 
                          node.type === 'warning' ? 'text-amber-700' : 'text-emerald-700'
                      }`}>{node.result}</h3>
                      <button onClick={reset} className="text-[13px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors bg-stone-100 px-6 py-2 rounded">Start Over</button>
                  </div>
              )}
          </div>
          
          {/* Progress dots */}
          <div className="mt-8 flex justify-center gap-3">
              {history.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === history.length - 1 ? 'bg-stone-800' : 'bg-stone-200'}`}></div>
              ))}
          </div>
      </div>
  );
}
