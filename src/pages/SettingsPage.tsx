import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  RotateCcw,
  Save,
  Users,
  Clock,
  ShieldCheck,
  CalendarCheck,
  Activity,
  DollarSign
} from 'lucide-react';
import { OperationalSettings } from '../types';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useApp();
  const [formData, setFormData] = useState<OperationalSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const handleReset = () => {
    resetSettings();
    setFormData({
      targetSpeedOfServiceSec: 180,
      maxSpeedOfServiceSec: 300,
      minTransactionsPerEmployee: 2.0,
      targetTransactionsPerEmployee: 4.8,
      minBohPrepStaffing: 1,
      minAssemblyStaffing: 1,
      minFrontCounterStaffing: 1,
      hourlyBaseWageINR: 95,
      overtimeMultiplier: 1.5,
      advanceScheduleNoticeDays: 5
    });
  };

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              Shift Scheduling Rules & Constraints
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#5C3320] text-white">
              Rules Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Configure Speed of Service thresholds, employee productivity targets, and station minimums.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            type="button"
            className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-[#6E6E6E] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restore Defaults
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Speed of Service & Customer Experience */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-xl bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-display text-[#1A1A1A]">
                Speed of Service (SoS) Benchmarks
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Order fulfillment targets to prevent kiosk and aggregator drop-offs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Target Speed of Service (Seconds)
              </label>
              <input
                type="number"
                min={120}
                max={240}
                value={formData.targetSpeedOfServiceSec}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetSpeedOfServiceSec: Number(e.target.value)
                  })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Standard QSR target is 180 seconds (3 minutes).
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Maximum Allowed Speed of Service (Seconds)
              </label>
              <input
                type="number"
                min={240}
                max={480}
                value={formData.maxSpeedOfServiceSec}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxSpeedOfServiceSec: Number(e.target.value)
                  })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Above 300s (5m), order drop-offs increase exponentially.
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Employee Productivity Targets */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-xl bg-[#5C3320]/10 flex items-center justify-center text-[#5C3320]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-display text-[#1A1A1A]">
                Labor Productivity & Overstaffing Thresholds
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Transactions per employee per hour boundaries
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Minimum Transactions / Employee / Hour (Overstaffing Threshold)
              </label>
              <input
                type="number"
                step="0.1"
                min={1.0}
                max={3.5}
                value={formData.minTransactionsPerEmployee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minTransactionsPerEmployee: Number(e.target.value)
                  })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Falling below 2.0 tx/employee triggers an Off-Peak Overstaffing alert.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Target Transactions / Employee / Hour (Optimal Load)
              </label>
              <input
                type="number"
                step="0.1"
                min={3.5}
                max={7.0}
                value={formData.targetTransactionsPerEmployee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetTransactionsPerEmployee: Number(e.target.value)
                  })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Healthy operating band is 4.5 to 5.5 transactions per staff hour.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Station Minimum Staffing & Advance Notice */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#0E8A3E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-display text-[#1A1A1A]">
                Station Minimums & Roster Governance
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Safety floors and human-in-the-loop advance notice settings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Min Front Counter Crew
              </label>
              <input
                type="number"
                min={1}
                max={3}
                value={formData.minFrontCounterStaffing}
                onChange={(e) =>
                  setFormData({ ...formData, minFrontCounterStaffing: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">Always keep order point active.</span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Min Assembly Line Crew
              </label>
              <input
                type="number"
                min={1}
                max={3}
                value={formData.minAssemblyStaffing}
                onChange={(e) =>
                  setFormData({ ...formData, minAssemblyStaffing: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">Burger & wrap line continuity.</span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[10px]">
                Advance Schedule Notice
              </label>
              <input
                type="number"
                min={2}
                max={14}
                value={formData.advanceScheduleNoticeDays}
                onChange={(e) =>
                  setFormData({ ...formData, advanceScheduleNoticeDays: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">5 days advance delivery to managers.</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Scheduling Rules
          </button>
        </div>
      </form>
    </div>
  );
};
