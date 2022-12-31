import { collection, doc, getDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { auth, db } from "../Firebase";
import img from "../assets/img/logo-removebg-preview.png";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

const FirebaseAuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);
  const value = { user };
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getDoc(doc(db, "user", user.uid)).then((currentUser) => {
          setUser({ ...user, ...currentUser.data() });
        });
        setPending(false);
      } else {
        setPending(false);
        setUser(null);
      }
    });

    return () => subscribe();
  }, [user]);
  return pending ? (
    <Box
      sx={{
        maxWidth: 1280,
        textAlign: "center",
        m: "0 auto",
        height:800
      }}
    >
      <Box>
        <CircularProgress color="success" />
      </Box>
    </Box>
  ) : (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuthContext = () => {
  var context = useContext(FirebaseAuthContext);
  if (context) return context.user;
  else return null;
};

export { AuthContextProvider, useFirebaseAuthContext };
