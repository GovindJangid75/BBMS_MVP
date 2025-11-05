import React from 'react';
import Layout from '../../components/shared/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  navigate('/');
  return <Layout></Layout>;
};

export default OrganizationDashboard;
