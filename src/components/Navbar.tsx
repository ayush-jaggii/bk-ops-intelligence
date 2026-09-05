import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BurgerKingLogo } from './BurgerKingLogo';
import { VegIndicator, NonVegIndicator } from './FoodIndicators';
import {
  ChevronDown,
  Calendar,
  Bell,
  Zap,
  TrendingUp,
  RotateCcw,
  Workflow,
  FileText,
  Store as StoreIcon,
  MapPin
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
    setDecisionFlowOpen
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E4E0] shadow-xs">
      {/* Top Utility Bar: Enterprise Network & Operations Links */}
      <div className="bg-[#5C3320] px-4 py-1.5 text-[11px] font-ui font-semibold flex items-center justify-between text-[#F5F4F1]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E85C1A] animate-pulse"></span>
          <span className="font-bold tracking-wide uppercase text-[10px]">
            BURGER KING INDIA · INTERNAL OPS INTELLIGENCE
          </span>
          <span className="hidden md:inline text-stone-300 font-normal">
            | Live Store Operations Network · Active Telemetry
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDecisionFlowOpen(true)}
            className="flex items-center gap-1.5 text-[#F5F4F1] hover:text-[#E85C1A] transition-colors cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-[#E85C1A]" />
            <span className="underline uppercase tracking-wider text-[10px] font-bold">Decision Loop</span>
          </button>
          <button
            onClick={() => setDataAssumptionsOpen(true)}
            className="flex items-center gap-1.5 text-[#F5F4F1] hover:text-[#E85C1A] transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#E85C1A]" />
            <span className="underline uppercase tracking-wider text-[10px] font-bold">Telemetry Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Burger King White Header Band (~90px height) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Left: Official Burger King Logo + Brand Mark */}
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 transition-transform hover:scale-105">
            <BurgerKingLogo size={52} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-display text-[#1A1A1A] tracking-tight leading-none">
                BK Ops Intelligence.
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black font-ui uppercase tracking-wider bg-[#5C3320] text-[#F5F4F1] shadow-xs">
                ENTERPRISE v2.4
              </span>
            </div>
            <p className="text-[12px] text-[#6E6E6E] font-ui font-medium leading-tight mt-1">
              Store Resource & Demand Optimization Platform
            </p>
          </div>
        </div>

        {/* Center: Store Selector & India FSSAI Markers */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Store Selector Button */}
          <div className="relative" ref={storeDropdownRef}>
            <button
              onClick={() => setStoreMenuOpen(!storeMenuOpen)}
              className="flex items-center gap-2.5 px-3.5 py-2 bg-[#F5F4F1] hover:bg-[#eae8e3] border border-stone-200 rounded-full text-xs font-bold font-ui text-[#5C3320] transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E85C1A]" />
              <span className="max-w-[200px] truncate font-extrabold uppercase tracking-wider text-[11px]">
                {selectedStore.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {storeMenuOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 text-stone-800 z-50 animate-fade-in">
                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] border-b border-stone-100">
                  Select Burger King India Store
                </div>
                {stores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStoreId(s.id);
                      setStoreMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-[#F5F4F1] flex items-center justify-between text-xs transition-colors cursor-pointer ${
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
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
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

          {/* Date Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F4F1] border border-stone-200 rounded-full text-xs font-bold font-ui text-[#5C3320]">
            <Calendar className="w-3.5 h-3.5 text-[#E85C1A]" />
            <span className="uppercase text-[11px] tracking-wider">TUE, 5 SEP</span>
          </div>

          {/* FSSAI Verified Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-full">
            <VegIndicator size={12} />
            <NonVegIndicator size={12} />
            <span className="text-[10px] font-bold text-[#6E6E6E] uppercase tracking-wider">
              FSSAI Gold Standard
            </span>
          </div>
        </div>

        {/* Right: Notifications, Duty Manager */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative" ref={notifDropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-full bg-[#F5F4F1] hover:bg-[#eae8e3] text-[#5C3320] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E85C1A] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                  {pendingAlerts.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 text-stone-800 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                  <span className="text-xs font-black font-display text-[#1A1A1A]">Operational Alerts</span>
                  <span className="text-[10px] bg-red-100 text-[#7A1F1F] font-bold px-2 py-0.5 rounded-full">
                    {pendingAlerts.length} Pending
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {pendingAlerts.length === 0 ? (
                    <div className="text-center py-4 text-xs text-[#6E6E6E]">All alerts reviewed!</div>
                  ) : (
                    pendingAlerts.map((alt) => (
                      <div key={alt.id} className="p-2.5 rounded-xl bg-[#F5F4F1] border border-stone-200 text-xs">
                        <div className="flex items-center justify-between font-bold text-[#1A1A1A]">
                          <span className="truncate max-w-[170px]">{alt.title}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                              alt.priority === 'HIGH'
                                ? 'bg-[#7A1F1F] text-white'
                                : alt.priority === 'MEDIUM'
                                ? 'bg-amber-500 text-white'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            {alt.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E6E6E] mt-1 line-clamp-2">{alt.description}</p>
                        <div className="text-[10px] text-stone-400 mt-1 flex justify-between">
                          <span>{alt.storeName}</span>
                          <span>{alt.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Duty Manager Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="w-9 h-9 rounded-full bg-[#5C3320] text-white font-black text-xs flex items-center justify-center font-display shadow-xs">
              SM
            </div>
            <div className="hidden xl:block text-left leading-tight">
              <div className="text-xs font-bold text-[#1A1A1A] font-ui">Manager #402</div>
              <div className="text-[10px] text-[#6E6E6E]">Duty Officer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Strip below White Header Band */}
      <div className="bg-[#F5F4F1] px-4 py-2 border-t border-[#E5E4E0]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-ui">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E85C1A] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" /> Interactive AI Simulator:
            </span>
            <span className="text-[11px] text-[#6E6E6E] hidden md:inline">
              Simulate dynamic footfall and demand velocity shifts:
            </span>
          </div>

          <div className="flex items-center gap-2 font-ui">
            {/* Baseline button */}
            <button
              onClick={() => setScenario('normal')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                scenario === 'normal'
                  ? 'bg-[#5C3320] text-white border-[#5C3320] shadow-xs'
                  : 'bg-white text-[#5C3320] border-stone-300 hover:border-[#5C3320]'
              }`}
            >
              <RotateCcw className="w-3 h-3" /> Baseline
            </button>

            {/* Demand Spike button */}
            <button
              onClick={() => setScenario('spike')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                scenario === 'spike'
                  ? 'bg-[#E85C1A] text-white border-[#E85C1A] shadow-md ring-2 ring-orange-200'
                  : 'bg-white text-[#E85C1A] border-[#E85C1A]/40 hover:bg-orange-50'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Demand Spike (+25%)</span>
            </button>

            {/* Low Demand button */}
            <button
              onClick={() => setScenario('low')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                scenario === 'low'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-200'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>Low Demand (-25%)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
