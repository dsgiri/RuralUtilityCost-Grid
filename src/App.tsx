/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GridTemplates } from './pages/GridTemplates';
import { SavedGrids } from './pages/SavedGrids';
import { NewGrid } from './pages/NewGrid';
import { About } from './pages/About';
import { Legal } from './pages/Legal';
import { Contact } from './pages/Contact';
import { License } from './pages/License';
import { GridView } from './pages/GridView'; 
import { ToolView } from './pages/Toolkit/ToolView';
import { NotFound } from './pages/NotFound';
import { GoogleAnalyticsTracker } from './lib/analytics';

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frameworks" element={<GridTemplates />} />
        <Route path="/saved" element={<SavedGrids />} />
        <Route path="/new" element={<NewGrid />} />
        <Route path="/grid/:id" element={<GridView />} />
        <Route path="/tool/:id" element={<ToolView />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/license" element={<License />} />
        <Route path="/examples" element={<GridTemplates />} /> 
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

