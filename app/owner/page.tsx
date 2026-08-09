'use client';

import React from 'react';
import { AdminDashboardView } from '../../components/dashboard/AdminDashboardView';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

export default function OwnerPage() {
  return (
    <ProtectedRoute requiredRole="owner">
      <AdminDashboardView />
    </ProtectedRoute>
  );
}
