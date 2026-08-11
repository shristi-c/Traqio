import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserProfile } from "../services/UserService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getIdToken = async () => {
  if (!user) {
    return null;
  }

  return await user.getIdToken();
};


 useEffect(() => {
  console.log("AuthContext mounted");

  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    console.log("onAuthStateChanged fired");
    console.log("Current User:", currentUser);

    setLoading(true);

    if (currentUser) {
      console.log("User is logged in:", currentUser.uid);

      setUser(currentUser);

      try {
        const profile = await getUserProfile(currentUser.uid);
        console.log("Profile:", profile);
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    } else {
      console.log("No user logged in");
      setUser(null);
      setUserData(null);
    }

    console.log("Setting loading to false");
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}