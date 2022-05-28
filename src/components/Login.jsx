import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

import { useFirebaseContext } from '../context/FirebaseContext';

export const Login = () => {
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const { SignInWithGoogle, logIn } = useFirebaseContext()

  const navigate = useNavigate()

  // yup validation
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('A password is required').min(8, 'Password is too short'),
  });

  // react-use-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  // react-use-form submit
  const onLoginSubmit = async (data) => {
    setLoginLoading(true)
    try {
      await logIn(data.email, data.password).then(() => navigate('/'))
      setLoginError('')
      setLoginLoading(false)
    } catch (error) {
      setLoginError(error.message)
      if (error.message === 'Firebase: Error (auth/wrong-password).') setLoginError("Wrong password")
      if (error.message === 'Firebase: Error (auth/user-not-found).') setLoginError("Email does not exist")
      setLoginLoading(false)
    }
  }

  const onGoogleLogin = async () => {
    setLoginLoading(true)
    try {
      await SignInWithGoogle().then(() => navigate('/'))
      setLoginError('')
      setLoginLoading(false)
    } catch (error) {
      setLoginLoading(false)
    }
  }

  const loginVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0" },
    exit: { opacity: 0, y: "100vh" }
  }

  return (
    <main className='container__login'>
      <motion.section
        variants={loginVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='form__login--wrapper'
      >
        <form className='form__login' onSubmit={handleSubmit(onLoginSubmit)}>
          <h1 className='login__header'>Login</h1>
          <p className='login__para'>Please login below!</p>
          {loginError ? <p className='text--error'>{loginError}</p > : <p className='text--error'>&nbsp;</p>}
          <input className='login__input' {...register('email')} placeholder='✉ Email' style={(errors.email) ? { borderColor: 'red' } : null} />
          {errors.email?.message ? <p className='text--error'>{errors.email?.message}</p> : <p className='text--error'>&nbsp;</p>}
          <input className='login__input' {...register('password')} type='password' placeholder='🗝 Password' style={(errors.password) ? { borderColor: 'red' } : null} />
          {errors.password?.message ? <p className='text--error'>{errors.password?.message}</p> : <p className='text--error'>&nbsp;</p>}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className='button button--login'
          >{loginLoading ? <span className="chaotic-orbit"></span> : 'Login'}</motion.button>
        </form>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className='button button--google' onClick={onGoogleLogin}
        > <FcGoogle className='google_icon' />Login with Google</motion.button>
        <Link to={'/forgot'}><p className='signup__para signup__link'>Forgot password?</p></Link>
        <p className='signup__para signup__para--login'>Not a user? <Link to={'/register'}><span className='signup__link'>Sign up now</span></Link></p>
      </motion.section>
    </main >
  )
}
