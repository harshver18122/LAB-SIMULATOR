'use client';

import React from 'react';
import { StudentDashboardView } from '../../../components/dashboard/StudentDashboardView';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentDashboardView />
    </ProtectedRoute>
  );
}
