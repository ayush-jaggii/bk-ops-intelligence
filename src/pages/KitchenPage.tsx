import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VegIndicator, NonVegIndicator, DietFilterToggles } from '../components/FoodIndicators';
import {
  ChefHat,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Timer
} from 'lucide-react';
import { SKUItem } from '../types';

export const KitchenPage: React.FC = () => {
  const {
    skus,
    kitchenPrepApplied,
    applyKitchenRecommendation,
    setSelectedExplanationSKU
  } = useApp();

  const [activeTab, setActiveTab] = useState<'table' | 'timeline'>('table');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  // Filter SKUs based on FSSAI veg/non-veg indicator
  const filteredSKUs = useMemo(() => {
    return skus.filter((sku) => {
      const isVeg =
        sku.id.includes('veg') || sku.id.includes('fries') || sku.id.includes('shake');
      if (dietFilter === 'veg') return isVeg;
      if (dietFilter === 'nonveg') return !isVeg;
      return true;
    });
  }, [skus, dietFilter]);

  const kitchenTimelineEvents = [
    {
      time: '4:12 PM',
      title: 'AI Detects Rising Velocity',
      type: 'signal',
      desc: 'Mobile app and Swiggy carts show surge in Whopper combos.',
      badge: 'Signal Detected'
    },
    {
      time: '4:13 PM',
      title: 'Batch Recommendation Generated',
      type: 'rec',
      desc: 'KDS displays: Prepare 8 flame-grilled patties (Batch #4).',
      badge: 'Action Trigger'
    },
    {
      time: '4:18 PM',
      title: 'Expected Demand Spike Arrives',
      type: 'peak',
      desc: 'In-store kiosks and delivery drivers check in simultaneously.',
      badge: 'Order Spike'
    },
    {
      time: '4:25 PM',
      title: 'Peak Preparation Window',
      type: 'buffer',
      desc: 'Zero stock-outs; hot holding buffer remains fresh within 12-min mark.',
      badge: 'Optimized Window'
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              AI Kitchen Prep.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#E85C1A] text-white">
              KDS Engine
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Predict short-term SKU demand and optimize batch preparation to minimize food waste.
          </p>
        </div>

        <button
          onClick={() => applyKitchenRecommendation()}
          disabled={kitchenPrepApplied}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
            kitchenPrepApplied
              ? 'bg-emerald-100 text-[#0E8A3E] border border-emerald-300 cursor-default'
              : 'bg-[#E85C1A] hover:bg-[#D44D0F] text-white ring-2 ring-orange-200'
          }`}
        >
          {kitchenPrepApplied ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Prep Recommendations Applied
            </>
          ) : (
            <>
              <ChefHat className="w-4 h-4" /> Apply All Prep Recommendations
            </>
          )}
        </button>
      </div>

      {/* Top 4 Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Current Queue
          </span>
          <div className="text-3xl font-black font-display text-[#1A1A1A] mt-1">14 orders</div>
          <span className="text-xs text-[#6E6E6E] mt-1 block">8 Dine-in · 6 Delivery</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Average Prep Time
          </span>
          <div className="text-3xl font-black font-display text-[#0E8A3E] mt-1">7m 24s</div>
          <span className="text-xs text-[#6E6E6E] mt-1 block">-42s vs lunch baseline</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Kitchen Utilization
          </span>
          <div className="text-3xl font-black font-display text-[#1A1A1A] mt-1">78%</div>
          <span className="text-xs text-[#6E6E6E] mt-1 block">Comfortable operating capacity</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            Holding Value at Risk
          </span>
          <div className="text-3xl font-black font-display text-[#7A1F1F] mt-1">
            {kitchenPrepApplied ? '₹ 240/-' : '₹ 1,240/-'}
          </div>
          <span className="text-xs text-[#6E6E6E] mt-1 block">
            {kitchenPrepApplied ? 'Protected by batch reduction' : 'Approaching max holding limit'}
          </span>
        </div>
      </div>

      {/* Items at Risk (Section 9) */}
      <div className="p-6 bg-amber-50/80 rounded-2xl border border-amber-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#E85C1A]" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display text-[#1A1A1A]">
                Items at Risk (Holding Shelf Life).
              </h3>
              <p className="text-xs text-[#6E6E6E]">
                Holding timers approaching Burger King Gold Standard quality thresholds
              </p>
            </div>
          </div>

          <button
            onClick={() => applyKitchenRecommendation()}
            className="px-4 py-2 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs transition-all cursor-pointer"
          >
            Apply Prep Recommendation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fries Risk Card */}
          <div className="p-4 bg-white rounded-xl border border-amber-200 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black font-display text-[#1A1A1A]">
                  King French Fries.
                </span>
                <VegIndicator size={13} />
              </div>
              <div className="text-xs text-[#6E6E6E] mt-1 font-ui">
                Quantity in Bin: <strong>8 portions</strong> · Estimated Value: <strong>₹ 280/-</strong>
              </div>
              <div className="mt-2 text-xs text-[#1A1A1A]">
                <strong>AI Recommendation: </strong>
                <span className="text-[#E85C1A] font-bold">Reduce next batch size by 20%.</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 text-xs font-black text-[#7A1F1F] px-2.5 py-1 bg-red-50 rounded-full border border-red-200 font-ui">
                <Timer className="w-3.5 h-3.5" /> 6 min left
              </span>
            </div>
          </div>

          {/* Chicken Patties Risk Card */}
          <div className="p-4 bg-white rounded-xl border border-amber-200 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black font-display text-[#1A1A1A]">
                  Chicken Patties (Fried).
                </span>
                <NonVegIndicator size={13} />
              </div>
              <div className="text-xs text-[#6E6E6E] mt-1 font-ui">
                Quantity in Bin: <strong>5 patties</strong> · Estimated Value: <strong>₹ 460/-</strong>
              </div>
              <div className="mt-2 text-xs text-[#1A1A1A]">
                <strong>AI Recommendation: </strong>
                <span className="text-amber-800 font-bold">Hold fryer drop; utilize buffer.</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 text-xs font-black text-amber-800 px-2.5 py-1 bg-amber-100 rounded-full border border-amber-300 font-ui">
                <Timer className="w-3.5 h-3.5" /> 11 min left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SKU Table & Kitchen Timeline Toggle */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black font-display text-[#1A1A1A]">
              SKU Batch Preparation Plan.
            </h3>
            <p className="text-xs text-[#6E6E6E] mt-0.5">
              Live batch trigger model calibrated to 30-minute order velocity and holding limits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* India FSSAI Veg / Non-Veg segmented toggle filters */}
            <DietFilterToggles dietFilter={dietFilter} setDietFilter={setDietFilter} />

            {/* Table / Timeline switcher */}
            <div className="inline-flex p-1 bg-[#F5F4F1] rounded-full border border-stone-200">
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-[#5C3320] text-white shadow-xs'
                    : 'text-[#6E6E6E] hover:text-[#1A1A1A]'
                }`}
              >
                SKU Table
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-[#5C3320] text-white shadow-xs'
                    : 'text-[#6E6E6E] hover:text-[#1A1A1A]'
                }`}
              >
                Event Timeline
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-stone-200 text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] font-ui">
                  <th className="py-3 px-3">Product Name</th>
                  <th className="py-3 px-3 text-center">Current Ready</th>
                  <th className="py-3 px-3 text-center">Next 30m Forecast</th>
                  <th className="py-3 px-3 text-center">Recommended Prep</th>
                  <th className="py-3 px-3 text-center">Holding Time</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Why?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filteredSKUs.map((sku) => {
                  const isPrepare = sku.status === 'Prepare';
                  const isRisk = sku.status === 'At Risk';
                  const isVeg =
                    sku.id.includes('veg') || sku.id.includes('fries') || sku.id.includes('shake');

                  return (
                    <tr key={sku.id} className="hover:bg-[#F5F4F1]/60 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-black font-display text-sm text-[#1A1A1A]">
                            {sku.name}.
                          </span>
                          {isVeg ? <VegIndicator size={14} /> : <NonVegIndicator size={14} />}
                        </div>
                        <span className="text-[11px] text-[#6E6E6E] font-ui mt-0.5 block">
                          {sku.category} · ₹ {sku.unitPrice}/-
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-black font-display text-stone-800 text-base">
                        {sku.currentReady}
                      </td>

                      <td className="py-3.5 px-3 text-center font-black font-display text-[#E85C1A] text-base">
                        {sku.next30mForecast}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`font-black font-display text-base px-3 py-1 rounded-full ${
                            sku.recommendedPrep > 0
                              ? 'bg-[#E85C1A] text-white shadow-xs'
                              : 'bg-stone-100 text-[#6E6E6E]'
                          }`}
                        >
                          {sku.recommendedPrep}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-bold text-[#6E6E6E]">
                        {sku.holdingTimeRemMin}m / {sku.maxHoldingTimeMin}m
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`text-[10px] font-black font-ui px-3 py-1 rounded-full uppercase tracking-wider ${
                            isPrepare
                              ? 'bg-red-50 text-[#7A1F1F] border border-red-200'
                              : isRisk
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-stone-100 text-[#6E6E6E]'
                          }`}
                        >
                          {sku.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedExplanationSKU(sku)}
                          className="px-3.5 py-1.5 rounded-full border border-[#5C3320] bg-white hover:bg-[#5C3320] text-[#5C3320] hover:text-white text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-[#E85C1A]" /> Why?
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Kitchen Timeline */
          <div className="py-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kitchenTimelineEvents.map((evt, idx) => (
                <div
                  key={evt.time}
                  className="p-4 rounded-xl bg-[#F5F4F1] border border-stone-200 hover:border-[#E85C1A]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black font-display text-[#E85C1A]">{evt.time}</span>
                      <span className="text-[9px] font-bold font-ui px-2 py-0.5 rounded-full bg-white text-[#6E6E6E] border border-stone-200 uppercase tracking-wider">
                        {evt.badge}
                      </span>
                    </div>
                    <h4 className="font-black font-display text-[#1A1A1A] text-sm">{evt.title}</h4>
                    <p className="text-xs text-[#6E6E6E] mt-1 leading-relaxed">{evt.desc}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-stone-200 text-[10px] text-stone-400 uppercase tracking-wider">
                    Sequence Step 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
