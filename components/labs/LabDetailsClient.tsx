'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LabDetailsView } from './LabDetailsView';
import Link from 'next/link';

export const LabDetailsClient: React.FC<{ labId: string }> = ({ labId }) => {
  const { experiments } = useApp();
  const experiment = experiments.find((exp) => exp.id === labId) || experiments[0];

  if (!experiment) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Experiment Not Found</h2>
        <Link href="/labs" className="px-4 py-2 rounded-xl bg-[#4F7DFF] text-white text-xs font-semibold">
          Return to Labs Directory
        </Link>
      </div>
    );
  }

  return <LabDetailsView experiment={experiment} />;
};
