import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronDown,
  Bell,
  Workflow,
  FileText,
  MapPin,
  Menu,
  ChevronRight,
  Share2,
  Clock,
  Star,
  MoreHorizontal,
  Check,
  TrendingUp
} from 'lucide-react';

interface NavbarProps {
  sidebarCollapsed?: boolean;
  setSidebarCollapsed?: (c: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
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
  const [favorited, setFavorited] = useState<boolean>(false);

  const pendingAlerts = alerts.filter((a) => a.status === 'pending');
  const storeDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-40 bg-white border-b border-[rgba(55,53,47,0.09)] text-[#37352F] font-sans h-11 select-none">
      <div className="w-full px-3 h-full flex items-center justify-between gap-2">
        {/* Left: Sidebar Toggle + Breadcrumb */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-hidden">
          {setSidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              className="p-1 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)] text-[#37352F]/70 hover:text-[#37352F] transition-colors cursor-pointer"
              title="Toggle sidebar (Cmd+\)"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          {/* Breadcrumb Workspace */}
          <div className="flex items-center gap-1 text-[13px] text-[#37352F]/60">
            <span className="text-sm">🍔</span>
            <span className="font-medium text-[#37352F] hidden sm:inline">BK Operations</span>
            <ChevronRight className="w-3 h-3 text-[#37352F]/40" />
          </div>

          {/* Store Switcher Dropdown */}
          <div className="relative" ref={storeDropdownRef}>
            <button
              onClick={() => setStoreMenuOpen(!storeMenuOpen)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)] text-[13px] font-medium text-[#37352F] transition-colors cursor-pointer"
            >
              <span className="truncate max-w-[180px] sm:max-w-[260px]">{selectedStore.name}</span>
              <ChevronDown className="w-3 h-3 text-[#37352F]/50" />
            </button>

            {storeMenuOpen && (
              <div className="absolute left-0 mt-1 w-76 bg-white rounded-[6px] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] border border-[rgba(55,53,47,0.09)] py-1.5 text-[#37352F] z-50 animate-fade-in text-xs">
                <div className="px-3 py-1 text-[11px] font-medium text-[#37352F]/50 uppercase tracking-wider">
                  Switch Store
                </div>
                {stores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStoreId(s.id);
                      setStoreMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[rgba(55,53,47,0.06)] flex items-center justify-between transition-colors cursor-pointer ${
                      s.id === selectedStore.id ? 'bg-[rgba(55,53,47,0.04)] font-medium' : ''
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-medium text-[#37352F]">{s.name}</div>
                      <div className="text-[11px] text-[#37352F]/50">{s.city}</div>
                    </div>
                    <span
                      className={`notion-tag shrink-0 ml-2 ${
                        s.status === 'Optimized'
                          ? 'bg-[#DDEDEA] text-[#0F7B6C]'
                          : s.status === 'Watch'
                          ? 'bg-[#FBF3DB] text-[#DFAB01]'
                          : 'bg-[#FBE4E4] text-[#E03E3E]'
                      }`}
                    >
                      {s.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Notion Style Scenario Segment */}
        <div className="hidden md:flex items-center gap-0.5 bg-[rgba(55,53,47,0.06)] p-0.5 rounded-[4px] text-xs">
          <button
            onClick={() => setScenario('normal')}
            className={`px-2 py-0.5 rounded-[3px] font-medium transition-all cursor-pointer ${
              scenario === 'normal'
                ? 'bg-white text-[#37352F] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                : 'text-[#37352F]/70 hover:text-[#37352F]'
            }`}
          >
            Baseline
          </button>
          <button
            onClick={() => setScenario('spike')}
            className={`px-2 py-0.5 rounded-[3px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
              scenario === 'spike'
                ? 'bg-[#FAEBDD] text-[#D9730D] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                : 'text-[#37352F]/70 hover:text-[#D9730D]'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            <span>Rush +25%</span>
          </button>
          <button
            onClick={() => setScenario('low')}
            className={`px-2 py-0.5 rounded-[3px] font-medium transition-all cursor-pointer ${
              scenario === 'low'
                ? 'bg-[#EBECED] text-[#64473A] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                : 'text-[#37352F]/70 hover:text-[#37352F]'
            }`}
          >
            Dip -25%
          </button>
        </div>

        {/* Right: Actions, Share, Notifications */}
        <div className="flex items-center gap-1 shrink-0 text-xs">
          <button
            onClick={() => setDecisionFlowOpen(true)}
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-[4px] text-[#37352F]/80 hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F] transition-colors cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Decision Loop</span>
          </button>

          <button
            onClick={() => setDataAssumptionsOpen(true)}
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-[4px] text-[#37352F]/80 hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F] transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Telemetry</span>
          </button>

          {/* Favorite Star */}
          <button
            onClick={() => setFavorited(!favorited)}
            className="p-1 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)] text-[#37352F]/60 hover:text-[#37352F] transition-colors cursor-pointer"
            title="Favorite page"
          >
            <Star className={`w-3.5 h-3.5 ${favorited ? 'text-amber-500 fill-amber-500' : ''}`} />
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifDropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-1 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)] text-[#37352F]/70 hover:text-[#37352F] transition-colors cursor-pointer"
              title="Updates & Alerts"
            >
              <Bell className="w-3.5 h-3.5" />
              {pendingAlerts.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#E03E3E] rounded-full ring-1 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-1 w-80 bg-white rounded-[6px] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] border border-[rgba(55,53,47,0.09)] p-3 text-[#37352F] z-50 animate-fade-in text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[rgba(55,53,47,0.09)] font-medium">
                  <span>Updates</span>
                  <span className="text-[11px] text-[#E03E3E]">
                    {pendingAlerts.length} new
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 max-h-72 overflow-y-auto">
                  {pendingAlerts.length === 0 ? (
                    <p className="text-[#37352F]/50 py-3 text-center">All caught up</p>
                  ) : (
                    pendingAlerts.map((alt) => (
                      <div
                        key={alt.id}
                        className="p-2 rounded-[4px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.06)]"
                      >
                        <div className="flex items-center justify-between font-medium">
                          <span>{alt.title}</span>
                          <span className="notion-tag bg-[#FBE4E4] text-[#E03E3E] text-[10px]">
                            {alt.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#37352F]/70 mt-1">{alt.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-1.5 pl-1.5">
            <div className="w-5 h-5 rounded-full bg-[#EBECED] text-[#37352F] font-bold text-[10px] flex items-center justify-center">
              M
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
