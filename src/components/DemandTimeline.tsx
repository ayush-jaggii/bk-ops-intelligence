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
    <div className="bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] p-4 sm:p-5 font-sans select-none">
      {/* Database View Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(55,53,47,0.06)]">
        <div className="flex items-center gap-1 text-xs">
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-[3px] font-medium text-[#37352F] bg-[rgba(55,53,47,0.06)] cursor-pointer">
            <span>⏱</span>
            <span>Timeline</span>
          </button>
          <span className="text-[#37352F]/30 mx-1">/</span>
          <span className="text-[11px] text-[#37352F]/50">12:00 PM – 8:00 PM Synchronization</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          {onReviewSchedule && (
            <button
              onClick={onReviewSchedule}
              className="px-2.5 py-1 rounded-[3px] text-[#37352F]/80 hover:bg-[rgba(55,53,47,0.06)] hover:text-[#37352F] transition-colors cursor-pointer border border-[rgba(55,53,47,0.12)]"
            >
              Review Roster
            </button>
          )}

          <button
            onClick={approveSchedule}
            disabled={scheduleApproved}
            className={`px-3 py-1 rounded-[3px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              scheduleApproved
                ? 'bg-[#DDEDEA] text-[#0F7B6C] cursor-default'
                : 'bg-[#2383E2] hover:bg-[#1B6FBF] text-white shadow-xs'
            }`}
          >
            {scheduleApproved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Roster Approved</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Apply Sync</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Timeline Scrubber Bar */}
      <div className="py-4 overflow-x-auto">
        <div className="min-w-[580px] flex items-stretch gap-1.5">
          {hourlyData.map((hour) => {
            const isSelected = hour.hour === selectedHour;
            const is3to5Dip = hour.hour >= 15 && hour.hour <= 16;
            const isEveningPeak = hour.hour >= 18 && hour.hour <= 20;

            return (
              <button
                key={hour.hour}
                onClick={() => setSelectedHour(hour.hour)}
                className={`flex-1 min-w-[65px] p-2.5 rounded-[3px] transition-colors text-center flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-[rgba(55,53,47,0.08)] border-[rgba(55,53,47,0.25)] text-[#37352F]'
                    : 'bg-white border-[rgba(55,53,47,0.09)] text-[#37352F]/80 hover:bg-[rgba(55,53,47,0.04)]'
                }`}
              >
                {/* Time header */}
                <div className="text-[11px] font-medium text-[#37352F]/70 flex items-center justify-center gap-1">
                  <span>{hour.timeLabel}</span>
                  {is3to5Dip && <span className="w-1.5 h-1.5 rounded-full bg-[#DFAB01]" title="Afternoon Lull" />}
                  {isEveningPeak && <span className="w-1.5 h-1.5 rounded-full bg-[#D9730D]" title="Evening Rush" />}
                </div>

                {/* Demand Value */}
                <div className="my-1.5">
                  <div className={`text-lg font-semibold tracking-tight ${isSelected ? 'text-[#37352F]' : 'text-[#37352F]/90'}`}>
                    {hour.aiForecast}
                  </div>
                  <div className="text-[10px] text-[#37352F]/40 font-normal">orders</div>
                </div>

                {/* Crew comparison pill */}
                <div
                  className={`text-[10px] font-medium py-0.5 px-1 rounded-[3px] ${
                    isSelected
                      ? 'bg-white text-[#37352F] border border-[rgba(55,53,47,0.12)]'
                      : hour.scheduledCrew !== hour.recommendedCrew
                      ? 'bg-[#FBF3DB] text-[#DFAB01]'
                      : 'bg-[#EBECED] text-[#9B9A97]'
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

      {/* Notion Callout Block for Selected Hour Detail */}
      <div className="notion-callout mt-1">
        <div className="text-xl shrink-0">💡</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#37352F]">
                {currentPoint.timeLabel} Simulation
              </span>
              {isDip && (
                <span className="notion-tag bg-[#FBF3DB] text-[#DFAB01] text-[10px]">
                  -31% Afternoon Lull
                </span>
              )}
              {isPeak && (
                <span className="notion-tag bg-[#FAEBDD] text-[#D9730D] text-[10px]">
                  Peak Dinner Rush
                </span>
              )}
            </div>

            <span className="text-xs text-[#37352F]/50">
              Roster: {currentPoint.scheduledCrew} scheduled → <strong className="text-[#0F7B6C]">{currentPoint.recommendedCrew} recommended</strong>
            </span>
          </div>

          {/* Inline Properties Grid */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="text-[11px] text-[#37352F]/50 font-normal">Stations</div>
              <div className="font-medium text-[#37352F] mt-0.5">
                {currentPoint.recFrontCrew} FOH · {currentPoint.recKitchenCrew} KDS
              </div>
            </div>

            <div className="p-2 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="text-[11px] text-[#37352F]/50 font-normal">Kitchen Batch Prep</div>
              <div className="font-medium text-[#37352F] mt-0.5">
                {isDip ? 'Hold batch drops' : 'Staggered batches'}
              </div>
            </div>

            <div className="p-2 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="text-[11px] text-[#37352F]/50 font-normal">Dining Setback</div>
              <div className="font-medium text-[#0F7B6C] mt-0.5">
                {currentPoint.diningHvacMode}
              </div>
            </div>
          </div>

          <div className="mt-2.5 text-xs text-[#37352F]/70 leading-relaxed">
            <strong>Recommendation: </strong>
            {isDip
              ? 'Reduce active front-of-house staffing by 2 and reallocate cross-trained crew to the 5–7 PM rush window.'
              : isPeak
              ? 'Reinforce Fry Station and Packer role. Ensure 1 cross-trained runner covers aggregator handoffs.'
              : 'Maintain standard cadence; all stations operating within calibrated throughput capacity.'}
          </div>
        </div>
      </div>
    </div>
  );
};
