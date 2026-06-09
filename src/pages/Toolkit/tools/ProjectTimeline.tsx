import { useState } from 'react';

export function ProjectTimeline() {
  const [events, setEvents] = useState([
    { id: '1', date: 'April 1', title: 'Soil Testing', desc: 'Collect samples from all 4 pastures.' },
    { id: '2', date: 'April 15', title: 'Order Seed', desc: 'Purchase custom cover crop blend.' },
    { id: '3', date: 'May 10', title: 'Tilling & Prep', desc: 'Light till and fertilize based on results.' },
    { id: '4', date: 'May 20', title: 'Planting', desc: 'Drill seed before forecasted rain.' }
  ]);

  const addMilestone = () => {
    setEvents([...events, { id: Date.now().toString(), date: 'New Date', title: 'New Phase', desc: 'Description here.' }]);
  };

  const updateEvent = (id: string, field: string, val: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: val } : e));
  };
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl py-8">
      <div className="mb-12 text-center flex justify-between items-center px-4">
          <div className="w-16"></div>
          <div className="flex items-center justify-center gap-4 text-stone-400">
              <div className="h-px bg-stone-300 w-8 md:w-16"></div>
              <span>★</span>
              <div className="h-px bg-stone-300 w-8 md:w-16"></div>
          </div>
          <button onClick={addMilestone} className="text-xs font-bold bg-stone-800 text-white px-3 py-1.5 rounded hover:bg-stone-700">Add Milestone</button>
      </div>

      {/* Timeline Container */}
      <div className="relative pt-24 pb-32 px-4 md:px-8 overflow-x-auto">
          <div className="min-w-[800px] flex items-center relative">
              
              {/* The Horizontal Line */}
              <div className="absolute left-0 right-0 h-1 bg-stone-400 top-1/2 -translate-y-1/2 z-0 shadow-sm rounded-full"></div>

              {/* The Nodes */}
              <div className="flex justify-between w-full relative z-10">
                  {events.map((evt, idx) => {
                      const isUp = idx % 2 === 0;
                      
                      return (
                          <div key={evt.id} className="relative flex flex-col items-center flex-1 group">
                              
                              {/* Node Marker */}
                              <div className="w-10 h-10 rounded-full border-4 border-teal-500 bg-white shadow-md flex items-center justify-center relative z-20 transition-transform group-hover:scale-110">
                                  <div className="w-2.5 h-2.5 bg-stone-400 rounded-full"></div>
                              </div>
                              
                              <button onClick={() => deleteEvent(evt.id)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-30 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-opacity shadow text-sm font-bold mt-8">×</button>

                              {/* Top Bubble (Even Index) */}
                              {isUp && (
                                  <div className="absolute bottom-12 mb-4 bg-stone-600 text-white p-4 rounded-2xl w-48 shadow-lg text-center transform hover:-translate-y-1 transition-transform relative">
                                      <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-stone-600 rotate-45 -translate-x-1/2"></div>
                                      <input className="font-bold text-xs uppercase tracking-wider mb-1 w-full text-center bg-transparent border-b border-stone-500 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-300" value={evt.date} onChange={e => updateEvent(evt.id, 'date', e.target.value)} />
                                      <input className="font-black text-[15px] mb-2 leading-tight w-full text-center bg-transparent border-none p-0 focus:ring-0" value={evt.title} onChange={e => updateEvent(evt.id, 'title', e.target.value)} />
                                      <textarea className="text-xs text-stone-200 opacity-90 w-full bg-transparent border-none p-0 focus:ring-0 resize-none h-12 text-center" value={evt.desc} onChange={e => updateEvent(evt.id, 'desc', e.target.value)} />
                                  </div>
                              )}

                              {/* Bottom Bubble (Odd Index) */}
                              {!isUp && (
                                  <div className="absolute top-12 mt-4 bg-teal-600 text-white p-4 rounded-2xl w-48 shadow-lg text-center transform hover:translate-y-1 transition-transform relative">
                                      <div className="absolute -top-2 left-1/2 w-4 h-4 bg-teal-600 rotate-45 -translate-x-1/2"></div>
                                      <input className="font-bold text-xs uppercase tracking-wider mb-1 opacity-90 w-full text-center bg-transparent border-b border-teal-500 focus:outline-none focus:border-teal-400 placeholder-teal-300 text-teal-200" value={evt.date} onChange={e => updateEvent(evt.id, 'date', e.target.value)} />
                                      <input className="font-black text-[15px] mb-2 leading-tight w-full text-center bg-transparent border-none p-0 focus:ring-0" value={evt.title} onChange={e => updateEvent(evt.id, 'title', e.target.value)} />
                                      <textarea className="text-xs text-teal-100 opacity-90 w-full bg-transparent border-none p-0 focus:ring-0 resize-none h-12 text-center" value={evt.desc} onChange={e => updateEvent(evt.id, 'desc', e.target.value)} />
                                  </div>
                              )}
                          </div>
                      );
                  })}
              </div>
          </div>
      </div>
    </div>
  );
}
