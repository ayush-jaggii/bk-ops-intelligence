import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-white border-green-200 text-stone-800'
                : isWarning
                ? 'bg-amber-50 border-amber-300 text-stone-900'
                : 'bg-white border-stone-200 text-stone-800'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#D62300]" />}
              {!isSuccess && !isWarning && <Info className="w-5 h-5 text-amber-600" />}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#502314]">{toast.title}</h4>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
