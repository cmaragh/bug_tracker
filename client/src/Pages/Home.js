import React, { useState, useEffect } from "react";
import BugHeaders from "../Components/BugHeaders";
import BugContainer from "../Components/BugContainer";
import AddBugModal from "../Components/AddBugModal";
import LoginForm from "../Components/LoginForm";

const Home = (props) => {
  const [opacity, setOpacity] = useState("0");
  useEffect(() => {
    setOpacity("1");
  }, []);

  const [bugsLoaded, setBugsLoaded] = useState(false);
  const [bugsToDelete, setBugsToDelete] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState({ open: false });
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    if (!bugsLoaded && !showLogin) {
      fetch("/bugs", {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tok")}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 401) {
            setShowLogin(true);
            return res.status;
          }
          return res.json();
        })
        .then((result) => {
          if (result !== 401) {
            renderBugs(result.bugs);
            props.userDetailsHandler({
              firstName: result.userData.firstName,
              lastName: result.userData.lastName,
            });
            setBugsLoaded(true);
          }
        });
    }
  }, [bugsLoaded, showLogin]);

  const renderBugs = (bugs) => {
    const renderedBugs = bugs.map((bug) => {
      return (
        <BugContainer
          bug={bug}
          key={bug._id}
          deleteBugsHandler={deleteBugsHandler}
          showModalHandler={showModalHandler}
        />
      );
    });

    setBugs(renderedBugs);
  };

  useEffect(() => {
    if (typeof props.searchedBugs !== "undefined") {
      searchedBugsHandler(props.searchedBugs);
    }
  }, [props.searchedBugs]);

  const searchedBugsHandler = (bugs) => {
    renderBugs(bugs);
  };

  const bugsLoadedHandler = (bool) => {
    setBugsLoaded(bool);
  };

  const showLoginHandler = (bool) => {
    setShowLogin(bool);
  };

  const deleteBugsHandler = (id) => {
    if (!bugsToDelete.includes(id)) {
      const addToBugs = bugsToDelete;
      addToBugs.push(id);
      setBugsToDelete(addToBugs);
    } else {
      const index = bugsToDelete.indexOf(id);
      const changedArray = bugsToDelete.splice(index, 1);
      console.log(changedArray);
      setBugsToDelete(changedArray);
    }
  };

  const showModalHandler = (modalDetails) => {
    setShowModal(modalDetails);
  };

  return (
    <React.Fragment>
      <div style={{ opacity: opacity, transition: ".8s" }}>
        <BugHeaders
          bugsToDelete={bugsToDelete}
          bugsLoadedHandler={bugsLoadedHandler}
        />
        {bugs}
      </div>
      <AddBugModal
        bugsLoadedHandler={bugsLoadedHandler}
        showModalHandler={showModalHandler}
        showModal={showModal}
        userDetails={props.userDetails}
      />
      <LoginForm
        showLogin={showLogin}
        showLoginHandler={showLoginHandler}
        userDetailsHandler={props.userDetailsHandler}
      />
    </React.Fragment>
  );
};

export default Home;
