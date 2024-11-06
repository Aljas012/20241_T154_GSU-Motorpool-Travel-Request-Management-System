import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Card,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import NavbarComponent from "../components/NavBarComponents";
import "../styles/SignupGoogle.css";

function SignupGoogle() {
  // Correctly using useState to handle form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // For email input
  const [password, setPassword] = useState(""); // For password input
  const [error, setError] = useState(null); // For handling errors

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fix typo: It should be 'preventDefault' (not 'prevenDefault')
    if (!name || !email || !password) {
      setError("Please fill in all the fields");
      return; // Prevent form submission if any field is empty
    }

    const data = { name, email, password };

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json", // Headers should be plural: 'headers'
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error); // Show error if signup fails
      } else {
        // Clear the form and reset state if signup is successful
        setName("");
        setEmail("");
        setPassword("");
        setError(null);
        console.log("New user account added");
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred, please try again."); // Catch network errors
    }
  };
  const navigate = useNavigate();
  return (
    <>
      {/* HEADER */}
      <NavbarComponent />

      {/* BODY */}
      <Container>
        <Row>
          {/* FIRST COLUMN / LEFT SIDE */}
          <Col>
            <img
              src="./images/PICT1.png"
              alt="pict1"
              className="img-fluid"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginTop: "5rem",
                marginLeft: "2rem",
              }}
            />
          </Col>

          {/* SECOND COLUMN / RIGHT SIDE */}
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1", marginTop: "5rem" }}>
              <Card.Body>
                <Form onSubmit={handleSubmit} style={{ padding: "1.2rem" }}>
                  {/** EMAIL INPUT FIELD */}
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="name"
                      type="name"
                      placeholder="Full name"
                      aria-label="Name"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setName(e.target.value)} // Updating email state on change
                      value={name} // Binding state to input field
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1rem",
                        height: "2.8rem",
                      }}
                      className="custom-input"
                      autoComplete="off"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="email"
                      type="email"
                      placeholder="Institutional Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setEmail(e.target.value)} // Updating email state on change
                      value={email} // Binding state to input field
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1rem",
                        height: "2.8rem",
                      }}
                      className="custom-input"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {/* PASSWORD INPUT FIELD */}
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setPassword(e.target.value)} // Updating password state on change
                      value={password} // Binding state to input field
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1rem",
                        height: "2.8rem",
                      }}
                      className="custom-input"
                    />
                  </InputGroup>
                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: "#0760A1",
                      fontFamily: "Helvetica",
                      border: "none",
                      fontSize: "1rem",
                      height: "2.8rem",
                      borderRadius: "1.5rem",
                    }}
                  >
                    Create Account
                  </Button>
                  {error && (
                    <div
                      className="alert alert-danger mt-3"
                      role="alert"
                      style={{ textAlign: "center" }}
                    >
                      {error}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: ".8px",
                        backgroundColor: "#00000080",
                      }}
                    />
                    <h6 style={{ margin: "0 1rem" }} className="text-center">
                      or
                    </h6>
                    <div
                      style={{
                        flex: 1,
                        height: ".8px",
                        backgroundColor: "#00000080",
                      }}
                    />
                  </div>
                  <Button
                    type="button" // This should not be a 'submit' button, since it's for Google login
                    className="w-100 d-flex align-items-center justify-content-center mb-2"
                    style={{
                      backgroundColor: "#F1F1F1",
                      fontFamily: "Helvetica",
                      border: "1px solid #00000080",
                      fontSize: "1rem",
                      height: "2.8rem",
                      borderRadius: "1.5rem",
                      color: "#0760A1",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    <img
                      src="./images/GOOGLE_LOGO.png"
                      alt="Google Logo"
                      style={{
                        width: "28px",
                        height: "28px",
                        marginLeft: "0.5rem",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        flexGrow: 1,
                        textAlign: "center",
                        marginRight: "2rem",
                      }}
                    >
                      Sign up with Google
                    </span>
                  </Button>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      fontFamily: "Helvetica",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      This site is protected by reCAPTCHA
                    </p>
                    <p style={{ margin: 0 }}>
                      <a
                        href="https://policies.google.com/privacy"
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          textDecoration: "none",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Privacy
                      </a>
                      <span style={{ margin: "0 0.25rem" }}>and</span>
                      <a
                        href="https://policies.google.com/terms"
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          textDecoration: "none",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>
                      <span style={{ marginLeft: "0.25rem" }}>apply</span>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* ALREADY HAVE AN ACCOUNT */}
          <div className="text-center">
            <h6
              style={{
                color: "#767676",
                marginTop: "5rem",
                fontFamily: "Helvetica",
                fontWeight: "600",
              }}
            >
              Already have an Account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default link behavior
                  navigate("/"); // Redirect to the index (homepage)
                }}
                style={{
                  color: "#CD8800",
                  textDecoration: "none",
                  fontFamily: "Helvetica",
                  fontWeight: "600",
                }}
              >
                Log in
              </a>
            </h6>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default SignupGoogle;
