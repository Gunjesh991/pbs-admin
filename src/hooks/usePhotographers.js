import { useState } from "react";
import { useAdminPhotographers } from "./useAdminPhotographers";

export const usePhotographers = () => {
  const {
    loading,
    photographers,
    getPhotographerList,
    getPhotographerProfile: getProfile,
  } = useAdminPhotographers();

  const [profile, setProfile] = useState({
    data: null,
    loading: false,
  });

  const getPhotographerProfile = async (id = string) => {
    console.log({ pid: id });
    setProfile((prev) => ({ ...prev, loading: true }));
    try {
      const _profile = await getProfile(id);
      setProfile({ data: _profile, loading: false });
    } catch (e) {
      setProfile({ data: null, loading: false });
    }
  };

  return {
    loading,
    photographers,
    profile,
    getPhotographerList,
    getPhotographerProfile,
  };
};
