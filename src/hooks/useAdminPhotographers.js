import {
  addDoc,
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
import { useStorage } from "./useStorage";

export const useAdminPhotographers = () => {
  const fireStore = getFirestore(app);
  const table = collection(fireStore, "photographers");
  const { uploadImage } = useStorage();

  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPhotographerList = async () => {
    setLoading(true);
    try {
      const { docs } = await getDocs(query(table));
      setPhotographers(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (e) {
      return "";
    } finally {
      setLoading(false);
    }
  };

  const getPhotographerProfile = async (id) => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(fireStore, "photographers", id));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const registerPhotographer = async (profile, images) => {
    setLoading(true);
    try {
      // upload images to storage
      const imgs = [];
      if (images.image1) imgs.push(images.image1);
      if (images.image2) imgs.push(images.image2);
      const imageLinks = await Promise.all(
        imgs.map(uploadImage("photographers"))
      );
      // add record to database
      await addDoc(table, { ...profile, imageLinks });
      await getPhotographerList();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const updatePhotographer = async (id, profile, images) => {
    setLoading(true);
    try {
      // upload images to storage
      const imgs = [];
      if (images.image1) imgs.push(images.image1);
      if (images.image2) imgs.push(images.image2);
      const imageLinks = await Promise.all(
        imgs.map(uploadImage("photographers"))
      );
      // add record to database
      await setDoc(doc(table, id), {
        ...profile,
        imageLinks,
      });
      await getPhotographerList();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    photographers,
    getPhotographerList,
    getPhotographerProfile,
    registerPhotographer,
    updatePhotographer,
  };
};
