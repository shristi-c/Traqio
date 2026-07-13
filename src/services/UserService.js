import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getUserProfile(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data();
}