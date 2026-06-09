import { useState } from 'react';

export function SwotAnalysis() {
  const [swot, setSwot] = useState({
    s: 'Existing customer base from farm stand\nFamily labor available \nPaid off land',
    w: 'Limited cash on hand\nNo experience with wholesale packaging\nDistance to major urban markets',
    o: 'Growing demand for local pasture-raised meat\nNearby processing plant expanding capacity',
    t: 'Feed prices highly volatile\nRegulatory changes for raw sales looming'
  });

  const Quad = ({ title, val, keyName, colors }: any) => (
    <div className={`flex flex-col p-4 border border-slate-200 ${colors}`}>
      <h3 className="font-bold text-sm uppercase tracking-[1px] mb-2">{title}</h3>
      <textarea 
        className="w-full flex-1 bg-transparent p-0 border-none focus:ring-0 text-sm leading-relaxed resize-none h-32"
        value={val}
        onChange={e => setSwot({ ...swot, [keyName]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
       <Quad title="Strengths (Internal)" val={swot.s} keyName="s" colors="bg-blue-50/50 hover:bg-blue-50/80" />
       <Quad title="Weaknesses (Internal)" val={swot.w} keyName="w" colors="bg-orange-50/50 hover:bg-orange-50/80" />
       <Quad title="Opportunities (External)" val={swot.o} keyName="o" colors="bg-green-50/50 hover:bg-green-50/80" />
       <Quad title="Threats (External)" val={swot.t} keyName="t" colors="bg-red-50/50 hover:bg-red-50/80" />
    </div>
  );
}
