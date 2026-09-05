import React from 'react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { DemandTimeline } from '../components/DemandTimeline';
import {
  IndianRupee,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Layers,
  Zap,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { NavTab } from '../components/Sidebar';

interface OverviewPageProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ setCurrentTab }) => {
  const {
    selectedStore,
    metrics,
    scheduleApproved,
    approveSchedule
  } = useApp();

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
            Roster Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Demand-Responsive Shift Scheduler for {selectedStore.name} · 5-Day Advance Roster Delivery
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentTab('impact')}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#5C3320] text-xs font-bold font-ui uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            <span>Labor Budget Impact: ₹{metrics.monthlyOpportunityLakhs}L/mo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A]" />
          </button>
        </div>
      </div>

      {/* Human-in-the-Loop 5-Day Advance Schedule Review Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          scheduleApproved
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/80 border-amber-300 text-amber-950'
        }`}
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              scheduleApproved ? 'bg-[#0E8A3E] text-white' : 'bg-[#E85C1A] text-white animate-pulse'
            }`}
          >
            {scheduleApproved ? <CheckCircle2 className="w-5 h-5" /> : <CalendarCheck className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider font-ui">
                {scheduleApproved ? '5-Day Advance Schedule Approved' : 'Human-in-the-Loop Review: 5-Day Advance Roster'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/70 border border-stone-200">
                Store Manager Authority
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-0.5">
              {scheduleApproved
                ? 'Master roster synchronized to store biometric clock. Flexible 4-hour micro-shifts deployed for peak rush.'
                : 'AI auto-rostering engine generated next week’s demand-aligned schedule. Off-peak overlap removed; 4-hour micro-shifts added.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {!scheduleApproved ? (
            <button
              onClick={approveSchedule}
              className="px-4 py-2 bg-[#5C3320] hover:bg-[#4A2616] text-white text-xs font-bold font-ui uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Approve Roster</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A]" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentTab('workforce')}
              className="px-3.5 py-1.5 bg-white border border-emerald-300 text-emerald-900 text-xs font-bold font-ui uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              View Shift Breakdown
            </button>
          )}
        </div>
      </div>

      {/* 4 Focused Labor & Speed of Service KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TODAY'S SALES"
          value={`${metrics.salesToday}/-`}
          change={metrics.salesDiffPct}
          isPositiveChange={!metrics.salesDiffPct.includes('-')}
          icon={IndianRupee}
          subtext="Orders: 1,146 · Pacing on Target"
        />

        <KPICard
          title="SPEED OF SERVICE (SOS)"
          value={metrics.avgSpeedOfServiceFormatted}
          change={metrics.speedOfServiceSavedSec}
          isPositiveChange={true}
          icon={Clock}
          subtext="Benchmark: < 3m 00s (Saved: 3m 46s)"
        />

        <KPICard
          title="LABOR UTILIZATION"
          value={`${metrics.laborUtilPct}%`}
          change={metrics.laborDiffPts}
          isPositiveChange={true}
          icon={Users}
          subtext={`Lull: ${metrics.txPerEmployeeLull} tx/emp · Peak: ${metrics.txPerEmployeeAvg} tx/emp`}
        />

        <KPICard
          title="UNPRODUCTIVE WAGES SAVED"
          value={metrics.dailyLaborSavingsINR}
          change="+16 hrs saved"
          isPositiveChange={true}
          icon={TrendingDown}
          subtext="Eliminates 3–5 PM shift overlap"
        />
      </div>

      {/* Demand Velocity & Station Synchronization Timeline */}
      <DemandTimeline onReviewSchedule={() => setCurrentTab('workforce')} />

      {/* The Two Core Operational Pillars: Off-Peak Overstaffing vs Peak Understaffing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Off-Peak Overstaffing */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-black font-ui uppercase tracking-wider text-[#6E6E6E]">
                  Problem 1: Off-Peak Overstaffing
                </span>
              </div>
              <span className="text-[10px] font-black font-ui uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                3:00 PM – 5:00 PM Lull
              </span>
            </div>

            <h3 className="text-lg font-black font-display text-[#1A1A1A] mt-3">
              Eliminating Unproductive Overlapping 9h Shifts.
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-1 leading-relaxed font-ui">
              In traditional 9-hour straight shifts, 8 to 9 staff members handle only 14–16 transactions/hour (<strong className="text-amber-800">less than 2 tx/employee/hour</strong>). The AI demand-responsive roster scales off-peak presence down to 4 crew, reassigning surplus hours to dinner rush.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#F5F4F1] border border-stone-200 grid grid-cols-2 gap-2 text-xs font-ui">
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Static 9-Hour Roster
                </span>
                <span className="font-bold text-[#1A1A1A]">9 Staff · 1.7 tx/emp (Idle)</span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Demand-Aligned Roster
                </span>
                <span className="font-bold text-[#0E8A3E]">4 Staff · 4.0 tx/emp (Optimal)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between font-ui">
            <span className="text-xs font-black text-[#0E8A3E]">Daily Saving: ₹ 3,840/- (16 Idle Hours)</span>
            <button
              onClick={() => setCurrentTab('workforce')}
              className="px-4 py-2 rounded-full border border-[#5C3320] bg-white hover:bg-[#5C3320] text-[#5C3320] hover:text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              Inspect Roster <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Peak Understaffing & Micro-Shifts */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-black font-ui uppercase tracking-wider text-[#6E6E6E]">
                  Problem 2: Peak Understaffing
                </span>
              </div>
              <span className="text-[10px] font-black font-ui uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                1–3 PM & 7–10 PM Rushes
              </span>
            </div>

            <h3 className="text-lg font-black font-display text-[#1A1A1A] mt-3">
              4-Hour Micro-Shifts & Cross-Station Rebalancing.
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-1 leading-relaxed font-ui">
              Fixed shift caps limit on-duty crew to 8 when demand surges to 50+ transactions/hour, blowing Speed of Service (SoS) to 6–8 minutes. Deploying targeted 4-hour micro-shifts and reassigning BOH prep crew to Assembly protects customer wait times and prevents kiosk drop-offs.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#F5F4F1] border border-stone-200 grid grid-cols-2 gap-2 text-xs font-ui">
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Static Capacity Limit
                </span>
                <span className="font-bold text-rose-700">8 Staff · SoS 7m 25s (Blowout)</span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  With 4h Micro-Shifts
                </span>
                <span className="font-bold text-[#0E8A3E]">12 Staff · SoS 2m 48s (Speedy)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between font-ui">
            <span className="text-xs font-bold text-emerald-800">Protected Peak Revenue: ~₹14,500/day</span>
            <button
              onClick={() => setCurrentTab('workforce')}
              className="px-4 py-2 rounded-full border border-[#E85C1A] bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              Open Shift Builder <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
