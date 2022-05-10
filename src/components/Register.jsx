import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export const Register = () => {


  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        setUser(user)
      }
      else {
        setUser(null)
      }
    })
  }, [])

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  //     console.log(user.email)
  //     setErrorLogin(null)
  //   }
  //   catch (error) {
  //     setErrorLogin(error.code)
  //     console.log(error.code)
  //   }
  // }


  // const handleSignout = async () => {
  //   await signOut(auth)
  // }

  // const SignInWithGoogle = async () => {
  //   try {
  //     const user = await signInWithPopup(auth, provider)
  //     console.log(user)
  //   }
  //   catch (error) {
  //     console.log(error.code)
  //   }
  // }

  const [registerError, setRegisterError] = useState('')

  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8).required('A password is required'),
    passwordConfirmation: yup.string().required('Please retype your password').test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value })
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })
  const onRegisterSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
      console.log("Successfuly logged in as: ", user.email)
      setRegisterError('')
      reset()
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') setRegisterError('The provided email is already in use by an existing user. Each user must have a unique email. If this is your email, please login instead')
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onRegisterSubmit)}>
        <h1>Signup</h1>
        <p>{registerError}</p>
        <input {...register('email')} placeholder='email' />
        <p>{errors.email?.message}</p>
        <input {...register('password')} type='password' placeholder='password' />
        <p>{errors.password?.message}</p>
        <input {...register('passwordConfirmation')} type='password' placeholder='Confirm password' />
        <p>{errors.passwordConfirmation?.message}</p>
        <button type='submit'>Signup</button>
      </form>
      {/* <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <p style={{ color: 'red' }}>{errorLogin}</p>
        <label htmlFor="email">Email</label>
        <input id='email' type="text" placeholder='email' onChange={(e) => setLoginEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id='password' type="password" placeholder='password' onChange={(e) => setLoginPassword(e.target.value)} />
        <button>Lgin</button>
      </form>
      <button onClick={SignInWithGoogle}>Sign In with Google</button>
      {email}
      {password}
      {user ? (<><p>LOGGED IN AS: {user.email}</p> <button onClick={handleSignout}>Signout</button></>) : null}
      <p>USER VERIFIED? {user?.emailVerified ? "yes" : "no"}</p> */}
    </>
  )
}
