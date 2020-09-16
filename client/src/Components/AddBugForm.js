import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AddBugConfirmation from "./AddBugConfirmation";

const AddBugForm = (props) => {
  const [description, setDescription] = useState(
    props.showModal.initialDescription
  );
  const [assignedTo, setAssignedTo] = useState(
    props.showModal.initialAssignedTo
  );
  const [priority, setPriority] = useState("Low");
  const [confirm, setConfirm] = useState(false);

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const changeAssignedToHandler = (e) => {
    setAssignedTo(e.target.value);
  };

  const changePriorityHandler = (e) => {
    setPriority(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const bugToAddOrUpdate = {
      description: description,
      assignedto: assignedTo,
      openedByFirstName: props.userDetails.firstName,
      openedByLastName: props.userDetails.lastName,
      priority: priority,
    };

    switch (props.showModal.method) {
      case "GET":
        fetch("/bugs", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("tok")}`,
          },
          body: JSON.stringify(bugToAddOrUpdate),
        })
          .then((res) => {
            props.bugsLoadedHandler(false);
            setConfirm(true);
            setAssignedTo("");
            setDescription("");
            setTimeout(() => {
              setConfirm(false);
            }, 1500);
          })
          .catch((err) => console.log(err));
          break;
      case "PATCH":
        console.log(bugToAddOrUpdate);
        fetch(`/bugs/findbug/${props.showModal.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(bugToAddOrUpdate),
        })
          .then((res) => {
            props.bugsLoadedHandler(false);
            setConfirm(true);
            setTimeout(() => {
              setConfirm(false);
            }, 1500);
          })
          .catch((err) => console.log(err));
          break;
    }
  };

  return (
    <Form method="POST" onSubmit={submitHandler}>
      <Form.Group controlId="description" name="description">
        <Form.Control
          as="textarea"
          required={true}
          placeholder="Description"
          autoComplete="off"
          value={description}
          onChange={changeDescriptionHandler}
        />
      </Form.Group>
      <br />
      <Form.Group controlId="bugAssignedTo">
        <Form.Control
          placeholder="Assign To"
          autoComplete="off"
          required={true}
          value={assignedTo}
          onChange={changeAssignedToHandler}
        />
      </Form.Group>

      <br />
      <Form.Group controlId="bugPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Control as="select" onChange={changePriorityHandler}>
          <option>Low</option>
          <option>High</option>
        </Form.Control>
      </Form.Group>
      <br />
      <Button
        style={{ backgroundColor: "#FCB836", border: "none" }}
        type="submit"
      >
        {props.showModal.buttonText}
      </Button>
      {confirm && <AddBugConfirmation />}
    </Form>
  );
};

export default AddBugForm;
