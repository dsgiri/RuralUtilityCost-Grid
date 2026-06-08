import { Layout } from '../components/Layout';

export function Legal() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-[32px] font-serif font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-4">Legal & Disclaimer</h1>
        <div className="prose prose-slate prose-blue max-w-none">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-sm text-yellow-800 m-0">
              <strong>Important:</strong> All scores, rankings, and recommendations shown in Grid are for informational and planning purposes only.
            </p>
          </div>
          <p>
            Users should verify assumptions, prices, and operational conditions independently before making structural, financial, or legal decisions. 
          </p>
          <p>
            Grid does not replace professional financial, legal, tax, or technical advice from certified practitioners or agricultural consultants. Rural Utility Cost and its owners are not liable for business outcomes stemming from the use of this tool.
          </p>
        </div>
      </div>
    </Layout>
  );
}
