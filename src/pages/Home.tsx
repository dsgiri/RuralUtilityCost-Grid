import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArrowRight, BarChart2, Plus, FileText, CheckCircle } from 'lucide-react';
import { useGridStore } from '../store/useGridStore';
import { AdContainer } from '../components/AdContainer';
import { trackEvent } from '../lib/analytics';
import { decisionTools } from './Toolkit/config';

export function Home() {
  const { grids } = useGridStore();
  const savedGrids = grids.filter(g => !g.isTemplate).sort((a,b) => b.updatedAt - a.updatedAt);

  const handleCTA = (label: string) => trackEvent('click', { element: label });

  return (
    <Layout>
      <div className="space-y-8">
        <section className="bg-white border-y md:border border-slate-300 mt-4 flex flex-col md:flex-row items-stretch">
          <div className="md:w-2/3 px-6 py-12 md:py-16 md:px-12">
            <h1 className="text-[32px] md:text-[40px] font-serif font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Structured decisions for rural operations.
            </h1>
            <p className="text-[15px] text-slate-600 mb-8 leading-relaxed max-w-2xl">
              Grid helps you prioritize, compare, and execute. Build 2x2 matrices or weighted scorecards to replace guesswork with data when evaluating land, equipment, or business choices.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                to="/new"
                onClick={() => handleCTA('hero_create_grid_btn')}
                className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 font-semibold transition-colors text-[13px] tracking-wide min-h-[48px]"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Grid</span>
              </Link>
              <Link
                to="/frameworks"
                onClick={() => handleCTA('hero_browse_templates_btn')}
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-900 px-6 py-4 font-semibold transition-colors border border-slate-300 text-[13px] tracking-wide min-h-[48px]"
              >
                <FileText className="w-4 h-4" />
                <span>Browse Frameworks</span>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-300 p-8 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-slate-500 mb-6">How Grid Works</h3>
            <ul className="space-y-6">
              <li className="flex">
                <span className="w-6 h-6 rounded bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold mr-4 shrink-0">1</span>
                <div>
                   <h4 className="text-[13px] font-bold text-slate-900">Select Framework</h4>
                   <p className="text-[12px] text-slate-500 mt-1">Choose an interactive decision tool that matches your evaluation needs.</p>
                </div>
              </li>
              <li className="flex">
                <span className="w-6 h-6 rounded bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold mr-4 shrink-0">2</span>
                <div>
                   <h4 className="text-[13px] font-bold text-slate-900">Map Data</h4>
                   <p className="text-[12px] text-slate-500 mt-1">Input options, assign weights, and measure priorities objectively.</p>
                </div>
              </li>
              <li className="flex">
                 <span className="w-6 h-6 rounded bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold mr-4 shrink-0">3</span>
                 <div>
                    <h4 className="text-[13px] font-bold text-slate-900">Execute Plan</h4>
                    <p className="text-[12px] text-slate-500 mt-1">Gain clarity, document choices, and proceed confidently.</p>
                 </div>
              </li>
            </ul>
          </div>
        </section>

        <AdContainer slotId="in-content-home-1" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 flex flex-col h-full text-white">
            <h3 className="text-[12px] font-bold uppercase tracking-[1px] text-slate-400 mb-6">Recent Saves</h3>
            {savedGrids.length > 0 ? (
              <ul className="space-y-4 mb-4 flex-grow">
                {savedGrids.slice(0, 3).map(grid => (
                  <li key={grid.id}>
                    <Link to={`/grid/${grid.id}`} className="block border-b border-slate-700 pb-3 hover:opacity-80 transition-opacity">
                      <div className="font-serif text-[16px] text-white truncate">{grid.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-[1px]">{grid.type} Matrix</div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-slate-500 text-[13px] flex-grow flex items-center justify-center border border-dashed border-slate-700 p-4">
                No saved grids yet.
              </div>
            )}
            <Link onClick={() => handleCTA('home_card_saved_all')} to="/saved" className="text-[12px] text-slate-300 hover:text-white font-bold uppercase tracking-[1px] flex items-center mt-auto pt-4 border-t border-slate-800 min-h-[48px]">
              View all saved <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-blue-700 transition-colors group">
            <div className="w-10 h-10 border border-slate-300 text-slate-900 flex items-center justify-center mb-6">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-2">2x2 Matrices</h3>
            <p className="text-[13px] text-slate-600 mb-6 flex-grow leading-relaxed">
              Plot options across two axes. Ideal for Effort vs Impact or Cost vs Value choices.
            </p>
            <Link onClick={() => handleCTA('home_card_2x2')} to="/new?type=2x2" className="text-slate-900 font-bold hover:text-blue-700 flex items-center group text-[13px] uppercase tracking-[1px] min-h-[48px]">
              Start 2x2 grid <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-blue-700 transition-colors group">
            <div className="w-10 h-10 border border-slate-300 text-slate-900 flex items-center justify-center mb-6">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-2">Weighted Scores</h3>
            <p className="text-[13px] text-slate-600 mb-6 flex-grow leading-relaxed">
              Define criteria, assign weights, and compare complex choices like Buy vs Lease systematically.
            </p>
            <Link onClick={() => handleCTA('home_card_weighted')} to="/new?type=weighted" className="text-slate-900 font-bold hover:text-blue-700 flex items-center group text-[13px] uppercase tracking-[1px] min-h-[48px]">
              Start weighted grid <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <section className="pt-8 border-t border-slate-200 mt-12">
          <div className="mb-8">
             <h2 className="text-[24px] font-serif font-bold text-slate-900 mb-2">Interactive Visual Tools</h2>
             <p className="text-[15px] text-slate-600 max-w-2xl">Execute decisions with purpose-built interactive visual frameworks.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {decisionTools.map(tool => (
              <div key={tool.id} className="bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-blue-700 transition-colors group">
                <div className="w-10 h-10 border border-slate-300 bg-slate-50 text-slate-900 flex items-center justify-center mb-6 text-xl" aria-hidden="true">
                  {tool.icon}
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 mb-2">{tool.name}</h3>
                <p className="text-[13px] text-slate-600 mb-6 flex-grow leading-relaxed">
                  {tool.description}
                </p>
                <Link 
                  to={`/tool/${tool.id}`} 
                  onClick={() => handleCTA(`home_tool_${tool.id}`)}
                  className="mt-auto text-slate-900 font-bold hover:text-blue-700 flex items-center text-[13px] uppercase tracking-[1px] min-h-[48px]"
                >
                  Start {tool.shortName} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
