import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { app } from '../firebase'
import { signInWithPopup, GoogleAuthProvider, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const SignInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider)
      console.log(user)
    }
    catch (error) {
      console.log(error.code)
    }
  }

  const [LoginError, setLoginError] = useState('')

  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8).required('A password is required'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })
  const onLoginSubmit = async (data) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email, data.password)
      console.log("Successfuly logged in as: ", user.email)
      setLoginError('')
      reset()
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <h1>Login</h1>
        <p>{LoginError}</p>
        <input {...register('email')} placeholder='email' style={(errors.email) ? { borderColor: 'red' } : null} />
        <p>{errors.email?.message}</p>
        <input {...register('password')} type='password' placeholder='password' style={(errors.password) ? { borderColor: 'red' } : null} />
        <p>{errors.password?.message}</p>
        <button>Login</button>
      </form>
      <Link to={'/register'}><button>Sign Up?</button></Link>
      <button onClick={SignInWithGoogle}>Sign In with Google</button>
    </>
  )
}
