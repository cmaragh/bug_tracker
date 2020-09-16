import React, { useState } from "react";
import AddBugButton from "./AddBugButton";
import AddBugForm from "./AddBugForm";
import { Modal, Button } from "react-bootstrap";

const AddBugModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () =>
    props.showModalHandler({
      open: false,
      method: "GET",
      id: null,
      title: "Create New Bug",
      buttonText: "Add Bug",
      initialDescription: "",
      initialAssignedTo: "",
      initialPriority: null,
    });
  const handleShow = () =>
    props.showModalHandler({
      open: true,
      method: "GET",
      id: null,
      title: "Create New Bug",
      buttonText: "Add Bug",
      initialDescription: "",
      initialAssignedTo: "",
      initialPriority: null,
    });

  const backgroundColor = {
    backgroundColor: "#FFE5B2",
  };

  return (
    <React.Fragment>
      <AddBugButton modalHandler={handleShow} />

      <Modal show={props.showModal.open} centered={true} onHide={handleClose}>
        <Modal.Header closeButton style={backgroundColor}>
          <Modal.Title>{props.showModal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={backgroundColor}>
          <AddBugForm
            bugsLoadedHandler={props.bugsLoadedHandler}
            showModal={props.showModal}
            userDetails={props.userDetails}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddBugModal;
