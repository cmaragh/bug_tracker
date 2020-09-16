import React from "react";
import "./AddBugButton.css";

const AddBugButton = (props) => {
  return (
    <a href="#" className="circle" onClick={props.modalHandler}>
      +
    </a>
  );
};

export default AddBugButton;
