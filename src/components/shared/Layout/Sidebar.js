import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import '../../../styles/Layout.css';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === 'organization' && (
            <>
              <div
                className={`menu-item ${location.pathname === '/' && 'active'}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === '/donors' && 'active'
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donors">Donors</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === '/hospitals' && 'active'
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospitals">Hospitals</Link>
              </div>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === '/donor-list' && 'active'
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donor-list">Donor List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === '/hospital-list' && 'active'
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === '/organization-list' && 'active'
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/organization-list">Organization List</Link>
              </div>
            </>
          )}
          {(user?.role === 'donor' || user?.role === 'hospital') && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === '/organizations' && 'active'
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/organizations">Organizations</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === '/donation' && 'active'
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donation">Donation</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === '/consumer' && 'active'
                }`}
              >
                <i className="fa-solid fa-user"></i>
                <Link to="/consumer">Consumer</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
