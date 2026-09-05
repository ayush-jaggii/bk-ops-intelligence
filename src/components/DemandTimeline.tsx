import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Users, ChefHat, Zap, ArrowRight, CheckCircle2, Check, Cpu } from 'lucide-react';

interface DemandTimelineProps {
  onReviewSchedule?: () => void;
}

export const DemandTimeline: React.FC<DemandTimelineProps> = ({ onReviewSchedule }) => {
  const { hourlyData, scheduleApproved, approveSchedule } = useApp();
  const [selectedHour, setSelectedHour] = useState<number>(15); // default 3 PM

  const currentPoint = hourlyData.find((h) => h.hour === selectedHour) || hourlyData[3];
  const isDip = currentPoint.hour >= 15 && currentPoint.hour <= 16;
  const isPeak = currentPoint.hour >= 18 && currentPoint.hour <= 20;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 overflow-hidden font-ui">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <h3 className="text-xl font-black font-display text-[#1A1A1A]">
            Hourly Demand & Station Synchronization
          </h3>
          <p className="text-xs text-[#6E6E6E] mt-0.5">
            Select an hour to inspect demand pacing, station staffing, prep thresholds, and dining setback.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {onReviewSchedule && (
            <button
              onClick={onReviewSchedule}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-ui text-[#5C3320] bg-stone-100 hover:bg-stone-200 transition-all cursor-pointer"
            >
              Review Schedule
            </button>
          )}

          <button
            onClick={approveSchedule}
            disabled={scheduleApproved}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold font-ui uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              scheduleApproved
                ? 'bg-emerald-50 text-[#0E8A3E] border border-emerald-200 cursor-default'
                : 'bg-[#5C3320] hover:bg-[#4A2616] text-white shadow-xs'
            }`}
          >
            {scheduleApproved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-[#E85C1A]" /> Apply Sync
              </>
            )}
          </button>
        </div>
      </div>

      {/* Timeline Bar (Horizontal hours) */}
      <div className="py-5 overflow-x-auto">
        <div className="min-w-[620px] flex items-stretch gap-2">
          {hourlyData.map((hour) => {
            const isSelected = hour.hour === selectedHour;
            const is3to5Dip = hour.hour >= 15 && hour.hour <= 16;
            const isEveningPeak = hour.hour >= 18 && hour.hour <= 20;

            return (
              <button
                key={hour.hour}
                onClick={() => setSelectedHour(hour.hour)}
                className={`flex-1 min-w-[70px] p-3 rounded-xl transition-all text-center flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-[#5C3320] text-white border-[#5C3320] shadow-sm ring-2 ring-[#E85C1A]'
                    : 'bg-stone-50/70 border-stone-200 text-[#1A1A1A] hover:bg-stone-100/80'
                }`}
              >
                {/* Time header */}
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold font-ui">
                  <span>{hour.timeLabel}</span>
                  {is3to5Dip && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Afternoon Lull" />}
                  {isEveningPeak && <span className="w-1.5 h-1.5 rounded-full bg-[#E85C1A]" title="Evening Rush" />}
                </div>

                {/* Demand Value */}
                <div className="my-2">
                  <div
                    className={`text-xl font-black font-display leading-tight ${
                      isSelected ? 'text-[#F5A827]' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {hour.aiForecast}
                  </div>
                  <div className={`text-[10px] font-medium font-ui ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                    orders
                  </div>
                </div>

                {/* Crew comparison badge */}
                <div
                  className={`text-[10px] font-bold py-1 px-1 rounded-md ${
                    isSelected
                      ? 'bg-white/15 text-white'
                      : hour.scheduledCrew !== hour.recommendedCrew
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-stone-200/60 text-stone-600'
                  }`}
                >
                  {scheduleApproved
                    ? `${hour.recommendedCrew} crew`
                    : hour.scheduledCrew !== hour.recommendedCrew
                    ? `${hour.scheduledCrew}→${hour.recommendedCrew}`
                    : `${hour.scheduledCrew} crew`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Callout for Selected Hour */}
      <div className="p-4 sm:p-5 rounded-xl bg-stone-50/80 border border-stone-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#5C3320] text-[#F5A827] flex items-center justify-center font-black font-display text-lg shadow-sm">
              {currentPoint.timeLabel}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black font-display text-[#1A1A1A]">
                  Forecast: {currentPoint.aiForecast} orders/hr
                </span>
                {isDip && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                    -31% Afternoon Lull
                  </span>
                )}
                {isPeak && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-200 text-orange-950">
                    Peak Dinner Window
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E6E6E] mt-0.5">
                Scheduled Crew: <strong>{currentPoint.scheduledCrew}</strong> · Recommended Crew:{' '}
                <strong className="text-[#E85C1A]">{currentPoint.recommendedCrew}</strong>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-[#6E6E6E] font-bold uppercase tracking-wider block flex items-center gap-1">
                <Users className="w-3 h-3 text-[#E85C1A]" /> Front / Kitchen
              </span>
              <span className="font-bold text-[#1A1A1A]">
                {currentPoint.recFrontCrew} FOH / {currentPoint.recKitchenCrew} KDS
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-[#6E6E6E] font-bold uppercase tracking-wider block flex items-center gap-1">
                <ChefHat className="w-3 h-3 text-amber-700" /> Kitchen Prep
              </span>
              <span className="font-bold text-[#1A1A1A]">
                {isDip ? 'Hold batch drops' : 'Staggered batches'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-[#6E6E6E] font-bold uppercase tracking-wider block flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#0E8A3E]" /> HVAC Mode
              </span>
              <span className="font-bold text-[#0E8A3E]">{currentPoint.diningHvacMode}</span>
            </div>
          </div>
        </div>

        {/* AI Action Box */}
        <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Cpu className="w-4 h-4 text-[#E85C1A] shrink-0 mt-0.5" />
            <p className="text-[#1A1A1A]">
              <strong>AI Recommendation: </strong>
              {isDip
                ? 'Reduce active front-of-house staffing by 2 and move cross-trained crew members to the 5–7 PM peak.'
                : isPeak
                ? 'Reinforce Fry Station and Packer role. Ensure 1 cross-trained runner covers aggregator handoffs.'
                : 'Maintain standard cadence; all stations operating within calibrated throughput capacity.'}
            </p>
          </div>

          <div className="text-[11px] text-[#6E6E6E] font-medium shrink-0 italic">
            {scheduleApproved ? '✓ Master Roster Updated' : 'Pending Manager Review'}
          </div>
        </div>
      </div>
    </div>
  );
};
