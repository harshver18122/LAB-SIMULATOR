import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';
import { UserProfile, UserRole } from '../types';

export const formatSupabaseAuthError = (errorMsg: string): string => {
  const lower = errorMsg.toLowerCase();
  if (lower.includes('already registered') || lower.includes('user_already_exists')) {
    return 'An account with this email already exists. Please log in.';
  }
  if (lower.includes('invalid login credentials') || lower.includes('invalid_grant')) {
    return 'Incorrect email or password credentials. Please try again.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please confirm your email address before signing in.';
  }
  if (lower.includes('password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (lower.includes('network') || lower.includes('fetch failed')) {
    return 'Network connection issue. Please check your connection and try again.';
  }
  return errorMsg || 'Authentication failed. Please try again.';
};

export const mapSupabaseUserToProfile = (spUser: SupabaseUser, fallbackRole: UserRole = 'student'): UserProfile => {
  const meta = spUser.user_metadata || {};
  return {
    id: spUser.id,
    name: meta.name || meta.full_name || spUser.email?.split('@')[0] || 'Alex Johnson',
    email: spUser.email || '',
    role: (meta.role as UserRole) || fallbackRole,
    avatar: meta.avatar_url || meta.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: meta.college || 'Stanford Institute of Technology',
    grade: meta.grade || 'Junior Year - Physics & CS Major',
    xp: meta.xp ?? 2450,
    completedLabsCount: meta.completedLabsCount ?? 14,
    emailVerified: Boolean(spUser.email_confirmed_at),
  };
};

export const registerUserWithSupabase = async (
  email: string, 
  pass: string, 
  name: string, 
  role: UserRole = 'student'
): Promise<UserProfile> => {
  if (!isSupabaseConfigured()) {
    return {
      id: `usr-sp-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Stanford Institute of Technology',
      xp: 2450,
      completedLabsCount: 14,
      emailVerified: true,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: {
        name,
        role,
        college: 'Stanford Institute of Technology',
        xp: 2450,
        completedLabsCount: 14,
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Failed to create account.');
  }

  return mapSupabaseUserToProfile(data.user, role);
};

export const loginUserWithSupabase = async (email: string, pass: string): Promise<UserProfile> => {
  if (!isSupabaseConfigured()) {
    return {
      id: 'usr-sp-101',
      name: 'Alex Johnson',
      email,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Stanford Institute of Technology',
      xp: 2450,
      completedLabsCount: 14,
      emailVerified: true,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Invalid login response.');
  }

  return mapSupabaseUserToProfile(data.user);
};

export const loginWithSupabaseGoogle = async (role: UserRole = 'student'): Promise<UserProfile | null> => {
  if (!isSupabaseConfigured()) {
    return {
      id: `usr-sp-g-${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Stanford Institute of Technology',
      xp: 2450,
      completedLabsCount: 14,
      emailVerified: true,
    };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        role,
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  return null;
};

export const resetSupabasePassword = async (email: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return true;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth?mode=resetPassword` : undefined,
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

export const logoutSupabaseUser = async (): Promise<void> => {
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }
};
