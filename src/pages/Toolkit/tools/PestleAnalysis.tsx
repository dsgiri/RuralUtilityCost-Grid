import { useState } from 'react';

export function PestleAnalysis() {
  const [data, setData] = useState({
    p: 'Local zoning board resistance\nUpcoming state agriculture tax subsidies',
    e: 'Rising diesel prices squeezing margins\nHigh interest rates slowing borrowing',
    s: 'Increasing consumer demand for transparently sourced food\nYounger demographics willing to pay premium',
    t: 'GPS steering becoming standard\nAutomated watering systems reducing labor',
    l: 'Strict raw milk distribution laws\nNew labor and overtime regulations for farm workers',
    eEnv: 'Drought frequency increasing\nSoil degradation requiring nutrient management plan',
  });

  const Card = ({ label, keyName, helper, color }: any) => (
    <div className={`border-t-4 border bg-white p-4 flex flex-col ${color}`}>
       <h3 className="font-bold text-sm uppercase tracking-[1px] mb-1">{label}</h3>
       <p className="text-[10px] text-slate-500 mb-3 leading-relaxed min-h-[30px]">{helper}</p>
       <textarea 
         className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 focus:ring-0 resize-none h-32 leading-relaxed"
         value={data[keyName as keyof typeof data]}
         onChange={e => setData({ ...data, [keyName]: e.target.value })}
       />
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       <Card label="Political" keyName="p" helper="Gov policy, zoning, trade tariffs, grants" color="border-red-600 border-x-slate-200 border-b-slate-200 shadow-sm" />
       <Card label="Economic" keyName="e" helper="Interest rates, inflation, commodity prices" color="border-blue-600 border-x-slate-200 border-b-slate-200 shadow-sm" />
       <Card label="Social" keyName="s" helper="Consumer trends, demographics, buying habits" color="border-yellow-500 border-x-slate-200 border-b-slate-200 shadow-sm" />
       <Card label="Technological" keyName="t" helper="Automation, biotech, infrastructure, equipment" color="border-purple-600 border-x-slate-200 border-b-slate-200 shadow-sm" />
       <Card label="Legal" keyName="l" helper="Labor laws, liability, health & safety, contracts" color="border-slate-800 border-x-slate-200 border-b-slate-200 shadow-sm" />
       <Card label="Environmental" keyName="eEnv" helper="Weather patterns, soil health, water access, climate" color="border-green-600 border-x-slate-200 border-b-slate-200 shadow-sm" />
    </div>
  );
}
