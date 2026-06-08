import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArrowRight, BarChart2, Plus, FileText, CheckCircle } from 'lucide-react';
import { useGridStore } from '../store/useGridStore';

export function Home() {
  const { grids } = useGridStore();
  const savedGrids = grids.filter(g => !g.isTemplate).sort((a,b) => b.updatedAt - a.updatedAt);

  return (
    <Layout>
      <div className="space-y-8">
        <section className="bg-white border-y md:border border-slate-300 md:px-12 px-6 py-12 md:py-16 mt-4">
          <div className="max-w-3xl">
            <h1 className="text-[32px] md:text-[40px] font-serif font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Structured decisions for rural operations.
            </h1>
            <p className="text-[15px] text-slate-600 mb-8 leading-relaxed max-w-2xl">
              Grid helps you prioritize, compare, and execute. Build 2x2 matrices or weighted scorecards to replace guesswork with data when evaluating land, equipment, or business choices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/new"
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 font-semibold transition-colors text-[13px] tracking-wide"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Grid</span>
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 font-semibold transition-colors border border-slate-300 text-[13px] tracking-wide"
              >
                <FileText className="w-4 h-4" />
                <span>Browse Templates</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-blue-700 transition-colors">
            <div className="w-10 h-10 border border-slate-300 text-slate-900 flex items-center justify-center mb-6">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-2">2x2 Matrices</h3>
            <p className="text-[13px] text-slate-600 mb-6 flex-grow leading-relaxed">
              Plot options across two axes. Ideal for Effort vs Impact or Cost vs Value choices.
            </p>
            <Link to="/new?type=2x2" className="text-slate-900 font-bold hover:text-blue-700 flex items-center group text-[13px] uppercase tracking-[1px]">
              Start 2x2 grid <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-blue-700 transition-colors">
            <div className="w-10 h-10 border border-slate-300 text-slate-900 flex items-center justify-center mb-6">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-900 mb-2">Weighted Scores</h3>
            <p className="text-[13px] text-slate-600 mb-6 flex-grow leading-relaxed">
              Define criteria, assign weights, and compare complex choices like Buy vs Lease systematically.
            </p>
            <Link to="/new?type=weighted" className="text-slate-900 font-bold hover:text-blue-700 flex items-center group text-[13px] uppercase tracking-[1px]">
              Start weighted grid <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
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
              <div className="text-slate-500 text-[13px] flex-grow flex items-center border border-dashed border-slate-700 p-4 justify-center">
                No saved grids yet.
              </div>
            )}
            <Link to="/saved" className="text-[12px] text-slate-300 hover:text-white font-bold uppercase tracking-[1px] flex items-center mt-auto pt-4 border-t border-slate-800">
              View all saved <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
