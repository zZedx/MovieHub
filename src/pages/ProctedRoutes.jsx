import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const ProctedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuthenticated) navigate('/login')
  },[isAuthenticated , navigate])

  return children ;
};

export default ProctedRoutes;
