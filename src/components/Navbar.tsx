import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import {
  ChevronDown,
  Bell,
  TrendingUp,
  Workflow,
  FileText,
  MapPin,
  Clock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    stores,
    selectedStore,
    setSelectedStoreId,
    scenario,
    setScenario,
    alerts,
    setDataAssumptionsOpen,
    setDecisionFlowOpen,
    scheduleApproved
  } = useApp();

  const [storeMenuOpen, setStoreMenuOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const pendingAlerts = alerts.filter((a) => a.status === 'pending');
  const storeDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (storeDropdownRef.current && !storeDropdownRef.current.contains(event.target as Node)) {
        setStoreMenuOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 shadow-xs font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Mark + Name */}
        <div className="flex items-center gap-3 shrink-0">
          <BurgerKingLogo size={40} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black font-display text-[#1A1A1A] tracking-tight leading-none">
                BK Shift Scheduler.
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#0E8A3E] border border-emerald-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A3E] animate-pulse"></span>
                {scheduleApproved ? '5-Day Advance Synced' : 'Demand-Responsive'}
              </span>
            </div>
            <span className="hidden lg:block text-[10px] font-semibold text-[#6E6E6E] mt-0.5 font-ui">
              Demand-Aligned Roster & Station Synchronization
            </span>
          </div>
        </div>

        {/* Center: Store Selector + Simulator Segmented Control */}
        <div className="hidden md:flex items-center gap-3">
          {/* Store Selector Button */}
          <div className="relative" ref={storeDropdownRef}>
            <button
              onClick={() => setStoreMenuOpen(!storeMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F5F4F1] hover:bg-stone-200/60 border border-stone-200/80 rounded-full text-xs font-bold text-[#5C3320] transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E85C1A]" />
              <span className="max-w-[170px] truncate">{selectedStore.name}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {storeMenuOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 text-stone-800 z-50 animate-fade-in">
                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] border-b border-stone-100">
                  Select Store
                </div>
                {stores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStoreId(s.id);
                      setStoreMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-[#F5F4F1] flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      s.id === selectedStore.id
                        ? 'bg-amber-50/80 font-bold text-[#E85C1A]'
                        : 'text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#1A1A1A]">{s.name}</div>
                      <div className="text-[11px] text-[#6E6E6E]">
                        {s.city} · SSSG {s.sssg > 0 ? `+${s.sssg}%` : `${s.sssg}%`}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.status === 'Optimized'
                          ? 'bg-emerald-100 text-[#0E8A3E]'
                          : s.status === 'Watch'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-[#7A1F1F]'
                      }`}
                    >
                      {s.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean Segmented Scenario Switcher */}
          <div className="flex items-center bg-[#F5F4F1] p-0.5 rounded-full border border-stone-200/80 text-xs font-bold">
            <button
              onClick={() => setScenario('normal')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                scenario === 'normal'
                  ? 'bg-white text-[#5C3320] shadow-xs'
                  : 'text-[#6E6E6E] hover:text-[#1A1A1A]'
              }`}
            >
              Baseline
            </button>
            <button
              onClick={() => setScenario('spike')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                scenario === 'spike'
                  ? 'bg-[#E85C1A] text-white shadow-xs'
                  : 'text-[#6E6E6E] hover:text-[#E85C1A]'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Rush +25%</span>
            </button>
            <button
              onClick={() => setScenario('low')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                scenario === 'low'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[#6E6E6E] hover:text-amber-800'
              }`}
            >
              Dip -25%
            </button>
          </div>
        </div>

        {/* Right: Quick actions, notifications, profile */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDecisionFlowOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#5C3320] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-[#E85C1A]" />
            <span>Decision Loop</span>
          </button>

          <button
            onClick={() => setDataAssumptionsOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#5C3320] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#E85C1A]" />
            <span>Telemetry</span>
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifDropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-full hover:bg-[#F5F4F1] text-[#5C3320] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingAlerts.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#E85C1A] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                  {pendingAlerts.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 text-stone-800 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                    Operational Alerts
                  </span>
                  <span className="text-[10px] font-bold text-[#E85C1A]">
                    {pendingAlerts.length} Action Needed
                  </span>
                </div>
                <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                  {pendingAlerts.length === 0 ? (
                    <p className="text-xs text-stone-400 py-3 text-center">No pending alerts</p>
                  ) : (
                    pendingAlerts.map((alt) => (
                      <div key={alt.id} className="p-2.5 rounded-xl bg-[#F5F4F1] border border-stone-200/80 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1A1A]">{alt.title}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-[#7A1F1F]">
                            {alt.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E6E6E] mt-1 line-clamp-2">{alt.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Duty Manager Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200/80">
            <div className="w-8 h-8 rounded-full bg-[#5C3320] text-white font-black text-xs flex items-center justify-center font-display shadow-xs">
              SM
            </div>
            <div className="hidden xl:block text-left leading-tight">
              <div className="text-xs font-bold text-[#1A1A1A]">Manager #402</div>
              <div className="text-[10px] text-[#6E6E6E]">Duty Lead</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
