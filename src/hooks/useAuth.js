import { useMemo, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, fireAuth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user, setUser] = useState(() => auth.currentUser);

  const isSignedIn = useMemo(() => !!user, [user]);

  const signOut = async () => {
    await fireAuth.signOut();
    navigate("/");
  };

  onAuthStateChanged(auth, setUser, (authError) => {
    setUser(null);
    console.log({ authError });
  });

  return { auth, user, isSignedIn, ...fireAuth, signOut };
};
