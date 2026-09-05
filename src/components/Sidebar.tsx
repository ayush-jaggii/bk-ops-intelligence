import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  PieChart,
  Building2,
  BellRing,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export type NavTab =
  | 'overview'
  | 'workforce'
  | 'forecast'
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

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard, badge: null },
    {
      id: 'workforce',
      label: 'Shift & Roster',
      icon: Users,
      badge: scheduleApproved ? null : 'Micro-Shifts'
    },
    { id: 'forecast', label: 'Demand Signals', icon: TrendingUp, badge: null },
    { id: 'impact', label: 'Labor Budget & ROI', icon: PieChart, badge: null },
    { id: 'stores', label: 'Stores Fleet', icon: Building2, badge: null },
    {
      id: 'alerts',
      label: 'Shift Alerts',
      icon: BellRing,
      badge: pendingAlertsCount > 0 ? `${pendingAlertsCount}` : null,
      badgeColor: 'bg-[#E85C1A] text-white'
    },
    { id: 'settings', label: 'Scheduling Rules', icon: Sliders, badge: null }
  ];

  return (
    <aside
      className={`bg-white border-r border-[#E5E4E0] transition-all duration-300 flex flex-col justify-between shrink-0 z-30 font-ui ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Toggle Collapse */}
        <div className="p-3 border-b border-stone-100 flex items-center justify-between">
          {!collapsed && (
            <span className="text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] pl-2">
              Operations Console
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-[#6E6E6E] hover:text-[#1A1A1A] hover:bg-[#F5F4F1] transition-colors ml-auto cursor-pointer"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="p-2 space-y-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id as NavTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-colors group cursor-pointer ${
                  isActive
                    ? 'bg-[#5C3320] text-white font-black'
                    : 'text-[#6E6E6E] hover:bg-stone-100 hover:text-[#1A1A1A] font-semibold'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#F5A827]' : 'text-stone-400 group-hover:text-[#5C3320]'
                  }`}
                />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-left tracking-wide">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-stone-200 text-[#5C3320]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Store Status */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-xl bg-[#F5F4F1] border border-stone-200/80 text-[11px]">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-[#1A1A1A] truncate max-w-[130px]">{selectedStore.name}</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-[#0E8A3E] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A3E] animate-pulse"></span>
              Live
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
