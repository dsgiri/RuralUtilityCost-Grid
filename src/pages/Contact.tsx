import { useState } from 'react';
import { Layout } from '../components/Layout';
import { trackEvent } from '../lib/analytics';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Track form submission attempt
    trackEvent('form_submit', { form_name: 'contact_us' });

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[32px] md:text-[40px] font-serif font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-4">Contact Us</h1>
        
        <div className="prose prose-slate prose-blue max-w-none text-[15px] mb-8">
          <p>
            Grid is a subdomain of Rural Utility Cost. For support, custom data engagements, or business inquiries, please reach out via the form below.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 sm:p-8 mt-8 shadow-sm">
          {status === 'success' ? (
            <div className="bg-green-50 text-green-800 border border-green-200 p-6 text-center font-medium">
              Thank you for reaching out. Your message has been received!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-[1px]">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 p-3 bg-slate-50 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-[1px]">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 p-3 bg-slate-50 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-[1px]">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-slate-300 p-3 bg-slate-50 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 transition-colors"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-slate-900 text-white font-bold py-4 text-[14px] uppercase tracking-[1px] hover:bg-slate-800 transition-colors disabled:opacity-70 min-h-[48px]"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
