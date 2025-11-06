import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import API from '../../../services/API';
import { toast } from 'react-toastify';

const InventoryModal = () => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert('Please provide all fields');
      }
      const { data } = await API.post('/blood', {
        email,
        organization: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success('New Record Created');
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleShow}
      >
        <i className="fa-solid fa-plus"></i> Add Inventory
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Manage Blood Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Blood Type</label>
            <div>
              <input
                type="radio"
                name="inventoryType"
                value="in"
                onChange={(e) => setInventoryType(e.target.value)}
                checked={inventoryType === 'in'}
              />{' '}
              IN
              <input
                type="radio"
                name="inventoryType"
                value="out"
                onChange={(e) => setInventoryType(e.target.value)}
                className="ms-3"
                checked={inventoryType === 'out'}
              />{' '}
              OUT
            </div>
          </div>
          {inventoryType === 'out' ? (
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Donor Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Blood Group</label>
            <select
              className="form-select"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">Select Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity (ML)</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InventoryModal;
