import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { decisionTools } from './config';
import { ToolRenderer } from './ToolRenderer';
import { trackEvent } from '../../lib/analytics';
import { useEffect, useState } from 'react';

export function ToolView() {
  const { id } = useParams();
  const tool = decisionTools.find(t => t.id === id);
  const [statement, setStatement] = useState("");

  useEffect(() => {
    if (tool) {
      trackEvent('view_tool', { tool_id: tool.id, tool_name: tool.name });
    }
  }, [tool]);

  if (!tool) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-12">
         {/* Title area */}
          <div className="mb-6 pt-4">
           <div className="flex items-center space-x-4 mb-4">
             <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-stone-200" aria-hidden="true">
               {tool.icon}
             </div>
             <div>
               <h1 className="text-[28px] md:text-[36px] font-black tracking-tight text-stone-900 leading-none mb-1">{tool.name}</h1>
               <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400 block">{tool.shortName}</span>
             </div>
           </div>
           <p className="text-stone-600 text-lg max-w-3xl leading-relaxed mb-8">{tool.description}</p>
         </div>

         {/* Problem / Decision Statement */}
         <div className="mb-8 bg-stone-50 border border-stone-200 rounded-xl p-5 md:p-6 shadow-sm">
           <label htmlFor="decision-statement" className="block text-[11px] font-bold uppercase tracking-[2px] text-stone-500 mb-3">
             Problem / Decision Statement
           </label>
           <textarea 
             id="decision-statement"
             className="w-full bg-white border border-stone-200 rounded p-4 text-stone-800 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-medium text-[15px] placeholder-stone-400 shadow-inner"
             rows={2}
             placeholder="What decision or problem are you evaluating right now? (e.g., Should I buy or lease the new 75hp tractor?)"
             value={statement}
             onChange={e => setStatement(e.target.value)}
           />
         </div>

         {/* Render the tool */}
         <div className="bg-white border border-stone-200 shadow-sm rounded-xl overflow-hidden py-4">
           <ToolRenderer tool={tool} />
         </div>

         {/* Usage Guidelines */}
         <div className="mt-12 border-t border-stone-200 pt-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-50/50 p-6 rounded-xl border border-stone-100">
             <div>
                <strong className="text-[11px] font-bold uppercase tracking-[2px] text-emerald-700 flex items-center mb-3">
                   <span className="mr-2 text-lg leading-none">✓</span> WHEN TO USE:
                </strong>
                <span className="text-[15px] text-stone-700 leading-relaxed block">{tool.whenToUse}</span>
             </div>
             <div>
                <strong className="text-[11px] font-bold uppercase tracking-[2px] text-red-700 flex items-center mb-3">
                   <span className="mr-2 text-lg leading-none">×</span> WHEN NOT TO USE:
                </strong>
                <span className="text-[15px] text-stone-700 leading-relaxed block">{tool.whenNotToUse}</span>
             </div>
           </div>
         </div>
      </div>
    </Layout>
  );
}
