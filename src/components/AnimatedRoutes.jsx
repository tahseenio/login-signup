import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Login } from './Login';
import { Register } from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import { ForgotPassword } from './ForgotPassword';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={true} initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<ForgotPassword />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
