import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-coral-500 shrink-0" />
  };

  return (
    <div className="fixed top-20 right-4 md:right-8 z-50 transition-all duration-300 ease-out transform translate-y-0">
      <div className="glass-modal px-4 py-3 rounded-2xl shadow-float flex items-center gap-3 border border-white/60 bg-white/90 text-charcoal-800 text-sm font-medium">
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
