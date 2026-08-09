'use client';

import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-3">
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center border border-blue-100">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-[#0F2942]">{title}</h3>
      {description && <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
