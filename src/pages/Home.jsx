import React from 'react';
import { useFirebaseContext } from '../context/FirebaseContext';

export const Home = () => {
  const { user, handleSignout } = useFirebaseContext();

  return (
    <>
      <div>Welcome to Home</div>
      <p>Logged in as: {user.email}</p>
      <button onClick={handleSignout}>Sign Out</button>
    </>
  );
};
