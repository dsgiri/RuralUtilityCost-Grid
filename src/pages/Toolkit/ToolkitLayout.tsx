import { useState, useMemo } from 'react';
import { decisionTools } from './config';
import { ToolRenderer } from './ToolRenderer';
import { Disclaimer } from '../../components/Disclaimer';
import { AdContainer } from '../../components/AdContainer';

export function ToolkitLayout() {
  const [activeToolId, setActiveToolId] = useState<string>(decisionTools[0].id);

  const activeTool = useMemo(() => {
    return decisionTools.find(t => t.id === activeToolId) || decisionTools[0];
  }, [activeToolId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F1] font-sans text-slate-900 border-x border-slate-200 mx-auto max-w-[1440px]">
      <header className="bg-white h-[60px] border-b border-slate-200 sticky top-0 z-40 flex flex-col md:flex-row justify-center shadow-sm">
        <div className="w-full px-4 md:px-8 flex items-center h-[60px]">
          <div className="flex items-center space-x-3">
             <div className="text-[20px] font-extrabold tracking-tight text-slate-900 block leading-none uppercase">
                Rural Utility Toolkit
             </div>
             <div className="text-[11px] uppercase font-semibold text-slate-500 tracking-[1px] pl-3 border-l border-slate-200 hidden sm:block">
                Rapidly evaluate rural decisions
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full border-b border-transparent md:border-slate-200 flex flex-col md:flex-row">
        {/* Mobile Dropdown */}
        <div className="md:hidden bg-white p-4 border-b border-slate-200">
           <label htmlFor="mobile-tool-select" className="sr-only">Select Tool</label>
           <select 
             id="mobile-tool-select"
             className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-3"
             value={activeToolId}
             onChange={(e) => setActiveToolId(e.target.value)}
           >
             {decisionTools.map(tool => (
                <option key={tool.id} value={tool.id}>{tool.icon} {tool.name}</option>
             ))}
           </select>
        </div>

        {/* Desktop Sidebar */}
        <aside className="w-[280px] lg:w-[320px] shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto overflow-x-hidden pt-4 pb-12">
          <div className="px-4 pb-2">
            <h2 className="text-[11px] uppercase tracking-[1px] font-bold text-slate-500 mb-2">Available Frameworks</h2>
          </div>
          <nav className="flex-1 px-2 space-y-1">
             {decisionTools.map(tool => {
               const isActive = tool.id === activeToolId;
               return (
                 <button
                   key={tool.id}
                   onClick={() => setActiveToolId(tool.id)}
                   className={`w-full text-left flex items-center px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors ${
                     isActive 
                       ? 'bg-blue-50 text-blue-800' 
                       : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                   }`}
                 >
                   <span className="w-6 text-center mr-2 text-lg">{tool.icon}</span>
                   <span className="truncate">{tool.name}</span>
                 </button>
               );
             })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <article className="flex-1 min-w-0 bg-[#FCFAF9] p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
             
             {/* Header Panel */}
             <section className="bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-sm relative">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{activeTool.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[1px] text-slate-400">{activeTool.shortName}</span>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">{activeTool.name}</h1>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-600 mb-6 max-w-3xl">
                  {activeTool.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 sm:p-6 rounded-sm border border-slate-100">
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[1px] font-bold text-green-700 mb-2 flex items-center">
                       <span className="mr-1.5 leading-none">✓</span> When to use
                    </h3>
                    <p className="text-[13px] text-slate-700">{activeTool.whenToUse}</p>
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[1px] font-bold text-red-700 mb-2 flex items-center">
                       <span className="mr-1.5 leading-none">×</span> When not to use
                    </h3>
                    <p className="text-[13px] text-slate-700">{activeTool.whenNotToUse}</p>
                  </div>
                </div>
             </section>

             {/* Interactive Graphic / Tool */}
             <section className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden min-h-[400px]">
                <ToolRenderer tool={activeTool} />
             </section>

          </div>
        </article>
      </main>

      <footer className="bg-white text-slate-600 border-t border-slate-200 mt-auto text-[13px] p-8 relative z-20">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="md:w-1/2">
               <Disclaimer type="footer" />
            </div>
            <div className="text-[11px] uppercase tracking-[1px] font-bold text-slate-400">
               © {new Date().getFullYear()} Rural Utility Cost
            </div>
         </div>
      </footer>
    </div>
  );
}
