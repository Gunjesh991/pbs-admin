import { useEffect, useState } from "react";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useStorage } from "../../hooks/useStorage";
import { usePhotographers } from "../../hooks/usePhotographers";

import "./gallery.css";

const Gallery = ({ id = "", links = [] }) => {
  const { getImageLinks } = useStorage();
  const { loading, portfolio, getPortfolios } = usePortfolio();
  const {
    getPhotographerProfile,
    loading: profileLoading,
    profile,
  } = usePhotographers();

  const [_links, setLinks] = useState([]);

  useEffect(() => {
    getPhotographerProfile(id);
    getPortfolios(id);
  }, [id]);

  useEffect(() => {
    getImageLinks({ imageLinks: portfolio }, setLinks);
  }, [portfolio]);

  return id.length ? (
    <>
      <div className="header" style={{ marginBottom: 20 }}>
        {profileLoading && <p>Loading...</p>}
        {!profileLoading && profile.data && (
          <>
            <h2>Portfolio &gt; {profile.data.fullName}</h2>
          </>
        )}
      </div>
      <div className="gallery" style={{ height: "fit-content" }}>
        <div className="gallery__container">
          <div className="gallery__wrapper">
            {loading && <p>Loading...</p>}
            {_links.map((_link, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url('${_link}')`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="gallery" style={{ height: "fit-content" }}>
      <div className="gallery__container">
        <div className="gallery__wrapper">
          {links.map((_link, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `url('${_link}')`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
