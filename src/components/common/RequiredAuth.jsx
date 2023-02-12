import {useDispatch, useSelector} from "react-redux";
import {useLocation, Navigate} from "react-router-dom";
import {useEffect} from "react";

const RequiredAuth = ({ redirectTo, children }) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default RequiredAuth;
