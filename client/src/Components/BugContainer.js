import React from "react";
import BugDescription from "./BugDescription";
import BugTimeStamp from "./BugTimeStamp";
import BugOpenedBy from "./BugOpenedBy";
import BugAssignedTo from "./BugAssignedTo";
import BugPriority from "./BugPriority";
import BugStatus from "./BugStatus";

const BugContainer = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottom: "solid 1px #BABABA",
        margin: "2em",
      }}
    >
      <div style={{ flex: "1" }}>
        <BugDescription
          description={props.bug.description}
          bug={props.bug}
          deleteBugsHandler={props.deleteBugsHandler}
          showModalHandler={props.showModalHandler}
        />
      </div>
      <div
        style={{
          flex: "1.5",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <BugTimeStamp />
        <BugOpenedBy
          openedBy={
            typeof props.bug.openedByFirstName === "undefined"
              ? "Courtney M."
              : `${
                  props.bug.openedByFirstName
                } ${props.bug.openedByLastName.substring(0, 1)}.`
          }
        />
        <BugAssignedTo assignedTo={props.bug.assignedto} />
        <BugPriority priority={props.bug.priority} />
        <BugStatus status={props.bug.status} />
      </div>
    </div>
  );
};

export default BugContainer;
