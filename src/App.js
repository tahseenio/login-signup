import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  // TODO: FIGURE OUT A BETTER WAY TO DO ISLOADING FOR PROTECTEDROUTE AS IT IS A BIT IFFY RIGHT NOW
  // ADD USER FRIENDLY ERROR MESSAGES FOR LOGIN PAGE
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
