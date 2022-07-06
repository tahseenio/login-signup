import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { motion } from 'framer-motion';

import { useFirebaseContext } from '../context/FirebaseContext';

export const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  const { createUser } = useFirebaseContext();

  const navigate = useNavigate();

  // yup validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('A password is required')
      .min(8, 'Password is too short'),
    passwordConfirmation: yup
      .string()
      .required('Please retype your password')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  });

  type FormValues = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  interface dataProps {
    email: string;
    password: string;
  }

  // react-use-form submit
  const onRegisterSubmit = async (data: dataProps) => {
    setRegisterLoading(true);
    try {
      await createUser(data.email, data.password).then(() => navigate('/'));
      setRegisterLoading(false);
    } catch (error: any) {
      setRegisterError(error.message);
      console.log(error.message);
      if (error.message === 'auth/email-already-in-use')
        setRegisterError('This email already exists. Sign in instead');
      setRegisterLoading(false);
    }
  };

  const registerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <main className='container__login'>
      <motion.section
        variants={registerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='form__login--wrapper'
      >
        <form className='form__login' onSubmit={handleSubmit(onRegisterSubmit)}>
          <h1 className='login__header'>Sign Up</h1>
          <p className='login__para'>Please create your account below!</p>
          {registerError ? (
            <p className='text--error'>{registerError}</p>
          ) : (
            <p className='text--error'>&nbsp;</p>
          )}
          <input
            className='login__input'
            {...register('email')}
            placeholder='✉ Email'
            autoComplete='email'
            style={errors.email ? { borderColor: 'red' } : undefined}
          />
          {errors.email?.message ? (
            <p className='text--error'>{errors.email?.message}</p>
          ) : (
            <p className='text--error'>&nbsp;</p>
          )}
          <input
            className='login__input'
            {...register('password')}
            type='password'
            placeholder='🗝 Password'
            autoComplete='current-password'
            style={errors.password ? { borderColor: 'red' } : undefined}
          />
          {errors.password?.message ? (
            <p className='text--error'>{errors.password?.message}</p>
          ) : (
            <p className='text--error'>&nbsp;</p>
          )}
          <input
            className='login__input'
            {...register('passwordConfirmation')}
            type='password'
            placeholder='🗝 Confirm password'
            autoComplete='current-password'
            style={
              errors.passwordConfirmation ? { borderColor: 'red' } : undefined
            }
          />
          {errors.passwordConfirmation?.message ? (
            <p className='text--error'>
              {errors.passwordConfirmation?.message}
            </p>
          ) : (
            <p className='text--error'>&nbsp;</p>
          )}
          <button className='button button--signup' type='submit'>
            {registerLoading ? (
              <span className='chaotic-orbit'></span>
            ) : (
              'Signup'
            )}
          </button>
        </form>
        <p className='signup__para'>
          Already a user?{' '}
          <Link to={'/login'}>
            <span className='signup__link'>Log in now</span>
          </Link>
        </p>
      </motion.section>
    </main>
  );
};
