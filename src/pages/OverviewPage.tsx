import React from 'react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { DemandTimeline } from '../components/DemandTimeline';
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Trash2,
  ArrowRight,
  ChefHat
} from 'lucide-react';
import { NavTab } from '../components/Sidebar';

interface OverviewPageProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ setCurrentTab }) => {
  const {
    selectedStore,
    metrics,
    scheduleApproved
  } = useApp();

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
            Store Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Live operations telemetry for {selectedStore.name} · Synchronized with POS, KDS & IoT
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentTab('impact')}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#5C3320] text-xs font-bold font-ui uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            <span>Monthly Impact: ₹{metrics.monthlyOpportunityLakhs}L</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A]" />
          </button>
        </div>
      </div>

      {/* Clean Status Alert Strip */}
      <div
        className={`px-4 sm:px-5 py-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          scheduleApproved
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            : 'bg-[#F5F4F1] border-stone-200 text-[#1A1A1A]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              scheduleApproved ? 'bg-[#0E8A3E]' : 'bg-[#E85C1A] animate-pulse'
            }`}
          />
          <div className="text-xs font-ui">
            <span className="font-bold">
              {scheduleApproved ? 'Store Fully Optimized' : 'Optimization Recommendation Available'}
            </span>
            <span className="text-[#6E6E6E] ml-2 hidden md:inline">
              {scheduleApproved
                ? 'Labor and kitchen batch schedules are synced to predicted order pacing.'
                : 'Afternoon demand lull (3–5 PM) detected. Shift 2 crew to 5–7 PM dinner rush to protect throughput.'}
            </span>
          </div>
        </div>

        {!scheduleApproved && (
          <button
            onClick={() => setCurrentTab('workforce')}
            className="self-start sm:self-auto shrink-0 px-3.5 py-1.5 bg-[#5C3320] hover:bg-[#4A2616] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Review Roster</span>
            <ArrowRight className="w-3 h-3 text-[#E85C1A]" />
          </button>
        )}
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TODAY'S SALES"
          value={`${metrics.salesToday}/-`}
          change={metrics.salesDiffPct}
          isPositiveChange={!metrics.salesDiffPct.includes('-')}
          icon={IndianRupee}
          subtext="Target: ₹ 2.67L/-"
        />

        <KPICard
          title="ORDERS TODAY"
          value={metrics.ordersCount.toLocaleString('en-IN')}
          change={metrics.ordersDiffPct}
          isPositiveChange={!metrics.ordersDiffPct.includes('-')}
          icon={ShoppingBag}
          subtext="Avg Ticket: ₹ 248/-"
        />

        <KPICard
          title="LABOR UTILIZATION"
          value={`${metrics.laborUtilPct}%`}
          change={metrics.laborDiffPts}
          isPositiveChange={true}
          icon={Users}
          subtext="Target: 85%+"
        />

        <KPICard
          title="HOLDING WASTE LOSS"
          value={`${metrics.wasteLoss}/-`}
          change={metrics.wasteDiffPct}
          isPositiveChange={true}
          reverseColor={true}
          icon={Trash2}
          subtext="Target: < ₹ 3,500/-"
        />
      </div>

      {/* AI Operations Timeline (12 PM - 8 PM) */}
      <DemandTimeline onReviewSchedule={() => setCurrentTab('workforce')} />

      {/* Two Column Cards: AI Workforce Alert & Kitchen Holding Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workforce Card */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-black font-ui uppercase tracking-wider text-[#6E6E6E]">
                  Workforce Recommendation
                </span>
              </div>
              <span className="text-[10px] font-black font-ui uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                High Impact
              </span>
            </div>

            <h3 className="text-lg font-black font-display text-[#1A1A1A] mt-3">
              3:00 PM – 5:00 PM Crew Balancing.
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-1 leading-relaxed font-ui">
              Forecasted demand falls 27% below current scheduled staffing. Reassigning 2 cross-trained crew members to the evening cricket rush prevents idle labor and protects peak customer wait times.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#F5F4F1] border border-stone-200 grid grid-cols-2 gap-2 text-xs font-ui">
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Current Roster
                </span>
                <span className="font-bold text-[#1A1A1A]">6 Active Front & Kitchen</span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Recommended Roster
                </span>
                <span className="font-bold text-[#E85C1A]">4 Active + 2 to 5–7 PM Peak</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between font-ui">
            <span className="text-xs font-black text-[#0E8A3E]">Estimated Saving: ₹ 3,840/- per day</span>
            <button
              onClick={() => setCurrentTab('workforce')}
              className="px-4 py-2 rounded-full border border-[#5C3320] bg-white hover:bg-[#5C3320] text-[#5C3320] hover:text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              Review Schedule <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Kitchen Card */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="text-xs font-black font-ui uppercase tracking-wider text-[#6E6E6E]">
                  Kitchen Batch Prep & Holding
                </span>
              </div>
              <span className="text-[10px] font-black font-ui uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-[#7A1F1F]">
                Holding Risk
              </span>
            </div>

            <h3 className="text-lg font-black font-display text-[#1A1A1A] mt-3">
              King Fries & Chicken Patties at Risk.
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-1 leading-relaxed font-ui">
              8 portions of King Fries have 6 minutes holding time remaining. The AI recommends holding new fry drops and reducing next basket size by 20% to prevent product discard.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#F5F4F1] border border-stone-200 grid grid-cols-2 gap-2 text-xs font-ui">
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Current Queue
                </span>
                <span className="font-bold text-[#1A1A1A]">14 Orders · 7m 24s Avg</span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block text-[10px] font-bold uppercase tracking-wider">
                  Holding Value at Risk
                </span>
                <span className="font-bold text-[#7A1F1F]">₹ 1,240/- (Expiring Soon)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between font-ui">
            <span className="text-xs font-bold text-amber-800">Action: Reduce drop size 20%</span>
            <button
              onClick={() => setCurrentTab('kitchen')}
              className="px-4 py-2 rounded-full border border-[#E85C1A] bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              Open Kitchen Prep <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
