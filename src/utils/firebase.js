import { initializeApp } from "firebase/app";
import firebaseConfig from "../configs/firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const initializeCaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "admin-signin-cap",
    {
      size: "normal",
      callback: (response) => {
        console.log({ response });
      },
      "expired-callback": () => {
        alert("Captcha expired. Reload.");
      },
    },
    auth
  );
};

const signInWithEmail = async (email = "", password = "") => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } else {
      throw err;
    }
  }
};

const signInWithPhone = async (phone = "") => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.log({ error });
  }
};

const confirmPhoneSignIn = async (code = "") => {
  try {
    const user = await window.confirmationResult.confirm(code);
    return user;
  } catch (error) {
    console.log({ error });
  }
};

export const fireAuth = {
  confirmPhoneSignIn,
  signIn: () => signInWithPopup(auth, provider),
  signInEmail: signInWithEmail,
  signInPhone: signInWithPhone,
  signOut: () => signOut(auth),
};
