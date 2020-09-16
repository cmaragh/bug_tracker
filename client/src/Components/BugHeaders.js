import React from "react";
import DeleteBugSVG from "./DeleteBugSVG";

const BugHeaders = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottom: "solid 2px",
        margin: "2em",
      }}
    >
      <div style={{ flex: "1" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <DeleteBugSVG
            bugsToDelete={props.bugsToDelete}
            bugsLoadedHandler={props.bugsLoadedHandler}
          />
          <h4>Bug Description</h4>
        </div>
      </div>
      <div
        style={{
          flex: "1.5",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <h4>Created</h4>
        <h4>Opened By</h4>
        <h4>Assigned To</h4>
        <h4>Priority</h4>
        <h4>Status</h4>
      </div>
    </div>
  );
};

export default BugHeaders;
