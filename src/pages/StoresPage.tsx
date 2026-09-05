import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  ArrowUpDown,
  ArrowRight,
  Filter,
  Search,
  Clock,
  Users,
  TrendingDown
} from 'lucide-react';
import { Store } from '../types';
import { NavTab } from '../components/Sidebar';

interface StoresPageProps {
  setCurrentTab: (tab: NavTab) => void;
}

type SortField = 'opportunity' | 'sales' | 'sssg' | 'labor' | 'sos' | 'hoursSaved';

export const StoresPage: React.FC<StoresPageProps> = ({ setCurrentTab }) => {
  const { stores, selectedStore, setSelectedStoreId, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('opportunity');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAndSortedStores = useMemo(() => {
    return stores
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || s.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === 'opportunity') return b.aiOpportunityWeek - a.aiOpportunityWeek;
        if (sortField === 'sales') return b.dailySalesLakhs - a.dailySalesLakhs;
        if (sortField === 'sssg') return b.sssg - a.sssg;
        if (sortField === 'labor') return a.laborUtil - b.laborUtil;
        if (sortField === 'sos') return a.avgSpeedOfServiceSec - b.avgSpeedOfServiceSec;
        if (sortField === 'hoursSaved') return b.dailyUnproductiveHoursSaved - a.dailyUnproductiveHoursSaved;
        return 0;
      });
  }, [stores, searchTerm, sortField, statusFilter]);

  const handleSelectStore = (store: Store) => {
    setSelectedStoreId(store.id);
    addToast(
      'info',
      `Switched to ${store.name}`,
      `Viewing live shift roster telemetry for ${store.city} restaurant.`
    );
    setCurrentTab('overview');
  };

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1A1A1A] tracking-tight">
              Regional Stores Fleet
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              India Network
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E6E] mt-0.5 font-medium">
            Cross-store labor efficiency benchmark, Speed of Service tracking, and weekly labor savings across hubs.
          </p>
        </div>

        <div className="text-xs text-[#6E6E6E] bg-white px-4 py-2 rounded-xl border border-stone-200">
          Managing Store: <strong className="text-[#1A1A1A]">{selectedStore.name}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search restaurant or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F4F1] border border-stone-200 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85C1A]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs font-bold text-[#6E6E6E]">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter stores by optimization status"
            className="px-3 py-1.5 bg-[#F5F4F1] border border-stone-200 rounded-xl text-xs font-bold text-[#1A1A1A]"
          >
            <option value="all">All Store Statuses</option>
            <option value="optimized">Optimized</option>
            <option value="watch">Watch</option>
            <option value="attention">Attention Needed</option>
          </select>

          <div className="flex items-center gap-1 text-xs font-bold text-[#6E6E6E] ml-2">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </div>

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            aria-label="Sort stores"
            className="px-3 py-1.5 bg-[#F5F4F1] border border-stone-200 rounded-xl text-xs font-bold text-[#1A1A1A]"
          >
            <option value="opportunity">Highest Labor Opportunity</option>
            <option value="sos">Speed of Service (SoS)</option>
            <option value="hoursSaved">Idle Hours Saved</option>
            <option value="sales">Daily Sales Volume</option>
            <option value="labor">Labor Utilization</option>
          </select>
        </div>
      </div>

      {/* Stores Fleet Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#F5F4F1]/60 text-[10px] font-black uppercase tracking-wider text-[#6E6E6E]">
                <th className="py-3 px-4">Restaurant</th>
                <th className="py-3 px-4">Speed of Service</th>
                <th className="py-3 px-4">Labor Utilization</th>
                <th className="py-3 px-4">Unproductive Hours</th>
                <th className="py-3 px-4">Weekly Labor Opportunity</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredAndSortedStores.map((s) => {
                const isSelected = s.id === selectedStore.id;

                return (
                  <tr
                    key={s.id}
                    className={`hover:bg-[#F5F4F1]/50 transition-colors ${
                      isSelected ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    {/* Store details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#5C3320] text-white flex items-center justify-center font-black shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-black text-[#1A1A1A] flex items-center gap-2">
                            <span>{s.name}</span>
                            {isSelected && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E85C1A] text-white font-bold">
                                Active Store
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#6E6E6E]">
                            {s.city} · SSSG {s.sssg > 0 ? `+${s.sssg}%` : `${s.sssg}%`}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Speed of Service */}
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E85C1A]" />
                        <span>{Math.floor(s.avgSpeedOfServiceSec / 60)}m {s.avgSpeedOfServiceSec % 60}s</span>
                      </div>
                    </td>

                    {/* Labor Utilization */}
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#5C3320]" />
                        <span>{s.laborUtil}%</span>
                      </div>
                    </td>

                    {/* Hours saved */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#0E8A3E]">
                        +{s.dailyUnproductiveHoursSaved} hrs / day
                      </span>
                    </td>

                    {/* Opportunity */}
                    <td className="py-3.5 px-4">
                      <div className="font-black font-display text-sm text-[#1A1A1A]">
                        ₹ {(s.aiOpportunityWeek).toLocaleString('en-IN')}/-
                      </div>
                      <span className="text-[10px] text-[#6E6E6E]">projected weekly savings</span>
                    </td>

                    {/* Select Store button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleSelectStore(s)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 mx-auto ${
                          isSelected
                            ? 'bg-[#5C3320] text-white cursor-default'
                            : 'bg-white border border-stone-300 text-[#5C3320] hover:bg-[#5C3320] hover:text-white '
                        }`}
                      >
                        <span>{isSelected ? 'Managing' : 'Select'}</span>
                        {!isSelected && <ArrowRight className="w-3 h-3 text-[#E85C1A]" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
