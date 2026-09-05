import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  RotateCcw,
  Save,
  Users,
  ChefHat,
  Zap
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
      ordersPerKitchenCrewPerHour: 28,
      ordersPerFrontCounterCrewPerHour: 38,
      minKitchenStaffing: 2,
      minFrontOfHouseStaffing: 1,
      prepSafetyBufferPct: 15,
      maxHoldingTimeMinutes: 15,
      energyOptimizationThresholdPct: 30,
      forecastHorizonHours: 6
    });
  };

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-[#1A1A1A] tracking-tight">
              Operational Settings & Model Thresholds.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#5C3320] text-white">
              Config
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Fine-tune the store optimization constraints and throughput capacity parameters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            type="button"
            className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-[#6E6E6E] text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restore Defaults
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Labor & Throughput Thresholds */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display text-[#1A1A1A]">
                Staffing & Station Throughput Assumptions.
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Hourly order processing rate per station team member
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Orders per Kitchen Employee / Hour
              </label>
              <input
                type="number"
                min={15}
                max={50}
                value={formData.ordersPerKitchenCrewPerHour}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ordersPerKitchenCrewPerHour: Number(e.target.value)
                  })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Standard QSR throughput benchmark is 25–32 orders/hr.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Orders per Front Counter / Cashier / Hour
              </label>
              <input
                type="number"
                min={20}
                max={60}
                value={formData.ordersPerFrontCounterCrewPerHour}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ordersPerFrontCounterCrewPerHour: Number(e.target.value)
                  })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Includes Self-Ordering Kiosks and front point-of-sale registers.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Minimum Kitchen Staffing Floor
              </label>
              <input
                type="number"
                min={1}
                max={4}
                value={formData.minKitchenStaffing}
                onChange={(e) =>
                  setFormData({ ...formData, minKitchenStaffing: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Mandatory safety minimum regardless of how low demand falls.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Minimum Front-of-House Staffing Floor
              </label>
              <input
                type="number"
                min={1}
                max={3}
                value={formData.minFrontOfHouseStaffing}
                onChange={(e) =>
                  setFormData({ ...formData, minFrontOfHouseStaffing: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Host / kiosk assistant minimum floor.
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Kitchen Holding & Batch Prep */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display text-[#1A1A1A]">
                Kitchen Batch Prep & Holding Buffer.
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Safety multipliers applied to short-term SKU demand predictions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Preparation Safety Buffer (%)
              </label>
              <input
                type="number"
                min={5}
                max={30}
                value={formData.prepSafetyBufferPct}
                onChange={(e) =>
                  setFormData({ ...formData, prepSafetyBufferPct: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Buffer added on top of 30-min forecast to prevent stockouts.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Maximum Cooked Holding Time (Minutes)
              </label>
              <input
                type="number"
                min={10}
                max={30}
                value={formData.maxHoldingTimeMinutes}
                onChange={(e) =>
                  setFormData({ ...formData, maxHoldingTimeMinutes: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Cooked protein shelf-life limit before mandatory discarding.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Energy & Forecasting */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center text-[#0E8A3E]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display text-[#1A1A1A]">
                Energy Setback & Forecast Horizon.
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Occupancy threshold to trigger smart BMS chiller eco-modulation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Energy Optimization Occupancy Threshold (%)
              </label>
              <input
                type="number"
                min={15}
                max={50}
                value={formData.energyOptimizationThresholdPct}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    energyOptimizationThresholdPct: Number(e.target.value)
                  })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                HVAC eco-setback triggers when dining occupancy falls below this percentage.
              </span>
            </div>

            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1 uppercase tracking-wider text-[11px]">
                Forecast Horizon (Hours)
              </label>
              <input
                type="number"
                min={3}
                max={12}
                value={formData.forecastHorizonHours}
                onChange={(e) =>
                  setFormData({ ...formData, forecastHorizonHours: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl font-bold text-[#1A1A1A]"
              />
              <span className="text-[10px] text-[#6E6E6E] mt-1 block">
                Forward predictive planning window.
              </span>
            </div>
          </div>
        </div>

        {/* Save Button in Pill format */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Operational Parameters
          </button>
        </div>
      </form>
    </div>
  );
};
