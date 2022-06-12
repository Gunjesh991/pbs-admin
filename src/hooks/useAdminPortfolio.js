import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { app } from "../utils/firebase";
import { useStorage } from "./useStorage";

export const useAdminPortfolio = () => {
  const fireStore = getFirestore(app);
  const table = collection(fireStore, "portfolios");

  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState([]);

  const { uploadImage } = useStorage();

  const getPortfolios = async (id = "") => {
    try {
      const { docs } = await getDocs(query(table, where("pid", "==", id)));
      setPortfolio(
        docs
          .map((doc) => doc.data())
          .sort((a, b) => a.date && b.date && a.date > b.date)
          .map((it) => it.link)
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (id = "", images = []) => {
    setLoading(true);
    try {
      const mainAccount = await getDoc(doc(fireStore, "photographers", id));
      if (!mainAccount.exists()) throw new Error("Invalid ID.");

      const uploadedImages = await Promise.all(
        images.map(uploadImage("portfolio"))
      );

      const links = uploadedImages.filter((it) => it && it.length);

      await Promise.all(
        links.map((link) => addDoc(table, { pid: id, link, date: Date.now() }))
      );

      // setPortfolio((prev) => [...prev, ...links]);
      getPortfolios(id);
    } catch (err) {
      alert("Error uploading images");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    portfolio,
    getPortfolios,
    uploadImages,
  };
};
