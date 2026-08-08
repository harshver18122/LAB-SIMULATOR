import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  confirmPasswordReset,
  applyActionCode,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from './firebase';
import { UserProfile, UserRole } from '../types';

export const formatAuthError = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please log in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-not-found':
      return 'No account found with this email address. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password credentials.';
    case 'auth/network-request-failed':
      return 'Unable to connect. Please check your internet connection and try again.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completion.';
    case 'auth/popup-blocked':
      return 'Google sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.';
    case 'auth/expired-action-code':
      return 'This verification or reset link has expired. Please request a new link.';
    case 'auth/invalid-action-code':
      return 'This verification or reset link is invalid or has already been used.';
    case 'auth/unverified-email':
      return 'Please verify your email before continuing.';
    default:
      if (!errorCode) return 'An unexpected error occurred. Please try again.';
      return `Authentication failed (${errorCode.replace('auth/', '')}). Please try again.`;
  }
};

export const syncUserProfileToFirestore = async (fbUser: FirebaseUser, name?: string, role: UserRole = 'student'): Promise<UserProfile> => {
  const userRef = doc(db, 'users', fbUser.uid);
  let existingData: Partial<UserProfile> = {};
  
  if (isFirebaseConfigured()) {
    try {
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        existingData = snapshot.data() as UserProfile;
      }
    } catch (e) {
      console.warn('Firestore read user profile warning:', e);
    }
  }

  const profile: UserProfile = {
    id: fbUser.uid,
    name: name || existingData.name || fbUser.displayName || 'Alex Johnson',
    email: fbUser.email || '',
    role: existingData.role || role,
    avatar: fbUser.photoURL || existingData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: existingData.college || 'Stanford Institute of Technology',
    grade: existingData.grade || 'Junior Year - Physics & CS Major',
    xp: existingData.xp ?? 2450,
    completedLabsCount: existingData.completedLabsCount ?? 14,
    emailVerified: fbUser.emailVerified,
  };

  if (isFirebaseConfigured()) {
    try {
      await setDoc(userRef, profile, { merge: true });
    } catch (e) {
      console.warn('Firestore write user profile warning:', e);
    }
  }

  return profile;
};

export const registerUserWithEmail = async (email: string, pass: string, name: string, role: UserRole = 'student') => {
  if (!isFirebaseConfigured()) {
    return {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Stanford Institute of Technology',
      xp: 2450,
      completedLabsCount: 14,
      emailVerified: false,
    } as UserProfile;
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(userCredential.user, { displayName: name });
  
  // Send email verification upon registration
  try {
    await sendEmailVerification(userCredential.user);
  } catch (err) {
    console.warn('Failed to send verification email on signup:', err);
  }

  return await syncUserProfileToFirestore(userCredential.user, name, role);
};

export const sendVerificationEmailToCurrentUser = async (): Promise<boolean> => {
  if (!isFirebaseConfigured()) return true;
  if (!auth.currentUser) throw new Error('auth/user-not-found');
  await sendEmailVerification(auth.currentUser);
  return true;
};

export const reloadUserAuthState = async (): Promise<{ userProfile: UserProfile | null; emailVerified: boolean }> => {
  if (!isFirebaseConfigured() || !auth.currentUser) {
    return { userProfile: null, emailVerified: true };
  }
  await auth.currentUser.reload();
  const profile = await syncUserProfileToFirestore(auth.currentUser);
  return { userProfile: profile, emailVerified: auth.currentUser.emailVerified };
};

export const loginUserWithEmail = async (email: string, pass: string) => {
  if (!isFirebaseConfigured()) {
    return {
      id: 'usr-101',
      name: 'Alex Johnson',
      email,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Stanford Institute of Technology',
      xp: 2450,
      completedLabsCount: 14,
      emailVerified: true,
    } as UserProfile;
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return await syncUserProfileToFirestore(userCredential.user);
};

export const loginWithGoogleRedirect = async () => {
  if (isFirebaseConfigured()) {
    await signInWithRedirect(auth, googleProvider);
  }
};

export const checkGoogleRedirectResult = async (): Promise<UserProfile | null> => {
  if (!isFirebaseConfigured()) return null;
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      return await syncUserProfileToFirestore(result.user, result.user.displayName || 'Google User');
    }
  } catch (e) {
    console.warn('Redirect result check warning:', e);
  }
  return null;
};

export const loginWithGoogle = async (role: UserRole = 'student') => {
  if (!isFirebaseConfigured()) {
    return {
      id: `usr-g-${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Stanford Institute of Technology',
      xp: 2450,
      completedLabsCount: 14,
      emailVerified: true,
    } as UserProfile;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await syncUserProfileToFirestore(result.user, result.user.displayName || 'Google User', role);
  } catch (err: any) {
    if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
      console.warn('Google popup blocked/closed. Initiating redirect authentication fallback...');
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw err;
  }
};

export const logoutUser = async () => {
  if (isFirebaseConfigured()) {
    await signOut(auth);
  }
};

export const resetPassword = async (email: string) => {
  if (isFirebaseConfigured()) {
    await sendPasswordResetEmail(auth, email);
  }
};

export const handleConfirmPasswordReset = async (oobCode: string, newPass: string) => {
  if (isFirebaseConfigured()) {
    await confirmPasswordReset(auth, oobCode, newPass);
  }
};

export const handleApplyActionCode = async (oobCode: string) => {
  if (isFirebaseConfigured()) {
    await applyActionCode(auth, oobCode);
  }
};
