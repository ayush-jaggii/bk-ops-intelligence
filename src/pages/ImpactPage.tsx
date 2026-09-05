import React from 'react';
import { useApp } from '../context/AppContext';
import { ROICalculator } from '../components/ROICalculator';
import {
  TrendingUp,
  Trash2,
  Users,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';

export const ImpactPage: React.FC = () => {
  const { metrics, sensitivity, setSensitivity, selectedStore } = useApp();

  // Waterfall chart data
  const waterfallData = [
    { name: 'Current Base', value: 480, type: 'base', label: '₹ 4.80L/-' },
    { name: 'Labor Drain', value: -68, type: 'loss', label: '-₹ 68k/-' },
    { name: 'Holding Loss', value: -31, type: 'loss', label: '-₹ 31k/-' },
    { name: 'Energy Drain', value: -24, type: 'loss', label: '-₹ 24k/-' },
    {
      name: 'AI Optimization',
      value: Math.round(metrics.monthlyOpportunityLakhs * 100),
      type: 'gain',
      label: `+₹ ${metrics.monthlyOpportunityLakhs}L/-`
    },
    {
      name: 'Optimized EBITDA',
      value: Math.round(480 + metrics.monthlyOpportunityLakhs * 100),
      type: 'final',
      label: `₹ ${(4.8 + metrics.monthlyOpportunityLakhs).toFixed(2)}L/-`
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-sans select-none text-[#37352F]">
      {/* Header */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-4xl mb-3">💰</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#37352F] tracking-tight">
            Impact & Financials
          </h1>
          <p className="text-xs text-[#37352F]/60 mt-1">
            Store EBITDA bridge and projected financial opportunity from AI synchronization.
          </p>
        </div>

        <div className="text-xs text-[#37352F]/50 italic">
          *Illustrative QSR benchmark model for {selectedStore.name}
        </div>
      </div>

      {/* Notion Summary Callout Box */}
      <div className="notion-callout border border-[rgba(55,53,47,0.09)]">
        <span className="text-2xl shrink-0">📈</span>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] text-[#37352F]/50 font-medium uppercase tracking-wider block">
            Estimated Monthly Store Opportunity
          </span>
          <div className="text-3xl sm:text-4xl font-bold text-[#37352F] mt-1 tracking-tight">
            ₹ {metrics.monthlyOpportunityLakhs} Lakhs / month
          </div>
          <p className="text-xs text-[#37352F]/70 mt-1.5 leading-relaxed max-w-xl">
            Financial opportunity captured across workforce rebalancing, holding waste reduction, equipment energy setback, and dinner rush throughput.
          </p>

          {/* 4 Category Breakdowns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
            <div className="p-3 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="flex items-center gap-1.5 text-xs text-[#37352F]/60">
                <Users className="w-3 h-3 text-[#2383E2]" /> Labor Optimization
              </div>
              <div className="text-base font-semibold text-[#37352F] mt-1">
                ₹ {metrics.laborSavingsMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-[#37352F]/40">Rebalanced idle hours</span>
            </div>

            <div className="p-3 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="flex items-center gap-1.5 text-xs text-[#37352F]/60">
                <Trash2 className="w-3 h-3 text-[#E03E3E]" /> Waste Reduction
              </div>
              <div className="text-base font-semibold text-[#37352F] mt-1">
                ₹ {metrics.wasteSavingsMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-[#37352F]/40">Prevented shelf discard</span>
            </div>

            <div className="p-3 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="flex items-center gap-1.5 text-xs text-[#37352F]/60">
                <Zap className="w-3 h-3 text-[#0F7B6C]" /> Energy Setback
              </div>
              <div className="text-base font-semibold text-[#37352F] mt-1">
                ₹ {metrics.energySavingsMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-[#37352F]/40">HVAC modulation</span>
            </div>

            <div className="p-3 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)]">
              <div className="flex items-center gap-1.5 text-xs text-[#37352F]/60">
                <TrendingUp className="w-3 h-3 text-[#D9730D]" /> Peak Throughput
              </div>
              <div className="text-base font-semibold text-[#37352F] mt-1">
                ₹ {metrics.throughputBoostMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-[#37352F]/40">Faster order assembly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div className="p-5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
        <div className="pb-3 mb-3 border-b border-[rgba(55,53,47,0.06)] flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-[#37352F]">
              Store Contribution Waterfall Model
            </h3>
            <p className="text-[11px] text-[#37352F]/50">
              Visualizing store EBITDA bridge from baseline leaks to AI-optimized run-rate
            </p>
          </div>
          <span className="text-[11px] text-[#37352F]/50">Values in ₹ Thousands</span>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(55,53,47,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#37352F', fontSize: 11 }} />
              <YAxis tick={{ fill: '#37352F', fontSize: 11 }} />
              <Tooltip
                formatter={(val: any) => [`₹ ${val}k/-`, 'Impact']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  border: '1px solid rgba(55,53,47,0.09)',
                  boxShadow: 'rgba(15,15,15,0.05) 0px 0px 0px 1px, rgba(15,15,15,0.1) 0px 3px 6px'
                }}
              />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {waterfallData.map((entry, index) => {
                  let color = '#37352F';
                  if (entry.type === 'loss') color = '#E03E3E';
                  if (entry.type === 'gain') color = '#2383E2';
                  if (entry.type === 'final') color = '#0F7B6C';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[rgba(55,53,47,0.06)] flex flex-wrap items-center justify-between text-xs text-[#37352F]/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#37352F]"></span> Base Contribution
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#E03E3E]"></span> Controllable Leakage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2383E2]"></span> AI Recovery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0F7B6C]"></span> Optimized Potential
            </span>
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis Section */}
      <div className="p-5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(55,53,47,0.06)]">
          <div>
            <h3 className="text-xs font-semibold text-[#37352F]">
              Dynamic Sensitivity Analysis
            </h3>
            <p className="text-[11px] text-[#37352F]/50">
              Drag parameters to model conservative vs aggressive operational recovery assumptions.
            </p>
          </div>
          <button
            onClick={() =>
              setSensitivity({
                laborSavingsPct: 4.8,
                wasteReductionPct: 18.0,
                energySavingsPct: 11.5,
                throughputBoostPct: 2.2
              })
            }
            className="text-xs text-[#2383E2] hover:underline cursor-pointer"
          >
            Reset to Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Labor Slider */}
          <div className="p-3 bg-[#F7F6F3] rounded-[3px] border border-[rgba(55,53,47,0.06)]">
            <div className="flex justify-between items-center text-xs font-medium text-[#37352F] mb-1.5">
              <span>Labor Savings Rate:</span>
              <span className="font-semibold text-[#2383E2]">
                {sensitivity.laborSavingsPct}%
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.2}
              value={sensitivity.laborSavingsPct}
              onChange={(e) =>
                setSensitivity({ ...sensitivity, laborSavingsPct: Number(e.target.value) })
              }
              className="w-full accent-[#2383E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#37352F]/40 mt-1">
              <span>1% (Minimal)</span>
              <span>Default: 4.8%</span>
              <span>10% (Maximum)</span>
            </div>
          </div>

          {/* Waste Slider */}
          <div className="p-3 bg-[#F7F6F3] rounded-[3px] border border-[rgba(55,53,47,0.06)]">
            <div className="flex justify-between items-center text-xs font-medium text-[#37352F] mb-1.5">
              <span>Kitchen Waste Reduction:</span>
              <span className="font-semibold text-[#2383E2]">
                {sensitivity.wasteReductionPct}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={0.5}
              value={sensitivity.wasteReductionPct}
              onChange={(e) =>
                setSensitivity({ ...sensitivity, wasteReductionPct: Number(e.target.value) })
              }
              className="w-full accent-[#2383E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#37352F]/40 mt-1">
              <span>5%</span>
              <span>Default: 18.0%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Energy Slider */}
          <div className="p-3 bg-[#F7F6F3] rounded-[3px] border border-[rgba(55,53,47,0.06)]">
            <div className="flex justify-between items-center text-xs font-medium text-[#37352F] mb-1.5">
              <span>Energy Setback Savings:</span>
              <span className="font-semibold text-[#2383E2]">
                {sensitivity.energySavingsPct}%
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={20}
              step={0.5}
              value={sensitivity.energySavingsPct}
              onChange={(e) =>
                setSensitivity({ ...sensitivity, energySavingsPct: Number(e.target.value) })
              }
              className="w-full accent-[#2383E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#37352F]/40 mt-1">
              <span>3%</span>
              <span>Default: 11.5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Throughput Slider */}
          <div className="p-3 bg-[#F7F6F3] rounded-[3px] border border-[rgba(55,53,47,0.06)]">
            <div className="flex justify-between items-center text-xs font-medium text-[#37352F] mb-1.5">
              <span>Peak Throughput Capture:</span>
              <span className="font-semibold text-[#2383E2]">
                {sensitivity.throughputBoostPct}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={sensitivity.throughputBoostPct}
              onChange={(e) =>
                setSensitivity({ ...sensitivity, throughputBoostPct: Number(e.target.value) })
              }
              className="w-full accent-[#2383E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#37352F]/40 mt-1">
              <span>0%</span>
              <span>Default: 2.2%</span>
              <span>5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Store Enterprise ROI Calculator */}
      <ROICalculator />
    </div>
  );
};
