import React, { useState, useEffect } from 'react';
import Header from '../components/shared/Layout/Header';
import API from '../services/API';
import moment from 'moment';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    '#884A39',
    '#C38154',
    '#FFC26F',
    '#4F709C',
    '#4942E4',
    '#0C356A',
    '#279EFF',
    '#40A2E3',
  ];

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get('/analytics/bloodGroups-data');
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get('/inventory/get-recent-inventory');
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex flex-row flex-wrap">
          {data?.map((record, i) => (
            <div
              className="card m-2 p-1"
              key={i}
              style={{ width: '18rem', backgroundColor: `${colors[i]}` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">
                  {record.bloodGroup}
                </h1>
                <p className="card-text text-light">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text text-light">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.availableBlood}</b> (ML)
              </div>
            </div>
          ))}
        </div>

        <div className="container mt-4">
          <h3>Recent Blood Transactions</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donor Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity} (ML)</td>
                  <td>{record.email}</td>
                  <td>
                    {moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Analytics;
