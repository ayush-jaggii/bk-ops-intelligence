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
    <div className="space-y-6 pb-12 font-sans select-none text-[#37352F]">
      {/* Page Header */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-4xl mb-3">🍳</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#37352F] tracking-tight">
            Kitchen & Holding
          </h1>
          <p className="text-xs text-[#37352F]/60 mt-1">
            Short-term SKU order velocity forecasts and batch preparation triggers.
          </p>
        </div>

        <button
          onClick={() => applyKitchenRecommendation()}
          disabled={kitchenPrepApplied}
          className={`self-start sm:self-auto px-3.5 py-1.5 rounded-[4px] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
            kitchenPrepApplied
              ? 'bg-[#DDEDEA] text-[#0F7B6C] cursor-default'
              : 'bg-[#2383E2] hover:bg-[#1B6FBF] text-white'
          }`}
        >
          {kitchenPrepApplied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" /> Prep Plan Applied
            </>
          ) : (
            <>
              <ChefHat className="w-3.5 h-3.5" /> Apply Batch Prep Plan
            </>
          )}
        </button>
      </div>

      {/* Top 4 Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Current KDS Queue
          </span>
          <div className="text-2xl font-semibold text-[#37352F] mt-1">14 orders</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">8 Dine-in · 6 Delivery</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Average Prep Time
          </span>
          <div className="text-2xl font-semibold text-[#0F7B6C] mt-1">7m 24s</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">-42s vs lunch baseline</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Kitchen Utilization
          </span>
          <div className="text-2xl font-semibold text-[#37352F] mt-1">78%</div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">Calibrated station capacity</span>
        </div>

        <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)]">
          <span className="text-[11px] text-[#37352F]/50 font-medium block">
            Holding Value at Risk
          </span>
          <div className="text-2xl font-semibold text-[#E03E3E] mt-1">
            {kitchenPrepApplied ? '₹ 240/-' : '₹ 1,240/-'}
          </div>
          <span className="text-[11px] text-[#37352F]/50 mt-1 block">
            {kitchenPrepApplied ? 'Protected by batch reduction' : 'Approaching quality limit'}
          </span>
        </div>
      </div>

      {/* Items at Risk Notion Callout */}
      <div className="notion-callout border border-[rgba(55,53,47,0.09)]">
        <div className="text-xl shrink-0">⚠️</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-semibold text-sm text-[#37352F]">
                Items at Risk (Holding Shelf Life)
              </div>
              <p className="text-xs text-[#37352F]/60 mt-0.5">
                Holding timers approaching Burger King Gold Standard quality thresholds.
              </p>
            </div>

            <button
              onClick={() => applyKitchenRecommendation()}
              className="self-start sm:self-auto px-2.5 py-1 bg-white border border-[rgba(55,53,47,0.12)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] text-xs font-medium rounded-[3px] transition-colors cursor-pointer"
            >
              Apply Prep Recommendation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {/* Fries Risk Card */}
            <div className="p-3 bg-white rounded-[3px] border border-[rgba(55,53,47,0.09)] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-medium text-xs text-[#37352F]">
                  <span>King French Fries</span>
                  <VegIndicator size={12} />
                </div>
                <div className="text-[11px] text-[#37352F]/60 mt-1">
                  Bin: 8 portions · Value: ₹ 280/-
                </div>
                <div className="mt-1.5 text-xs text-[#D9730D] font-medium">
                  Recommendation: Reduce next batch size by 20%.
                </div>
              </div>
              <span className="notion-tag bg-[#FBE4E4] text-[#E03E3E] text-[10px] shrink-0">
                <Timer className="w-3 h-3 mr-1" /> 6m left
              </span>
            </div>

            {/* Chicken Patties Risk Card */}
            <div className="p-3 bg-white rounded-[3px] border border-[rgba(55,53,47,0.09)] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-medium text-xs text-[#37352F]">
                  <span>Chicken Patties (Fried)</span>
                  <NonVegIndicator size={12} />
                </div>
                <div className="text-[11px] text-[#37352F]/60 mt-1">
                  Bin: 5 patties · Value: ₹ 460/-
                </div>
                <div className="mt-1.5 text-xs text-[#DFAB01] font-medium">
                  Recommendation: Hold fryer drop; utilize buffer.
                </div>
              </div>
              <span className="notion-tag bg-[#FBF3DB] text-[#DFAB01] text-[10px] shrink-0">
                <Timer className="w-3 h-3 mr-1" /> 11m left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SKU Table & Kitchen Timeline Toggle */}
      <div className="bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 border-b border-[rgba(55,53,47,0.06)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#37352F]">SKU Batch Preparation Plan</span>
            <span className="text-xs text-[#37352F]/40">/</span>
            <span className="text-xs text-[#37352F]/50">Calibrated to 30-min demand velocity</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DietFilterToggles dietFilter={dietFilter} setDietFilter={setDietFilter} />

            <div className="inline-flex p-0.5 bg-[rgba(55,53,47,0.06)] rounded-[3px] text-xs">
              <button
                onClick={() => setActiveTab('table')}
                className={`px-2 py-0.5 rounded-[2px] font-medium transition-colors cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-white text-[#37352F] shadow-xs'
                    : 'text-[#37352F]/60 hover:text-[#37352F]'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-2 py-0.5 rounded-[2px] font-medium transition-colors cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-white text-[#37352F] shadow-xs'
                    : 'text-[#37352F]/60 hover:text-[#37352F]'
                }`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px] text-xs">
              <thead>
                <tr className="border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]/60 text-[11px] font-medium text-[#37352F]/60">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3 text-center">Current Ready</th>
                  <th className="py-2.5 px-3 text-center">Next 30m Forecast</th>
                  <th className="py-2.5 px-3 text-center">Recommended Prep</th>
                  <th className="py-2.5 px-3 text-center">Holding Time</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Reasoning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
                {filteredSKUs.map((sku) => {
                  const isPrepare = sku.status === 'Prepare';
                  const isRisk = sku.status === 'At Risk';
                  const isVeg =
                    sku.id.includes('veg') || sku.id.includes('fries') || sku.id.includes('shake');

                  return (
                    <tr key={sku.id} className="hover:bg-[rgba(55,53,47,0.02)] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-medium text-[#37352F]">
                          <span>{sku.name}</span>
                          {isVeg ? <VegIndicator size={12} /> : <NonVegIndicator size={12} />}
                        </div>
                        <span className="text-[11px] text-[#37352F]/40 mt-0.5 block">
                          {sku.category} · ₹{sku.unitPrice}/-
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center font-medium text-[#37352F]">
                        {sku.currentReady}
                      </td>

                      <td className="py-3 px-3 text-center font-medium text-[#D9730D]">
                        {sku.next30mForecast}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span
                          className={`notion-tag text-xs font-semibold ${
                            sku.recommendedPrep > 0
                              ? 'bg-[#FAEBDD] text-[#D9730D]'
                              : 'bg-[#EBECED] text-[#9B9A97]'
                          }`}
                        >
                          {sku.recommendedPrep}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center text-[#37352F]/70">
                        {sku.holdingTimeRemMin}m / {sku.maxHoldingTimeMin}m
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span
                          className={`notion-tag text-[10px] ${
                            isPrepare
                              ? 'bg-[#FBE4E4] text-[#E03E3E]'
                              : isRisk
                              ? 'bg-[#FBF3DB] text-[#DFAB01]'
                              : 'bg-[#EBECED] text-[#9B9A97]'
                          }`}
                        >
                          {sku.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedExplanationSKU(sku)}
                          className="px-2 py-1 rounded-[3px] border border-[rgba(55,53,47,0.12)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] text-xs font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3 h-3 text-[#2383E2]" /> Why?
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
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {kitchenTimelineEvents.map((evt, idx) => (
                <div
                  key={evt.time}
                  className="p-3 rounded-[3px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#37352F]">{evt.time}</span>
                      <span className="notion-tag text-[10px] bg-white text-[#37352F]/60 border border-[rgba(55,53,47,0.09)]">
                        {evt.badge}
                      </span>
                    </div>
                    <h4 className="font-medium text-[#37352F] text-xs">{evt.title}</h4>
                    <p className="text-[11px] text-[#37352F]/60 mt-1 leading-relaxed">{evt.desc}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[rgba(55,53,47,0.06)] text-[10px] text-[#37352F]/40">
                    Step {idx + 1}
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
