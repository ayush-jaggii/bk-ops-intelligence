import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Users, ArrowRight, CheckCircle2, Check, AlertTriangle, Sparkles, Activity } from 'lucide-react';

interface DemandTimelineProps {
  onReviewSchedule?: () => void;
}

export const DemandTimeline: React.FC<DemandTimelineProps> = ({ onReviewSchedule }) => {
  const { hourlyData, scheduleApproved, approveSchedule } = useApp();
  const [selectedHour, setSelectedHour] = useState<number>(15); // default 3 PM to show lull

  const currentPoint = hourlyData.find((h) => h.hour === selectedHour) || hourlyData[3];
  const isLull = currentPoint.isLull;
  const isPeak = currentPoint.isPeak;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-6 overflow-hidden font-ui">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#5C3320] text-white">
              Demand-Responsive Timeline
            </span>
            <span className="text-xs text-[#6E6E6E] font-medium">12 PM – 8 PM Hourly Synchronization</span>
          </div>
          <h3 className="text-xl font-black font-display text-[#1A1A1A] mt-1">
            Traffic Velocity, Speed of Service & Roster Demand.
          </h3>
          <p className="text-xs text-[#6E6E6E] mt-0.5">
            Compare static 9-hour straight shifts against dynamic 4-hour micro-shifts across every operating hour.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {onReviewSchedule && (
            <button
              onClick={onReviewSchedule}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-ui text-[#5C3320] bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer"
            >
              Review Station Roster
            </button>
          )}

          <button
            onClick={approveSchedule}
            disabled={scheduleApproved}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold font-ui uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              scheduleApproved
                ? 'bg-emerald-50 text-[#0E8A3E] border border-emerald-200 cursor-default'
                : 'bg-[#5C3320] hover:bg-[#4A2616] text-white '
            }`}
          >
            {scheduleApproved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> 5-Day Schedule Approved
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-[#E85C1A]" /> Approve Dynamic Roster
              </>
            )}
          </button>
        </div>
      </div>

      {/* Timeline Bar (Horizontal hours) */}
      <div className="py-5 overflow-x-auto">
        <div className="min-w-[640px] flex items-stretch gap-2">
          {hourlyData.map((hour) => {
            const isSelected = hour.hour === selectedHour;
            const isOverstaffedLull = hour.isLull && !scheduleApproved;
            const isUnderstaffedPeak = hour.isPeak && !scheduleApproved;

            return (
              <button
                key={hour.hour}
                onClick={() => setSelectedHour(hour.hour)}
                className={`flex-1 min-w-[72px] p-3 rounded-xl transition-all text-center flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-[#5C3320] text-white border-[#5C3320] ring-2 ring-[#E85C1A]'
                    : isOverstaffedLull
                    ? 'bg-amber-50/70 border-amber-300 text-[#1A1A1A] hover:bg-amber-100/60'
                    : isUnderstaffedPeak
                    ? 'bg-rose-50/70 border-rose-200 text-[#1A1A1A] hover:bg-rose-100/60'
                    : 'bg-stone-50/70 border-stone-200 text-[#1A1A1A] hover:bg-stone-100/80'
                }`}
              >
                {/* Time header */}
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold font-ui">
                  <span>{hour.timeLabel}</span>
                  {hour.isLull && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Afternoon Lull" />}
                  {hour.isPeak && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="Dinner Rush Peak" />}
                </div>

                {/* Transactions Value */}
                <div className="my-2">
                  <div
                    className={`text-xl font-black font-display leading-tight ${
                      isSelected ? 'text-[#F5A827]' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {hour.transactionsPerHour}
                  </div>
                  <div className={`text-[9px] font-medium font-ui ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                    tx / hr
                  </div>
                </div>

                {/* Productivity / Crew Pill */}
                <div
                  className={`text-[9px] font-bold py-1 px-1 rounded-md ${
                    isSelected
                      ? 'bg-white/15 text-white'
                      : isOverstaffedLull
                      ? 'bg-amber-200/70 text-amber-950 font-black'
                      : isUnderstaffedPeak
                      ? 'bg-rose-200/70 text-rose-950 font-black'
                      : 'bg-stone-200/60 text-stone-600'
                  }`}
                >
                  {scheduleApproved
                    ? `${hour.recommendedCrew} crew`
                    : `${hour.traditionalCrew9h} crew`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Callout for Selected Hour */}
      <div className="p-5 rounded-xl bg-stone-50/90 border border-stone-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-13 h-13 rounded-xl bg-[#5C3320] text-[#F5A827] flex flex-col items-center justify-center font-black font-display text-base shrink-0">
              <span>{currentPoint.timeLabel}</span>
              <span className="text-[9px] text-stone-300 font-normal font-ui">Window</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-black font-display text-[#1A1A1A]">
                  {currentPoint.transactionsPerHour} Transactions Projected
                </span>
                {isLull && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-950 border border-amber-300">
                    Off-Peak Lull ({currentPoint.txPerEmployeeUnoptimized} tx/emp in static roster)
                  </span>
                )}
                {isPeak && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-950 border border-rose-300">
                    Peak Surge Window (SoS Risk)
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E6E6E] mt-1">
                Static 9h Roster: <strong>{currentPoint.traditionalCrew9h} Staff</strong> · Dynamic AI Roster:{' '}
                <strong className="text-[#E85C1A]">{currentPoint.recommendedCrew} Staff</strong>{' '}
                {currentPoint.microShiftCrewCount > 0 && (
                  <span className="text-[#0E8A3E] font-bold">
                    (+{currentPoint.microShiftCrewCount} Peak Micro-Shifts)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* 3 Metric Diagnosis Badges */}
          <div className="grid grid-cols-3 gap-2.5 text-xs">
            {/* Speed of Service */}
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 ">
              <span className="text-[10px] text-[#6E6E6E] font-bold uppercase tracking-wider block flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E85C1A]" /> Speed of Service
              </span>
              <div className="mt-0.5">
                <span className="font-black font-display text-sm text-[#1A1A1A]">
                  {scheduleApproved
                    ? `${Math.floor(currentPoint.speedOfServiceSecOptimized / 60)}m ${currentPoint.speedOfServiceSecOptimized % 60}s`
                    : `${Math.floor(currentPoint.speedOfServiceSecUnoptimized / 60)}m ${currentPoint.speedOfServiceSecUnoptimized % 60}s`}
                </span>
                <span className={`text-[9px] ml-1 font-semibold ${
                  scheduleApproved ? 'text-[#0E8A3E]' : currentPoint.speedOfServiceSecUnoptimized > 240 ? 'text-rose-600' : 'text-stone-500'
                }`}>
                  {scheduleApproved ? '✓ < 3m Target' : currentPoint.speedOfServiceSecUnoptimized > 240 ? '⚠ Blowout' : 'Normal'}
                </span>
              </div>
            </div>

            {/* Transactions per Employee */}
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 ">
              <span className="text-[10px] text-[#6E6E6E] font-bold uppercase tracking-wider block flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#5C3320]" /> Tx / Employee
              </span>
              <div className="mt-0.5">
                <span className="font-black font-display text-sm text-[#1A1A1A]">
                  {scheduleApproved ? currentPoint.txPerEmployeeOptimized : currentPoint.txPerEmployeeUnoptimized}
                </span>
                <span className={`text-[9px] ml-1 font-semibold ${
                  currentPoint.txPerEmployeeUnoptimized < 2.0 && !scheduleApproved
                    ? 'text-amber-700'
                    : 'text-[#0E8A3E]'
                }`}>
                  {currentPoint.txPerEmployeeUnoptimized < 2.0 && !scheduleApproved ? 'Idle Overstaffed' : 'Optimal Band'}
                </span>
              </div>
            </div>

            {/* Station Rebalancing */}
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 ">
              <span className="text-[10px] text-[#6E6E6E] font-bold uppercase tracking-wider block flex items-center gap-1">
                <Users className="w-3 h-3 text-[#0E8A3E]" /> Station Rebalance
              </span>
              <div className="mt-0.5 font-bold text-[#1A1A1A] truncate text-[11px]">
                {isPeak
                  ? 'BOH → Assembly & Dispatch'
                  : isLull
                  ? 'Sanitize & Stagger Breaks'
                  : 'Balanced Standard'}
              </div>
            </div>
          </div>
        </div>

        {/* AI Action Strip */}
        <div className="mt-4 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#E85C1A] shrink-0 mt-0.5" />
            <p className="text-[#1A1A1A]">
              <strong>AI Decision Loop: </strong>
              {isLull
                ? 'Standing down 5 unneeded staff prevents 10 unproductive labor hours. 1 crew member rebalanced to deep back-of-house sanitization.'
                : isPeak
                ? 'Deploying 3 to 4 flexible micro-shift crew to the Assembly Board and Aggregator Dispatch keeps ticket times under 3 minutes and prevents customer walkouts.'
                : 'All station queues balanced within optimal throughput capacity.'}
            </p>
          </div>

          <div className="text-[11px] text-[#6E6E6E] font-semibold shrink-0 italic">
            {scheduleApproved ? '✓ 5-Day Schedule Locked' : 'Pending Manager Review & Approval'}
          </div>
        </div>
      </div>
    </div>
  );
};
