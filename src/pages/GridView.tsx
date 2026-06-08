import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useGridStore } from '../store/useGridStore';
import { Matrix2x2View } from '../components/Matrix2x2View';
import { WeightedGridView } from '../components/WeightedGridView';
import { Save, ArrowLeft, Settings, Trash2 } from 'lucide-react';
import { Grid } from '../types';

export function GridView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { grids, updateGrid, deleteGrid } = useGridStore();
  
  const grid = grids.find(g => g.id === id);

  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [title, setTitle] = useState(grid?.title || '');
  const [description, setDescription] = useState(grid?.description || '');

  if (!grid) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-800">Grid not found</h2>
          <p className="text-slate-500 mt-2">The requested decision matrix doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-blue-700 font-medium hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  const handleSaveMeta = () => {
    updateGrid(grid.id, { title, description });
    setIsEditingMeta(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this grid?')) {
      deleteGrid(grid.id);
      navigate('/saved');
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-start">
        <button 
          onClick={() => navigate('/saved')}
          className="text-slate-500 hover:text-slate-800 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to saved
        </button>
        <div className="flex space-x-2">
          {!grid.isTemplate && (
            <button 
              onClick={handleDelete}
              className="text-slate-400 hover:text-red-600 transition-colors bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm text-sm font-medium flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex justify-between items-start">
          {isEditingMeta && !grid.isTemplate ? (
            <div className="flex-grow max-w-2xl">
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold text-slate-900 border-b border-slate-300 focus:border-blue-500 focus:outline-none mb-2 pb-1"
                placeholder="Grid Title"
                autoFocus
              />
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-slate-600 border border-slate-300 rounded focus:border-blue-500 focus:outline-none p-2 mb-4"
                placeholder="Description of the decision problem..."
                rows={2}
              />
              <div className="flex space-x-2">
                <button 
                  onClick={handleSaveMeta}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded-md text-sm font-medium"
                >
                  Save
                </button>
                <button 
                  onClick={() => setIsEditingMeta(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-[1px]">
                <span className="bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">{grid.type} Matrix</span>
              </div>
              <h1 className="text-[28px] font-serif tracking-tight text-slate-900 mb-2">{grid.title}</h1>
              <p className="text-[13px] text-slate-600 max-w-3xl leading-relaxed">{grid.description}</p>
            </div>
          )}

          {!isEditingMeta && !grid.isTemplate && (
            <button 
              onClick={() => {
                setTitle(grid.title);
                setDescription(grid.description);
                setIsEditingMeta(true);
              }}
              className="text-slate-400 hover:text-slate-700 p-2"
              aria-label="Edit details"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        {grid.type === '2x2' ? (
          <Matrix2x2View grid={grid} />
        ) : (
          <WeightedGridView grid={grid} />
        )}
      </div>
    </Layout>
  );
}
