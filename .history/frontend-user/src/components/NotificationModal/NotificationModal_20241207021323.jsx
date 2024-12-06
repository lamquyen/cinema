import React from "react";
import "./NotificationModal.css";

function NotificationModal({ message, isOpen, onClose }) {
  return (
    <div className={`notification-modal ${isOpen ? "is-open" : ""}`}>
      <div className="notification-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{message}</h2>
      </div>
    </div>
  );
}

export default NotificationModal;