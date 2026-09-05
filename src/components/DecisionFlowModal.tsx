import React from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import { X, ArrowRight, Clock, ShieldCheck, Users, CalendarCheck, CheckCircle2 } from 'lucide-react';

export const DecisionFlowModal: React.FC = () => {
  const { decisionFlowOpen, setDecisionFlowOpen } = useApp();

  if (!decisionFlowOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Data Ingestion',
      badge: '15-Min Granularity',
      desc: 'Ingests real-time transactions, historical footfalls (15-min intervals), weather forecasts, traffic data, aggregator delivery mix, and local cricket events.',
      highlight: 'Every 5 mins'
    },
    {
      num: '02',
      title: 'Demand Forecasting',
      badge: 'Predictive Engine',
      desc: 'Generates hourly labor demand profiles up to 7 days in advance, identifying peak rush periods (1–3 PM lunch, 7–10 PM dinner) and off-peak lulls (3–5 PM).',
      highlight: '7-Day Horizon'
    },
    {
      num: '03',
      title: 'Dynamic Roster Generation',
      badge: 'Micro-Shift Engine',
      desc: 'Introduces targeted 3- to 4-hour micro-shifts to cover peak volume, standing down unnecessary full-timers during afternoon lulls to eliminate unproductive idle wages.',
      highlight: '4h Micro-Shifts'
    },
    {
      num: '04',
      title: '5-Day Advance Delivery',
      badge: 'Human-in-the-Loop',
      desc: 'Store managers receive the AI-generated schedule 5 days in advance via the dashboard with full visibility into station allocations and labor budget metrics.',
      highlight: '5 Days Ahead'
    },
    {
      num: '05',
      title: 'Manager Override Authority',
      badge: 'Full Human Control',
      desc: 'Managers retain full authority to review, approve, or override shift assignments in the Shift Builder to account for local conditions or crew preferences.',
      highlight: 'Store Manager Lock'
    },
    {
      num: '06',
      title: 'Biometric & Mobile Dispatch',
      badge: 'Execution',
      desc: 'Pushes approved shifts to store biometric punch clocks and sends schedule notifications directly to crew members’ mobile devices.',
      highlight: 'Automated Sync'
    },
    {
      num: '07',
      title: 'Real-Time Station Rebalancing',
      badge: 'Floor Agility',
      desc: 'Automatically reassigns cross-trained crew based on real-time station loads—shifting staff from BOH prep to assembly and dispatch during order spikes.',
      highlight: 'SoS < 3m'
    },
    {
      num: '08',
      title: 'Variance & Feedback Loop',
      badge: 'Continuous Learning',
      desc: 'Monitors actual transaction velocity, Speed of Service (SoS), and labor productivity to calibrate staffing curves for subsequent roster generations.',
      highlight: 'Self-Tuning ML'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-ui">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-[#5C3320] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-1.5 bg-white rounded-2xl shadow-xs shrink-0 flex items-center justify-center">
              <BurgerKingLogo size={42} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E85C1A] text-white">
                  Autonomous Decision Architecture
                </span>
                <span className="text-xs font-semibold text-stone-300">Human-in-the-Loop Governance</span>
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                Demand-Responsive Shift Decision Loop.
              </h3>
            </div>
          </div>
          <button
            onClick={() => setDecisionFlowOpen(false)}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-950 font-ui">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E85C1A]" />
              <span>
                <strong>Core Operating Philosophy: </strong>
                AI forecasts demand and drafts the roster; Store Managers retain full override and approval authority.
              </span>
            </div>
            <span className="font-bold text-[#5C3320]">Governed Automation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {steps.map((s, idx) => (
              <div
                key={s.num}
                className="p-4 rounded-xl bg-[#F5F4F1] border border-stone-200 hover:border-[#5C3320]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#5C3320] text-white text-[11px] font-black font-display flex items-center justify-center">
                        {s.num}
                      </span>
                      <h4 className="font-bold text-[#1A1A1A] text-sm">{s.title}</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-300 text-[#5C3320]">
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-ui">{s.desc}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold text-[#E85C1A]">
                  <span>Key Cadence: {s.highlight}</span>
                  {idx < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-stone-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-[#6E6E6E]">
            Model Accuracy: <strong>89.4%</strong> · Manager Schedule Adherence: <strong>94.2%</strong>
          </span>
          <button
            onClick={() => setDecisionFlowOpen(false)}
            className="px-5 py-2 bg-[#5C3320] hover:bg-[#4A2616] text-white font-bold rounded-full transition-colors cursor-pointer"
          >
            Close Flow
          </button>
        </div>
      </div>
    </div>
  );
};
