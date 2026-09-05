import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  AlertTriangle,
  ShieldCheck,
  Save,
  RotateCcw
} from 'lucide-react';
import { Employee } from '../types';

interface ShiftBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShiftBuilderModal: React.FC<ShiftBuilderModalProps> = ({ isOpen, onClose }) => {
  const { employees, updateEmployeeShift, approveSchedule, addToast } = useApp();

  const [localEmployees, setLocalEmployees] = useState<Employee[]>(employees);

  if (!isOpen) return null;

  const eveningHour = 19;
  const activeAt7PM = localEmployees.filter(
    (e) => e.currentShift.start <= eveningHour && e.currentShift.end >= eveningHour
  );
  const kitchenAt7PM = activeAt7PM.filter((e) => e.skills.includes('Kitchen') || e.skills.includes('Grill'));
  const isKitchenUnderstaffedAt7PM = kitchenAt7PM.length < 4;

  const handleShiftChange = (id: string, start: number, end: number) => {
    setLocalEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          const formatHour = (h: number) => {
            const hrs = Math.floor(h);
            const mins = h % 1 !== 0 ? '30' : '00';
            return `${hrs < 10 ? '0' : ''}${hrs}:${mins}`;
          };
          return {
            ...emp,
            currentShift: {
              start,
              end,
              label: `${formatHour(start)}–${formatHour(end)}`
            }
          };
        }
        return emp;
      })
    );
  };

  const handleApplyAIRecommendation = () => {
    setLocalEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        currentShift: { ...emp.recommendedShift }
      }))
    );
    addToast('success', 'Roster Aligned to AI Optimum', 'All shift hours populated with recommended allocations.');
  };

  const handleSave = () => {
    localEmployees.forEach((emp) => {
      updateEmployeeShift(emp.id, emp.currentShift.start, emp.currentShift.end);
    });
    approveSchedule();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-ui">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-[#F5F4F1] flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-black font-ui uppercase tracking-wider bg-[#5C3320] text-white">
                Interactive Shift Planner
              </span>
              <span className="text-xs font-semibold text-[#6E6E6E]">Anonymous Crew Roster</span>
            </div>
            <h3 className="text-2xl font-black font-display text-[#1A1A1A]">Master Shift Roster Builder.</h3>
            <p className="text-xs text-[#6E6E6E] mt-0.5">
              Adjust shift windows per crew member. The constraint engine checks coverage against predicted demand in real-time.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6E6E6E] hover:text-[#1A1A1A] p-2 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Constraint Warning Banner */}
        {isKitchenUnderstaffedAt7PM && (
          <div className="m-6 p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-[#E85C1A] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 text-sm">
                ⚠ Staffing Constraint Warning (7:00 PM Dinner Rush)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Kitchen staffing will fall <strong>1 employee below forecast requirement</strong> at 7 PM. Ensure at least 4 kitchen-qualified crew members are active during the evening cricket match window.
              </p>
            </div>
          </div>
        )}

        {/* Quick Align to AI button */}
        <div className="px-6 pb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-[#6E6E6E] uppercase tracking-wider">7 Active Team Members</span>
          <button
            onClick={handleApplyAIRecommendation}
            className="text-xs font-black uppercase tracking-wider text-[#E85C1A] hover:text-[#D44D0F] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer border border-[#E85C1A]/30"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Load AI Recommended Shift Windows
          </button>
        </div>

        {/* Employee Roster List */}
        <div className="px-6 pb-6 space-y-3">
          {localEmployees.map((emp) => {
            const hasShiftChange = emp.currentShift.label !== emp.recommendedShift.label;

            return (
              <div
                key={emp.id}
                className="p-4 rounded-xl bg-[#F5F4F1] border border-stone-200 hover:border-[#5C3320]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Employee Info */}
                <div className="min-w-[220px]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#5C3320] text-white text-xs font-black font-display flex items-center justify-center">
                      {emp.nameId.replace('Crew ', '')}
                    </span>
                    <div>
                      <div className="font-black font-display text-[#1A1A1A] text-sm flex items-center gap-2">
                        <span>{emp.nameId}.</span>
                        {emp.isCrossTrained && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                            Cross-Trained
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#6E6E6E] font-medium">{emp.primaryRole}</div>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {emp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-300 text-[#5C3320]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shift Hours Adjuster */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Current Active Hours */}
                  <div className="p-3 rounded-xl bg-white border border-stone-200 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6E6E6E] block mb-1">
                      Assigned Shift Window
                    </span>
                    <div className="flex items-center gap-2">
                      <select
                        value={emp.currentShift.start}
                        onChange={(e) =>
                          handleShiftChange(emp.id, Number(e.target.value), emp.currentShift.end)
                        }
                        aria-label={`${emp.nameId} start time`}
                        className="bg-[#F5F4F1] border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-[#1A1A1A]"
                      >
                        <option value={10}>10:00 AM</option>
                        <option value={11}>11:00 AM</option>
                        <option value={12}>12:00 PM</option>
                        <option value={13}>01:00 PM</option>
                        <option value={14}>02:00 PM</option>
                        <option value={15}>03:00 PM</option>
                        <option value={16}>04:00 PM</option>
                        <option value={17}>05:00 PM</option>
                        <option value={18}>06:00 PM</option>
                      </select>
                      <span className="text-stone-400 text-xs font-bold">to</span>
                      <select
                        value={emp.currentShift.end}
                        onChange={(e) =>
                          handleShiftChange(emp.id, emp.currentShift.start, Number(e.target.value))
                        }
                        aria-label={`${emp.nameId} end time`}
                        className="bg-[#F5F4F1] border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-[#1A1A1A]"
                      >
                        <option value={17}>05:00 PM</option>
                        <option value={18}>06:00 PM</option>
                        <option value={19}>07:00 PM</option>
                        <option value={20}>08:00 PM</option>
                        <option value={21}>09:00 PM</option>
                        <option value={22}>10:00 PM</option>
                        <option value={23}>11:00 PM</option>
                        <option value={23.5}>11:30 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* AI Recommended Window */}
                  <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 min-w-[150px]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E85C1A] block mb-1">
                      AI Target Shift
                    </span>
                    <span className="text-xs font-black font-display text-[#1A1A1A]">
                      {emp.recommendedShift.label}
                    </span>
                    {hasShiftChange && (
                      <button
                        onClick={() =>
                          handleShiftChange(
                            emp.id,
                            emp.recommendedShift.start,
                            emp.recommendedShift.end
                          )
                        }
                        className="text-[10px] text-[#E85C1A] font-bold block mt-1 hover:underline"
                      >
                        Match AI
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#6E6E6E]">
            <ShieldCheck className="w-4 h-4 text-[#0E8A3E]" />
            <span>Complies with maximum 8-hour statutory shift rules and mandatory meal intervals.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6E6E6E] hover:text-[#1A1A1A] rounded-full hover:bg-stone-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
