import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,

} from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth } from "../firebase/firebase";

// Register a new user

 export const register = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name,
    email,
    role: "user",
    createdAt: serverTimestamp(),
  });

  return userCredential;
};


// Login existing user
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google Sign In
// Google Sign In
const googleProvider = new GoogleAuthProvider();

export const googleSignIn = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const user = result.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role: "user",
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  return result;
};

// Logout
export const logout = () => {
  return signOut(auth);
};

// Forgot Password
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};