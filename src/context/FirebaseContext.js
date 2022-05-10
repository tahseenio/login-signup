import { createContext, useState, useContext } from 'react';
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from '../firebase';

export const FirebaseContext = createContext({});

export const FirebaseContextProvider = ({ children }) => {
  const auth = getAuth(app);

  const [user, setUser] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = () => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }

  const handleSignout = () => {
    signOut(auth);
    setUser('');
  };

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.code);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        user,
        handleSignout,
        SignInWithGoogle,
        setUser,
        isLoading,
        checkAuth
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
