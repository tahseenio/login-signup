import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useFirebaseContext } from './context/FirebaseContext'
import { Home } from './pages/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Loading } from './components/Loading';

const App = () => {
  const { user, isLoading, checkAuth } = useFirebaseContext()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div className="App">
      {isLoading ? <Loading /> : null}
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
