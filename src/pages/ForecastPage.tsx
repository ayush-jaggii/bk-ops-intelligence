import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  Calendar,
  CloudSun,
  Trophy,
  Flame,
  Truck,
  Activity,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export const ForecastPage: React.FC = () => {
  const { hourlyData, signals, selectedStore } = useApp();
  const [showConfidence, setShowConfidence] = useState<boolean>(true);
  const [showBaseline, setShowBaseline] = useState<boolean>(true);

  // Transform data for Recharts composed chart
  const chartData = hourlyData.map((item) => ({
    time: item.timeLabel,
    'Actual Orders': item.actualOrders,
    'AI Forecast': item.aiForecast,
    'Previous-Week Baseline': item.baselineOrders,
    confidenceRange: [item.confidenceLow, item.confidenceHigh],
    confidenceLow: item.confidenceLow,
    confidenceHigh: item.confidenceHigh,
    diff: item.confidenceHigh - item.confidenceLow
  }));

  const getSignalIcon = (cat: string) => {
    switch (cat) {
      case 'day':
        return Calendar;
      case 'weather':
        return CloudSun;
      case 'event':
        return Trophy;
      case 'promotion':
        return Flame;
      case 'delivery':
        return Truck;
      default:
        return Activity;
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none text-[#37352F]">
      {/* Header */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-4xl mb-3">📈</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#37352F] tracking-tight">
            Demand Forecast
          </h1>
          <p className="text-xs text-[#37352F]/60 mt-1">
            Predicting the next 6 hours of store order velocity for {selectedStore.name}.
          </p>
        </div>

        {/* Confidence Property */}
        <div className="flex items-center gap-2 text-xs">
          <span className="notion-tag bg-[#DDEDEA] text-[#0F7B6C] font-semibold">
            Model Confidence: 87% (High)
          </span>
        </div>
      </div>

      {/* Main Interactive Forecast Chart Card */}
      <div className="p-5 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-[rgba(55,53,47,0.06)]">
          <div>
            <h3 className="text-xs font-semibold text-[#37352F]">
              Hourly Order Demand Trajectory
            </h3>
            <p className="text-[11px] text-[#37352F]/50">
              Orders per hour (Historical actuals, AI forecast & prior-week baseline)
            </p>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowConfidence(!showConfidence)}
              className={`px-2.5 py-1 rounded-[3px] border transition-colors cursor-pointer text-xs ${
                showConfidence
                  ? 'bg-[#FBF3DB] border-[#FBF3DB] text-[#DFAB01] font-medium'
                  : 'border-[rgba(55,53,47,0.12)] text-[#37352F]/60 hover:bg-[rgba(55,53,47,0.04)]'
              }`}
            >
              {showConfidence ? '✓ Confidence Band (±8%)' : '+ Confidence Band'}
            </button>
            <button
              onClick={() => setShowBaseline(!showBaseline)}
              className={`px-2.5 py-1 rounded-[3px] border transition-colors cursor-pointer text-xs ${
                showBaseline
                  ? 'bg-[#EBECED] border-[#EBECED] text-[#37352F] font-medium'
                  : 'border-[rgba(55,53,47,0.12)] text-[#37352F]/60 hover:bg-[rgba(55,53,47,0.04)]'
              }`}
            >
              {showBaseline ? '✓ Prior-Week Baseline' : '+ Prior Baseline'}
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-[340px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2383E2" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2383E2" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DFAB01" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#DFAB01" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(55,53,47,0.06)" />
              <XAxis dataKey="time" tick={{ fill: '#37352F', fontSize: 11 }} />
              <YAxis tick={{ fill: '#37352F', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  border: '1px solid rgba(55,53,47,0.09)',
                  boxShadow: 'rgba(15,15,15,0.05) 0px 0px 0px 1px, rgba(15,15,15,0.1) 0px 3px 6px',
                  padding: '8px 12px'
                }}
                labelStyle={{ fontWeight: 600, color: '#37352F', marginBottom: '2px' }}
              />
              <Legend verticalAlign="top" height={32} iconType="circle" />

              {/* Shaded Confidence Area */}
              {showConfidence && (
                <Area
                  type="monotone"
                  dataKey="confidenceHigh"
                  stroke="none"
                  fill="url(#confidenceGradient)"
                  name="Confidence Range (Upper)"
                />
              )}

              {/* Previous-Week Baseline */}
              {showBaseline && (
                <Line
                  type="monotone"
                  dataKey="Previous-Week Baseline"
                  stroke="#9B9A97"
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                  dot={{ r: 2.5, fill: '#9B9A97' }}
                />
              )}

              {/* AI Forecast */}
              <Area
                type="monotone"
                dataKey="AI Forecast"
                stroke="#2383E2"
                strokeWidth={2.5}
                fill="url(#forecastGradient)"
                dot={{ r: 3.5, fill: '#2383E2', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                activeDot={{ r: 5 }}
              />

              {/* Actual Orders */}
              <Line
                type="monotone"
                dataKey="Actual Orders"
                stroke="#37352F"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#37352F', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend notes */}
        <div className="mt-3 pt-2.5 border-t border-[rgba(55,53,47,0.06)] flex flex-wrap items-center justify-between gap-3 text-xs text-[#37352F]/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#37352F]"></span> Actual Orders (to 4 PM)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2383E2]"></span> AI Forecast (5–8 PM)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#9B9A97]"></span> Prior-Week Baseline
            </span>
          </div>
          <span className="text-[11px] text-[#37352F]/40">
            Telemetry synchronized with POS & aggregator channels
          </span>
        </div>
      </div>

      {/* Forecast Signals Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-[#37352F]">Active Forecast Signals</h3>
            <p className="text-[11px] text-[#37352F]/50">
              Multi-variable input parameters weighting the neural forecast
            </p>
          </div>
          <span className="notion-tag bg-[#EBECED] text-[#37352F]/70 text-[10px]">
            5 Signals Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {signals.map((sig) => {
            const Icon = getSignalIcon(sig.category);

            return (
              <div
                key={sig.id}
                className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] hover:bg-[rgba(55,53,47,0.02)] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-[3px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.06)] flex items-center justify-center text-[#37352F]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`notion-tag text-[10px] ${
                        sig.impactType === 'positive'
                          ? 'bg-[#DDEDEA] text-[#0F7B6C]'
                          : sig.impactType === 'negative'
                          ? 'bg-[#FBF3DB] text-[#DFAB01]'
                          : 'bg-[#EBECED] text-[#9B9A97]'
                      }`}
                    >
                      {sig.impactBadge}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-[#37352F] mt-2.5">{sig.title}</h4>
                  <span className="text-[11px] text-[#37352F]/50 font-normal block mt-0.5">
                    {sig.subtitle}
                  </span>
                  <p className="text-xs text-[#37352F]/70 mt-1.5 leading-relaxed">{sig.explanation}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-[rgba(55,53,47,0.06)] flex items-center justify-between text-[11px] text-[#37352F]/40">
                  <span>Stream Source</span>
                  <span className="text-[#0F7B6C] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Transparency Box */}
      <div className="notion-callout border border-[rgba(55,53,47,0.09)]">
        <span className="text-xl shrink-0">🤖</span>
        <div className="text-xs text-[#37352F]/80 leading-relaxed">
          <strong className="text-[#37352F]">Ensemble Demand Decomposition: </strong>
          The predictive model combines historical day-of-week velocity, realtime aggregator cart adds, weather indices, and local event schedules. When scenario perturbations (e.g. +25% Rush) occur, the weighting engine prioritizes 15-minute moving rate-of-change metrics to ensure the kitchen and roster have sufficient lead time.
        </div>
      </div>
    </div>
  );
};
