import React, { useState, useMemo } from 'react';
import { ROICalculatorParams } from '../types';
import {
  Calculator
} from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [params, setParams] = useState<ROICalculatorParams>({
    numberOfStores: 581,
    avgMonthlyStoreRevenueLakhs: 38.9,
    laborOptimizationPct: 2.0,
    wasteReductionPct: 10.0,
    energyReductionPct: 8.0,
    throughputImprovementPct: 1.0,
    implementationCostPerStorePerMonth: 8000
  });

  const calculations = useMemo(() => {
    // 1 store monthly revenue in INR
    const monthlyRevINR = params.avgMonthlyStoreRevenueLakhs * 100000;

    // Component savings per store per month:
    // Labor cost is ~14% of revenue
    const monthlyLaborCost = monthlyRevINR * 0.14;
    const laborSavingsPerStoreMonth = monthlyLaborCost * (params.laborOptimizationPct / 100);

    // Food cost is ~33% of revenue; waste is ~4% of food cost
    const monthlyFoodCost = monthlyRevINR * 0.33;
    const monthlyFoodWaste = monthlyFoodCost * 0.04;
    const wasteSavingsPerStoreMonth = monthlyFoodWaste * (params.wasteReductionPct / 100);

    // Energy cost is ~4.5% of revenue
    const monthlyEnergyCost = monthlyRevINR * 0.045;
    const energySavingsPerStoreMonth = monthlyEnergyCost * (params.energyReductionPct / 100);

    // Throughput boost: additional revenue with ~50% flow-through margin
    const throughputGrossPerStoreMonth = monthlyRevINR * (params.throughputImprovementPct / 100) * 0.50;

    const totalSavingsPerStoreMonth =
      laborSavingsPerStoreMonth +
      wasteSavingsPerStoreMonth +
      energySavingsPerStoreMonth +
      throughputGrossPerStoreMonth;

    // Fleetwide Annual Totals
    const annualSavingsGross = totalSavingsPerStoreMonth * params.numberOfStores * 12;
    const annualSoftwareCost =
      params.implementationCostPerStorePerMonth * params.numberOfStores * 12;
    const netAnnualBenefit = annualSavingsGross - annualSoftwareCost;
    const roiPercentage =
      annualSoftwareCost > 0 ? Math.round((netAnnualBenefit / annualSoftwareCost) * 100) : 0;
    const paybackMonths =
      annualSavingsGross > 0
        ? ((annualSoftwareCost / annualSavingsGross) * 12).toFixed(1)
        : '0';

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
      totalSavingsPerStoreMonth: Math.round(totalSavingsPerStoreMonth)
    };
  }, [params]);

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-6 font-ui">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black font-display text-[#1A1A1A]">
              Fleet-Wide Enterprise ROI Calculator.
            </h3>
            <p className="text-xs text-[#6E6E6E] font-medium">
              Modeled return across Burger King India's nationwide restaurant network
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#6E6E6E] px-3.5 py-1.5 bg-[#F5F4F1] rounded-full border border-stone-200 uppercase tracking-wider text-[11px]">
          Formulaic Financial Engine
        </span>
      </div>

      {/* Outputs Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-300">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0E8A3E] block font-ui">
            Annual Gross Savings
          </span>
          <div className="text-2xl font-black font-display text-[#0E8A3E] mt-1">
            ₹ {calculations.annualSavingsCrores} Cr/-
          </div>
          <span className="text-[11px] text-[#6E6E6E] mt-1 block">
            ~₹ {calculations.totalSavingsPerStoreMonth.toLocaleString('en-IN')}/- per store/mo
          </span>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-stone-50 to-white border border-stone-300">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Annual Software Cost
          </span>
          <div className="text-2xl font-black font-display text-[#1A1A1A] mt-1">
            ₹ {calculations.annualCostCrores} Cr/-
          </div>
          <span className="text-[11px] text-[#6E6E6E] mt-1 block">
            ₹ {params.implementationCostPerStorePerMonth.toLocaleString('en-IN')}/- per store/mo
          </span>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-300">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#E85C1A] block font-ui">
            Net Annual Benefit
          </span>
          <div className="text-2xl font-black font-display text-[#E85C1A] mt-1">
            ₹ {calculations.netBenefitCrores} Cr/-
          </div>
          <span className="text-[11px] text-[#6E6E6E] mt-1 block">Incremental EBITDA margin</span>
        </div>

        <div className="p-5 rounded-xl bg-[#5C3320] text-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#F5A827] block font-ui">
              Return on Investment
            </span>
            <span className="text-xs text-stone-300">Payback</span>
          </div>
          <div className="text-3xl font-black font-display text-[#F5A827] mt-1">
            {calculations.roiPercentage}%
          </div>
          <span className="text-[11px] text-stone-200 mt-1 block font-medium">
            Payback in {calculations.paybackMonths} Months
          </span>
        </div>
      </div>

      {/* Input Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Store Count Slider */}
        <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
          <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
            <span>Number of Burger King Stores:</span>
            <span className="text-sm font-black font-display text-[#E85C1A]">
              {params.numberOfStores}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={800}
            step={1}
            value={params.numberOfStores}
            onChange={(e) => setParams({ ...params, numberOfStores: Number(e.target.value) })}
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1 font-medium">
            <span>100 Stores</span>
            <span>Default: 581 Stores (India Fleet)</span>
            <span>800 Stores</span>
          </div>
        </div>

        {/* Average Monthly Revenue */}
        <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
          <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
            <span>Avg Monthly Store Revenue:</span>
            <span className="text-sm font-black font-display text-[#E85C1A]">
              ₹ {params.avgMonthlyStoreRevenueLakhs} Lakhs/-
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={60}
            step={0.5}
            value={params.avgMonthlyStoreRevenueLakhs}
            onChange={(e) =>
              setParams({ ...params, avgMonthlyStoreRevenueLakhs: Number(e.target.value) })
            }
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1 font-medium">
            <span>₹ 20L/-</span>
            <span>Benchmark: ₹ 38.9L/-</span>
            <span>₹ 60L/-</span>
          </div>
        </div>

        {/* Labor Optimization % */}
        <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
          <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
            <span>Labor Cost Optimization:</span>
            <span className="text-sm font-black font-display text-[#E85C1A]">
              {params.laborOptimizationPct}%
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={6}
            step={0.1}
            value={params.laborOptimizationPct}
            onChange={(e) =>
              setParams({ ...params, laborOptimizationPct: Number(e.target.value) })
            }
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1 font-medium">
            <span>0.5% (Conservative)</span>
            <span>2.0%</span>
            <span>6.0% (Aggressive)</span>
          </div>
        </div>

        {/* Waste Reduction % */}
        <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200">
          <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2 font-ui">
            <span>Kitchen Waste Reduction:</span>
            <span className="text-sm font-black font-display text-[#E85C1A]">
              {params.wasteReductionPct}%
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={25}
            step={0.5}
            value={params.wasteReductionPct}
            onChange={(e) =>
              setParams({ ...params, wasteReductionPct: Number(e.target.value) })
            }
            className="w-full accent-[#E85C1A] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6E6E6E] mt-1 font-medium">
            <span>3%</span>
            <span>10% Base</span>
            <span>25%</span>
          </div>
        </div>
      </div>

      {/* Model Assumptions Note */}
      <div className="p-4 bg-[#F5F4F1] rounded-xl border border-stone-200 text-xs text-[#6E6E6E] leading-relaxed">
        <strong className="text-[#1A1A1A]">Operational Parameters: </strong>
        Calculations assume labor represents ~14% of store revenue, food cost represents ~33% of store revenue, energy represents ~4.5%, and enterprise operations platform license is amortized at ₹ 8,000/- per store/month across the national fleet.
      </div>
    </div>
  );
};
