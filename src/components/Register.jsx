import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useFirebaseContext } from '../context/FirebaseContext';


export const Register = () => {
  const { auth } = useFirebaseContext()
  const [registerError, setRegisterError] = useState('')

  const navigate = useNavigate()

  // yup validation
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8).required('A password is required'),
    passwordConfirmation: yup.string().required('Please retype your password').test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value })
  });

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  // react-use-form submit
  const onRegisterSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
      console.log("Successfuly created and logged in as: ", user.email)
      setRegisterError('')
      navigate('/')
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') setRegisterError('The provided email is already in use by an existing user. Each user must have a unique email. If this is your email, please login instead')
      alert(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegisterSubmit)}>
      <h1>Signup</h1>
      <p>{registerError}</p>
      <input {...register('email')} placeholder='email' style={(errors.email) ? { borderColor: 'red' } : null} />
      <p>{errors.email?.message}</p>
      <input {...register('password')} type='password' placeholder='password' style={(errors.password) ? { borderColor: 'red' } : null} />
      <p>{errors.password?.message}</p>
      <input {...register('passwordConfirmation')} type='password' placeholder='Confirm password' style={(errors.passwordConfirmation) ? { borderColor: 'red' } : null} />
      <p>{errors.passwordConfirmation?.message}</p>
      <button type='submit'>Signup</button>
    </form>
  )
}
