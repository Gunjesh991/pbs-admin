import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePhotographers } from "../../../hooks/usePhotographers";

import RegisterPhotographer from "../../../components/Register";

const EditPhotographer = () => {
  const { id = "" } = useParams();

  const { getPhotographerProfile, profile, loading } = usePhotographers();

  useEffect(() => {
    getPhotographerProfile(id);
  }, [id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && <RegisterPhotographer profile={profile.data} id={id} />}
    </>
  );
};

export default EditPhotographer;
