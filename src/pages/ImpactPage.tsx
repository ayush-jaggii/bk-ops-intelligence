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
    <div className="space-y-8 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-[#1A1A1A] tracking-tight">
              Operational Impact.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#0E8A3E] border border-emerald-300">
              EBITDA Bridge
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Estimated financial impact from AI-driven store optimization for {selectedStore.name}.
          </p>
        </div>

        <div className="text-xs text-[#6E6E6E] font-medium italic">
          *Illustrative QSR benchmark model
        </div>
      </div>

      {/* Big Summary Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#5C3320] to-[#422012] text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs font-black font-ui uppercase tracking-wider text-[#F5A827] block">
            ESTIMATED MONTHLY STORE OPPORTUNITY
          </span>
          <div className="text-4xl sm:text-6xl font-black font-display text-white mt-2 tracking-tight">
            ₹ {metrics.monthlyOpportunityLakhs} Lakhs/-
          </div>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl">
            Modeled financial opportunity across workforce scheduling, food waste reduction, energy setback, and dinner rush throughput capture.
          </p>

          {/* 4 Category Breakdowns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <Users className="w-3.5 h-3.5 text-[#F5A827]" /> Labor Optimization
              </div>
              <div className="text-xl font-black font-display text-white mt-1">
                ₹ {metrics.laborSavingsMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-stone-300">Rebalanced idle hours</span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <Trash2 className="w-3.5 h-3.5 text-red-400" /> Kitchen Waste Reduction
              </div>
              <div className="text-xl font-black font-display text-white mt-1">
                ₹ {metrics.wasteSavingsMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-stone-300">Prevented shelf expiry</span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Energy Optimization
              </div>
              <div className="text-xl font-black font-display text-white mt-1">
                ₹ {metrics.energySavingsMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-stone-300">HVAC & fryer setback</span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-[#F5A827]" /> Peak Throughput
              </div>
              <div className="text-xl font-black font-display text-white mt-1">
                ₹ {metrics.throughputBoostMonthly.toLocaleString('en-IN')}/-
              </div>
              <span className="text-[10px] text-stone-300">Faster ticket assembly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="pb-4 mb-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black font-display text-[#1A1A1A]">
              Store Contribution Waterfall Model.
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              Visualizing store EBITDA bridge from baseline operating leaks to AI-optimized run-rate
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#6E6E6E] italic">Values in ₹ Thousands</span>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2eadf" />
              <XAxis dataKey="name" tick={{ fill: '#5C3320', fontSize: 11, fontWeight: 700 }} />
              <YAxis tick={{ fill: '#5C3320', fontSize: 11 }} />
              <Tooltip
                formatter={(val: any) => [`₹ ${val}k/-`, 'Impact']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #e5dfd5'
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {waterfallData.map((entry, index) => {
                  let color = '#5C3320';
                  if (entry.type === 'loss') color = '#7A1F1F';
                  if (entry.type === 'gain') color = '#E85C1A';
                  if (entry.type === 'final') color = '#0E8A3E';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-[#6E6E6E]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#5C3320]"></span> Base Contribution
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#7A1F1F]"></span> Controllable Leakage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#E85C1A]"></span> AI Recovery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#0E8A3E]"></span> Optimized Potential
            </span>
          </div>
          <span className="text-[10px] text-stone-400">Illustrative QSR store benchmark</span>
        </div>
      </div>

      {/* Sensitivity Analysis Section */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black font-display text-[#1A1A1A]">
              Dynamic Sensitivity Analysis.
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              Drag the parameter sliders to test conservative vs aggressive operational efficiency assumptions.
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
            className="text-xs text-[#E85C1A] font-black uppercase tracking-wider hover:underline cursor-pointer"
          >
            Reset to Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Labor Slider */}
          <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
            <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
              <span>Labor Savings Rate:</span>
              <span className="text-sm font-black text-[#E85C1A] font-display">
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
              className="w-full accent-[#E85C1A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1">
              <span>1% (Minimal)</span>
              <span>Default: 4.8%</span>
              <span>10% (Maximum)</span>
            </div>
          </div>

          {/* Waste Slider */}
          <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
            <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
              <span>Kitchen Waste Reduction:</span>
              <span className="text-sm font-black text-[#E85C1A] font-display">
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
              className="w-full accent-[#E85C1A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1">
              <span>5%</span>
              <span>Default: 18.0%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Energy Slider */}
          <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
            <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
              <span>Energy Setback Savings:</span>
              <span className="text-sm font-black text-[#E85C1A] font-display">
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
              className="w-full accent-[#E85C1A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1">
              <span>3%</span>
              <span>Default: 11.5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Throughput Slider */}
          <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
            <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
              <span>Peak Throughput Capture:</span>
              <span className="text-sm font-black text-[#E85C1A] font-display">
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
              className="w-full accent-[#E85C1A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1">
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
