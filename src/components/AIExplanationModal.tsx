import React from 'react';
import { useApp } from '../context/AppContext';
import { VegIndicator, NonVegIndicator } from './FoodIndicators';
import { X, HelpCircle, Check, Info, ArrowRight, ShieldCheck } from 'lucide-react';

export const AIExplanationModal: React.FC = () => {
  const { selectedExplanationSKU, setSelectedExplanationSKU, applyKitchenRecommendation } = useApp();

  if (!selectedExplanationSKU) return null;

  const isVeg =
    selectedExplanationSKU.id.includes('veg') ||
    selectedExplanationSKU.id.includes('fries') ||
    selectedExplanationSKU.id.includes('shake');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in">
      <div className="bg-white rounded-[6px] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] max-w-md w-full border border-[rgba(55,53,47,0.09)] overflow-hidden">
        {/* Header */}
        <div className="p-3.5 bg-[#F7F6F3] border-b border-[rgba(55,53,47,0.09)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <div>
              <span className="text-[10px] font-medium text-[#D9730D] block">
                Explainable AI Rationale
              </span>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-semibold text-[#37352F]">
                  {selectedExplanationSKU.name}
                </h3>
                {isVeg ? <VegIndicator size={12} /> : <NonVegIndicator size={12} />}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedExplanationSKU(null)}
            className="text-[#37352F]/50 hover:text-[#37352F] p-1 rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 text-xs">
          <div className="p-3 rounded-[4px] bg-[#FDECC8]/40 border border-[#D9730D]/20">
            <div className="text-[11px] font-medium text-[#D9730D] mb-0.5">
              Recommendation
            </div>
            <p className="text-xs font-semibold text-[#37352F]">
              {selectedExplanationSKU.status === 'Prepare'
                ? `Prepare ${selectedExplanationSKU.recommendedPrep} units now (${Math.ceil(
                    selectedExplanationSKU.recommendedPrep / selectedExplanationSKU.batchSize
                  )} batch drops).`
                : selectedExplanationSKU.status === 'At Risk'
                ? `Immediate Batch Size Reduction: Reduce next drop size by 20%.`
                : `Hold preparation: Current ready inventory is sufficient.`}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-medium text-[#37352F]/50">
              Underlying Determinants & Signals
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2.5 rounded-[4px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)]">
                <strong className="text-[#37352F] block font-medium">Forecast Demand Velocity</strong>
                <p className="text-[#37352F]/70 mt-0.5">
                  Next 30m expected demand is {selectedExplanationSKU.next30mForecast} units vs current ready inventory of{' '}
                  {selectedExplanationSKU.currentReady}.
                </p>
              </div>

              <div className="p-2.5 rounded-[4px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)]">
                <strong className="text-[#37352F] block font-medium">Holding Shelf Life Constraint</strong>
                <p className="text-[#37352F]/70 mt-0.5">
                  Maximum holding time is {selectedExplanationSKU.maxHoldingTimeMin} mins. Prevents shelf expiry while guaranteeing temperature integrity.
                </p>
              </div>

              <div className="p-2.5 rounded-[4px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)]">
                <strong className="text-[#37352F] block font-medium">Day-of-Week & Promo Multiplier</strong>
                <p className="text-[#37352F]/70 mt-0.5">{selectedExplanationSKU.whyExplanation}</p>
              </div>
            </div>
          </div>

          {/* Safety note */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#37352F]/50 pt-2 border-t border-[rgba(55,53,47,0.06)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Complies with Burger King India Gold Standard Food Safety & HACCP rules.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F6F3] border-t border-[rgba(55,53,47,0.09)] flex items-center justify-between">
          <button
            onClick={() => setSelectedExplanationSKU(null)}
            className="px-2.5 py-1 text-xs text-[#37352F]/70 hover:text-[#37352F] rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors"
          >
            Dismiss
          </button>
          {selectedExplanationSKU.recommendedPrep > 0 && (
            <button
              onClick={() => {
                applyKitchenRecommendation(selectedExplanationSKU.id);
                setSelectedExplanationSKU(null);
              }}
              className="px-3 py-1.5 bg-[#2383E2] hover:bg-[#1B6FC2] text-white text-xs font-medium rounded-[3px] transition-colors flex items-center gap-1 cursor-pointer"
            >
              Apply Prep <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
