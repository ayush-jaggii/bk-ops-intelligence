import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  isPositiveChange?: boolean;
  reverseColor?: boolean; // for waste loss where reduction is good
  icon: LucideIcon;
  subtext?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositiveChange = true,
  reverseColor = false,
  icon: Icon,
  subtext
}) => {
  const isGood = reverseColor ? !isPositiveChange : isPositiveChange;

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200/80 transition-all duration-200 relative overflow-hidden group font-ui">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] block font-ui">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] mt-1.5 tracking-tight">
            {value}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F5F4F1] border border-stone-200 flex items-center justify-center text-[#E85C1A] group-hover:scale-105 transition-transform ">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between text-xs pt-3 border-t border-stone-100">
        <div
          className={`flex items-center gap-1 font-extrabold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider ${
            isGood
              ? 'bg-emerald-50 text-[#0E8A3E] border border-emerald-200'
              : 'bg-amber-50 text-amber-900 border border-amber-200'
          }`}
        >
          {isGood ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{change}</span>
        </div>
        <span className="text-[10px] text-[#6E6E6E] font-semibold uppercase tracking-wider">vs Forecast</span>
      </div>

      {subtext && <p className="text-[11px] text-[#6E6E6E] mt-1.5 font-medium">{subtext}</p>}
    </div>
  );
};
