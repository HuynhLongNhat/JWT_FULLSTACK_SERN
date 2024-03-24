import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ModalDelete(props) {
  return (
    <>
      <Modal show={props.show} onClick={props.toggleShowModal}>
        <Modal.Header closeButton onClick={props.toggleShowModal}>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this user : {props.dataModal.email} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.toggleShowModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
