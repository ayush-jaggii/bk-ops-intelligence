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
    <div className="space-y-6 pb-12 font-sans select-none text-[#37352F]">
      {/* Page Header */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-4xl mb-3">👥</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#37352F] tracking-tight">
            Workforce & Shifts
          </h1>
          <p className="text-xs text-[#37352F]/60 mt-1">
            Real-time station labor allocation synchronized with order velocity forecast.
          </p>
        </div>

        <button
          onClick={() => setShiftBuilderOpen(true)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[rgba(55,53,47,0.16)] bg-white hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] text-xs font-medium transition-colors cursor-pointer shadow-xs"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#2383E2]" />
          <span>Open Shift Builder</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Current Scheduled Staff
          </span>
          <div className="text-2xl font-semibold text-[#37352F] mt-1">8 Crew</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">Scheduled on floor currently</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Recommended Optimal Staff
          </span>
          <div className="text-2xl font-semibold text-[#D9730D] mt-1">6 Crew</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">Optimal for 3:00–5:00 PM lull</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Shift Optimization Savings
          </span>
          <div className="text-2xl font-semibold text-[#0F7B6C] mt-1">₹ 3,840/- day</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">Eliminates idle hours in afternoon lull</span>
        </div>
      </div>

      {/* Main Hourly Staffing Table View */}
      <div className="bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 border-b border-[rgba(55,53,47,0.06)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#37352F]">Station Staffing Matrix</span>
            <span className="text-xs text-[#37352F]/40">/</span>
            <span className="text-xs text-[#37352F]/50">Hourly deployment plan</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-[#37352F]/70">
              <span className="w-2 h-2 rounded-full bg-[#37352F]/40"></span> Active Scheduled
            </span>
            <span className="flex items-center gap-1.5 text-[#37352F]/70">
              <span className="w-2 h-2 rounded-full bg-[#D9730D]"></span> Recommended Delta
            </span>
          </div>
        </div>

        {/* Database Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px] text-xs">
            <thead>
              <tr className="border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]/60 text-[11px] font-medium text-[#37352F]/60">
                <th className="py-2.5 px-3">Station</th>
                {hourlyData.map((h) => (
                  <th key={h.hour} className="py-2.5 px-2 text-center">
                    <div>{h.timeLabel}</div>
                    <div className="text-[10px] text-[#37352F]/40 font-normal">{h.aiForecast} ord</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
              {/* Front Counter */}
              <tr className="hover:bg-[rgba(55,53,47,0.02)] transition-colors">
                <td className="py-2.5 px-3 font-medium text-[#37352F]">
                  <div>Front Counter</div>
                  <span className="text-[10px] text-[#37352F]/40">Kiosks & Cashier</span>
                </td>
                {hourlyData.map((h) => {
                  const isDip = h.hour >= 15 && h.hour <= 16;
                  return (
                    <td key={h.hour} className="py-2 px-2 text-center">
                      <span
                        className={`notion-tag text-xs font-semibold ${
                          isDip && !scheduleApproved
                            ? 'bg-[#FBF3DB] text-[#DFAB01]'
                            : 'bg-[#EBECED] text-[#37352F]'
                        }`}
                      >
                        {scheduleApproved ? h.recFrontCrew : h.frontCrew}
                        {isDip && !scheduleApproved && <span className="text-[10px] ml-1">→1</span>}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Kitchen */}
              <tr className="hover:bg-[rgba(55,53,47,0.02)] transition-colors">
                <td className="py-2.5 px-3 font-medium text-[#37352F]">
                  <div>Kitchen & Grill</div>
                  <span className="text-[10px] text-[#37352F]/40">Flame Broiler & Fryer</span>
                </td>
                {hourlyData.map((h) => {
                  const isPeak = h.hour >= 18 && h.hour <= 20;
                  return (
                    <td key={h.hour} className="py-2 px-2 text-center">
                      <span
                        className={`notion-tag text-xs font-semibold ${
                          isPeak && !scheduleApproved
                            ? 'bg-[#FAEBDD] text-[#D9730D]'
                            : 'bg-[#EBECED] text-[#37352F]'
                        }`}
                      >
                        {scheduleApproved ? h.recKitchenCrew : h.kitchenCrew}
                        {isPeak && !scheduleApproved && <span className="text-[10px] ml-1">→4</span>}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Drive-Thru */}
              <tr className="hover:bg-[rgba(55,53,47,0.02)] transition-colors">
                <td className="py-2.5 px-3 font-medium text-[#37352F]">
                  <div>Drive-Thru</div>
                  <span className="text-[10px] text-[#37352F]/40">Order & Window</span>
                </td>
                {hourlyData.map((h) => (
                  <td key={h.hour} className="py-2 px-2 text-center">
                    <span className="notion-tag bg-[#EBECED] text-[#37352F] text-xs">1</span>
                  </td>
                ))}
              </tr>

              {/* Delivery */}
              <tr className="hover:bg-[rgba(55,53,47,0.02)] transition-colors">
                <td className="py-2.5 px-3 font-medium text-[#37352F]">
                  <div>Delivery Dispatch</div>
                  <span className="text-[10px] text-[#37352F]/40">Swiggy & Zomato</span>
                </td>
                {hourlyData.map((h) => {
                  const isEvening = h.hour >= 18;
                  return (
                    <td key={h.hour} className="py-2 px-2 text-center">
                      <span
                        className={`notion-tag text-xs ${
                          isEvening ? 'bg-[#FAEBDD] text-[#D9730D] font-medium' : 'bg-[#EBECED] text-[#37352F]'
                        }`}
                      >
                        {scheduleApproved ? h.recDeliveryCrew : h.deliveryCrew}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Duty Manager */}
              <tr className="hover:bg-[rgba(55,53,47,0.02)] transition-colors bg-[#F7F6F3]/30">
                <td className="py-2.5 px-3 font-medium text-[#37352F]">
                  <div>Duty Manager</div>
                  <span className="text-[10px] text-[#37352F]/40">Shift Lead</span>
                </td>
                {hourlyData.map((h) => (
                  <td key={h.hour} className="py-2 px-2 text-center">
                    <span className="notion-tag bg-[#EBECED] text-[#37352F] text-xs font-semibold">1</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notion Callout Box for AI Recommendation */}
      {!recommendationDismissed && (
        <div className="notion-callout border border-[rgba(55,53,47,0.09)]">
          <div className="text-xl shrink-0">💡</div>
          <div className="flex-1 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="notion-tag bg-[#FAEBDD] text-[#D9730D] text-[10px]">
                  Roster Recommendation
                </span>
                <span className="text-[#37352F]/60">Window: 3:00 PM – 5:00 PM</span>
              </div>

              <h3 className="text-sm font-semibold text-[#37352F]">
                Rebalance 2 Cross-Trained Crew Members to Evening Rush
              </h3>

              <p className="text-[#37352F]/70 leading-relaxed">
                Forecasted order volume drops 27% below scheduled roster capacity. Moving 2 cross-trained crew to the 5:00–7:30 PM rush eliminates idle cost while ensuring speed of service during dinner peak.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={approveSchedule}
                disabled={scheduleApproved}
                className={`px-3.5 py-1.5 rounded-[4px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer text-xs ${
                  scheduleApproved
                    ? 'bg-[#DDEDEA] text-[#0F7B6C] cursor-default'
                    : 'bg-[#2383E2] hover:bg-[#1B6FBF] text-white shadow-xs'
                }`}
              >
                {scheduleApproved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" /> Approve Roster
                  </>
                )}
              </button>

              {!scheduleApproved && (
                <button
                  onClick={handleDismiss}
                  className="px-2.5 py-1.5 rounded-[4px] text-[#37352F]/60 hover:text-[#37352F] hover:bg-[rgba(55,53,47,0.06)] transition-colors cursor-pointer text-xs"
                >
                  Dismiss
                </button>
              )}

              {scheduleApproved && (
                <button
                  onClick={resetScheduleApproval}
                  className="text-xs text-[#37352F]/50 hover:text-[#37352F] hover:underline cursor-pointer"
                >
                  Reset
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
