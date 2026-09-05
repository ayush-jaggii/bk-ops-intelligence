import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  ArrowUpDown,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { Store } from '../types';
import { NavTab } from '../components/Sidebar';

interface StoresPageProps {
  setCurrentTab: (tab: NavTab) => void;
}

type SortField = 'opportunity' | 'sales' | 'sssg' | 'labor' | 'kitchen' | 'energy';

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
        if (sortField === 'kitchen') return a.kitchenUtil - b.kitchenUtil;
        if (sortField === 'energy') return a.energyEfficiency - b.energyEfficiency;
        return 0;
      });
  }, [stores, searchTerm, sortField, statusFilter]);

  const handleSelectStore = (store: Store) => {
    setSelectedStoreId(store.id);
    addToast(
      'info',
      `Switched to ${store.name}`,
      `Viewing live operational telemetry for ${store.city} restaurant.`
    );
    setCurrentTab('overview');
  };

  return (
    <div className="space-y-6 pb-12 font-ui">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-[#1A1A1A] tracking-tight">
              Regional Stores Fleet.
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              India Network
            </span>
          </div>
          <p className="text-sm text-[#6E6E6E] mt-1 font-medium">
            Cross-store operations performance benchmark and AI opportunity ranking across active hubs.
          </p>
        </div>

        <div className="text-xs text-[#6E6E6E] bg-white px-4 py-2 rounded-full border border-stone-200">
          Managing Store: <strong className="text-[#1A1A1A]">{selectedStore.name}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search restaurant or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F4F1] border border-stone-200 rounded-full text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85C1A]"
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
            aria-label="Filter stores by status"
            className="px-3 py-1.5 bg-[#F5F4F1] border border-stone-200 rounded-full text-xs font-bold text-[#1A1A1A]"
          >
            <option value="all">All Statuses</option>
            <option value="optimized">Optimized</option>
            <option value="watch">Watch</option>
            <option value="attention">Attention</option>
          </select>

          <div className="flex items-center gap-1 text-xs font-bold text-[#6E6E6E] ml-2">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort By:
          </div>

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            aria-label="Sort stores by metric"
            className="px-3 py-1.5 bg-[#F5F4F1] border border-stone-200 rounded-full text-xs font-bold text-[#1A1A1A]"
          >
            <option value="opportunity">Highest Opportunity (₹/week)</option>
            <option value="sales">Daily Sales Volume</option>
            <option value="sssg">Highest SSSG</option>
            <option value="labor">Labor Inefficiency</option>
            <option value="kitchen">Kitchen Inefficiency</option>
            <option value="energy">Energy Opportunity</option>
          </select>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#F5F4F1]/70 text-[11px] font-black uppercase tracking-wider text-[#6E6E6E] font-ui">
                <th className="py-4 px-4">Restaurant Store</th>
                <th className="py-4 px-3 text-center">Daily Sales</th>
                <th className="py-4 px-3 text-center">SSSG</th>
                <th className="py-4 px-3 text-center">Labor Util</th>
                <th className="py-4 px-3 text-center">Kitchen Util</th>
                <th className="py-4 px-3 text-center">Energy Eff</th>
                <th className="py-4 px-3 text-center">AI Opportunity</th>
                <th className="py-4 px-3 text-center">Status</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredAndSortedStores.map((store) => {
                const isSelected = store.id === selectedStore.id;

                return (
                  <tr
                    key={store.id}
                    className={`hover:bg-[#F5F4F1]/80 transition-colors ${
                      isSelected ? 'bg-amber-50/50' : ''
                    }`}
                  >
                    {/* Store info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs ${
                            isSelected
                              ? 'bg-[#E85C1A] text-white shadow-xs'
                              : 'bg-stone-100 text-[#5C3320]'
                          }`}
                        >
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-black font-display text-sm text-[#1A1A1A] flex items-center gap-1.5">
                            <span>{store.name}.</span>
                            {isSelected && (
                              <span className="text-[9px] font-black font-ui uppercase px-2 py-0.5 rounded-full bg-[#5C3320] text-white">
                                Active
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6E6E6E] font-medium font-ui">
                            {store.city} · {store.ordersCount} orders today
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Sales */}
                    <td className="py-4 px-3 text-center font-black font-display text-[#1A1A1A] text-base">
                      ₹ {store.dailySalesLakhs}L/-
                    </td>

                    {/* SSSG */}
                    <td className="py-4 px-3 text-center">
                      <span className="font-black text-[#0E8A3E] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        +{store.sssg}%
                      </span>
                    </td>

                    {/* Labor */}
                    <td className="py-4 px-3 text-center font-bold text-stone-700">
                      {store.laborUtil}%
                    </td>

                    {/* Kitchen */}
                    <td className="py-4 px-3 text-center font-bold text-stone-700">
                      {store.kitchenUtil}%
                    </td>

                    {/* Energy */}
                    <td className="py-4 px-3 text-center font-bold text-stone-700">
                      {store.energyEfficiency}%
                    </td>

                    {/* Opportunity */}
                    <td className="py-4 px-3 text-center">
                      <span className="font-black font-display text-[#E85C1A] text-base">
                        ₹ {store.aiOpportunityWeek.toLocaleString('en-IN')}/- wk
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          store.status === 'Optimized'
                            ? 'bg-emerald-100 text-[#0E8A3E] border border-emerald-200'
                            : store.status === 'Watch'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-red-100 text-[#7A1F1F] border border-red-200'
                        }`}
                      >
                        {store.status}
                      </span>
                    </td>

                    {/* Action button */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleSelectStore(store)}
                        className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-[#5C3320] text-white shadow-xs'
                            : 'bg-white border-2 border-[#5C3320] text-[#5C3320] hover:bg-[#5C3320] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Viewing' : 'Open Store'} <ArrowRight className="w-3.5 h-3.5" />
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
