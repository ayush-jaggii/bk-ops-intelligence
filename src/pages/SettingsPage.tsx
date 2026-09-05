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
    <div className="space-y-6 pb-12">
      {/* Notion Page Header */}
      <div className="space-y-2 border-b border-[rgba(55,53,47,0.09)] pb-4">
        <div className="text-4xl mb-1 select-none">⚙️</div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">Settings & Parameters</h1>
            <p className="text-xs text-[#37352F]/60 mt-0.5">
              Configure store optimization constraints, staffing floors, and throughput thresholds
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              type="button"
              className="px-2.5 py-1 bg-white border border-[rgba(55,53,47,0.16)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] text-xs font-medium rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#37352F]/60" /> Restore Defaults
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Labor & Throughput */}
        <div className="border border-[rgba(55,53,47,0.09)] rounded-[4px] bg-white p-4 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[rgba(55,53,47,0.06)]">
            <Users className="w-4 h-4 text-[#37352F]/60" />
            <h3 className="text-sm font-semibold text-[#37352F]">Staffing & Station Throughput</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
                Orders per Kitchen Crew / Hour
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Standard QSR throughput benchmark is 25–32 orders/hr.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Includes Self-Ordering Kiosks and front point-of-sale registers.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Mandatory safety minimum regardless of demand dips.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Host / kiosk assistant minimum floor.
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Kitchen Holding & Batch Prep */}
        <div className="border border-[rgba(55,53,47,0.09)] rounded-[4px] bg-white p-4 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[rgba(55,53,47,0.06)]">
            <ChefHat className="w-4 h-4 text-[#37352F]/60" />
            <h3 className="text-sm font-semibold text-[#37352F]">Kitchen Batch Prep & Holding Buffer</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Buffer added on top of 30-min forecast to prevent stockouts.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Cooked protein shelf-life limit before mandatory discarding.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Energy & Forecasting */}
        <div className="border border-[rgba(55,53,47,0.09)] rounded-[4px] bg-white p-4 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[rgba(55,53,47,0.06)]">
            <Zap className="w-4 h-4 text-[#37352F]/60" />
            <h3 className="text-sm font-semibold text-[#37352F]">Energy Setback & Forecast Horizon</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                HVAC eco-setback triggers when dining occupancy falls below this percentage.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#37352F]/70 block mb-1">
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
                className="w-full px-2.5 py-1.5 bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] text-xs text-[#37352F] outline-none focus:border-[#2383E2]"
              />
              <span className="text-[11px] text-[#37352F]/40 mt-1 block">
                Forward predictive planning window.
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#2383E2] hover:bg-[#1B6FC2] text-white text-xs font-medium rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
