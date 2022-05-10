import React from 'react'
import { app } from '../firebase'
import { getAuth, signOut } from "firebase/auth";


export const Home = ({ checkAuth, user }) => {
  const auth = getAuth(app);

  const handleSignout = async () => {
    await signOut(auth)
    checkAuth()
  }

  return (
    <>
      <div>Welcome to Home</div>
      {user ? <p>Logged in as: {user.email}</p> : null}
      <button onClick={handleSignout}>Sign Out</button>
    </>
  )
}
