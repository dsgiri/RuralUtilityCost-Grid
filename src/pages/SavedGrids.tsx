import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useGridStore } from '../store/useGridStore';
import { GridCard } from './Templates';
import { Plus } from 'lucide-react';

export function SavedGrids() {
  const { grids } = useGridStore();
  const savedGrids = grids.filter(g => !g.isTemplate).sort((a,b) => b.updatedAt - a.updatedAt);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-[28px] font-serif font-bold tracking-tight text-slate-900 mb-2">Saved Grids</h1>
          <p className="text-[13px] text-slate-500">Your created decision matrices.</p>
        </div>
        <Link 
          to="/new" 
          className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 font-semibold transition-colors text-[13px]"
        >
          <Plus className="w-4 h-4" />
          <span>New Grid</span>
        </Link>
      </div>
      
      {savedGrids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedGrids.map(grid => (
            <GridCard key={grid.id} grid={grid} />
          ))}
        </div>
      ) : (
        <div className="bg-white border text-center border-slate-200 p-12">
          <h3 className="text-lg font-bold text-slate-900 mb-2">No saved grids yet</h3>
          <p className="text-[13px] text-slate-500 mb-6 max-w-md mx-auto">You haven't created any custom decision grids. Start from a blank slate or use a template.</p>
          <div className="flex justify-center gap-4">
            <Link to="/new" className="text-white font-semibold px-4 py-2 bg-slate-900 hover:bg-slate-800 transition-colors text-[13px]">Start Blank</Link>
            <Link to="/templates" className="text-slate-900 font-semibold px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 transition-colors text-[13px]">Browse Templates</Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
