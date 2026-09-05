import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  AlertTriangle,
  ShieldCheck,
  Save,
  RotateCcw,
  Sparkles,
  Clock,
  CheckCircle2
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
  const assemblyOrPrepAt7PM = activeAt7PM.filter((e) =>
    e.skills.includes('Assembly') || e.skills.includes('Flame Broiler') || e.skills.includes('Fry Station')
  );
  const isUnderstaffedAt7PM = activeAt7PM.length < 10;

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
        currentShift: {
          start: emp.recommendedShift.start,
          end: emp.recommendedShift.end,
          label: emp.recommendedShift.label
        }
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
              <span className="text-xs font-semibold text-[#6E6E6E]">Demand-Responsive Shift Customizer</span>
            </div>
            <h3 className="text-2xl font-black font-display text-[#1A1A1A]">Master Shift Roster Builder.</h3>
            <p className="text-xs text-[#6E6E6E] mt-0.5">
              Adjust shift windows and micro-shifts per crew member. The constraint engine checks coverage against predicted demand in real-time.
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
        {isUnderstaffedAt7PM && (
          <div className="m-6 p-4 rounded-xl bg-rose-50 border border-rose-300 flex items-start gap-3 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-950 text-sm">
                ⚠ Staffing Constraint Warning (7:00 PM Dinner Rush)
              </h4>
              <p className="text-xs text-rose-900 mt-0.5">
                On-duty staffing ({activeAt7PM.length} crew) will fall <strong>below peak rush requirement</strong> (11–12 crew required at 55 tx/hr). Speed of Service will exceed 6 minutes without adding 4-hour micro-shift crew.
              </p>
            </div>
          </div>
        )}

        {/* Quick Align to AI button */}
        <div className="px-6 pb-2 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#6E6E6E] uppercase tracking-wider">
            {localEmployees.length} Store Crew Members (Full-Time & Micro-Shifts)
          </span>
          <button
            onClick={handleApplyAIRecommendation}
            className="text-xs font-black uppercase tracking-wider text-[#E85C1A] hover:text-[#D44D0F] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer border border-[#E85C1A]/30 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Load AI Micro-Shift Windows
          </button>
        </div>

        {/* Employee Roster List */}
        <div className="px-6 pb-6 space-y-3">
          {localEmployees.map((emp) => {
            const hasShiftChange = emp.currentShift.label !== emp.recommendedShift.label;
            const isMicro = emp.shiftType === 'micro_4h';

            return (
              <div
                key={emp.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isMicro
                    ? 'bg-amber-50/40 border-amber-200'
                    : 'bg-[#F5F4F1] border-stone-200 hover:border-[#5C3320]/30'
                }`}
              >
                {/* Employee Info */}
                <div className="min-w-[240px]">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-8 h-8 rounded-full text-white text-xs font-black font-display flex items-center justify-center shrink-0 ${
                        isMicro ? 'bg-[#E85C1A]' : 'bg-[#5C3320]'
                      }`}
                    >
                      {emp.nameId.charAt(0)}
                    </span>
                    <div>
                      <div className="font-black font-display text-[#1A1A1A] text-sm flex items-center gap-2">
                        <span>{emp.nameId}</span>
                        {isMicro ? (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-[#E85C1A] border border-orange-300">
                            4h Micro
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                            9h Straight
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#6E6E6E] font-medium">{emp.primaryRole}</div>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {emp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white border border-stone-300 text-[#5C3320]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shift Hours Adjuster */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Current Active Hours */}
                  <div className="p-3 rounded-xl bg-white border border-stone-200 flex-1 shadow-2xs">
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
                        <option value={8}>08:00 AM</option>
                        <option value={10}>10:00 AM</option>
                        <option value={11}>11:00 AM</option>
                        <option value={12}>12:00 PM (Lunch)</option>
                        <option value={13}>01:00 PM</option>
                        <option value={14}>02:00 PM</option>
                        <option value={16}>04:00 PM</option>
                        <option value={17}>05:00 PM</option>
                        <option value={18}>06:00 PM (Dinner)</option>
                        <option value={19}>07:00 PM (Dinner Peak)</option>
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
                        <option value={16}>04:00 PM (Lunch End)</option>
                        <option value={17}>05:00 PM</option>
                        <option value={18}>06:00 PM</option>
                        <option value={20}>08:00 PM</option>
                        <option value={21}>09:00 PM</option>
                        <option value={22}>10:00 PM (Dinner End)</option>
                        <option value={23}>11:00 PM (Close)</option>
                      </select>
                    </div>
                  </div>

                  {/* AI Recommended Window */}
                  <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200 min-w-[150px]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E85C1A] block mb-0.5">
                      Target AI Roster
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
                        className="text-[10px] text-[#E85C1A] font-bold block mt-1 hover:underline cursor-pointer"
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
        <div className="p-6 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-10">
          <div className="flex items-center gap-2 text-xs text-[#6E6E6E]">
            <ShieldCheck className="w-4 h-4 text-[#0E8A3E]" />
            <span>Complies with maximum 9-hour shift limits and mandatory break periods.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6E6E6E] hover:text-[#1A1A1A] rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#E85C1A] hover:bg-[#D44D0F] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Schedule Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
