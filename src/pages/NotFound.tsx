import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { Map } from 'lucide-react';

export function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Map className="w-16 h-16 text-slate-300 mb-6" />
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">404 - Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          The grid or page you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-slate-800 transition-colors rounded"
        >
          Return to Dashboard
        </Link>
      </div>
    </Layout>
  );
}
