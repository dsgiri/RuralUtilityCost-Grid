import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, FileText, CheckSquare, Heart, Settings, Plus, Beaker, Map, Sun, Moon, Menu, X } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { CookieConsent } from './CookieConsent';
import { AdContainer } from './AdContainer';
import { trackEvent } from '../lib/analytics';
import { Disclaimer } from './Disclaimer';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: Grid },
    { name: 'Templates', path: '/templates', icon: FileText },
    { name: 'Saved Grids', path: '/saved', icon: CheckSquare },
  ];

  const handleTrackClick = (buttonName: string) => {
    trackEvent('click', { element: buttonName });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 border-x border-slate-200 mx-auto max-w-[1440px] transition-colors duration-200 selection:bg-blue-100 selection:text-blue-900">
      {/* Header Ad */}
      <div className="w-full bg-slate-100 border-b border-slate-200 hidden md:block">
        <div className="max-w-4xl mx-auto px-4 py-2 text-center text-[10px] text-slate-400 font-medium tracking-widest uppercase">
          Advertisement
          <AdContainer slotId="header-slot" className="!h-[90px] !min-h-[90px] !my-2" />
        </div>
      </div>

      <header className="bg-white md:h-[60px] border-b border-slate-200 sticky top-0 z-40 flex flex-col md:flex-row justify-center shadow-sm transition-colors duration-200">
        <div className="w-full px-4 md:px-8 flex items-center justify-between h-[60px]">
          <div className="flex items-center">
            <Link to="/" className="text-[20px] font-extrabold tracking-tight text-slate-900 block leading-none uppercase">
              Grid
            </Link>
            <div className="text-[11px] uppercase font-semibold text-slate-500 tracking-[1px] ml-3 pl-3 border-l border-slate-200 hidden sm:block">
              A ruralutilitycost.com tool
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
            
            <button 
              onClick={toggleTheme}
              className="text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
              title="Toggle Day/Night"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link 
              to="/new" 
              className="bg-slate-900 text-slate-50 font-semibold text-[12px] px-4 py-2 rounded transition-colors hover:bg-slate-800 tracking-wide focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              onClick={() => handleTrackClick('new_grid_nav_button')}
            >
              New Grid
            </Link>
          </nav>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-slate-200 py-2 px-4 shadow-lg absolute w-full top-[60px] flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5 text-slate-400" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-2 pb-1 text-center w-full">
              <Link 
                to="/new" 
                className="bg-slate-900 text-white font-semibold flex items-center justify-center space-x-2 w-full py-3 rounded shadow-sm"
                onClick={() => handleTrackClick('new_grid_mobile_nav_button')}
              >
                <Plus className="w-5 h-5" />
                <span>Create New Grid</span>
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-grow w-full border-b border-transparent md:border-slate-200">
        {/* Desktop Layout Pattern (Content + Sidebar) */}
        <div className="max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            {children}
          </article>
          
          <aside className="w-full lg:w-[300px] xl:w-[340px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 pt-8 lg:pt-0 lg:pl-8 flex flex-col space-y-8">
            <div className="bg-slate-100 p-6 rounded text-[13px] text-slate-600 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-[11px] uppercase tracking-[1px] mb-3">How Grid Works</h3>
              <p className="mb-3">
                Visualize structured decisions using weighted data models or X/Y prioritization frames.
              </p>
              <ul className="list-disc pl-4 space-y-1.5 opacity-90">
                <li>Create Options</li>
                <li>Set axis metrics or weights</li>
                <li>Evaluate & Score</li>
              </ul>
            </div>

            <div className="text-center text-[10px] text-slate-400 font-medium tracking-widest uppercase mb-1">
              Advertisement
              <AdContainer slotId="sidebar-slot" className="!h-[250px] !m-0 !mt-2" />
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white text-slate-600 border-t border-slate-200 mt-auto text-[13px] relative z-20">
        {/* Footer Ad */}
        <div className="max-w-6xl mx-auto px-4 py-6 border-b border-slate-200 hidden md:block">
           <div className="text-center text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Advertisement
              <AdContainer slotId="footer-slot" className="!h-[90px] !min-h-[90px] !my-2" />
           </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 text-slate-900 mb-4 font-bold tracking-tight">
              <span>Rural Utility Cost</span>
            </div>
            <Disclaimer type="footer" />
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-[11px] uppercase tracking-[1px]">Master Site</h4>
            <nav aria-label="Master site navigation">
              <ul className="space-y-3">
                <li><a href="https://ruralutilitycost.com" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline" target="_blank" rel="noopener noreferrer">RuralUtilityCost.com</a></li>
                <li><a href="https://ruralutilitycost.com/resources" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline" target="_blank" rel="noopener noreferrer">Resources</a></li>
                <li><a href="https://ruralutilitycost.com/tools" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline" target="_blank" rel="noopener noreferrer">Tools</a></li>
              </ul>
            </nav>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-[11px] uppercase tracking-[1px]">Grid Setup</h4>
            <nav aria-label="Grid navigation">
              <ul className="space-y-3">
                <li><Link to="/templates" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">Template Gallery</Link></li>
                <li><Link to="/new" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">New Decision Matrix</Link></li>
                <li><Link to="/examples" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">Examples</Link></li>
              </ul>
            </nav>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-4 text-[11px] uppercase tracking-[1px]">Legal</h4>
            <nav aria-label="Legal navigation">
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">About</Link></li>
                <li><Link to="/contact" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">Contact</Link></li>
                <li><Link to="/legal" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">Disclaimer</Link></li>
                <li><Link to="/license" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline">License</Link></li>
                <li><a href="https://github.com/RuralUtilityCost-Grid" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors inline-block focus:outline-none focus:underline" aria-label="View our GitHub Repository">GitHub</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 pt-8 mt-2 mb-12 border-t border-slate-200 text-[11px] flex flex-col md:flex-row justify-between items-center text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
          <div className="flex space-x-6 text-[12px]">
            <Link to="/privacy" className="hover:text-slate-900 focus:outline-none focus:underline text-center">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 focus:outline-none focus:underline text-center">Terms of Service</Link>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
