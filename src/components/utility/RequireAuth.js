import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "./cookies";

const RequireAuth = ({ children }) => {
    let authToken = getCookie('auth_token')
    const location = useLocation();

    return authToken
      ? children
      : <Navigate to="/admin/login" 
      replace 
      state={{ path: location.pathname }}
      />;
}

export default RequireAuth;