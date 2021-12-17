import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    let authToken = sessionStorage.getItem('Auth Token')
    const location = useLocation();
  
    return authToken
      ? children
      : <Navigate to="/admin/login" 
      replace 
      state={{ path: location.pathname }}
      />;
  }
export default RequireAuth;