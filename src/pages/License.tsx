import { Layout } from '../components/Layout';

export function License() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-[32px] font-serif font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-4">License</h1>
        <div className="prose prose-slate prose-blue max-w-none">
          <p>
            The Grid decision tool is a proprietary application of Rural Utility Cost.
          </p>
          <p>
            All rights reserved. Use of this software is provided for personal and internal operational planning. Resale or redistribution without express permission is prohibited.
          </p>
        </div>
      </div>
    </Layout>
  );
}
