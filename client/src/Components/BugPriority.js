import React from "react";

const BugPriority = (props) => {
  const priorityStyle = () => {
    return props.priority === "Low"
      ? {
          fontWeight: "bold",
          color: "#4643EC",
        }
      : {
          fontWeight: "bold",
          color: "#FF0000",
        };
  };

  return <h6 style={priorityStyle()}>{props.priority}</h6>;
};

export default BugPriority;
