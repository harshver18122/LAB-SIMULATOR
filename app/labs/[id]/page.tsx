import React from 'react';
import { SEED_EXPERIMENTS } from '../../../data/seedData';
import { LabDetailsClient } from '../../../components/labs/LabDetailsClient';

export function generateStaticParams() {
  return SEED_EXPERIMENTS.map((exp) => ({
    id: exp.id,
  }));
}

export default async function LabDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LabDetailsClient labId={id} />;
}
