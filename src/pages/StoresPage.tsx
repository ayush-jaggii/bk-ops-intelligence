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
    <div className="space-y-6 pb-12">
      {/* Notion Page Header */}
      <div className="space-y-2 border-b border-[rgba(55,53,47,0.09)] pb-4">
        <div className="text-4xl mb-1 select-none">🏬</div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">Store Network</h1>
            <p className="text-xs text-[#37352F]/60 mt-0.5">
              Regional restaurant operations benchmark and AI optimization potential across India hubs
            </p>
          </div>
          <div className="text-xs text-[#37352F]/60">
            Selected: <strong className="text-[#37352F]">{selectedStore.name}</strong>
          </div>
        </div>
      </div>

      {/* Notion Database Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(55,53,47,0.09)] pb-2 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-[#37352F]/40 shrink-0" />
          <input
            type="text"
            placeholder="Filter by store or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-[#37352F] placeholder-[#37352F]/40 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-[#37352F]/50">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-[#37352F] font-medium outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="optimized">Optimized</option>
              <option value="watch">Watch</option>
              <option value="attention">Attention</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[#37352F]/50">Sort:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="bg-transparent text-xs text-[#37352F] font-medium outline-none cursor-pointer"
            >
              <option value="opportunity">Opportunity (₹/wk)</option>
              <option value="sales">Daily Sales</option>
              <option value="sssg">SSSG</option>
              <option value="labor">Labor Util</option>
              <option value="kitchen">Kitchen Util</option>
              <option value="energy">Energy Eff</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notion Database Table View */}
      <div className="border border-[rgba(55,53,47,0.09)] rounded-[4px] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]/50 text-[#37352F]/60 text-[11px] font-medium">
                <th className="py-2 px-3">Restaurant Store</th>
                <th className="py-2 px-3 text-center">Daily Sales</th>
                <th className="py-2 px-3 text-center">SSSG</th>
                <th className="py-2 px-3 text-center">Labor Util</th>
                <th className="py-2 px-3 text-center">Kitchen Util</th>
                <th className="py-2 px-3 text-center">Energy Eff</th>
                <th className="py-2 px-3 text-center">AI Opportunity</th>
                <th className="py-2 px-3 text-center">Status</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(55,53,47,0.06)]">
              {filteredAndSortedStores.map((store) => {
                const isSelected = store.id === selectedStore.id;

                return (
                  <tr
                    key={store.id}
                    className={`hover:bg-[rgba(55,53,47,0.04)] transition-colors ${
                      isSelected ? 'bg-[#F7F6F3]' : ''
                    }`}
                  >
                    {/* Store info */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base shrink-0">🏪</span>
                        <div>
                          <div className="font-medium text-[#37352F] flex items-center gap-1.5">
                            <span>{store.name}</span>
                            {isSelected && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-[#37352F] text-white font-normal">
                                Active
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#37352F]/50">
                            {store.city} · {store.ordersCount} orders
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Sales */}
                    <td className="py-2.5 px-3 text-center font-medium text-[#37352F]">
                      ₹{store.dailySalesLakhs}L
                    </td>

                    {/* SSSG */}
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[#0F7B6C] font-medium">+{store.sssg}%</span>
                    </td>

                    {/* Labor */}
                    <td className="py-2.5 px-3 text-center text-[#37352F]/80">
                      {store.laborUtil}%
                    </td>

                    {/* Kitchen */}
                    <td className="py-2.5 px-3 text-center text-[#37352F]/80">
                      {store.kitchenUtil}%
                    </td>

                    {/* Energy */}
                    <td className="py-2.5 px-3 text-center text-[#37352F]/80">
                      {store.energyEfficiency}%
                    </td>

                    {/* Opportunity */}
                    <td className="py-2.5 px-3 text-center font-medium text-[#D9730D]">
                      ₹{store.aiOpportunityWeek.toLocaleString('en-IN')}/wk
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-[3px] font-medium ${
                          store.status === 'Optimized'
                            ? 'bg-[#DBEDDB] text-[#0F7B6C]'
                            : store.status === 'Watch'
                            ? 'bg-[#FDECC8] text-[#D9730D]'
                            : 'bg-[#FFE2DD] text-[#D44040]'
                        }`}
                      >
                        {store.status}
                      </span>
                    </td>

                    {/* Action button */}
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleSelectStore(store)}
                        className={`px-2.5 py-1 rounded-[3px] text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[rgba(55,53,47,0.08)] text-[#37352F]'
                            : 'hover:bg-[rgba(55,53,47,0.06)] text-[#37352F]/70 hover:text-[#37352F]'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Switch Store'}
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
