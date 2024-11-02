import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Card,
  Button,
} from "react-bootstrap";

import NavbarComponent from "../components/NavBarComponents";
import "../styles/SignupGoogle.css";

function SignupGoogle() {
  return (
    <>
      {/** HEADER */}
      <NavbarComponent />

      {/** BODY */}
      <Container>
        <Row>
          {/** FIRST COLUMN / LEFT SIDE */}
          <Col>
            <img
              src="./images/PICT1.png"
              alt="pict1"
              className="img-fluid"
              style={{
                maxWidth: "25rem",
                height: "auto",
                marginTop: "5rem",
                marginLeft: "2rem  ",
              }}
            />
          </Col>

          {/** SECONDD COLUMN / RIGHT SIDE */}
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1", marginTop: "5rem" }}>
              <Card.Body>
                <Form style={{ padding: "1.2rem" }}>
                  {/** EMAIL INPUT FIELD */}
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="email"
                      type="email"
                      placeholder="Institutional Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1.rem",
                        height: "2.8rem",
                      }}
                      className="custom-input"
                      autoComplete="off"
                      readOnly
                      onFocus={(e) => e.target.removeAttribute("readonly")}
                    />
                  </InputGroup>

                  {/** PASSWORD INPUT FIELD */}
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                      style={{
                        backgroundColor: "#0760A1",
                        color: "white",
                        fontFamily: "Helvetica",
                        border: "none",
                        padding: "1rem",
                        fontSize: "1.rem",
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
                    <h7 style={{ margin: "0 1rem" }} className="text-center">
                      or
                    </h7>
                    <div
                      style={{
                        flex: 1,
                        height: ".8px",
                        backgroundColor: "#00000080",
                      }}
                    />
                  </div>

                  {/** SIGN UP WITH GOOGLE */}
                  <Button
                    type="submit"
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
                    </span>{" "}
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
                      {/** GOOGLE PRIVACY  */}
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
                      {/** TERMS OF SERVICE  */}
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

          {/** ALREADY HAVE AN ACCOUNT */}
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
                href="/login"
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
