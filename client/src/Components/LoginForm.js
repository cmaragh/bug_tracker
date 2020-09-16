import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [userExists, setUserExists] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePwHandler = (e) => {
    setPw(e.target.value);
  };

  const changePwConfirmHandler = (e) => {
    setPwConfirm(e.target.value);
  };

  const changeFirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const loginHandler = (credentials) => {
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("tok", res.token);
        props.showLoginHandler(false);
        setNewUser(false);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: pw,
    };

    loginHandler(credentials);
  };

  const signupHandler = () => {
    const credentials = {
      email: email,
      password: pw,
      firstName: firstName,
      lastName: lastName,
    };

    if (newUser) {
      if (pw !== pwConfirm) {
        alert("Passwords need to match!");
        return;
      } else if (firstName === "" || lastName === "") {
        alert("Please enter a First and Last Name for this user!");
        return;
      } else {
        fetch("/users/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        })
          .then((res) => {
            if (res.status === 409) {
              alert("Username already exists!");
              setUserExists(true);
              return;
            } else {
              return res.json();
            }
          })
          .then((res) => {
            if (!userExists) {
              console.log(res);
              loginHandler(credentials);
            }
          })
          .catch((err) => console.log(err));
      }
      return;
    }

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((res) => {
      if (res.status === 200) {
        alert("Username already exists!");
      } else {
        setNewUser(true);
      }
    });
  };

  const backgroundColor = {
    backgroundColor: "#FFE5B2",
  };

  return (
    <React.Fragment>
      <Modal show={props.showLogin} centered={true} onHide={() => {}}>
        <Modal.Header closeButton style={backgroundColor}>
          <Modal.Title>{newUser ? "Sign Up" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={backgroundColor}>
          <Form method="POST" onSubmit={submitHandler}>
            <Form.Group controlId="loginEmail">
              <Form.Control
                placeholder="E-mail"
                autoComplete="off"
                required={true}
                onChange={changeEmailHandler}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="loginPassword">
              <Form.Control
                placeholder="Password"
                autoComplete="off"
                type="password"
                onChange={changePwHandler}
                required={true}
              />
            </Form.Group>

            <br />
            {newUser && (
              <React.Fragment>
                <Form.Group controlId="confirmLoginPassword">
                  <Form.Control
                    placeholder="Confirm Password"
                    autoComplete="off"
                    type="password"
                    onChange={changePwConfirmHandler}
                  />
                </Form.Group>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Group>
                    <Form.Control
                      placeholder="First Name"
                      autoComplete="off"
                      onChange={changeFirstNameHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      placeholder="Last Name"
                      autoComplete="off"
                      onChange={changeLastNameHandler}
                    />
                  </Form.Group>
                </div>
                <br />
              </React.Fragment>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{ backgroundColor: "#FCB836", border: "none" }}
                type="submit"
                value="login"
                name="login"
                onClick={() => {
                  newUser && setNewUser(false);
                }}
              >
                Login
              </Button>
              <Button
                style={{
                  backgroundColor: "white",
                  border: "2px solid #FCB836",
                  fontWeight: "10px",
                  color: "#FCB836",
                }}
                value="signup"
                name="signup"
                onClick={signupHandler}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default LoginForm;
