import React from 'react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { DemandTimeline } from '../components/DemandTimeline';
import { VegIndicator, NonVegIndicator } from '../components/FoodIndicators';
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Trash2,
  ArrowRight,
  Workflow,
  Zap,
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
    scheduleApproved,
    setDecisionFlowOpen
  } = useApp();

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-[#1A1A1A] tracking-tight">
              Good afternoon, Manager.
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black font-ui uppercase tracking-wider bg-stone-100 text-[#5C3320] border border-stone-300">
              {selectedStore.name}
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            AI-powered operations recommendations for your restaurant today · Telemetry synced with POS & KDS.
          </p>
        </div>

        {/* Action quick links */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setDecisionFlowOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#5C3320] hover:bg-[#F5F4F1] text-[#5C3320] text-xs font-bold font-ui uppercase tracking-wider rounded-full transition-all shadow-xs cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-[#E85C1A]" />
            <span>Decision Loop</span>
          </button>
          <button
            onClick={() => setCurrentTab('impact')}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#5C3320] hover:bg-[#4A2616] text-white text-xs font-bold font-ui uppercase tracking-wider rounded-full transition-all shadow-sm cursor-pointer"
          >
            <span>Opportunity (₹ {metrics.monthlyOpportunityLakhs}L/-)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E85C1A]" />
          </button>
        </div>
      </div>

      {/* Prominent Current Operating Status Card */}
      <div className="p-7 rounded-2xl bg-gradient-to-br from-[#5C3320] to-[#422012] text-white shadow-md relative overflow-hidden">
        {/* Background ambient flame accent */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#E85C1A]/20 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0E8A3E] animate-pulse"></span>
                STORE STATUS
              </span>
              <span className="text-xs text-stone-300 font-medium font-ui">
                Active Resource Telemetry
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white mt-2 tracking-tight">
              {scheduleApproved ? 'Store Fully Optimized.' : 'Optimization Available.'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl leading-relaxed font-ui">
              {scheduleApproved
                ? 'Store resources are currently matched to forecasted demand velocity. Peak-hour throughput protected.'
                : 'Afternoon demand lull (3:00–5:00 PM) detected. Reassigning 2 cross-trained crew to the 5–7 PM rush will boost labor utilization by +9 pts.'}
            </p>
          </div>

          {/* 4 Status Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[10px] font-bold font-ui text-stone-300 block uppercase tracking-wider">
                Current Demand
              </span>
              <div className="text-xl font-black font-display text-[#F5A827] mt-0.5">78 ord/hr</div>
              <span className="text-[10px] text-stone-300">Pacing on target</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[10px] font-bold font-ui text-stone-300 block uppercase tracking-wider">
                Current Staffing
              </span>
              <div className="text-xl font-black font-display text-white mt-0.5">
                {scheduleApproved ? '6 Active' : '8 Active'}
              </div>
              <span className="text-[10px] text-stone-300">
                {scheduleApproved ? 'Reassigned to peak' : '2 crew idle in lull'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[10px] font-bold font-ui text-stone-300 block uppercase tracking-wider">
                Kitchen Queue
              </span>
              <div className="text-xl font-black font-display text-white mt-0.5">14 In KDS</div>
              <span className="text-[10px] text-stone-300">Avg prep: 7m 24s</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[10px] font-bold font-ui text-stone-300 block uppercase tracking-wider">
                Energy Mode
              </span>
              <div className="text-xl font-black font-display text-emerald-300 mt-0.5">Eco 72%</div>
              <span className="text-[10px] text-stone-300">Safe Dining Setback</span>
            </div>
          </div>
        </div>
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
