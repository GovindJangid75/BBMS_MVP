import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layout/Layout';
import Modal from '../components/shared/Modal/Modal';
import API from '../services/API';
import moment from 'moment';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get('/blood');
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === 'admin' && navigate('/admin')}
      {user?.role === 'donor' && navigate('/donor')}
      {user?.role === 'hospital' && navigate('/hospital')}
      <div className="container">
        <h4 className="mt-3">
          {user?.role === 'organization'
            ? 'Manage Blood Inventory'
            : 'Blood Records'}
        </h4>
        {user?.role === 'organization' && <Modal />}
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (ML)</th>
              <th scope="col">Donor Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default HomePage;
