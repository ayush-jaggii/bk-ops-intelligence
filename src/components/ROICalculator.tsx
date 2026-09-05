import React, { useState, useMemo } from 'react';
import { ROICalculatorParams } from '../types';
import { Calculator, Users, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [params, setParams] = useState<ROICalculatorParams>({
    numberOfStores: 581,
    avgMonthlyStoreRevenueLakhs: 38.9,
    unproductiveHoursSavedPerDay: 16,
    hourlyWageINR: 95,
    peakRevenueDropOffRecoveredPct: 2.2,
    implementationCostPerStorePerMonth: 6500
  });

  const calculations = useMemo(() => {
    const monthlyRevINR = params.avgMonthlyStoreRevenueLakhs * 100000;

    // Direct Wage Savings: Unproductive hours eliminated in 3–5 PM lull
    const dailyWageSaved = params.unproductiveHoursSavedPerDay * params.hourlyWageINR * 2.5; // includes shift overlap overhead
    const monthlyWageSavingsPerStore = dailyWageSaved * 30;

    // Peak Revenue Protected: Lower Speed of Service (< 3m) stops kiosk/aggregator drop-offs
    const monthlyPeakRevenueProtected = monthlyRevINR * (params.peakRevenueDropOffRecoveredPct / 100) * 0.45; // 45% contribution margin

    const totalSavingsPerStoreMonth = monthlyWageSavingsPerStore + monthlyPeakRevenueProtected;

    // Fleetwide Annual Totals (Burger King India)
    const annualSavingsGross = totalSavingsPerStoreMonth * params.numberOfStores * 12;
    const annualSoftwareCost = params.implementationCostPerStorePerMonth * params.numberOfStores * 12;
    const netAnnualBenefit = annualSavingsGross - annualSoftwareCost;
    const roiPercentage = annualSoftwareCost > 0 ? Math.round((netAnnualBenefit / annualSoftwareCost) * 100) : 0;
    const paybackMonths = annualSavingsGross > 0 ? ((annualSoftwareCost / annualSavingsGross) * 12).toFixed(1) : '0';

    // Format in Crores (1 Crore = 10,000,000 INR)
    const annualSavingsCrores = (annualSavingsGross / 10000000).toFixed(2);
    const annualCostCrores = (annualSoftwareCost / 10000000).toFixed(2);
    const netBenefitCrores = (netAnnualBenefit / 10000000).toFixed(2);

    return {
      annualSavingsGross,
      annualSoftwareCost,
      netAnnualBenefit,
      annualSavingsCrores,
      annualCostCrores,
      netBenefitCrores,
      roiPercentage,
      paybackMonths,
      monthlyWageSavingsPerStore: Math.round(monthlyWageSavingsPerStore),
      monthlyPeakRevenueProtected: Math.round(monthlyPeakRevenueProtected),
      totalSavingsPerStoreMonth: Math.round(totalSavingsPerStoreMonth)
    };
  }, [params]);

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/80 space-y-6 font-ui">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black font-display text-[#1A1A1A]">
              Fleet-Wide Labor ROI Calculator.
            </h3>
            <p className="text-xs text-[#6E6E6E] font-medium">
              Modeled financial returns across Burger King India's nationwide restaurant network (581 Stores)
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#6E6E6E] px-3.5 py-1.5 bg-[#F5F4F1] rounded-full border border-stone-200 uppercase tracking-wider text-[11px]">
          Demand-Responsive Labor Engine
        </span>
      </div>

      {/* Outputs Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-300">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
            NET ANNUAL FLEET BENEFIT
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0E8A3E] mt-1">
            ₹ {calculations.netBenefitCrores} Cr
          </div>
          <span className="text-xs text-emerald-700 font-medium mt-1 block">
            Across {params.numberOfStores} Burger King India stores
          </span>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-300">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
            RETURN ON INVESTMENT (ROI)
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#5C3320] mt-1">
            {calculations.roiPercentage}%
          </div>
          <span className="text-xs text-amber-800 font-medium mt-1 block">
            Payback Period: {calculations.paybackMonths} months
          </span>
        </div>

        <div className="p-5 rounded-xl bg-[#F5F4F1] border border-stone-200">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block">
            SAVINGS PER STORE / MONTH
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] mt-1">
            ₹ {(calculations.totalSavingsPerStoreMonth / 1000).toFixed(0)}k/-
          </div>
          <span className="text-xs text-[#6E6E6E] font-medium mt-1 block">
            ₹ {(calculations.monthlyWageSavingsPerStore / 1000).toFixed(0)}k wages + ₹ {(calculations.monthlyPeakRevenueProtected / 1000).toFixed(0)}k peak throughput
          </span>
        </div>

        <div className="p-5 rounded-xl bg-[#F5F4F1] border border-stone-200">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block">
            ANNUAL GROSS VALUE
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#E85C1A] mt-1">
            ₹ {calculations.annualSavingsCrores} Cr
          </div>
          <span className="text-xs text-[#6E6E6E] font-medium mt-1 block">
            Unproductive lull wages + rush orders captured
          </span>
        </div>
      </div>

      {/* Sliders Input Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1.5 font-bold">
            <span className="text-[#1A1A1A]">Burger King Fleet Count</span>
            <span className="text-[#E85C1A] font-black">{params.numberOfStores} Stores</span>
          </div>
          <input
            type="range"
            min={50}
            max={800}
            step={10}
            value={params.numberOfStores}
            onChange={(e) => setParams({ ...params, numberOfStores: Number(e.target.value) })}
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <span className="text-[10px] text-[#6E6E6E] mt-1 block">Current national restaurant fleet</span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 font-bold">
            <span className="text-[#1A1A1A]">Daily Unproductive Hours Eliminated</span>
            <span className="text-[#E85C1A] font-black">{params.unproductiveHoursSavedPerDay} Hours / Day</span>
          </div>
          <input
            type="range"
            min={4}
            max={32}
            step={2}
            value={params.unproductiveHoursSavedPerDay}
            onChange={(e) => setParams({ ...params, unproductiveHoursSavedPerDay: Number(e.target.value) })}
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <span className="text-[10px] text-[#6E6E6E] mt-1 block">Lull hours stood down across 2 overlapping shifts</span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 font-bold">
            <span className="text-[#1A1A1A]">Peak Drop-Off Revenue Protected</span>
            <span className="text-[#E85C1A] font-black">{params.peakRevenueDropOffRecoveredPct}% of Sales</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={5.0}
            step={0.1}
            value={params.peakRevenueDropOffRecoveredPct}
            onChange={(e) => setParams({ ...params, peakRevenueDropOffRecoveredPct: Number(e.target.value) })}
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <span className="text-[10px] text-[#6E6E6E] mt-1 block">Aggregator & kiosk orders retained by keeping SoS &lt; 3m</span>
        </div>
      </div>
    </div>
  );
};
