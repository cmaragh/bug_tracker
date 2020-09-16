import React from "react";

const BugDescription = (props) => {
  const prepareInfoForModal = () => {
    fetch(`/bugs/findbug/${props.bug._id}`)
      .then((res) => res.json())
      .then((bug) => {
        const modalInfo = {
          open: true,
          method: "PATCH",
          id: props.bug._id,
          title: "Update Bug",
          buttonText: "Update Bug",
          initialDescription: bug.bug.description,
          initialAssignedTo: bug.bug.assignedto,
          initialPriority: bug.bug.priority
        };
        props.showModalHandler(modalInfo);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <input
        onClick={props.deleteBugsHandler.bind(this, props.bug._id)}
        style={{ marginRight: "25px", marginLeft: "5px" }}
        type="checkbox"
      ></input>
      <a
        href="#"
        onClick={prepareInfoForModal}
        style={{ textDecoration: "none" }}
      >
        <h6>{props.description}</h6>
      </a>
    </div>
  );
};

export default BugDescription;
