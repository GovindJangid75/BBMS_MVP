import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../shared/Spinner';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token && !loading) {
      navigate('/login');
    }
  }, [token, navigate, loading]);

  if (loading) {
    return <Spinner />;
  }

  return token ? children : null;
};

export default ProtectedRoute;
