import { Layout } from '../components/Layout';

export function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-[32px] font-serif font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200 pb-4">About Grid</h1>
        <div className="prose prose-slate prose-blue max-w-none">
          <p className="text-lg">
            Grid is part of the <strong>Rural Utility Cost</strong> ecosystem. It is a decision-support tool designed for practical rural, agricultural, and operational choices.
          </p>
          <p>
            Whether you are evaluating a buy-vs-lease equipment decision, deciding between automation and manual processes, or plotting capital allocation across a 2x2 matrix, Grid helps you structure the problem.
          </p>
          <p>
            By separating emotion from data, these frameworks allow farm managers, rural operators, and agribusiness owners to clearly visualize tradeoffs.
          </p>
        </div>
      </div>
    </Layout>
  );
}
