import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { usePhotographers } from "../../hooks/usePhotographers";
import { useStorage } from "../../hooks/useStorage";

import "./profile.css";

const Profile = () => {
  const { id = "" } = useParams();
  const { getPhotographerProfile, profile } = usePhotographers();
  const { getImageLinks } = useStorage();

  const [images, setImages] = useState([]);

  useEffect(() => {
    getPhotographerProfile(id);
  }, [id]);

  useEffect(() => {
    getImageLinks(profile.data, setImages);
  }, [profile.data]);

  return (
    <div className="profile">
      <div className="safe">
        {profile.loading && <p>Loading...</p>}
        {!profile.loading && profile.data && (
          <>
            <div className="profile__header">
              <h2>{profile.data.fullName}</h2>
              <div className="control">
                <Link to={`/estimate?pid=${id}`}>
                  <button>Hire</button>
                </Link>
              </div>
            </div>
            <div className="profile__description">
              <p
                dangerouslySetInnerHTML={{
                  __html: profile.data.additionalInformation,
                }}
              ></p>
            </div>
            <div className="profile__image">
              {images.length && images[0] ? (
                <img src={images[0]} alt="profile" />
              ) : null}
            </div>
            <div className="profile__description">
              <p
                dangerouslySetInnerHTML={{
                  __html: profile.data.experience,
                }}
              ></p>
            </div>
            <div className="profile__image">
              {images.length && images[1] ? (
                <img src={images[1]} alt="profile" />
              ) : null}
            </div>
            {/* <div className="profile__description" style={{ textAlign: "left" }}>
            Contact me personally on{" "}
            <a href="mailto:gunjeshphotography@gmail.com">
              gunjeshphotography@gmail.com
            </a>
            .
          </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
