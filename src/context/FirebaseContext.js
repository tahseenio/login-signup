import { createContext, useState, useEffect, useContext } from 'react';
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase';

export const FirebaseContext = createContext({});

export const FirebaseContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
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

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    try {
      return signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.code);
    }
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
        isLoading
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
