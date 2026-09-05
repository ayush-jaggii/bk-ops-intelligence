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
    <div className="space-y-6 pb-12 font-sans select-none text-[#37352F]">
      {/* Notion Page Header with Page Icon */}
      <div className="pt-2">
        <div className="text-4xl mb-3">📊</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#37352F] tracking-tight">
          Store Overview
        </h1>

        {/* Notion Page Properties Table */}
        <div className="mt-4 pt-3 border-t border-b border-[rgba(55,53,47,0.06)] py-2.5 space-y-2 text-xs">
          <div className="flex items-center">
            <span className="w-28 text-[#37352F]/50 font-medium">Store</span>
            <span className="notion-tag bg-[#EBECED] text-[#37352F]">{selectedStore.name}</span>
          </div>
          <div className="flex items-center">
            <span className="w-28 text-[#37352F]/50 font-medium">Telemetry</span>
            <span className="notion-tag bg-[#DDEDEA] text-[#0F7B6C]">POS, KDS & IoT Connected</span>
          </div>
          <div className="flex items-center">
            <span className="w-28 text-[#37352F]/50 font-medium">Monthly Impact</span>
            <button
              onClick={() => setCurrentTab('impact')}
              className="notion-tag bg-[#DDEBF1] text-[#0B6E99] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>₹{metrics.monthlyOpportunityLakhs}L / month opportunity</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Notion Callout Block for AI Optimization Notice */}
      <div
        className={`notion-callout ${
          scheduleApproved
            ? 'bg-[#DDEDEA]/50 border border-[#DDEDEA]'
            : 'bg-[#F1F1EF] border border-[rgba(55,53,47,0.06)]'
        }`}
      >
        <span className="text-xl shrink-0">{scheduleApproved ? '✓' : '⚡'}</span>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-semibold text-[#37352F]">
              {scheduleApproved
                ? 'Store Roster & Kitchen Stations Optimized'
                : 'Optimization Recommendation: Afternoon Demand Lull Detected'}
            </div>
            <p className="text-[#37352F]/70 mt-0.5 leading-relaxed">
              {scheduleApproved
                ? 'Labor and batch holding rates match predicted order velocity. Peak throughput capacity protected.'
                : 'Demand drops 27% between 3:00–5:00 PM. Reallocating 2 cross-trained crew members to the 5:00–7:00 PM dinner rush will boost utilization.'}
            </p>
          </div>

          {!scheduleApproved && (
            <button
              onClick={() => setCurrentTab('workforce')}
              className="self-start sm:self-auto shrink-0 px-3 py-1.5 bg-[#2383E2] hover:bg-[#1B6FBF] text-white text-xs font-medium rounded-[4px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Review Roster</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 4 Database Metric Cards */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-medium text-[#37352F]/60">
          <span>Key Operational Metrics</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
      </div>

      {/* Operations Timeline Database View */}
      <DemandTimeline onReviewSchedule={() => setCurrentTab('workforce')} />

      {/* Two Notion Sub-Block Cards: Workforce & Kitchen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Workforce Block */}
        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] flex flex-col justify-between hover:bg-[rgba(55,53,47,0.02)] transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-[#37352F]/80">
                <span>👥</span>
                <span>Workforce Reallocation</span>
              </div>
              <span className="notion-tag bg-[#FAEBDD] text-[#D9730D] text-[10px]">
                High Impact
              </span>
            </div>

            <h3 className="text-sm font-semibold text-[#37352F] mt-2.5">
              3:00 PM – 5:00 PM Crew Balancing
            </h3>
            <p className="text-xs text-[#37352F]/70 mt-1 leading-relaxed">
              Demand falls 27% below scheduled floor roster. Reassigning 2 cross-trained crew members to the dinner rush prevents idle labor.
            </p>

            <div className="mt-3 p-2.5 rounded-[3px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.06)] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#37352F]/50 block text-[11px]">Scheduled</span>
                <span className="font-medium text-[#37352F]">6 Active Crew</span>
              </div>
              <div>
                <span className="text-[#37352F]/50 block text-[11px]">Recommended</span>
                <span className="font-medium text-[#0F7B6C]">4 Active + 2 to Rush</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[rgba(55,53,47,0.06)] flex items-center justify-between text-xs">
            <span className="font-medium text-[#0F7B6C]">Saving: ₹ 3,840/- per day</span>
            <button
              onClick={() => setCurrentTab('workforce')}
              className="px-2.5 py-1 rounded-[3px] border border-[rgba(55,53,47,0.12)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View Roster</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Kitchen Prep Block */}
        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] flex flex-col justify-between hover:bg-[rgba(55,53,47,0.02)] transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-[#37352F]/80">
                <span>🍳</span>
                <span>Kitchen Batch Prep & Holding</span>
              </div>
              <span className="notion-tag bg-[#FBE4E4] text-[#E03E3E] text-[10px]">
                Holding Risk
              </span>
            </div>

            <h3 className="text-sm font-semibold text-[#37352F] mt-2.5">
              King Fries & Chicken Patties at Risk
            </h3>
            <p className="text-xs text-[#37352F]/70 mt-1 leading-relaxed">
              8 portions of King Fries have 6 minutes holding time remaining. Recommend holding new drops and reducing next basket size by 20%.
            </p>

            <div className="mt-3 p-2.5 rounded-[3px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.06)] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#37352F]/50 block text-[11px]">Current Queue</span>
                <span className="font-medium text-[#37352F]">14 Orders · 7m Avg</span>
              </div>
              <div>
                <span className="text-[#37352F]/50 block text-[11px]">Value at Risk</span>
                <span className="font-medium text-[#E03E3E]">₹ 1,240/- expiring</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[rgba(55,53,47,0.06)] flex items-center justify-between text-xs">
            <span className="text-[#37352F]/60">Action: Reduce drop 20%</span>
            <button
              onClick={() => setCurrentTab('kitchen')}
              className="px-2.5 py-1 rounded-[3px] border border-[rgba(55,53,47,0.12)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Kitchen KDS</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
