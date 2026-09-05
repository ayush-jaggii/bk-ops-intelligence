import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Zap,
  Power
} from 'lucide-react';

export const EnergyPage: React.FC = () => {
  const {
    equipment,
    toggleEquipmentApproval,
    applyAllEnergyRecommendations
  } = useApp();

  const totalEstimatedSavings = equipment.reduce(
    (acc, curr) => acc + (curr.approved ? curr.estimatedSavingsPerHour : 0),
    0
  );

  const energyTimelineHours = [
    { hour: '12 PM', baselineKw: 48, optimizedKw: 48, status: 'Full Peak' },
    { hour: '1 PM', baselineKw: 52, optimizedKw: 52, status: 'Full Peak' },
    { hour: '2 PM', baselineKw: 46, optimizedKw: 44, status: 'Normal' },
    { hour: '3 PM', baselineKw: 42, optimizedKw: 31, status: 'Eco Setback' },
    { hour: '4 PM', baselineKw: 40, optimizedKw: 29, status: 'Eco Setback' },
    { hour: '5 PM', baselineKw: 45, optimizedKw: 45, status: 'Pre-Dinner' },
    { hour: '6 PM', baselineKw: 54, optimizedKw: 54, status: 'Dinner Rush' },
    { hour: '7 PM', baselineKw: 56, optimizedKw: 56, status: 'Peak Cricket' },
    { hour: '8 PM', baselineKw: 52, optimizedKw: 52, status: 'Dinner Peak' },
    { hour: '9 PM', baselineKw: 46, optimizedKw: 42, status: 'Taper' },
    { hour: '10 PM', baselineKw: 38, optimizedKw: 28, status: 'Pre-Closing' }
  ];

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-[#1A1A1A] tracking-tight">
              Smart Energy Control.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#0E8A3E] border border-emerald-300">
              BMS Telemetry
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Optimize equipment utilization based on occupancy and demand while strictly respecting food safety constraints.
          </p>
        </div>

        <button
          onClick={applyAllEnergyRecommendations}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#5C3320] bg-white hover:bg-[#5C3320] text-[#5C3320] hover:text-white text-xs font-black uppercase tracking-wider shadow-xs transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 text-[#E85C1A]" /> Apply All Safe Optimizations
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Hourly Electrical Load
          </span>
          <div className="text-3xl font-black font-display text-[#1A1A1A] mt-1">38.4 kWh</div>
          <span className="text-xs text-[#6E6E6E] mt-1 block font-medium">Active draw across 6 primary circuits</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Realized Hourly Saving
          </span>
          <div className="text-3xl font-black font-display text-[#0E8A3E] mt-1">
            ₹ {totalEstimatedSavings}/- per hr
          </div>
          <span className="text-xs text-[#6E6E6E] mt-1 block font-medium">Active approved eco-modulations</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Monthly Cost Opportunity
          </span>
          <div className="text-3xl font-black font-display text-[#E85C1A] mt-1">₹ 24,000/- per mo</div>
          <span className="text-[10px] text-[#6E6E6E] font-medium mt-1 block">
            Sub-metered baseline · 11.5% average restaurant utility optimization
          </span>
        </div>
      </div>

      {/* Food Safety Policy Notice */}
      <div className="p-4 rounded-xl bg-[#F5F4F1] border border-stone-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0E8A3E] shrink-0 mt-0.5" />
        <div className="text-xs text-[#1A1A1A]">
          <strong>Food Safety First Policy: </strong>
          Equipment is never abruptly powered off. Non-critical chillers and fryers enter calibrated standby modes. Walk-in refrigeration units are strictly hard-locked against automated alteration.
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((eq) => {
          const isLocked = eq.isSafetyLocked;
          const isOptimized = eq.approved;

          return (
            <div
              key={eq.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isLocked
                  ? 'bg-[#F5F4F1] border-stone-300'
                  : isOptimized
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  : 'bg-white border-stone-200 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E]">
                    {eq.category}
                  </span>
                  {isLocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700">
                      <Lock className="w-3 h-3 text-stone-500" /> Safety Constrained
                    </span>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      Safe Optimization
                    </span>
                  )}
                </div>

                <h4 className="text-base font-black font-display text-[#1A1A1A] mt-2">{eq.name}.</h4>

                {/* Utilization gauge */}
                <div className="mt-3 p-3 rounded-xl bg-[#F5F4F1] border border-stone-200 space-y-1.5 text-xs font-ui">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#6E6E6E]">Current Load:</span>
                    <span className="text-[#1A1A1A]">{eq.currentUtilization}%</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-[#6E6E6E]">AI Target Mode:</span>
                    <span className="text-[#E85C1A]">{eq.recommendedMode}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#6E6E6E]">
                    <span>Est. Cost: ₹ {eq.estimatedHourlyCost}/- hr</span>
                    {eq.estimatedSavingsPerHour > 0 && (
                      <span className="text-[#0E8A3E] font-bold">
                        Save: ₹ {eq.estimatedSavingsPerHour}/- hr
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#6E6E6E] mt-3 leading-relaxed font-ui">{eq.reason}</p>

                {eq.safetyNote && (
                  <div className="mt-2 text-[10px] text-stone-400 italic font-ui">
                    Safety Rule: {eq.safetyNote}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-stone-100">
                {isLocked ? (
                  <div className="text-[11px] font-black uppercase tracking-wider text-stone-500 flex items-center justify-center py-2 bg-stone-200/80 rounded-full font-ui">
                    <Lock className="w-3.5 h-3.5 mr-1.5" /> Always-On / Safety Lock
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEquipmentApproval(eq.id)}
                    className={`w-full py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer font-ui ${
                      isOptimized
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-white border-2 border-[#5C3320] hover:bg-[#5C3320] text-[#5C3320] hover:text-white'
                    }`}
                  >
                    {isOptimized ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mode Active (Click to Revert)
                      </>
                    ) : (
                      <>
                        <Power className="w-3.5 h-3.5" /> Approve Optimization
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Energy Timeline (12 PM to 10 PM) */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="pb-4 mb-4 border-b border-stone-100">
          <h3 className="text-xl font-black font-display text-[#1A1A1A]">
            Hourly Power Consumption Profile (12 PM – 10 PM).
          </h3>
          <p className="text-xs text-[#6E6E6E]">
            Baseline continuous draw vs AI demand-moderated energy load
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] flex items-stretch gap-2.5 py-2">
            {energyTimelineHours.map((slot) => {
              const isDip = slot.hour === '3 PM' || slot.hour === '4 PM';
              const savingsKw = slot.baselineKw - slot.optimizedKw;

              return (
                <div
                  key={slot.hour}
                  className={`flex-1 p-3.5 rounded-xl border text-center flex flex-col justify-between ${
                    isDip
                      ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-400'
                      : 'bg-[#F5F4F1] border-stone-200'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] font-ui">
                      {slot.hour}
                    </span>
                    <div className="text-base font-black font-display text-[#1A1A1A] mt-1">
                      {slot.optimizedKw} kW
                    </div>
                    <span className="text-[9px] text-[#6E6E6E] block line-through">
                      Base: {slot.baselineKw} kW
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-stone-200 text-[10px]">
                    {savingsKw > 0 ? (
                      <span className="font-black text-[#0E8A3E]">-{savingsKw} kW</span>
                    ) : (
                      <span className="text-stone-400 font-medium">Standard</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
