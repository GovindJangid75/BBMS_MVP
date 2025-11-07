import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import moment from 'moment';
import { getDonorInventory } from '../../services/firebasedbservice';
import { auth } from '../../firebaseConfig';

const DonorDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = auth.currentUser;

  const getInventoryData = async () => {
    try {
      setLoading(true);
      
      if (!currentUser) {
        setError('Please login to view your donations');
        setLoading(false);
        return;
      }

      // Use the service function to get donor's inventory
      const result = await getDonorInventory(currentUser.uid);
      
      if (result.success) {
        setData(result.data);
        setError('');
      } else {
        setError(result.error || 'Failed to load donations');
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setError('Failed to load donations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInventoryData();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h3>Donor Dashboard - Recent Donations</h3>
        
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <div className="alert alert-info mt-4">
                No donation records found. Make your first donation today!
              </div>
            ) : (
              <div className="table-responsive mt-4">
                <table className="table table-striped">
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
                    {data.map((record) => (
                      <tr key={record.id}>
                        <td>{record.bloodGroup}</td>
                        <td>{record.inventoryType || 'in'}</td>
                        <td>{record.quantity}</td>
                        <td>{record.email || currentUser?.email}</td>
                        <td>
                          {record.createdAt 
                            ? moment(record.createdAt.toDate()).format('DD/MM/YYYY hh:mm A')
                            : 'N/A'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default DonorDashboard;
