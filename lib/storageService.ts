import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

export interface UploadProgressResult {
  url: string;
  fileName: string;
}

export const uploadDocumentToStorage = async (
  file: File,
  folderPath: string = 'lab_documents'
): Promise<UploadProgressResult> => {
  if (!isFirebaseConfigured()) {
    // Return mock downloadable object if Firebase Storage is unconfigured
    return {
      url: URL.createObjectURL(file),
      fileName: file.name
    };
  }

  try {
    const storageRef = ref(storage, `${folderPath}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      fileName: file.name
    };
  } catch (err) {
    console.warn('Firebase Storage upload error, using fallback URL:', err);
    return {
      url: URL.createObjectURL(file),
      fileName: file.name
    };
  }
};
