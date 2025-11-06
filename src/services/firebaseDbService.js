// Firebase Firestore Database Service
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Collection names for Blood Bank Management System
const COLLECTIONS = {
  DONORS: 'donors',
  BLOOD_REQUESTS: 'bloodRequests',
  BLOOD_INVENTORY: 'bloodInventory',
  HOSPITALS: 'hospitals',
  BLOOD_BANKS: 'bloodBanks'
};

// ============= DONOR OPERATIONS =============

// Add new donor
export const addDonor = async (donorData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.DONORS), {
      ...donorData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return {
      success: true,
      id: docRef.id,
      message: 'Donor added successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all donors
export const getAllDonors = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.DONORS));
    const donors = [];
    querySnapshot.forEach((doc) => {
      donors.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: donors
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Get donor by ID
export const getDonorById = async (donorId) => {
  try {
    const docRef = doc(db, COLLECTIONS.DONORS, donorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        data: { id: docSnap.id, ...docSnap.data() }
      };
    } else {
      return {
        success: false,
        error: 'Donor not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Update donor
export const updateDonor = async (donorId, donorData) => {
  try {
    const docRef = doc(db, COLLECTIONS.DONORS, donorId);
    await updateDoc(docRef, {
      ...donorData,
      updatedAt: serverTimestamp()
    });
    return {
      success: true,
      message: 'Donor updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete donor
export const deleteDonor = async (donorId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.DONORS, donorId));
    return {
      success: true,
      message: 'Donor deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ============= BLOOD REQUEST OPERATIONS =============

// Add blood request
export const addBloodRequest = async (requestData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.BLOOD_REQUESTS), {
      ...requestData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return {
      success: true,
      id: docRef.id,
      message: 'Blood request created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all blood requests
export const getAllBloodRequests = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.BLOOD_REQUESTS));
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: requests
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Update blood request status
export const updateBloodRequestStatus = async (requestId, status) => {
  try {
    const docRef = doc(db, COLLECTIONS.BLOOD_REQUESTS, requestId);
    await updateDoc(docRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    return {
      success: true,
      message: 'Request status updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ============= BLOOD INVENTORY OPERATIONS =============

// Add blood to inventory
export const addBloodToInventory = async (inventoryData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.BLOOD_INVENTORY), {
      ...inventoryData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return {
      success: true,
      id: docRef.id,
      message: 'Blood added to inventory'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Get inventory by blood group
export const getInventoryByBloodGroup = async (bloodGroup) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.BLOOD_INVENTORY),
      where('bloodGroup', '==', bloodGroup)
    );
    const querySnapshot = await getDocs(q);
    const inventory = [];
    querySnapshot.forEach((doc) => {
      inventory.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: inventory
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all inventory
export const getAllInventory = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.BLOOD_INVENTORY));
    const inventory = [];
    querySnapshot.forEach((doc) => {
      inventory.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: inventory
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export { COLLECTIONS };
