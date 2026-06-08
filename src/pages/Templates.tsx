import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useGridStore } from '../store/useGridStore';
import { Heart, Beaker, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { defaultTemplates } from '../data/templates';
import { Grid } from '../types';

export const GridCard: React.FC<{ grid: Grid }> = ({ grid }) => {
  const { toggleFavorite, favorites } = useGridStore();
  const isFavorite = favorites.includes(grid.id);

  return (
    <div className="bg-white rounded border border-slate-200 overflow-hidden flex flex-col h-full hover:border-blue-700 transition-colors p-5">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="inline-flex items-center space-x-1 text-[10px] text-slate-500 font-semibold uppercase tracking-[1px]">
            {grid.type === '2x2' ? <Beaker className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
            <span>{grid.type} Matrix</span>
          </div>
          <button 
            onClick={() => toggleFavorite(grid.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        </div>
        <h3 className="text-[15px] font-bold text-slate-900 mb-1 leading-tight">{grid.title}</h3>
        <p className="text-[12px] text-slate-500 line-clamp-3 leading-relaxed">{grid.description}</p>
      </div>
      <div className="mt-5 flex justify-between items-center pt-4 border-t border-slate-100">
        <div className="text-[11px] font-medium text-slate-500">
          {grid.options.length} options
        </div>
        <Link 
          to={grid.isTemplate ? `/new?template=${grid.id}` : `/grid/${grid.id}`}
          className="text-[12px] font-semibold text-slate-900 bg-slate-100 border border-slate-200 px-3 py-1 rounded hover:bg-slate-200 transition-colors"
        >
          {grid.isTemplate ? 'Use Template' : 'Open Grid'}
        </Link>
      </div>
    </div>
  );
}

export function Templates() {
  return (
    <Layout>
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-[28px] font-serif font-bold tracking-tight text-slate-900 mb-2">Template Gallery</h1>
        <p className="text-[13px] text-slate-500">Start with a structured framework for common rural and operational decisions.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultTemplates.map(template => (
          <GridCard key={template.id} grid={template} />
        ))}
      </div>
    </Layout>
  );
}
