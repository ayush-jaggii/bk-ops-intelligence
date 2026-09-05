import React from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import { X, Layers, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const DataAssumptionsModal: React.FC = () => {
  const { dataAssumptionsOpen, setDataAssumptionsOpen } = useApp();

  if (!dataAssumptionsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-ui">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-[#5C3320] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-1.5 bg-white rounded-2xl shadow-xs shrink-0 flex items-center justify-center">
              <BurgerKingLogo size={42} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E85C1A] text-white">
                  Telemetry & Specs
                </span>
                <span className="text-xs font-semibold text-stone-300">National Telemetry & BMS Integration</span>
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                Data Architecture & Telemetry Specs.
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
        <div className="p-6 space-y-6 text-[#1A1A1A] text-sm">
          {/* Security & Standards Banner */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0E8A3E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#0E8A3E] text-sm font-display">Enterprise Telemetry & Data Standards.</h4>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                The operations platform ingests live POS streams, kitchen display telemetry, and sub-metered BMS signals across Burger King India. All biometric shift timestamps and operational telemetry are securely transmitted and encrypted under enterprise IT compliance standards.
              </p>
            </div>
          </div>

          {/* Real QSR Ingestion Specs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#E85C1A]/15 flex items-center justify-center text-[#E85C1A]">
                <Layers className="w-4 h-4" />
              </span>
              <h4 className="font-black text-[#5C3320] font-display text-lg">
                Production Telemetry Architecture.
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>1. POS & Digital Channels</span>
                </div>
                <p className="text-stone-600 leading-relaxed">Omnichannel order stream (Counter Kiosks, Drive-Thru, BK Mobile App, Swiggy, Zomato API webhooks) with basket itemization.</p>
              </div>
              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>2. Kitchen Display System (KDS)</span>
                </div>
                <p className="text-stone-600 leading-relaxed">Active queue depth, real-time ticket age (target: 2m 30s assembly), fryer basket status, and holding bin load sensors.</p>
              </div>
              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>3. Workforce Management</span>
                </div>
                <p className="text-stone-600 leading-relaxed">Biometric time-clock punches, scheduled shift rosters, multi-station cross-training credentials, and statutory labor break rules.</p>
              </div>
              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>4. IoT & Smart BMS Telemetry</span>
                </div>
                <p className="text-stone-600 leading-relaxed">Sub-metered circuit telemetry: HVAC chillers, make-up air fans, fryer oil temperature, and cold-chain walk-in temperature sensors.</p>
              </div>
              <div className="p-3.5 bg-[#F5F4F1] rounded-xl border border-stone-200 md:col-span-2">
                <div className="flex items-center gap-1.5 font-bold text-[#5C3320] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A3E]" />
                  <span>5. External Context Signals</span>
                </div>
                <p className="text-stone-600 leading-relaxed">Hyper-local hourly weather (heat index, rain probability), live cricket/sports broadcast schedule, local mall footfall counters, and active regional marketing promos.</p>
              </div>
            </div>
          </div>

          {/* Optimization Engine & Algorithmic Rules */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#E85C1A]/15 flex items-center justify-center text-[#E85C1A]">
                <Cpu className="w-4 h-4" />
              </span>
              <h4 className="font-black text-[#5C3320] font-display text-lg">
                Optimization Engine & Algorithmic Rules.
              </h4>
            </div>
            <div className="space-y-2.5 text-xs bg-[#F5F4F1] p-4 rounded-xl border border-stone-200">
              <div className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A] shrink-0 mt-0.5" />
                <span className="text-stone-700"><strong className="text-[#5C3320]">Demand Forecast:</strong> Baseline × Day-of-week factor × Weather factor × Event boost × Promotion multiplier × Live velocity multiplier.</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A] shrink-0 mt-0.5" />
                <span className="text-stone-700"><strong className="text-[#5C3320]">Labor Recommendation:</strong> Required crew = Forecasted orders ÷ Crew throughput capacity + Minimum statutory safety staffing floor.</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A] shrink-0 mt-0.5" />
                <span className="text-stone-700"><strong className="text-[#5C3320]">Kitchen Batch Prep:</strong> Batch trigger = 30-min forecast demand − Current ready stock + 15% safety buffer (bounded by maximum holding time).</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A] shrink-0 mt-0.5" />
                <span className="text-stone-700"><strong className="text-[#5C3320]">Energy Control:</strong> Dynamic setback enabled only when occupancy falls below 30% & demand &lt; 55 orders/hr. Refrigeration units strictly locked to 100% capacity.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setDataAssumptionsOpen(false)}
            className="px-6 py-2.5 bg-[#E85C1A] hover:bg-[#d65113] text-white text-xs font-bold rounded-full transition-all shadow-md font-ui uppercase tracking-wider"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};

