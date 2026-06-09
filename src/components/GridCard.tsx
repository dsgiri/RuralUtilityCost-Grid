import { Link } from 'react-router-dom';
import { Grid as GridIcon } from 'lucide-react';
import { Grid } from '../types';

export function GridCard({ grid }: { grid: Grid }) {
  const date = new Date(grid.updatedAt).toLocaleDateString();
  return (
    <Link 
      to={`/grid/${grid.id}`}
      className="bg-white border text-center border-slate-200 p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group hover:border-slate-300"
    >
      <div className="w-16 h-16 bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors mb-6 mx-auto">
        <GridIcon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 truncate group-hover:text-blue-700 transition-colors uppercase tracking-tight">{grid.name}</h3>
      <p className="text-[13px] text-slate-500 mb-6 flex-grow line-clamp-2">{grid.description || 'No description provided'}</p>
      
      <div className="pt-4 border-t border-slate-100 mt-auto flex justify-between items-center text-[11px] font-semibold text-slate-400">
        <span className="uppercase tracking-widest">{grid.options.length} Options</span>
        <span className="uppercase tracking-widest">{date}</span>
      </div>
    </Link>
  );
}
