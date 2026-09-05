import React from 'react';

interface FoodIndicatorProps {
  size?: number;
  className?: string;
}

export const VegIndicator: React.FC<FoodIndicatorProps> = ({ size = 16, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center border border-[#0E8A3E] rounded-[3px] bg-white ${className}`}
      style={{ width: size, height: size }}
      title="100% Vegetarian (FSSAI Certified)"
    >
      <span
        className="rounded-full bg-[#0E8A3E]"
        style={{ width: size * 0.46, height: size * 0.46 }}
      />
    </span>
  );
};

export const NonVegIndicator: React.FC<FoodIndicatorProps> = ({ size = 16, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center border border-[#7A1F1F] rounded-[3px] bg-white ${className}`}
      style={{ width: size, height: size }}
      title="Non-Vegetarian (FSSAI Certified)"
    >
      <span
        className="inline-block border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-[#7A1F1F]"
        style={{ width: 0, height: 0 }}
      />
    </span>
  );
};

interface DietFilterProps {
  dietFilter: 'all' | 'veg' | 'nonveg';
  setDietFilter: (filter: 'all' | 'veg' | 'nonveg') => void;
}

export const DietFilterToggles: React.FC<DietFilterProps> = ({
  dietFilter,
  setDietFilter
}) => {
  return (
    <div className="inline-flex items-center gap-2">
      {/* Veg Only Toggle */}
      <button
        onClick={() => setDietFilter(dietFilter === 'veg' ? 'all' : 'veg')}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-ui transition-all border cursor-pointer ${
          dietFilter === 'veg'
            ? 'bg-emerald-50 border-[#0E8A3E] text-[#0E8A3E] ring-1 ring-[#0E8A3E]'
            : 'bg-white border-stone-300 text-[#5C3320] hover:border-stone-400'
        }`}
      >
        <VegIndicator size={14} />
        <span className="uppercase text-[11px] tracking-wider">VEG ONLY</span>
      </button>

      {/* Non-Veg Toggle */}
      <button
        onClick={() => setDietFilter(dietFilter === 'nonveg' ? 'all' : 'nonveg')}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-ui transition-all border cursor-pointer ${
          dietFilter === 'nonveg'
            ? 'bg-red-50 border-[#7A1F1F] text-[#7A1F1F] ring-1 ring-[#7A1F1F]'
            : 'bg-white border-stone-300 text-[#5C3320] hover:border-stone-400'
        }`}
      >
        <NonVegIndicator size={14} />
        <span className="uppercase text-[11px] tracking-wider">NON-VEG</span>
      </button>
    </div>
  );
};
