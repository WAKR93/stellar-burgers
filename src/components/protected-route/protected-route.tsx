import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth = false,
  children
}) => {
  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export { ProtectedRoute };
