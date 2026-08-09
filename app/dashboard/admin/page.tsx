'use client';

import React from 'react';
import { AdminDashboardView } from '../../../components/dashboard/AdminDashboardView';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="owner">
      <AdminDashboardView />
    </ProtectedRoute>
  );
}
