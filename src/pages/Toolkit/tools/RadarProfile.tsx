import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

export function RadarProfile() {
  const [data, setData] = useState([
    { metric: 'Drought Tolerance', breedA: 80, breedB: 40, fullMark: 100 },
    { metric: 'Feed Efficiency', breedA: 70, breedB: 90, fullMark: 100 },
    { metric: 'Growth Rate', breedA: 60, breedB: 95, fullMark: 100 },
    { metric: 'Calving Ease', breedA: 90, breedB: 60, fullMark: 100 },
    { metric: 'Disease Resistance', breedA: 85, breedB: 50, fullMark: 100 },
    { metric: 'Market Price premium', breedA: 50, breedB: 85, fullMark: 100 },
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
         <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">Edit Profiles</h3>
         <div className="grid grid-cols-3 gap-2 text-xs font-bold text-slate-500 mb-2">
           <div>Metric</div>
           <div className="text-blue-600">Breed A (Heritage)</div>
           <div className="text-orange-600">Breed B (Comm.)</div>
         </div>
         {data.map((row, i) => (
           <div key={i} className="grid grid-cols-3 gap-2 mb-2">
             <input className="border p-1 text-xs" value={row.metric} onChange={e => {
                const newData = [...data]; newData[i].metric = e.target.value; setData(newData);
             }} />
             <input type="number" className="border p-1 text-xs" value={row.breedA} onChange={e => {
                const newData = [...data]; newData[i].breedA = parseInt(e.target.value)||0; setData(newData);
             }} />
             <input type="number" className="border p-1 text-xs" value={row.breedB} onChange={e => {
                const newData = [...data]; newData[i].breedB = parseInt(e.target.value)||0; setData(newData);
             }} />
           </div>
         ))}
      </div>
      <div className="w-full lg:w-2/3 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Breed A (Heritage)" dataKey="breedA" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
            <Radar name="Breed B (Commercial)" dataKey="breedB" stroke="#ea580c" fill="#f97316" fillOpacity={0.4} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
