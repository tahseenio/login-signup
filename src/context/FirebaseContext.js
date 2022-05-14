import { createContext, useState, useEffect, useContext } from 'react';
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase';

export const FirebaseContext = createContext({});

export const FirebaseContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  // initially on page load loading is set to true
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Current user:", user.email)
          setUser(user);
          setIsLoading(false)
        }
        else {
          setUser(null);
          setIsLoading(false)
        }
      });
    }
    return (
      checkAuth()
    )
  }, [])

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const handleSignout = () => {
    signOut(auth);
    setUser(null)
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        user,
        logIn,
        createUser,
        handleSignout,
        SignInWithGoogle,
        forgotPassword,
        isLoading
      }}
    >
      {!isLoading ? children : null}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
