import React from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import { X, Layers, ShieldCheck, CheckCircle2, Users, Clock, ArrowRight } from 'lucide-react';

export const DataAssumptionsModal: React.FC = () => {
  const { dataAssumptionsOpen, setDataAssumptionsOpen } = useApp();

  if (!dataAssumptionsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-ui">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-[#5C3320] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-1.5 bg-white rounded-2xl shrink-0 flex items-center justify-center">
              <BurgerKingLogo size={42} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E85C1A] text-white">
                  Telemetry & Ingestion Specs
                </span>
                <span className="text-xs font-semibold text-stone-300">Burger King India POS & Biometric Sync</span>
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                Data Architecture & Scheduling Assumptions.
              </h3>
            </div>
          </div>
          <button
            onClick={() => setDataAssumptionsOpen(false)}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-[#1A1A1A] text-sm font-ui">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0E8A3E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#0E8A3E] text-sm font-display">Demand-Responsive Scheduling Principles.</h4>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                The shift scheduler ingests omnichannel transaction volume, historical 15-minute footfalls, weather, traffic, and aggregator delivery mix to project exact labor requirements. Rigid 9-hour straight shifts are dynamically replaced with flexible 3- to 4-hour micro-shifts targeted specifically to peak rush periods.
              </p>
            </div>
          </div>

          {/* 4 Ingestion Data Channels */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#E85C1A]/15 flex items-center justify-center text-[#E85C1A]">
                <Layers className="w-4 h-4" />
              </span>
              <h4 className="font-black text-[#5C3320] font-display text-lg">
                Production Ingestion Channels.
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>1. POS & Self-Ordering Kiosks</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Real-time transaction stream at 15-minute intervals tracking order count, basket itemization, and kiosk queue wait times.
                </p>
              </div>

              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>2. Delivery Aggregator Mix (Swiggy / Zomato)</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Webhook feeds tracking active delivery driver arrivals and cluster spikes to scale dedicated Aggregator Dispatch staffing.
                </p>
              </div>

              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>3. Kitchen Display System (KDS) & SoS</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Speed of Service (SoS) timers tracking prep ticket age to detect understaffed assembly line bottlenecks before wait times exceed 3 minutes.
                </p>
              </div>

              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>4. Biometric Time & Attendance</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Punch clock synchronization enforcing fair-work guidelines, 5-day advance schedule publication, and statutory meal intervals.
                </p>
              </div>
            </div>
          </div>

          {/* Model Labor Economics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#5C3320]/10 flex items-center justify-center text-[#5C3320]">
                <Clock className="w-4 h-4 text-[#E85C1A]" />
              </span>
              <h4 className="font-black text-[#5C3320] font-display text-lg">
                Calibrated QSR Labor Parameters.
              </h4>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F4F1] border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-[#6E6E6E]">QSR Speed of Service (SoS) Benchmark:</span>
                <strong className="text-[#1A1A1A]">180 seconds (3m 00s)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-[#6E6E6E]">Unproductive Lull Threshold:</span>
                <strong className="text-amber-900">&lt; 2.0 Transactions / Employee / Hour</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-[#6E6E6E]">Target Balanced Productivity Band:</span>
                <strong className="text-[#0E8A3E]">4.5 – 5.5 Transactions / Employee / Hour</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-[#6E6E6E]">Standard Crew Hourly Base Wage:</span>
                <strong className="text-[#1A1A1A]">₹ 95 / hour</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6E6E6E]">Advance Schedule Delivery Notice:</span>
                <strong className="text-[#5C3320]">5 Days in Advance (Manager Override Authority)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-[#6E6E6E]">Compliant with Indian Shops and Establishments Acts.</span>
          <button
            onClick={() => setDataAssumptionsOpen(false)}
            className="px-5 py-2 bg-[#5C3320] hover:bg-[#4A2616] text-white font-bold rounded-full transition-colors cursor-pointer"
          >
            Close Telemetry Specs
          </button>
        </div>
      </div>
    </div>
  );
};
