import React from 'react';
import { useApp } from '../context/AppContext';
import { ROICalculator } from '../components/ROICalculator';
import {
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  AlertTriangle
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
  const { metrics, selectedStore } = useApp();

  // Waterfall chart data for Labor P&L
  const waterfallData = [
    { name: 'Baseline Labor Cost', value: 420, type: 'base', label: '₹ 4.20L/-' },
    { name: 'Off-Peak Lull Waste', value: -115, type: 'loss', label: '-₹ 1.15L/-' },
    { name: 'Peak Overtime Drain', value: -45, type: 'loss', label: '-₹ 45k/-' },
    {
      name: 'Dynamic Scheduling',
      value: 160,
      type: 'gain',
      label: '+₹ 1.60L/-'
    },
    {
      name: 'Optimized Labor Cost',
      value: 260,
      type: 'final',
      label: '₹ 2.60L/-'
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              Labor Economics & Financial Impact
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#0E8A3E] border border-emerald-300">
              P&L Labor Optimization
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Financial bridge showing labor cost reduction from static 9-hour straight shifts to demand-responsive scheduling for {selectedStore.name}.
          </p>
        </div>

        <div className="text-xs text-[#6E6E6E] font-medium italic">
          *Calibrated against Burger King India operating store economics
        </div>
      </div>

      {/* Hero Monthly Opportunity Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#5C3320] to-[#422012] text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs font-black font-ui uppercase tracking-wider text-[#F5A827] block">
            ESTIMATED MONTHLY STORE BENEFIT
          </span>
          <div className="text-4xl sm:text-6xl font-black font-display text-white mt-2 tracking-tight">
            ₹ {metrics.monthlyOpportunityLakhs} Lakhs / Store
          </div>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
            Eliminating 16 unproductive lull hours daily saves ~₹1.15L/month in unearned wages, while 4-hour micro-shifts prevent ~₹45k in dropped kiosk and aggregator sales.
          </p>

          {/* 3 Pillar Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <Users className="w-3.5 h-3.5 text-[#F5A827]" /> Unproductive Wages Saved
              </div>
              <div className="text-xl font-black font-display text-white mt-1">
                {metrics.monthlyLaborSavingsINR}
              </div>
              <span className="text-[10px] text-stone-300">Stood-down 3–5 PM shift overlap</span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-300" /> Speed of Service (SoS)
              </div>
              <div className="text-xl font-black font-display text-emerald-300 mt-1">
                {metrics.avgSpeedOfServiceFormatted}
              </div>
              <span className="text-[10px] text-stone-300">Protected within &lt; 3m QSR benchmark</span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-amber-300" /> Peak Revenue Retained
              </div>
              <div className="text-xl font-black font-display text-white mt-1">
                {metrics.peakDropOffSavedINR} / mo
              </div>
              <span className="text-[10px] text-stone-300">Eliminates kiosk & driver drop-offs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Labor Cost Waterfall Bridge */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-black font-display text-[#1A1A1A]">
              Store Monthly Labor Cost Bridge
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              Demonstrates how dynamic micro-shifts contract store labor cost from 17.8% down to 14.2% of sales
            </p>
          </div>
          <span className="text-xs font-bold text-[#0E8A3E] px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
            +3.6% EBITDA Expansion
          </span>
        </div>

        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ebe1" />
              <XAxis dataKey="name" tick={{ fill: '#5C3320', fontSize: 11, fontWeight: 700 }} />
              <YAxis tick={{ fill: '#5C3320', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #e5dfd5',
                  boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.08)',
                  padding: '12px 16px'
                }}
                formatter={(val: any, _name: any, item: any) => [item.payload.label, 'Monthly Value']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {waterfallData.map((entry, index) => {
                  let color = '#5C3320';
                  if (entry.type === 'loss') color = '#D94B4B';
                  if (entry.type === 'gain') color = '#0E8A3E';
                  if (entry.type === 'final') color = '#E85C1A';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fleet-Wide Enterprise ROI Calculator */}
      <ROICalculator />
    </div>
  );
};
