import React from "react";
import SearchSVG from "./SearchSVG";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const TopNav = (props) => {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#FCB836" }}
      sticky="top"
      variant="dark"
    >
      <Nav>
        <Nav.Link as={Link} to="/" className="px-3 m-auto">
          Home
        </Nav.Link>

        <Nav.Link as={Link} to="/dashboard" className="px-3 m-auto">
          Dashboard
        </Nav.Link>
      </Nav>
      <div
        className="px-3 m-auto mr-0 ml-auto"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <SearchSVG searchedBugsHandler={props.searchedBugsHandler} />
        <div
          className="px-3 m-auto"
          style={{ display: "flex", flexDirection: "column", color: "white" }}
        >
          <p className="m-0">Logged in as</p>
          <b className="m-0">{`${
            props.userDetails.firstName
          } ${props.userDetails.lastName.substring(0, 1)}.`}</b>
        </div>
      </div>
    </Navbar>
  );
};

export default TopNav;
