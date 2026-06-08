import { Layout } from '../components/Layout';
import { Disclaimer } from '../components/Disclaimer';

export function Legal() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-[32px] md:text-[40px] font-serif font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-4">Legal & Disclaimer</h1>
        
        <div className="bg-white border border-slate-200 p-6 sm:p-8 mt-8 shadow-sm">
          <Disclaimer type="full" customText="Grid does not replace professional financial, legal, tax, or technical advice from certified practitioners or agricultural consultants. Rural Utility Cost and its owners are not liable for business outcomes stemming from the use of this tool." />
        </div>
      </div>
    </Layout>
  );
}
