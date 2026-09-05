import React from 'react';
import {
  ChevronRight,
  ChevronDown,
  Search,
  Settings,
  Plus,
  HelpCircle,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export type NavTab =
  | 'overview'
  | 'forecast'
  | 'workforce'
  | 'kitchen'
  | 'energy'
  | 'impact'
  | 'stores'
  | 'alerts'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed,
  setCollapsed
}) => {
  const { alerts, scheduleApproved, selectedStore } = useApp();
  const pendingAlertsCount = alerts.filter((a) => a.status === 'pending').length;

  const navPages = [
    { id: 'overview', label: 'Overview', icon: '📊', badge: null },
    { id: 'forecast', label: 'Demand Forecast', icon: '📈', badge: null },
    {
      id: 'workforce',
      label: 'Workforce & Shifts',
      icon: '👥',
      badge: scheduleApproved ? null : '1 Rec'
    },
    { id: 'kitchen', label: 'Kitchen & Holding', icon: '🍳', badge: null },
    { id: 'energy', label: 'Energy & HVAC', icon: '⚡', badge: null },
    { id: 'impact', label: 'Impact & Financials', icon: '💰', badge: null },
    { id: 'stores', label: 'Multi-Store Hub', icon: '🏬', badge: null },
    {
      id: 'alerts',
      label: 'Live Alerts',
      icon: '🔔',
      badge: pendingAlertsCount > 0 ? `${pendingAlertsCount}` : null,
      badgeTag: 'bg-[#FBE4E4] text-[#E03E3E]'
    },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: null }
  ];

  return (
    <aside
      className={`bg-[#F7F6F3] border-r border-[rgba(55,53,47,0.09)] text-[#37352F] select-none transition-all duration-200 flex flex-col justify-between shrink-0 font-sans ${
        collapsed ? 'w-12' : 'w-60'
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Workspace Switcher Header */}
          <div className="px-3 py-2.5 flex items-center justify-between border-b border-[rgba(55,53,47,0.06)]">
            {!collapsed && (
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-[3px] bg-[#37352F] text-white flex items-center justify-center font-bold text-[10px]">
                  BK
                </div>
                <div className="truncate text-xs font-semibold text-[#37352F]">
                  Burger King India
                </div>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)] text-[#37352F]/60 hover:text-[#37352F] transition-colors cursor-pointer ml-auto"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`}
              />
            </button>
          </div>

          {/* Quick Search */}
          {!collapsed && (
            <div className="px-2 pt-2">
              <button
                onClick={() => setCurrentTab('overview')}
                className="w-full flex items-center justify-between px-2 py-1 rounded-[4px] text-xs text-[#37352F]/60 hover:bg-[rgba(55,53,47,0.08)] hover:text-[#37352F] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  <span>Quick Find</span>
                </div>
                <kbd className="text-[10px] bg-[rgba(55,53,47,0.08)] px-1 rounded text-[#37352F]/60 font-mono">
                  ⌘K
                </kbd>
              </button>
            </div>
          )}

          {/* Workspace Pages Navigation */}
          <div className="p-2 space-y-0.5 mt-1">
            {!collapsed && (
              <div className="px-2 py-1 text-[11px] font-medium text-[#37352F]/45 tracking-wider">
                WORKSPACE
              </div>
            )}

            {navPages.map((page) => {
              const isActive = currentTab === page.id;

              return (
                <button
                  key={page.id}
                  onClick={() => setCurrentTab(page.id as NavTab)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-[13px] transition-colors cursor-pointer group ${
                    isActive
                      ? 'bg-[rgba(55,53,47,0.08)] text-[#37352F] font-medium'
                      : 'text-[#37352F]/80 hover:bg-[rgba(55,53,47,0.04)] hover:text-[#37352F]'
                  }`}
                  title={collapsed ? page.label : undefined}
                >
                  <span className="text-sm shrink-0 w-4 text-center">{page.icon}</span>

                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate text-left">{page.label}</span>
                      {page.badge && (
                        <span
                          className={`notion-tag text-[10px] px-1.5 py-0 rounded-[3px] font-medium ${
                            page.badgeTag || 'bg-[#FAEBDD] text-[#D9730D]'
                          }`}
                        >
                          {page.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Sidebar Status */}
        {!collapsed && (
          <div className="p-2 border-t border-[rgba(55,53,47,0.06)]">
            <div className="px-2 py-1.5 rounded-[4px] bg-white border border-[rgba(55,53,47,0.09)] text-xs flex items-center justify-between">
              <div className="truncate">
                <div className="font-medium text-[#37352F] truncate">{selectedStore.name}</div>
                <div className="text-[11px] text-[#37352F]/50">Telemetry synced</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#0F7B6C] shrink-0" title="Connected" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
