import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShiftBuilderModal } from '../components/ShiftBuilderModal';
import {
  Users,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Edit3,
  Sparkles,
  Layers,
  Activity,
  AlertCircle
} from 'lucide-react';
import { StationType } from '../types';

export const WorkforcePage: React.FC = () => {
  const {
    hourlyData,
    employees,
    scheduleApproved,
    approveSchedule,
    resetScheduleApproval,
    microShiftsActive,
    toggleMicroShifts,
    addToast
  } = useApp();

  const [shiftBuilderOpen, setShiftBuilderOpen] = useState<boolean>(false);

  // Filter employees
  const fullTimeCrew = employees.filter((e) => e.shiftType === 'standard_9h');
  const microShiftCrew = employees.filter((e) => e.shiftType === 'micro_4h');

  const stations: { name: StationType; desc: string; key: keyof typeof hourlyData[0]['stationAllocationOptimized'] }[] = [
    { name: 'Front Counter', desc: 'Kiosk & Order Point', key: 'frontCounter' },
    { name: 'Assembly Line', desc: 'Burger & Wrap Wrapping', key: 'assemblyLine' },
    { name: 'Fry Station', desc: 'King Fries & Sides', key: 'fryStation' },
    { name: 'Flame Broiler', desc: 'Whopper Patty Searing', key: 'flameBroiler' },
    { name: 'Aggregator Dispatch', desc: 'Swiggy / Zomato Handoff', key: 'aggregatorDispatch' },
    { name: 'BOH Prep', desc: 'Stocking & Pre-pack', key: 'bohPrep' }
  ];

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              Dynamic Roster & Station Optimizer
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-[#E85C1A] border border-orange-300">
              Micro-Shift Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Dynamic shift restructuring: 4-hour peak micro-shifts paired with real-time cross-station task rebalancing.
          </p>
        </div>

        {/* Top Actions: Shift Builder + Roster Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={toggleMicroShifts}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-ui uppercase tracking-wider transition-all cursor-pointer border ${
              microShiftsActive
                ? 'bg-amber-100/80 border-amber-300 text-amber-950 font-black'
                : 'bg-stone-100 border-stone-300 text-stone-700'
            }`}
          >
            {microShiftsActive ? '✓ 4h Micro-Shifts Active' : 'Traditional 9h Straight Shifts'}
          </button>

          <button
            onClick={() => setShiftBuilderOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#5C3320] bg-white hover:bg-[#5C3320] text-[#5C3320] hover:text-white text-xs font-black uppercase tracking-wider shadow-xs transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#E85C1A]" /> Open Shift Builder
          </button>
        </div>
      </div>

      {/* Top 3 Metric Diagnosis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Off-Peak Lull Productivity (3–5 PM)
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0E8A3E] mt-1">
            {microShiftsActive ? '4.0 tx / emp' : '1.7 tx / emp'}
          </div>
          <span className="text-xs text-[#6E6E6E] mt-1 block font-medium">
            {microShiftsActive
              ? '✓ Eliminates unproductive afternoon idle hours'
              : '⚠ Severe overstaffing (< 2 tx/employee/hour)'}
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Peak Speed of Service (SoS at 7 PM)
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] mt-1">
            {microShiftsActive ? '2m 48s' : '7m 25s'}
          </div>
          <span className="text-xs text-[#6E6E6E] mt-1 block font-medium">
            {microShiftsActive
              ? '✓ 12 crew reinforced (Within 3m benchmark)'
              : '⚠ Fixed 8-crew cap causes severe order blowout'}
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Weekly Store Labor Savings
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#E85C1A] mt-1">
            ₹ 26,880/-
          </div>
          <span className="text-[11px] text-[#6E6E6E] font-medium mt-1 block">
            Eliminates 16 unproductive lull hours daily across 2 shifts
          </span>
        </div>
      </div>

      {/* Main Hourly Station Deployment Matrix */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-black font-display text-[#1A1A1A]">
              Station-by-Station Hourly Deployment Matrix
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-0.5">
              Visual allocation comparing static 9h shift caps vs AI demand-responsive staffing across store stations
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-ui">
            <span className="flex items-center gap-1.5 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-stone-200"></span> Standard Base
            </span>
            <span className="flex items-center gap-1.5 text-[#E85C1A] font-bold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#E85C1A]"></span> Micro-Shift Reinforced
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-200"></span> Off-Peak Scaled
            </span>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] font-ui">
                <th className="py-2.5 px-3">Station</th>
                {hourlyData.map((h) => (
                  <th key={h.hour} className="py-2.5 px-2 text-center">
                    <div className="font-ui uppercase font-black">{h.timeLabel}</div>
                    <div className="text-[9px] font-medium text-stone-400">{h.transactionsPerHour} tx</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs font-ui">
              {stations.map((st) => (
                <tr key={st.name} className="hover:bg-[#F5F4F1]/60 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#1A1A1A]">{st.name}</div>
                    <div className="text-[10px] text-[#6E6E6E]">{st.desc}</div>
                  </td>
                  {hourlyData.map((h) => {
                    const optCount = h.stationAllocationOptimized[st.key];
                    const tradCount = h.stationAllocationTraditional[st.key];
                    const isReinforced = optCount > tradCount;
                    const isReduced = optCount < tradCount;

                    return (
                      <td key={h.hour} className="py-2.5 px-2 text-center">
                        <div
                          className={`inline-flex flex-col items-center justify-center w-11 py-1 rounded-lg font-bold transition-all ${
                            isReinforced
                              ? 'bg-orange-100 text-[#E85C1A] border border-orange-300 font-black'
                              : isReduced
                              ? 'bg-amber-100/70 text-amber-900 border border-amber-200'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          <span className="text-sm font-black font-display">{optCount}</span>
                          {isReinforced && <span className="text-[7px] uppercase font-bold text-[#E85C1A]">+Peak</span>}
                          {isReduced && <span className="text-[7px] uppercase font-bold text-amber-700">Lull</span>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crew Roster Breakdown: Full-Time 9h vs Flexible 4h Micro-Shifts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Full-Time Straight Shift Crew */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h4 className="text-base font-black font-display text-[#1A1A1A]">
                Full-Time Base Crew (9h Straight Shifts)
              </h4>
              <p className="text-xs text-[#6E6E6E] mt-0.5">
                Core full-time staff handling store opening, closing, and cross-station tasks
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
              {fullTimeCrew.length} Active
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {fullTimeCrew.map((emp) => (
              <div
                key={emp.id}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                    <span>{emp.nameId}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-stone-200 text-stone-700">
                      {emp.primaryRole}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6E6E6E] mt-0.5">
                    Shift: {emp.currentShift.label}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {emp.skills.slice(0, 2).map((s) => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white border border-stone-200 text-[#5C3320]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flexible 4-Hour Micro-Shift Crew */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h4 className="text-base font-black font-display text-[#1A1A1A]">
                Peak Micro-Shift Crew (3- to 4-Hour Shifts)
              </h4>
              <p className="text-xs text-[#6E6E6E] mt-0.5">
                Flexible part-time reinforcements covering 1–3 PM lunch and 7–10 PM dinner surges
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-[#E85C1A] border border-orange-200">
              {microShiftCrew.length} Roster Specialists
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {microShiftCrew.map((emp) => (
              <div
                key={emp.id}
                className="p-3 rounded-xl bg-orange-50/40 border border-orange-200/70 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                    <span>{emp.nameId}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-orange-200 text-orange-950 font-black">
                      4h Micro
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6E6E6E] mt-0.5">
                    Target: {emp.recommendedShift.label}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white border border-orange-200 text-[#E85C1A]">
                    {emp.primaryRole}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Action Card */}
      <div className="p-6 rounded-2xl bg-[#5C3320] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-[#5C3320]">
              Manager Supervision
            </span>
            <span className="text-xs text-stone-300">5-Day Advance Schedule Review</span>
          </div>
          <h3 className="text-xl font-black font-display text-white mt-1">
            {scheduleApproved ? 'Schedule Approved & Biometrics Synced' : 'Review & Finalize Next Week’s Master Roster'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5 max-w-xl leading-relaxed">
            Store managers retain full override authority. Review individual employee assignments, edit shift blocks, and lock the roster.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShiftBuilderOpen(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-white/20"
          >
            Override Shift
          </button>
          <button
            onClick={approveSchedule}
            disabled={scheduleApproved}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              scheduleApproved
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-[#E85C1A] hover:bg-[#D44D0F] text-white shadow-xs'
            }`}
          >
            {scheduleApproved ? '✓ Master Schedule Locked' : 'Approve Master Roster'}
          </button>
        </div>
      </div>

      {/* Shift Builder Modal */}
      <ShiftBuilderModal isOpen={shiftBuilderOpen} onClose={() => setShiftBuilderOpen(false)} />
    </div>
  );
};
