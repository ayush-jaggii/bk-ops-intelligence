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
    <div className="space-y-6 pb-12 font-sans select-none text-[#37352F]">
      {/* Header */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#37352F] tracking-tight">
            Energy & HVAC
          </h1>
          <p className="text-xs text-[#37352F]/60 mt-1">
            Telemetry-driven equipment load moderation with food safety constraints strictly locked.
          </p>
        </div>

        <button
          onClick={applyAllEnergyRecommendations}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#2383E2] hover:bg-[#1B6FBF] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Apply Safe Optimizations</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Hourly Electrical Load
          </span>
          <div className="text-2xl font-semibold text-[#37352F] mt-1">38.4 kWh</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">Active draw across 6 primary circuits</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Realized Hourly Savings
          </span>
          <div className="text-2xl font-semibold text-[#0F7B6C] mt-1">
            ₹ {totalEstimatedSavings}/- hr
          </div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">Active approved eco-modulations</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Monthly Cost Opportunity
          </span>
          <div className="text-2xl font-semibold text-[#D9730D] mt-1">₹ 24,000/- mo</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">
            11.5% average restaurant utility optimization
          </span>
        </div>
      </div>

      {/* Food Safety Policy Notice Callout */}
      <div className="notion-callout border border-[rgba(55,53,47,0.09)]">
        <span className="text-xl shrink-0">🛡️</span>
        <div className="text-xs text-[#37352F]/80 leading-relaxed">
          <strong className="text-[#37352F]">Food Safety First Policy: </strong>
          Equipment is never abruptly powered down. Chillers and fryers enter calibrated standby setbacks only during verified low-demand velocity. Walk-in freezers and cold storage circuits are permanently locked against automated alteration.
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {equipment.map((eq) => {
          const isLocked = eq.isSafetyLocked;
          const isOptimized = eq.approved;

          return (
            <div
              key={eq.id}
              className={`p-4 rounded-[4px] border transition-colors flex flex-col justify-between ${
                isLocked
                  ? 'bg-[#F7F6F3] border-[rgba(55,53,47,0.09)]'
                  : isOptimized
                  ? 'bg-[#DDEDEA]/40 border-[#DDEDEA]'
                  : 'bg-white border-[rgba(55,53,47,0.09)] hover:bg-[rgba(55,53,47,0.02)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#37352F]/50 font-medium uppercase tracking-wider">
                    {eq.category}
                  </span>
                  {isLocked ? (
                    <span className="notion-tag bg-[#EBECED] text-[#9B9A97] text-[10px]">
                      <Lock className="w-2.5 h-2.5 mr-1" /> Safety Constrained
                    </span>
                  ) : (
                    <span className="notion-tag bg-[#FAEBDD] text-[#D9730D] text-[10px]">
                      Optimization
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-[#37352F] mt-2">{eq.name}</h4>

                {/* Utilization gauge */}
                <div className="mt-2.5 p-2.5 rounded-[3px] bg-white border border-[rgba(55,53,47,0.06)] space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#37352F]/50">Current Load:</span>
                    <span className="font-medium text-[#37352F]">{eq.currentUtilization}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#37352F]/50">AI Target Mode:</span>
                    <span className="font-medium text-[#D9730D]">{eq.recommendedMode}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-[rgba(55,53,47,0.06)]">
                    <span className="text-[#37352F]/50">Est. Cost: ₹{eq.estimatedHourlyCost}/hr</span>
                    {eq.estimatedSavingsPerHour > 0 && (
                      <span className="text-[#0F7B6C] font-medium">
                        Save: ₹{eq.estimatedSavingsPerHour}/hr
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#37352F]/70 mt-2.5 leading-relaxed">{eq.reason}</p>

                {eq.safetyNote && (
                  <div className="mt-1.5 text-[11px] text-[#37352F]/40 italic">
                    Safety Rule: {eq.safetyNote}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-2.5 border-t border-[rgba(55,53,47,0.06)]">
                {isLocked ? (
                  <div className="text-xs text-[#37352F]/40 flex items-center justify-center py-1 font-medium">
                    <Lock className="w-3 h-3 mr-1" /> Safety Hard-Locked
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEquipmentApproval(eq.id)}
                    className={`w-full py-1.5 rounded-[3px] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isOptimized
                        ? 'bg-[#DDEDEA] text-[#0F7B6C]'
                        : 'border border-[rgba(55,53,47,0.12)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F]'
                    }`}
                  >
                    {isOptimized ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Setback Active (Click to Revert)
                      </>
                    ) : (
                      <>
                        <Power className="w-3.5 h-3.5" /> Approve Setback
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
      <div className="bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] p-4 sm:p-5">
        <div className="pb-3 mb-3 border-b border-[rgba(55,53,47,0.06)] flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-[#37352F]">
              Hourly Power Consumption Profile
            </h3>
            <p className="text-[11px] text-[#37352F]/50">
              Continuous baseline vs AI-moderated demand curve (12:00 PM – 10:00 PM)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[650px] flex items-stretch gap-1.5 py-1">
            {energyTimelineHours.map((slot) => {
              const isDip = slot.hour === '3 PM' || slot.hour === '4 PM';
              const savingsKw = slot.baselineKw - slot.optimizedKw;

              return (
                <div
                  key={slot.hour}
                  className={`flex-1 p-2.5 rounded-[3px] border text-center flex flex-col justify-between ${
                    isDip
                      ? 'bg-[#DDEDEA]/40 border-[#DDEDEA]'
                      : 'bg-white border-[rgba(55,53,47,0.09)]'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-medium text-[#37352F]/70">
                      {slot.hour}
                    </span>
                    <div className="text-sm font-semibold text-[#37352F] mt-1">
                      {slot.optimizedKw} kW
                    </div>
                    <span className="text-[10px] text-[#37352F]/40 block line-through">
                      {slot.baselineKw} kW
                    </span>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-[rgba(55,53,47,0.06)] text-[10px]">
                    {savingsKw > 0 ? (
                      <span className="font-semibold text-[#0F7B6C]">-{savingsKw} kW</span>
                    ) : (
                      <span className="text-[#37352F]/40 font-normal">Standard</span>
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
