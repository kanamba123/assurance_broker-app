// src/utils/CustomModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onClose, onConfirm, title, body, confirmText, cancelText }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancelText || "Cancel"}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText || "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
