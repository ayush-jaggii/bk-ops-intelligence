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
    <div className="p-4 bg-white rounded-[4px] border border-[rgba(55,53,47,0.09)] hover:bg-[rgba(55,53,47,0.02)] transition-colors select-none font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#37352F]/60 font-medium">
          <Icon className="w-3.5 h-3.5 text-[#37352F]/50" />
          <span>{title}</span>
        </div>
      </div>

      <div className="mt-2 text-2xl font-semibold text-[#37352F] tracking-tight">
        {value}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[rgba(55,53,47,0.06)]">
        <span
          className={`notion-tag text-[11px] ${
            isGood
              ? 'bg-[#DDEDEA] text-[#0F7B6C]'
              : 'bg-[#FBE4E4] text-[#E03E3E]'
          }`}
        >
          {isGood ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change}
        </span>
        <span className="text-[11px] text-[#37352F]/40 font-normal">vs target</span>
      </div>

      {subtext && (
        <p className="text-[11px] text-[#37352F]/50 mt-1.5 font-normal">
          {subtext}
        </p>
      )}
    </div>
  );
};
