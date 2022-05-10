import { Register } from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from './firebase'
import { Loading } from './components/Loading';

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const auth = getAuth(app);

  const checkAuth = () => {
    setIsLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        setUser(user)
        setIsLoading(false)
      }
      else {
        setUser(null)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <div className="App">
      {isLoading && <Loading />}
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home checkAuth={checkAuth} user={user} /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
