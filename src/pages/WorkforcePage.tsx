import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShiftBuilderModal } from '../components/ShiftBuilderModal';
import {
  Users,
  Check,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';

export const WorkforcePage: React.FC = () => {
  const {
    hourlyData,
    scheduleApproved,
    approveSchedule,
    resetScheduleApproval,
    addToast
  } = useApp();

  const [shiftBuilderOpen, setShiftBuilderOpen] = useState<boolean>(false);
  const [recommendationDismissed, setRecommendationDismissed] = useState<boolean>(false);

  const handleDismiss = () => {
    setRecommendationDismissed(true);
    addToast('info', 'Recommendation Dismissed', 'Manager opted to maintain existing schedule.');
  };

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              AI Workforce Optimizer.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              Labor Match
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Match labor capacity with predicted demand across all Burger King restaurant stations.
          </p>
        </div>

        <button
          onClick={() => setShiftBuilderOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#5C3320] bg-white hover:bg-[#5C3320] text-[#5C3320] hover:text-white text-xs font-black uppercase tracking-wider shadow-xs transition-all cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-[#E85C1A]" /> Open Shift Builder
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Current Active Staff
          </span>
          <div className="text-3xl font-black font-display text-[#1A1A1A] mt-1">8 Crew</div>
          <span className="text-xs text-[#6E6E6E] mt-1 block font-medium">Scheduled on floor right now</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Recommended Active Staff
          </span>
          <div className="text-3xl font-black font-display text-[#E85C1A] mt-1">6 Crew</div>
          <span className="text-xs text-[#6E6E6E] mt-1 block font-medium">Optimal capacity for 3:00–5:00 PM</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Potential Shift Optimization
          </span>
          <div className="text-3xl font-black font-display text-[#0E8A3E] mt-1">₹ 3,840/- per day</div>
          <span className="text-[10px] text-[#6E6E6E] font-medium mt-1 block">
            Projected daily labor reallocation savings · Eliminates idle hours
          </span>
        </div>
      </div>

      {/* Main Hourly Staffing Matrix */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black font-display text-[#1A1A1A]">
              Station-by-Station Hourly Staffing Plan.
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-0.5">
              Visual blocks comparing current scheduled deployment vs AI recommended deployment
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-ui">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#5C3320]"></span> Active Assigned
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#E85C1A]"></span> AI Optimal Delta
            </span>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] font-ui">
                <th className="py-3 px-3">Station</th>
                {hourlyData.map((h) => (
                  <th key={h.hour} className="py-3 px-2 text-center">
                    <div className="font-ui uppercase">{h.timeLabel}</div>
                    <div className="text-[9px] font-normal text-stone-400">{h.aiForecast} ord</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs font-ui">
              {/* Front Counter */}
              <tr className="hover:bg-[#F5F4F1]/50 transition-colors">
                <td className="py-3 px-3 font-bold text-[#1A1A1A]">
                  <div>Front Counter</div>
                  <span className="text-[10px] text-[#6E6E6E]">Kiosk & Order Point</span>
                </td>
                {hourlyData.map((h) => {
                  const isDip = h.hour >= 15 && h.hour <= 16;
                  return (
                    <td key={h.hour} className="py-2.5 px-2 text-center">
                      <div
                        className={`inline-flex flex-col items-center justify-center w-12 py-1.5 rounded-xl font-bold transition-all ${
                          isDip && !scheduleApproved
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span className="text-sm font-black font-display">
                          {scheduleApproved ? h.recFrontCrew : h.frontCrew}
                        </span>
                        {isDip && !scheduleApproved && (
                          <span className="text-[8px] text-[#E85C1A] font-black">Rec: 1</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Kitchen */}
              <tr className="hover:bg-[#F5F4F1]/50 transition-colors">
                <td className="py-3 px-3 font-bold text-[#1A1A1A]">
                  <div>Kitchen / Grill</div>
                  <span className="text-[10px] text-[#6E6E6E]">Flame Grill & Fryer</span>
                </td>
                {hourlyData.map((h) => {
                  const isPeak = h.hour >= 18 && h.hour <= 20;
                  return (
                    <td key={h.hour} className="py-2.5 px-2 text-center">
                      <div
                        className={`inline-flex flex-col items-center justify-center w-12 py-1.5 rounded-xl font-bold transition-all ${
                          isPeak
                            ? 'bg-orange-50 text-[#E85C1A] border border-orange-200'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span className="text-sm font-black font-display">
                          {scheduleApproved ? h.recKitchenCrew : h.kitchenCrew}
                        </span>
                        {isPeak && !scheduleApproved && (
                          <span className="text-[8px] text-[#E85C1A] font-black">Rec: 4</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Drive-Thru */}
              <tr className="hover:bg-[#F5F4F1]/50 transition-colors">
                <td className="py-3 px-3 font-bold text-[#1A1A1A]">
                  <div>Drive-Thru</div>
                  <span className="text-[10px] text-[#6E6E6E]">Order & Handout</span>
                </td>
                {hourlyData.map((h) => (
                  <td key={h.hour} className="py-2.5 px-2 text-center">
                    <div className="inline-flex flex-col items-center justify-center w-12 py-1.5 rounded-xl font-bold bg-stone-100 text-stone-700">
                      <span className="text-sm font-black font-display">1</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Delivery */}
              <tr className="hover:bg-[#F5F4F1]/50 transition-colors">
                <td className="py-3 px-3 font-bold text-[#1A1A1A]">
                  <div>Delivery Dispatch</div>
                  <span className="text-[10px] text-[#6E6E6E]">Swiggy / Zomato</span>
                </td>
                {hourlyData.map((h) => {
                  const isEvening = h.hour >= 18;
                  return (
                    <td key={h.hour} className="py-2.5 px-2 text-center">
                      <div
                        className={`inline-flex flex-col items-center justify-center w-12 py-1.5 rounded-xl font-bold ${
                          isEvening ? 'bg-amber-50 text-amber-900' : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span className="text-sm font-black font-display">
                          {scheduleApproved ? h.recDeliveryCrew : h.deliveryCrew}
                        </span>
                        {isEvening && !scheduleApproved && (
                          <span className="text-[8px] text-[#E85C1A] font-black">Rec: 2</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Duty Manager */}
              <tr className="hover:bg-[#F5F4F1]/50 transition-colors bg-stone-50/50">
                <td className="py-3 px-3 font-bold text-[#1A1A1A]">
                  <div>Store Manager</div>
                  <span className="text-[10px] text-[#6E6E6E]">Floor Supervisor</span>
                </td>
                {hourlyData.map((h) => (
                  <td key={h.hour} className="py-2.5 px-2 text-center">
                    <div className="inline-flex flex-col items-center justify-center w-12 py-1.5 rounded-xl font-bold bg-stone-200 text-[#1A1A1A]">
                      <span className="text-sm font-black font-display">1</span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Primary AI Recommendation Card */}
      {!recommendationDismissed && (
        <div className="p-6 bg-gradient-to-br from-white to-[#F5F4F1] rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E85C1A] text-white">
                  AI Recommendation
                </span>
                <span className="text-xs font-bold text-[#1A1A1A]">Target Window: 3:00 PM – 5:00 PM</span>
              </div>

              <h3 className="text-2xl font-black font-display text-[#1A1A1A]">
                Rebalance 2 Cross-Trained Crew to Dinner Peak.
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-ui">
                <div className="p-3.5 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block">
                    CURRENT DEPLOYMENT
                  </span>
                  <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">6 active crew</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block">
                    RECOMMENDED DEPLOYMENT
                  </span>
                  <p className="text-sm font-black text-[#E85C1A] mt-0.5">4 active crew</p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-[#1A1A1A] mt-2 font-ui">
                <strong className="text-amber-900 block mb-0.5">ACTION:</strong>
                Move 2 cross-trained employees (Crew B & Crew C) to the 5:00 PM – 7:30 PM peak period.
                <div className="mt-1 text-[#6E6E6E]">
                  <strong>WHY: </strong>
                  Forecasted order volume is 27% below the current staffing plan. Minimum food safety and station coverage thresholds remain strictly satisfied.
                </div>
              </div>
            </div>

            {/* Buttons: Burger King India Pill Button style */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
              <button
                onClick={approveSchedule}
                disabled={scheduleApproved}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  scheduleApproved
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-[#E85C1A] hover:bg-[#D44D0F] text-white ring-2 ring-orange-200'
                }`}
              >
                {scheduleApproved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Schedule recommendation approved
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Approve Recommendation
                  </>
                )}
              </button>

              <button
                onClick={() => setShiftBuilderOpen(true)}
                className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-white border-2 border-[#5C3320] hover:bg-[#5C3320] text-[#5C3320] hover:text-white transition-all cursor-pointer"
              >
                Edit in Shift Builder
              </button>

              {!scheduleApproved && (
                <button
                  onClick={handleDismiss}
                  className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#6E6E6E] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              )}

              {scheduleApproved && (
                <button
                  onClick={resetScheduleApproval}
                  className="text-[11px] text-[#6E6E6E] hover:text-[#1A1A1A] underline text-center cursor-pointer mt-1 font-bold"
                >
                  Reset Schedule
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shift Builder Modal */}
      <ShiftBuilderModal isOpen={shiftBuilderOpen} onClose={() => setShiftBuilderOpen(false)} />
    </div>
  );
};
