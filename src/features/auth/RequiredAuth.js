import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../app/slices/authSlice';

function RequiredAuth() {
  const token = useSelector(selectAccessToken);
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
}

export default RequiredAuth;
