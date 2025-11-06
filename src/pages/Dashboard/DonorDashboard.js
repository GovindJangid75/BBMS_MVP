import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const DonorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getInventoryData = async () => {
    try {
      // Note: Backend doesn't have filtered endpoint - fetching all and filtering client-side
      const { data } = await API.get('/blood');
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventoryData();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h3>Donor Dashboard - Recent Donations</h3>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (ML)</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
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

export default DonorDashboard;
