import React from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import { X, Layers, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const DataAssumptionsModal: React.FC = () => {
  const { dataAssumptionsOpen, setDataAssumptionsOpen } = useApp();

  if (!dataAssumptionsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in">
      <div className="bg-white rounded-[6px] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[rgba(55,53,47,0.09)]">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">📐</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#37352F]">
                  Data Architecture & Telemetry Specs
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-[#DBEDDB] text-[#0F7B6C] font-medium">
                  Enterprise BMS
                </span>
              </div>
              <p className="text-[11px] text-[#37352F]/60">
                Data pipeline specifications, ingestion frequencies, and constraint formulas
              </p>
            </div>
          </div>
          <button
            onClick={() => setDataAssumptionsOpen(false)}
            className="text-[#37352F]/50 hover:text-[#37352F] p-1 rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs text-[#37352F]">
          {/* Notion Callout */}
          <div className="p-3 rounded-[4px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] flex items-start gap-2.5">
            <span className="text-base shrink-0">🛡️</span>
            <div>
              <div className="font-medium text-[#37352F]">Enterprise Telemetry Standards</div>
              <p className="text-[#37352F]/70 text-[11px] mt-0.5 leading-relaxed">
                Ingests live POS streams, kitchen display telemetry, and sub-metered BMS signals. Shift timestamps and operational metrics are securely transmitted and encrypted under enterprise compliance.
              </p>
            </div>
          </div>

          {/* Real QSR Ingestion Specs */}
          <div>
            <div className="text-[11px] font-medium text-[#37352F]/50 mb-2">
              Ingestion Pipeline (5-minute cycle)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
                <div className="font-medium text-[#37352F] mb-0.5">1. POS & Digital Channels</div>
                <p className="text-[#37352F]/60 text-[11px]">Kiosks, Drive-Thru, BK Mobile App, Swiggy, and Zomato API webhooks with basket itemization.</p>
              </div>
              <div className="p-2.5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
                <div className="font-medium text-[#37352F] mb-0.5">2. Kitchen Display System (KDS)</div>
                <p className="text-[#37352F]/60 text-[11px]">Active queue depth, ticket speed (target 2m 30s), fryer basket status, and holding bin load sensors.</p>
              </div>
              <div className="p-2.5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
                <div className="font-medium text-[#37352F] mb-0.5">3. Workforce Management</div>
                <p className="text-[#37352F]/60 text-[11px]">Biometric time-clock punches, scheduled shift rosters, multi-station credentials, and labor break rules.</p>
              </div>
              <div className="p-2.5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
                <div className="font-medium text-[#37352F] mb-0.5">4. IoT & BMS Telemetry</div>
                <p className="text-[#37352F]/60 text-[11px]">Sub-metered circuit telemetry: HVAC chillers, exhaust fans, fryer oil temperature, and cold-chain walk-in.</p>
              </div>
              <div className="p-2.5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] md:col-span-2">
                <div className="font-medium text-[#37352F] mb-0.5">5. External Context Signals</div>
                <p className="text-[#37352F]/60 text-[11px]">Hyper-local hourly weather, IPL / cricket schedule, local mall footfall counters, and active marketing promos.</p>
              </div>
            </div>
          </div>

          {/* Optimization Engine & Algorithmic Rules */}
          <div>
            <div className="text-[11px] font-medium text-[#37352F]/50 mb-2">
              Optimization Formulas & Constraints
            </div>
            <div className="space-y-1.5 text-[11px] bg-[#F7F6F3] p-3 rounded-[4px] border border-[rgba(55,53,47,0.09)]">
              <div>
                <strong className="text-[#37352F]">Demand Forecast: </strong>
                <span className="text-[#37352F]/70">Baseline × Day-of-week factor × Weather factor × Event boost × Promotion multiplier × Live velocity.</span>
              </div>
              <div>
                <strong className="text-[#37352F]">Labor Allocation: </strong>
                <span className="text-[#37352F]/70">Required crew = Forecasted orders ÷ Crew throughput capacity + Minimum statutory safety staffing floor.</span>
              </div>
              <div>
                <strong className="text-[#37352F]">Kitchen Batch Prep: </strong>
                <span className="text-[#37352F]/70">Batch trigger = 30-min forecast demand − Current ready stock + 15% safety buffer (bounded by shelf-life limit).</span>
              </div>
              <div>
                <strong className="text-[#37352F]">Energy Control: </strong>
                <span className="text-[#37352F]/70">Dynamic setback enabled only when occupancy &lt; 30% & demand &lt; 55 orders/hr. Refrigeration units strictly locked to 100% capacity.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F6F3] border-t border-[rgba(55,53,47,0.09)] flex justify-end">
          <button
            onClick={() => setDataAssumptionsOpen(false)}
            className="px-3 py-1.5 bg-[#2383E2] hover:bg-[#1B6FC2] text-white text-xs font-medium rounded-[3px] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

