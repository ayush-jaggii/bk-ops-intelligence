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
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-[#1A1A1A] tracking-tight">
              AI Demand Forecast.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#0E8A3E] border border-emerald-300">
              Live Model
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Predicting the next 6 hours of restaurant demand for {selectedStore.name}.
          </p>
        </div>

        {/* Confidence Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-stone-200 rounded-full shadow-xs flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
                Model Confidence
              </span>
              <span className="text-base font-black font-display text-[#1A1A1A]">87% · High Confidence</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0E8A3E] font-black text-xs flex items-center justify-center border border-emerald-300 font-display">
              A+
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Forecast Chart Card */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black font-display text-[#1A1A1A]">
              Hourly Order Demand Curve.
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              Orders per hour (Historical actuals, predictive trajectory & previous-week baseline)
            </p>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center gap-2 text-xs font-bold font-ui">
            <button
              onClick={() => setShowConfidence(!showConfidence)}
              className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer uppercase tracking-wider text-[11px] ${
                showConfidence
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-black'
                  : 'border-stone-200 text-[#6E6E6E] hover:bg-stone-50'
              }`}
            >
              {showConfidence ? '✓ Confidence Band (±8%)' : '+ Show Confidence'}
            </button>
            <button
              onClick={() => setShowBaseline(!showBaseline)}
              className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer uppercase tracking-wider text-[11px] ${
                showBaseline
                  ? 'bg-stone-100 border-stone-300 text-[#1A1A1A] font-black'
                  : 'border-stone-200 text-[#6E6E6E] hover:bg-stone-50'
              }`}
            >
              {showBaseline ? '✓ Previous Week Baseline' : '+ Show Baseline'}
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-[360px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E85C1A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#E85C1A" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A827" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F5A827" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ebe1" />
              <XAxis dataKey="time" tick={{ fill: '#5C3320', fontSize: 12, fontWeight: 700 }} />
              <YAxis tick={{ fill: '#5C3320', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #e5dfd5',
                  boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.08)',
                  padding: '12px 16px'
                }}
                labelStyle={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '4px' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />

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
                  stroke="#A89B8C"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#A89B8C' }}
                />
              )}

              {/* AI Forecast in Flame Orange */}
              <Area
                type="monotone"
                dataKey="AI Forecast"
                stroke="#E85C1A"
                strokeWidth={3}
                fill="url(#forecastGradient)"
                dot={{ r: 4, fill: '#E85C1A', stroke: '#FFFFFF', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />

              {/* Actual Orders in Dark Maroon */}
              <Line
                type="monotone"
                dataKey="Actual Orders"
                stroke="#5C3320"
                strokeWidth={3}
                dot={{ r: 5, fill: '#5C3320', stroke: '#FFFFFF', strokeWidth: 2 }}
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend notes */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E6E6E]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#5C3320]"></span> Actual Orders (to 4 PM)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E85C1A]"></span> AI Forecast (5–8 PM)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#A89B8C]"></span> Previous-Week Baseline
            </span>
          </div>
          <span className="text-[11px] text-stone-400 italic">
            Calibrated against Burger King India flagship mall store telemetry
          </span>
        </div>
      </div>

      {/* Forecast Signals Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-black font-display text-[#1A1A1A]">Forecast Signals Ingested.</h3>
            <p className="text-xs text-[#6E6E6E]">
              Multi-variable input factors driving the neural forecast weightings
            </p>
          </div>
          <span className="text-xs font-bold text-[#6E6E6E] px-3.5 py-1.5 bg-white rounded-full border border-stone-200 uppercase tracking-wider">
            5 Signals Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((sig) => {
            const Icon = getSignalIcon(sig.category);

            return (
              <div
                key={sig.id}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#F5F4F1] border border-stone-200 flex items-center justify-center text-[#E85C1A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        sig.impactType === 'positive'
                          ? 'bg-emerald-50 text-[#0E8A3E] border border-emerald-200'
                          : sig.impactType === 'negative'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-stone-100 text-[#6E6E6E]'
                      }`}
                    >
                      {sig.impactBadge}
                    </span>
                  </div>

                  <h4 className="text-base font-black font-display text-[#1A1A1A] mt-3">{sig.title}</h4>
                  <span className="text-[11px] text-[#6E6E6E] font-semibold block mt-0.5">
                    {sig.subtitle}
                  </span>
                  <p className="text-xs text-[#6E6E6E] mt-2 leading-relaxed">{sig.explanation}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="uppercase tracking-wider text-[10px]">Source: Live Stream</span>
                  <span className="text-[#0E8A3E] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Transparency Box */}
      <div className="p-6 bg-[#F5F4F1] rounded-2xl border border-stone-200">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#5C3320] text-[#F5A827] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-black font-display text-[#1A1A1A]">
              Model Formulation: Ensemble Demand Decomposition.
            </h4>
            <p className="text-xs text-[#6E6E6E] mt-1 leading-relaxed">
              The model combines historical transaction patterns, current order velocity, day-of-week effects, local events and promotional activity. During dynamic simulation events (e.g. demand spike), the velocity coefficient automatically shifts weighting to high-frequency 15-minute moving averages to prevent kitchen lag and long customer wait times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
