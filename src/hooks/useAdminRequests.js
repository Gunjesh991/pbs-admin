import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { app } from "../utils/firebase";

export const useAdminRequests = () => {
  const fireStore = getFirestore(app);
  const table = collection(fireStore, "hire_requests");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHireRequestList = async () => {
    setLoading(true);
    try {
      const { docs } = await getDocs(query(table));
      setRequests(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRequestDetails = async (id) => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(table, id));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const updateHireStatus = async (details, accept = true) => {
    setLoading(true);
    try {
      const { id, ...otherDetails } = details;
      // add record to database
      console.log({ id, accept });
      await setDoc(doc(table, id), {
        ...otherDetails,
        status: accept ? "active" : "declined",
      });

      await getHireRequestList();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return {
    requests,
    loading,
    getHireRequestList,
    getRequestDetails,
    updateHireStatus,
  };
};
