import { Layout } from '../components/Layout';

export function Contact() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-[32px] font-serif font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-4">Contact Us</h1>
        <div className="prose prose-slate prose-blue max-w-none">
          <p>
            Grid is a subdomain of Rural Utility Cost. For support, custom data engagements, or business inquiries, please reach out through our master ecosystem.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">General Inquiries</h3>
            <p className="text-slate-600 mb-4">Visit our main site to get in touch with the team.</p>
            <a href="#" className="inline-block bg-blue-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
              Contact Rural Utility Cost
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
