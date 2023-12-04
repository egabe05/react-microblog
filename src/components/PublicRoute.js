import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

const PublicRoute = ({ children }) => {
  const { user } = useUser();

  if (user === undefined) {
    return null;
  }
  else if (user) {
    return <Navigate to="/" />
  }
  else {
    return children
  }
}

export default PublicRoute;
