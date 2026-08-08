'use client';

import React from 'react';
import { TeacherDashboardView } from '../../../components/dashboard/TeacherDashboardView';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';

export default function TeacherDashboardPage() {
  return (
    <ProtectedRoute requiredRole="teacher">
      <TeacherDashboardView />
    </ProtectedRoute>
  );
}
