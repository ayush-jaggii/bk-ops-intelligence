import React from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import { X, ArrowRight, BarChart2, ShieldCheck, Users } from 'lucide-react';

export const DecisionFlowModal: React.FC = () => {
  const { decisionFlowOpen, setDecisionFlowOpen } = useApp();

  if (!decisionFlowOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Data Ingestion',
      badge: 'Live Stream',
      desc: 'Aggregates POS transactions, KDS timers, weather feed, cricket match schedules, and active promotional campaigns.',
      highlight: 'Every 5 mins'
    },
    {
      num: '02',
      title: 'Demand Forecast',
      badge: 'AI Engine',
      desc: 'Predicts hourly orders, walk-in vs delivery split, and SKU-level attachment velocity with 87% confidence.',
      highlight: 'Next 6 hours'
    },
    {
      num: '03',
      title: 'AI Recommendation',
      badge: 'Constraint Engine',
      desc: 'Generates optimal crew re-allocation, kitchen batch triggers, and HVAC eco-setback modes without breaking safety limits.',
      highlight: 'Explainable'
    },
    {
      num: '04',
      title: 'Manager Review',
      badge: 'Human-in-Loop',
      desc: 'Store manager inspects "Why this recommendation?" transparent rationale, labor rules, and impact projections.',
      highlight: 'Full Control'
    },
    {
      num: '05',
      title: 'Manager Approval',
      badge: 'Authorization',
      desc: 'Manager clicks [Approve] or tweaks shift assignments in Shift Builder. AI advises, human decides.',
      highlight: '1-Click Action'
    },
    {
      num: '06',
      title: 'Operational Action',
      badge: 'Execution',
      desc: 'Pushes adjusted rosters to staff mobile app, prep tickets to Kitchen Display System, and setbacks to store BMS.',
      highlight: 'Immediate Push'
    },
    {
      num: '07',
      title: 'Measured Result',
      badge: 'Variance Audit',
      desc: 'Tracks actual orders, queue times, food holding loss, and electricity draw against forecasted baseline.',
      highlight: 'Real-time KPIs'
    },
    {
      num: '08',
      title: 'Learning Loop',
      badge: 'Continuous ML',
      desc: 'Model ingests actual variance to recalibrate store-specific elasticity, weather sensitivity, and prep buffers.',
      highlight: 'Self-improving'
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
                  Closed-Loop Architecture
                </span>
                <span className="text-xs font-semibold text-stone-300">Human-In-The-Loop AI</span>
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                Manager Decision & Operational Workflow.
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

        {/* Model Performance Indicators */}
        <div className="p-6 bg-gradient-to-r from-[#5C3320] to-[#422012] text-white">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#F5A827] mb-4">
            System Adherence & Feedback Reliability (Trailing 30 Days)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-200 font-medium">Forecast Accuracy (MAPE)</span>
                <BarChart2 className="w-4 h-4 text-[#F5A827]" />
              </div>
              <div className="text-3xl font-black font-display text-white mt-1">89%</div>
              <p className="text-[11px] text-stone-300 mt-1">±4.2 orders average variance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-200 font-medium">Staffing Adherence</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black font-display text-white mt-1">94%</div>
              <p className="text-[11px] text-stone-300 mt-1">Managers adopt AI shift reallocation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-200 font-medium">Prep Rec Acceptance</span>
                <ShieldCheck className="w-4 h-4 text-[#F5A827]" />
              </div>
              <div className="text-3xl font-black font-display text-white mt-1">81%</div>
              <p className="text-[11px] text-stone-300 mt-1">Kitchen staff follow batch trigger recommendations</p>
            </div>
          </div>
        </div>

        {/* 8-Step Pipeline */}
        <div className="p-6 space-y-4 bg-[#F5F4F1]/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="p-4 rounded-xl bg-white border border-stone-200 hover:border-[#E85C1A]/40 transition-all hover:shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#5C3320] text-white text-xs font-black font-display flex items-center justify-center">
                      {step.num}
                    </span>
                    <h5 className="font-black font-display text-[#1A1A1A] text-base">{step.title}.</h5>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#E85C1A] border border-orange-200 uppercase tracking-wider text-[10px]">
                    {step.highlight}
                  </span>
                </div>
                <p className="text-xs text-[#6E6E6E] leading-relaxed mb-2">{step.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-400 font-medium">
                  <span className="uppercase text-[10px] tracking-wider">Role: {step.badge}</span>
                  {idx < steps.length - 1 && (
                    <span className="flex items-center gap-1 text-[#E85C1A] font-bold text-xs uppercase tracking-wider">
                      Next <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-[#6E6E6E] italic">
            "AI recommends. Manager reviews. Manager approves. System records the action."
          </p>
          <button
            onClick={() => setDecisionFlowOpen(false)}
            className="px-6 py-2.5 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-xs cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
