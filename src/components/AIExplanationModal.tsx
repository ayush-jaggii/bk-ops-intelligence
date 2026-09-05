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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-ui">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#F5F4F1] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E85C1A]/10 flex items-center justify-center text-[#E85C1A]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E85C1A] block font-ui">
                Explainable AI Rationale
              </span>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-display text-[#1A1A1A]">
                  {selectedExplanationSKU.name}.
                </h3>
                {isVeg ? <VegIndicator size={14} /> : <NonVegIndicator size={14} />}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedExplanationSKU(null)}
            className="text-[#6E6E6E] hover:text-[#1A1A1A] p-1.5 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5 font-ui">
              <Info className="w-4 h-4 text-amber-700" />
              Core AI Recommendation
            </h4>
            <p className="text-sm font-black font-display text-[#1A1A1A]">
              {selectedExplanationSKU.status === 'Prepare'
                ? `Prepare ${selectedExplanationSKU.recommendedPrep} units now (${Math.ceil(
                    selectedExplanationSKU.recommendedPrep / selectedExplanationSKU.batchSize
                  )} batch drops).`
                : selectedExplanationSKU.status === 'At Risk'
                ? `Immediate Batch Size Reduction: Reduce next drop size by 20%.`
                : `Hold preparation: Current ready inventory is sufficient.`}
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-[#6E6E6E]">
              Underlying Determinants & Telemetry Signals:
            </h5>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F4F1] border border-stone-200">
                <Check className="w-4 h-4 text-[#0E8A3E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block font-bold">Forecast Demand Velocity</strong>
                  <p className="text-[#6E6E6E]">
                    Next 30m expected demand is {selectedExplanationSKU.next30mForecast} units vs current ready inventory of{' '}
                    {selectedExplanationSKU.currentReady}.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F4F1] border border-stone-200">
                <Check className="w-4 h-4 text-[#0E8A3E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block font-bold">Holding Shelf Life Constraint</strong>
                  <p className="text-[#6E6E6E]">
                    Maximum holding time is {selectedExplanationSKU.maxHoldingTimeMin} mins. Calibrated to prevent shelf expiry while guaranteeing hot, fresh service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F4F1] border border-stone-200">
                <Check className="w-4 h-4 text-[#0E8A3E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block font-bold">Day-of-Week & Promo Multiplier</strong>
                  <p className="text-[#6E6E6E]">{selectedExplanationSKU.whyExplanation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety note */}
          <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] pt-2 border-t border-stone-100">
            <ShieldCheck className="w-4 h-4 text-[#0E8A3E]" />
            <span>Complies with Burger King India Gold Standard Food Safety & HACCP rules.</span>
          </div>
        </div>

        {/* Footer in Burger King India Pill Button style */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={() => setSelectedExplanationSKU(null)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6E6E6E] hover:text-[#1A1A1A] rounded-full hover:bg-stone-200 transition-colors"
          >
            Dismiss
          </button>
          {selectedExplanationSKU.recommendedPrep > 0 && (
            <button
              onClick={() => {
                applyKitchenRecommendation(selectedExplanationSKU.id);
                setSelectedExplanationSKU(null);
              }}
              className="px-6 py-2.5 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Apply Prep <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
