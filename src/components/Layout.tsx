import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, FileText, CheckSquare, Heart, Settings, Plus, Beaker, Map } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Grid },
    { name: 'Templates', path: '/templates', icon: FileText },
    { name: 'New Grid', path: '/new', icon: Plus },
    { name: 'Examples', path: '/examples', icon: Beaker },
    { name: 'Saved Grids', path: '/saved', icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 border-x border-slate-200 mx-auto max-w-[1440px]">
      <header className="bg-white h-[60px] border-b border-slate-200 sticky top-0 z-10 flex items-center shadow-sm">
        <div className="w-full px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-[20px] font-extrabold tracking-tight text-slate-900 block leading-none uppercase">
              Grid
            </Link>
            <div className="text-[11px] uppercase font-semibold text-slate-500 tracking-[1px] ml-3 pl-3 border-l border-slate-200">
              A ruralutilitycost.com tool
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-[13px] font-medium items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-700 underline underline-offset-4 decoration-2'
                    : 'text-slate-900 hover:text-blue-700'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <Link to="/new" className="bg-slate-900 text-white font-semibold text-[12px] px-4 py-2 rounded transition-colors hover:bg-slate-800 tracking-wide">
              New Grid
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white text-slate-600 border-t border-slate-200 mt-auto text-[13px]">
        <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 mb-4 font-bold tracking-tight">
              <span>Rural Utility Cost</span>
            </div>
            <p className="text-[12px] border-l-2 border-blue-700 pl-3 leading-relaxed text-slate-500">
              Grid is a decision-support tool. All scores, rankings, and recommendations are informational only. 
              Verify assumptions independently.
            </p>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-[11px] uppercase tracking-[1px]">Master Site</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-700 transition-colors">RuralUtilityCost.com</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Tools</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-[11px] uppercase tracking-[1px]">Grid Setup</h4>
            <ul className="space-y-2">
              <li><Link to="/templates" className="hover:text-blue-700 transition-colors">Template Gallery</Link></li>
              <li><Link to="/new" className="hover:text-blue-700 transition-colors">New Decision Matrix</Link></li>
              <li><Link to="/examples" className="hover:text-blue-700 transition-colors">Examples</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-[11px] uppercase tracking-[1px]">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-blue-700 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-700 transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="hover:text-blue-700 transition-colors">Disclaimer</Link></li>
              <li><Link to="/license" className="hover:text-blue-700 transition-colors">License</Link></li>
              <li><a href="https://github.com/RuralUtilityCost-Grid" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 pt-8 mt-4 mb-8 border-t border-slate-200 text-[11px] flex justify-between items-center text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
          <div className="flex space-x-6 text-[12px]">
            <Link to="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
