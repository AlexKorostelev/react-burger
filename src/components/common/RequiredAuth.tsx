import { useLocation, Navigate } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../services/hooks/useAppSelector';

interface IRequiredAuthProps {
  redirectTo: string;
  children: ReactElement;
}

const RequiredAuth: FC<IRequiredAuthProps> = ({ redirectTo, children }) => {
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default RequiredAuth;
