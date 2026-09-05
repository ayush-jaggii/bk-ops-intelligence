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
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 overflow-hidden font-ui">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#5C3320] text-white">
              Operations Timeline
            </span>
            <span className="text-xs text-[#6E6E6E] font-medium">12 PM – 8 PM Hourly Synchronization</span>
          </div>
          <h3 className="text-2xl font-black font-display text-[#1A1A1A] mt-1">AI Operations Timeline.</h3>
          <p className="text-xs text-[#6E6E6E] mt-0.5">
            Select any hour to inspect simulated demand velocity, recommended crew, kitchen batch triggers, and HVAC state.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {onReviewSchedule && (
            <button
              onClick={onReviewSchedule}
              className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 border-[#5C3320] text-[#5C3320] hover:bg-[#5C3320] hover:text-white transition-all cursor-pointer"
            >
              Review Schedule
            </button>
          )}

          <button
            onClick={approveSchedule}
            disabled={scheduleApproved}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              scheduleApproved
                ? 'bg-emerald-100 text-[#0E8A3E] cursor-default border border-emerald-300'
                : 'bg-[#E85C1A] hover:bg-[#D44D0F] text-white shadow-sm ring-2 ring-orange-200'
            }`}
          >
            {scheduleApproved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Recommendation Approved
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" /> Apply Recommendation
              </>
            )}
          </button>
        </div>
      </div>

      {/* Timeline Bar (Horizontal hours) */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[650px] flex items-stretch gap-2.5">
          {hourlyData.map((hour) => {
            const isSelected = hour.hour === selectedHour;
            const is3to5Dip = hour.hour >= 15 && hour.hour <= 16;
            const isEveningPeak = hour.hour >= 18 && hour.hour <= 20;

            return (
              <button
                key={hour.hour}
                onClick={() => setSelectedHour(hour.hour)}
                className={`flex-1 min-w-[72px] p-3.5 rounded-xl transition-all text-center flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-[#5C3320] text-white border-[#5C3320] shadow-md scale-102 ring-2 ring-[#E85C1A]'
                    : is3to5Dip
                    ? 'bg-amber-50/80 border-amber-300 text-[#1A1A1A] hover:bg-amber-100'
                    : isEveningPeak
                    ? 'bg-orange-50/70 border-orange-200 text-[#1A1A1A] hover:bg-orange-100'
                    : 'bg-[#F5F4F1] border-stone-200 text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                {/* Time header */}
                <div className="text-xs font-black uppercase tracking-wider mb-1 font-ui">
                  {hour.timeLabel}
                </div>

                {/* Demand Value */}
                <div
                  className={`text-xl font-black font-display my-1 ${
                    isSelected
                      ? 'text-[#F5A827]'
                      : is3to5Dip
                      ? 'text-amber-800'
                      : isEveningPeak
                      ? 'text-[#E85C1A]'
                      : 'text-[#1A1A1A]'
                  }`}
                >
                  {hour.aiForecast}
                  <span className="text-[9px] font-normal block font-ui text-stone-400">orders/hr</span>
                </div>

                {/* Crew comparison badge */}
                <div
                  className={`text-[10px] font-bold py-1 px-1.5 rounded-md mt-2 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : hour.scheduledCrew !== hour.recommendedCrew
                      ? 'bg-amber-200/80 text-amber-900 font-black'
                      : 'bg-stone-200/70 text-[#6E6E6E]'
                  }`}
                >
                  {scheduleApproved ? `${hour.recommendedCrew} crew` : `${hour.scheduledCrew} → ${hour.recommendedCrew} crew`}
                </div>

                {/* Period tag */}
                {is3to5Dip && (
                  <span className="mt-1 text-[8px] font-black uppercase tracking-wider text-amber-700">
                    Low Lull
                  </span>
                )}
                {isEveningPeak && (
                  <span className="mt-1 text-[8px] font-black uppercase tracking-wider text-[#E85C1A]">
                    Dinner Rush
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Callout for Selected Hour */}
      <div className="p-5 rounded-xl bg-[#F5F4F1] border border-stone-200">
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
