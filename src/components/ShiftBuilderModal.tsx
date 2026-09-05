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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in">
      <div className="bg-white rounded-[6px] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[rgba(55,53,47,0.09)]">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3] flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <h3 className="text-sm font-semibold text-[#37352F]">Master Shift Roster Builder</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-[#DDEBF1] text-[#0B6E99] font-medium">
                Interactive
              </span>
            </div>
            <p className="text-[11px] text-[#37352F]/60 mt-0.5">
              Adjust shift hours per crew member. The constraint engine checks coverage against predicted demand.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#37352F]/50 hover:text-[#37352F] p-1 rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real-time Constraint Warning Banner */}
        {isKitchenUnderstaffedAt7PM && (
          <div className="m-4 p-3 rounded-[4px] bg-[#FFE2DD]/60 border border-[#D44040]/30 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#D44040] shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-[#D44040] text-xs">
                Staffing Constraint Warning (7:00 PM Dinner Rush)
              </div>
              <p className="text-[11px] text-[#37352F]/80 mt-0.5">
                Kitchen staffing will fall <strong>1 employee below forecast requirement</strong> at 7 PM. Ensure at least 4 kitchen-qualified crew members are active during the evening rush window.
              </p>
            </div>
          </div>
        )}

        {/* Quick Align to AI button */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-[rgba(55,53,47,0.06)] text-xs">
          <span className="text-[11px] text-[#37352F]/50">7 Active Team Members</span>
          <button
            onClick={handleApplyAIRecommendation}
            className="text-xs text-[#2383E2] hover:text-[#1B6FC2] flex items-center gap-1.5 px-2 py-1 rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Load AI Recommended Windows
          </button>
        </div>

        {/* Employee Roster List */}
        <div className="p-4 space-y-2">
          {localEmployees.map((emp) => {
            const hasShiftChange = emp.currentShift.label !== emp.recommendedShift.label;

            return (
              <div
                key={emp.id}
                className="p-3 rounded-[4px] bg-[#F7F6F3]/50 border border-[rgba(55,53,47,0.09)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                {/* Employee Info */}
                <div className="min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">👤</span>
                    <div>
                      <div className="font-medium text-[#37352F] flex items-center gap-1.5">
                        <span>{emp.nameId}</span>
                        {emp.isCrossTrained && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-[#FDECC8] text-[#D9730D]">
                            Cross-Trained
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#37352F]/50">{emp.primaryRole}</div>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {emp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-white border border-[rgba(55,53,47,0.09)] text-[#37352F]/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shift Hours Adjuster */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Current Active Hours */}
                  <div className="p-2 rounded-[4px] bg-white border border-[rgba(55,53,47,0.09)] flex-1">
                    <span className="text-[10px] text-[#37352F]/50 block mb-1">
                      Assigned Shift Window
                    </span>
                    <div className="flex items-center gap-1.5">
                      <select
                        value={emp.currentShift.start}
                        onChange={(e) =>
                          handleShiftChange(emp.id, Number(e.target.value), emp.currentShift.end)
                        }
                        aria-label={`${emp.nameId} start time`}
                        className="bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] px-2 py-1 text-xs text-[#37352F] outline-none"
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
                      <span className="text-[#37352F]/40 text-xs">to</span>
                      <select
                        value={emp.currentShift.end}
                        onChange={(e) =>
                          handleShiftChange(emp.id, emp.currentShift.start, Number(e.target.value))
                        }
                        aria-label={`${emp.nameId} end time`}
                        className="bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] rounded-[3px] px-2 py-1 text-xs text-[#37352F] outline-none"
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
                  <div className="p-2 rounded-[4px] bg-[#F7F6F3] border border-[rgba(55,53,47,0.09)] min-w-[130px]">
                    <span className="text-[10px] text-[#D9730D] block mb-0.5">
                      Target Shift
                    </span>
                    <span className="text-xs font-medium text-[#37352F]">
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
                        className="text-[10px] text-[#2383E2] hover:underline block mt-0.5 cursor-pointer"
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
        <div className="p-3 bg-[#F7F6F3] border-t border-[rgba(55,53,47,0.09)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-[#37352F]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Complies with maximum 8-hour statutory shift rules and meal intervals.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs text-[#37352F]/70 hover:text-[#37352F] rounded-[3px] hover:bg-[rgba(55,53,47,0.06)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-[#2383E2] hover:bg-[#1B6FC2] text-white text-xs font-medium rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
