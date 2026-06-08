/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Templates } from './pages/Templates';
import { SavedGrids } from './pages/SavedGrids';
import { NewGrid } from './pages/NewGrid';
import { About } from './pages/About';
import { Legal } from './pages/Legal';
import { Contact } from './pages/Contact';
import { License } from './pages/License';
import { GridView } from './pages/GridView'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/saved" element={<SavedGrids />} />
        <Route path="/new" element={<NewGrid />} />
        <Route path="/grid/:id" element={<GridView />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/license" element={<License />} />
        <Route path="/examples" element={<Templates />} /> 
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  );
}
