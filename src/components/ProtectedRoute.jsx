import { Navigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useFirebaseContext();
  // !user -> means if the user doesnt exist do something
  return (
    !user
      ? <Navigate to={'/login'} />
      : children);
};
