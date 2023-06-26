import React from "react";
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../firebase-config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<{ user: User | null }>({
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div className="h-screen bg-white">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
