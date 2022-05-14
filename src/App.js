import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ForgotPassword } from './components/ForgotPassword';

const App = () => {
  // TODO: FIGURE OUT A BETTER WAY TO DO ISLOADING FOR PROTECTEDROUTE AS IT IS A BIT IFFY RIGHT NOW
  // ADD USER FRIENDLY ERROR MESSAGES FOR LOGIN PAGE
  // add loading state for pie chart data fetching
  // add app check protection
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
