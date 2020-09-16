import React, { useState } from "react";
import TopNav from "./Components/TopNav";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [searchedBugs, setSearchedBugs] = useState([]);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
  });

  const searchedBugsHandler = (bugs) => {
    setSearchedBugs(bugs);
  };

  const userDetailsHandler = (user) => {
    setUserDetails(user);
  };

  return (
    <Router>
      <TopNav
        searchedBugsHandler={searchedBugsHandler}
        userDetails={userDetails}
      />
      <Switch>
        <Route exact path="/">
          <Home
            searchedBugs={searchedBugs}
            userDetails={userDetails}
            userDetailsHandler={userDetailsHandler}
          />
        </Route>
        <Route>
          <Dashboard exact path="/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
