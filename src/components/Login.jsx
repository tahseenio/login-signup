import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

import { useFirebaseContext } from '../context/FirebaseContext';

export const Login = () => {
  const [loginError, setLoginError] = useState('')

  const { SignInWithGoogle, logIn } = useFirebaseContext()
  const navigate = useNavigate()

  // yup validation
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8).required('A password is required'),
  });

  // react-use-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  // react-use-form submit
  const onLoginSubmit = async (data) => {
    try {
      await logIn(data.email, data.password).then(() => navigate('/'))
      setLoginError('')
    } catch (error) {
      setLoginError(error.message)
    }
  }

  const onGoogleLogin = () => {
    SignInWithGoogle().then(() => navigate('/'))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <h1>Login</h1>
        <p>{loginError}</p>
        <input {...register('email')} placeholder='email' style={(errors.email) ? { borderColor: 'red' } : null} />
        <p>{errors.email?.message}</p>
        <input {...register('password')} type='password' placeholder='password' style={(errors.password) ? { borderColor: 'red' } : null} />
        <p>{errors.password?.message}</p>
        <button>Login</button>
      </form>
      <Link to={'/register'}><button>Sign Up?</button></Link>
      <button onClick={onGoogleLogin}>Sign In with Google</button>
    </>
  )
}
