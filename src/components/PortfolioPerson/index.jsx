import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminPortfolio } from "../../hooks/useAdminPortfolio";
import { usePhotographers } from "../../hooks/usePhotographers";
import { useStorage } from "../../hooks/useStorage";
import ImageUpload from "../ImageUpload";
import Item from "./Item";

import "./styles.css";

const PortfolioPerson = () => {
  const { pid = "" } = useParams();
  const {
    getPhotographerProfile,
    profile,
    loading: profileLoading,
  } = usePhotographers();
  const { loading, portfolio, getPortfolios, uploadImages } =
    useAdminPortfolio();
  const { getImageLinks } = useStorage();

  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    getPhotographerProfile(pid);
    getPortfolios(pid);
  }, [pid]);

  useEffect(() => {
    getImageLinks({ imageLinks: portfolio }, setSavedImages);
  }, [portfolio]);

  const updateLocalImages = (image) => {
    setImages((prev) => [...prev, image]);
  };

  const localDelete = (idx) => {
    const _imgs = images.filter((i, index) => idx !== index);
    console.log({ _imgs });
    setImages(_imgs);
  };

  const gridItems = useMemo(() => {
    const _items = [
      ...savedImages.map((image, i) => <Item src={image} key={"r-" + i} />),
      ...images.map((image, i) => (
        <Item
          local
          src={URL.createObjectURL(image)}
          key={i}
          onDelete={() => localDelete(i)}
        />
      )),
    ];
    return _items;
  }, [images, savedImages]);

  const onUpload = async (e) => {
    e.preventDefault();
    try {
      if (!images.length || loading) return;
      await uploadImages(pid, images);
      setImages([]);
    } catch (err) {}
  };

  return (
    <>
      <div className="header" style={{ marginBottom: 50 }}>
        {profileLoading && <p>Loading...</p>}
        {!profileLoading && profile.data && (
          <>
            <h2>Portfolio &gt; {profile.data.fullName}</h2>
          </>
        )}
      </div>
      <div className="portfolio__grid">
        {gridItems}
        <div className="item upload">
          <div className="content">
            <ImageUpload refresh setImage={updateLocalImages} />
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={onUpload} disabled={!images.length || loading}>
          Upload {images.length} {images.length == 1 ? "image" : "images"}
        </button>
      </div>
    </>
  );
};

export default PortfolioPerson;
