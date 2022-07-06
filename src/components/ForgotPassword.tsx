import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useFirebaseContext } from '../context/FirebaseContext';
import { motion } from 'framer-motion';

export const ForgotPassword = () => {
  const { forgotPassword } = useFirebaseContext();

  const [resetPassText, setResetPassText] = useState('');
  const [resetPassLoading, setResetPassLoading] = useState(false);

  // yup validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });

  type FormValues = {
    email: string;
  };

  // react-use-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  // react-use-form submit
  const onResetSubmit = async (data: { email: string }) => {
    setResetPassLoading(true);
    try {
      await forgotPassword(data.email);
      setResetPassText('Success! a password reset email has been sent');
      setResetPassLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setResetPassText(error.message);
        if (error.message === 'Firebase: Error (auth/user-not-found).') {
          setResetPassText('Email not found. Check again');
          setResetPassLoading(false);
        }
      }
    }
  };

  const loginVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <main className='container__login'>
      <motion.section
        variants={loginVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='form__login--wrapper'
      >
        <form className='form__login' onSubmit={handleSubmit(onResetSubmit)}>
          <h1 className='login__header'>Reset Password</h1>
          {resetPassLoading ? (
            <span className='chaotic-orbit loader'></span>
          ) : (
            <span className='loader'>&nbsp;</span>
          )}
          <p className='login__para'>Reset your password below</p>
          {resetPassText ? (
            <p
              className={
                resetPassText ===
                'Success! a password reset email has been sent'
                  ? 'text--success'
                  : 'text--error'
              }
            >
              {resetPassText}
            </p>
          ) : (
            <p className='text--error'>&nbsp;</p>
          )}
          <input
            className='login__input'
            {...register('email')}
            placeholder='✉ Email'
            autoComplete='new-email'
            style={errors.email ? { borderColor: 'red' } : undefined}
          />
          {errors.email?.message ? (
            <p className='text--error'>{errors.email?.message}</p>
          ) : (
            <p className='text--error'>&nbsp;</p>
          )}
          <button className='button button--login'>Reset Password</button>
        </form>
        <p className='signup__para'>
          Already reset your password?{' '}
          <Link to={'/login'}>
            <span className='signup__link'>Log in now</span>
          </Link>
        </p>
      </motion.section>
    </main>
  );
};
