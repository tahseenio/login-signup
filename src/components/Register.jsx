import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useFirebaseContext } from '../context/FirebaseContext';


export const Register = () => {
  const [registerError, setRegisterError] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)

  const { createUser } = useFirebaseContext()

  const navigate = useNavigate()

  // yup validation
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password is too short').required('A password is required'),
    passwordConfirmation: yup.string().required('Please retype your password').test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value })
  });

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  // react-use-form submit
  const onRegisterSubmit = async (data) => {
    setRegisterLoading(true)
    try {
      await createUser(data.email, data.password).then(() => navigate('/'))
      setRegisterLoading(false)
    } catch (error) {
      setRegisterError(error.message)
      console.log(error.message)
      if (error.code === 'auth/email-already-in-use') setRegisterError('This email already exists. Sign in instead')
      setRegisterLoading(false)
    }
  }

  return (
    <main className='container__login'>
      <section className='form__login--wrapper'>
        <form className='form__login' onSubmit={handleSubmit(onRegisterSubmit)}>
          <h1 className='login__header'>Sign Up</h1>
          {registerLoading ? <span className="chaotic-orbit loader"></span> : <span className='loader'>&nbsp;</span>}
          <p className='login__para'>Please create your account below!</p>
          {registerError ? <p className='text--error'>{registerError}</p > : <p className='text--error'>&nbsp;</p>}
          <input className='login__input' {...register('email')} placeholder='✉ Email' style={(errors.email) ? { borderColor: 'red' } : null} />
          {errors.email?.message ? <p className='text--error'>{errors.email?.message}</p> : <p className='text--error'>&nbsp;</p>}
          <input className='login__input' {...register('password')} type='password' placeholder='🗝 Password' style={(errors.password) ? { borderColor: 'red' } : null} />
          {errors.password?.message ? <p className='text--error'>{errors.password?.message}</p> : <p className='text--error'>&nbsp;</p>}
          <input className='login__input' {...register('passwordConfirmation')} type='password' placeholder='🗝 Confirm password' style={(errors.passwordConfirmation) ? { borderColor: 'red' } : null} />
          {errors.passwordConfirmation?.message ? <p className='text--error'>{errors.passwordConfirmation?.message}</p> : <p className='text--error'>&nbsp;</p>}
          <button className='button' type='submit'>Signup</button>
        </form>
        <p className='signup__para'>Already a user? <Link to={'/login'}><span className='signup__link'>Log in now</span></Link></p>
      </section>
    </main>
  )
}
