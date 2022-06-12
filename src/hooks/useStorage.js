import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../utils/firebase";

const bucketStorage = getStorage(app);

export const useStorage = () => {
  const getImageUrl = async (imagePath = "") => {
    try {
      const rl = await getDownloadURL(ref(bucketStorage, imagePath));
      return rl;
    } catch (e) {}
  };

  const getImageLinks = (profile, setImages = () => {}) => {
    if (!profile || !profile.imageLinks) return;
    const links = profile.imageLinks;
    Promise.all(links.filter((i) => !!i).map(getImageUrl))
      .then(setImages)
      .catch((e) => {
        setImages([]);
      });
  };

  const uploadImage =
    (folder = "") =>
    async (imageFile) => {
      try {
        const bucketRef = ref(
          bucketStorage,
          `${folder}/${imageFile.lastModified}_${imageFile.name}`
        );
        const uped = await uploadBytes(bucketRef, imageFile);
        return uped.ref.fullPath;
      } catch (e) {}
    };

  return { uploadImage, getImageUrl, getImageLinks };
};
