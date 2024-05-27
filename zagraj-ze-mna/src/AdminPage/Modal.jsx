import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, user }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="user-details">
          <p><strong>ID:</strong> {user.ID_USER}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Country:</strong> {user.country}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Is Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;