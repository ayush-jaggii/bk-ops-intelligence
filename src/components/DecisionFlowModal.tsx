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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in">
      <div className="bg-white rounded-[6px] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[rgba(55,53,47,0.09)]">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔄</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#37352F]">
                  Closed-Loop Manager Decision Workflow
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-[#DDEBF1] text-[#0B6E99] font-medium">
                  Human-In-The-Loop
                </span>
              </div>
              <p className="text-[11px] text-[#37352F]/60">
                How AI recommendations transition to manager authorization and store execution
              </p>
            </div>
          </div>
          <button
            onClick={() => setDecisionFlowOpen(false)}
            className="text-[#37352F]/50 hover:text-[#37352F] p-1 rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Model Performance Indicators */}
        <div className="p-4 border-b border-[rgba(55,53,47,0.09)] bg-white">
          <div className="text-[11px] font-medium text-[#37352F]/50 mb-3">
            System Adherence & Reliability (Trailing 30 Days)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-[4px] border border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]/50">
              <div className="flex items-center justify-between text-xs text-[#37352F]/60">
                <span>Forecast Accuracy (MAPE)</span>
                <BarChart2 className="w-3.5 h-3.5 text-[#37352F]/40" />
              </div>
              <div className="text-xl font-bold text-[#37352F] mt-1">89%</div>
              <p className="text-[11px] text-[#37352F]/50 mt-0.5">±4.2 orders average variance</p>
            </div>
            <div className="p-3 rounded-[4px] border border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]/50">
              <div className="flex items-center justify-between text-xs text-[#37352F]/60">
                <span>Staffing Adherence</span>
                <Users className="w-3.5 h-3.5 text-[#0F7B6C]" />
              </div>
              <div className="text-xl font-bold text-[#37352F] mt-1">94%</div>
              <p className="text-[11px] text-[#37352F]/50 mt-0.5">Manager shift adoption rate</p>
            </div>
            <div className="p-3 rounded-[4px] border border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]/50">
              <div className="flex items-center justify-between text-xs text-[#37352F]/60">
                <span>Prep Rec Acceptance</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#D9730D]" />
              </div>
              <div className="text-xl font-bold text-[#37352F] mt-1">81%</div>
              <p className="text-[11px] text-[#37352F]/50 mt-0.5">Kitchen batch trigger adherence</p>
            </div>
          </div>
        </div>

        {/* 8-Step Pipeline */}
        <div className="p-4 space-y-2 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="p-3 rounded-[4px] border border-[rgba(55,53,47,0.09)] bg-white hover:bg-[#F7F6F3]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[3px] bg-[rgba(55,53,47,0.08)] text-[#37352F] font-medium">
                      {step.num}
                    </span>
                    <span className="font-medium text-xs text-[#37352F]">{step.title}</span>
                  </div>
                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-[3px] bg-[#FDECC8] text-[#D9730D]">
                    {step.highlight}
                  </span>
                </div>
                <p className="text-[11px] text-[#37352F]/70 leading-relaxed mb-2">{step.desc}</p>
                <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(55,53,47,0.06)] text-[10px] text-[#37352F]/50">
                  <span>Role: {step.badge}</span>
                  {idx < steps.length - 1 && (
                    <span className="flex items-center gap-1 text-[#2383E2]">
                      Next <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F6F3] border-t border-[rgba(55,53,47,0.09)] flex items-center justify-between text-xs">
          <span className="text-[#37352F]/60 text-[11px]">
            AI recommends. Manager reviews and approves. System executes.
          </span>
          <button
            onClick={() => setDecisionFlowOpen(false)}
            className="px-3 py-1.5 bg-[#2383E2] hover:bg-[#1B6FC2] text-white text-xs font-medium rounded-[3px] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
