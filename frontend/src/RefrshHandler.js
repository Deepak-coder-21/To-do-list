import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('jwtToken')) {
            setIsAuthenticated(true);
            if(location.pathname === '/login' || location.pathname === '/' || location.pathname === '/signup' ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate , setIsAuthenticated]);
  return (
    null
  )
}

export default RefrshHandler;
