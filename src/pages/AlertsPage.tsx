import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  Building2,
  SlidersHorizontal
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, approveAlert, dismissAlert } = useApp();
  const [filter, setFilter] = useState<'all' | 'HIGH' | 'MEDIUM' | 'LOW'>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'all') return true;
    return a.priority === filter;
  });

  const pendingCount = alerts.filter((a) => a.status === 'pending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Notion Page Title & Header */}
      <div className="space-y-2 border-b border-[rgba(55,53,47,0.09)] pb-4">
        <div className="text-4xl mb-1 select-none">🔔</div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">AI Alerts & Exceptions</h1>
            <span className="text-[11px] px-2 py-0.5 rounded-[3px] font-medium bg-[#FFE2DD] text-[#D44040]">
              {pendingCount} Pending
            </span>
          </div>
          <span className="text-xs text-[#37352F]/60">
            Automated operational triggers & exception handling
          </span>
        </div>
      </div>

      {/* Notion Filter View Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(55,53,47,0.09)] pb-2 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-[#37352F]/50 px-1.5 font-medium">Filter by:</span>
          {(['all', 'HIGH', 'MEDIUM', 'LOW'] as const).map((p) => {
            const label = p === 'all' ? `All (${alerts.length})` : `${p} Priority`;
            const isActive = filter === p;
            return (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer text-xs ${
                  isActive
                    ? 'bg-[#37352F] text-white font-medium'
                    : 'text-[#37352F]/70 hover:bg-[rgba(55,53,47,0.06)]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center border border-[rgba(55,53,47,0.09)] rounded-[6px] text-[#37352F]/50">
            <CheckCircle2 className="w-6 h-6 text-[#0F7B6C] mx-auto mb-2" />
            <div className="text-sm font-medium text-[#37352F]">Inbox Zero</div>
            <p className="text-xs text-[#37352F]/60 mt-0.5">No alerts matching current filter criteria.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isHigh = alert.priority === 'HIGH';
            const isMedium = alert.priority === 'MEDIUM';
            const isApproved = alert.status === 'approved';
            const isDismissed = alert.status === 'dismissed';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-[6px] border transition-colors ${
                  isApproved
                    ? 'bg-[#DBEDDB]/20 border-[#0F7B6C]/30 opacity-80'
                    : isDismissed
                    ? 'bg-[#F7F6F3] border-[rgba(55,53,47,0.09)] opacity-60'
                    : 'bg-white border-[rgba(55,53,47,0.09)] hover:border-[rgba(55,53,47,0.25)]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-[3px] font-medium ${
                          isHigh
                            ? 'bg-[#FFE2DD] text-[#D44040]'
                            : isMedium
                            ? 'bg-[#FDECC8] text-[#D9730D]'
                            : 'bg-[#DDEBF1] text-[#0B6E99]'
                        }`}
                      >
                        {alert.priority}
                      </span>

                      <span className="text-xs text-[#37352F]/60 flex items-center gap-1 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-[#37352F]/40" />
                        {alert.storeName}
                      </span>

                      <span className="text-xs text-[#37352F]/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>

                      {isApproved && (
                        <span className="text-[11px] px-2 py-0.5 rounded-[3px] bg-[#DBEDDB] text-[#0F7B6C] flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Approved by Manager
                        </span>
                      )}

                      {isDismissed && (
                        <span className="text-[11px] px-2 py-0.5 rounded-[3px] bg-[rgba(55,53,47,0.08)] text-[#37352F]/60 font-medium">
                          Dismissed
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-[#37352F]">{alert.title}</h3>
                    <p className="text-xs text-[#37352F]/70 leading-relaxed">{alert.description}</p>

                    {/* Recommended Action Callout */}
                    <div className="p-3 bg-[#F7F6F3] rounded-[4px] border border-[rgba(55,53,47,0.09)] text-xs">
                      <div className="text-[11px] font-medium text-[#D9730D] flex items-center gap-1.5 mb-1">
                        <SlidersHorizontal className="w-3 h-3" /> Recommended Action
                      </div>
                      <div className="text-[#37352F] font-normal">{alert.recommendedAction}</div>
                      {alert.metricImpact && (
                        <div className="text-[11px] text-[#0F7B6C] font-medium mt-1">
                          Projected impact: {alert.metricImpact}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!isApproved && !isDismissed && (
                    <div className="flex sm:flex-col gap-2 shrink-0 justify-center">
                      <button
                        onClick={() => approveAlert(alert.id)}
                        className="px-3 py-1.5 bg-[#2383E2] hover:bg-[#1B6FC2] text-white text-xs font-medium rounded-[3px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-3 py-1.5 bg-white border border-[rgba(55,53,47,0.16)] hover:bg-[rgba(55,53,47,0.06)] text-[#37352F] text-xs font-medium rounded-[3px] transition-colors cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
