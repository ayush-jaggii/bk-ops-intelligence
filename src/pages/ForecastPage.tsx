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
  Truck,
  Activity,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ForecastPage: React.FC = () => {
  const { hourlyData, signals, selectedStore } = useApp();
  const [showConfidence, setShowConfidence] = useState<boolean>(true);
  const [showLaborLine, setShowLaborLine] = useState<boolean>(true);

  // Transform data for Recharts composed chart
  const chartData = hourlyData.map((item) => ({
    time: item.timeLabel,
    'Projected Transactions': item.transactionsPerHour,
    'Baseline Transactions': item.baselineTransactions,
    'Required Staff Count': item.recommendedCrew,
    confidenceHigh: item.confidenceHigh,
    confidenceLow: item.confidenceLow
  }));

  const getSignalIcon = (cat: string) => {
    switch (cat) {
      case 'day':
        return Calendar;
      case 'weather':
        return CloudSun;
      case 'event':
        return Trophy;
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
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              Data Ingestion & Demand Signals
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#0E8A3E] border border-emerald-300">
              15-Min Granularity
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Ingests real-time transactions, footfalls, weather, delivery mix, and local events to project hourly labor requirements for {selectedStore.name}.
          </p>
        </div>

        {/* 7-Day Advance Horizon Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-stone-200/80 rounded-2xl shadow-xs flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
                Forecast Horizon
              </span>
              <span className="text-sm font-black font-display text-[#1A1A1A]">Up to 7 Days in Advance</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#5C3320] font-black text-xs flex items-center justify-center border border-amber-200 font-display">
              7D
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Forecast Chart Card */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-black font-display text-[#1A1A1A]">
              Transactions Velocity vs Staffing Requirement Curve
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              Demonstrates how predicted transactions (left axis) directly compute required on-duty crew (right axis)
            </p>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center gap-2 text-xs font-bold font-ui">
            <button
              onClick={() => setShowConfidence(!showConfidence)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs ${
                showConfidence
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-black'
                  : 'border-stone-200 text-[#6E6E6E] hover:bg-stone-50'
              }`}
            >
              {showConfidence ? '✓ Confidence Band' : '+ Show Confidence'}
            </button>
            <button
              onClick={() => setShowLaborLine(!showLaborLine)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs ${
                showLaborLine
                  ? 'bg-[#5C3320] border-[#5C3320] text-white font-black'
                  : 'border-stone-200 text-[#6E6E6E] hover:bg-stone-50'
              }`}
            >
              {showLaborLine ? '✓ Labor Need Curve' : '+ Show Labor Need'}
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-[340px] w-full pt-2">
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
              <XAxis dataKey="time" tick={{ fill: '#5C3320', fontSize: 11, fontWeight: 700 }} />
              <YAxis yAxisId="left" tick={{ fill: '#5C3320', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#E85C1A', fontSize: 11 }} domain={[0, 16]} />
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
                  yAxisId="left"
                  type="monotone"
                  dataKey="confidenceHigh"
                  stroke="none"
                  fill="url(#confidenceGradient)"
                  name="Confidence Range (Upper)"
                />
              )}

              {/* Projected Transactions */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Projected Transactions"
                stroke="#E85C1A"
                strokeWidth={3}
                fill="url(#forecastGradient)"
                dot={{ r: 4, fill: '#E85C1A', stroke: '#FFFFFF', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />

              {/* Baseline Transactions */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Baseline Transactions"
                stroke="#A89B8C"
                strokeDasharray="4 4"
                strokeWidth={2}
                dot={{ r: 3, fill: '#A89B8C' }}
              />

              {/* Required Staff Count (Right Axis) */}
              {showLaborLine && (
                <Line
                  yAxisId="right"
                  type="stepAfter"
                  dataKey="Required Staff Count"
                  stroke="#5C3320"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#5C3320' }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ingested Demand Signal Parameters Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-black font-display text-[#1A1A1A]">
              Live Ingested Demand Signals
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              External and historical telemetry feeds ingested into the 7-day labor forecasting model
            </p>
          </div>
          <span className="text-xs text-[#6E6E6E] font-medium">4 Active Telemetry Streams</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {signals.map((signal) => {
            const Icon = getSignalIcon(signal.category);
            return (
              <div
                key={signal.id}
                className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:border-[#5C3320]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#F5F4F1] border border-stone-200 flex items-center justify-center text-[#5C3320]">
                        <Icon className="w-4 h-4 text-[#E85C1A]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1A1A] text-sm">{signal.title}</div>
                        <div className="text-[11px] text-[#6E6E6E]">{signal.subtitle}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        signal.impactType === 'positive'
                          ? 'bg-orange-100 text-[#E85C1A] border border-orange-200'
                          : signal.impactType === 'negative'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {signal.impactBadge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {signal.explanation}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#6E6E6E]">
                  <span>Telemetry feed refreshed: 4 mins ago</span>
                  <span className="text-[#0E8A3E] font-bold">Signal Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
