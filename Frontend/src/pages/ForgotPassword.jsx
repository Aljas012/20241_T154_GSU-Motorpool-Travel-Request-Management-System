import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";

import NavbarComponent from "../components/NavBarComponents";

function ForgotPassword() {
  return (
    <>
      <NavbarComponent />

      <main>
        <Container>
          <Row>
            <Col>
              <div style={{ marginTop: "4rem" }}>
                <Form>
                  <h5
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      color: "#0760A1",
                    }}
                  >
                    RECOVER ACCOUNT
                  </h5>
                  <Card
                    style={{
                      padding: "1.5rem 1rem 1rem 1rem",
                      backgroundColor: "#F1F1F1",
                    }}
                  >
                    <Card.Body>
                      <Form.Group
                        className="mb-3"
                        controlId="forgotPasswordEmailVerify"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Input Email"
                          autoComplete="off"
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
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="forgotPasswordCodeVerify"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Input Code"
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
                      </Form.Group>

                      <Button
                        type="submit"
                        className="w-100"
                        style={{
                          backgroundColor: "#0760A1",
                          fontFamily: "Helvetica",
                          border: "none",
                          fontWeight: "600",
                          height: "2.8rem",
                          borderRadius: "1.5rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        Recover Account
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
                    </Card.Body>
                  </Card>
                </Form>
              </div>
            </Col>

            <Col>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <img
                  src="./images/ForgotPassBG.png"
                  alt="forgPassBg"
                  style={{ width: "auto", height: "28rem" }}
                />
              </div>
            </Col>

            <div className="text-center">
              <h6 style={{ color: "#767676", marginTop: "5rem",fontFamily: "Helvetica", fontWeight: "600" }}>
                Already have an Account?{" "}
                <a
                  href="/login"
                  style={{
                    color: "#CD8800",
                    textDecoration: "none",
                    fontFamily: "Helvetica",
                    fontWeight: "600"
                  }}
                >
                  Log in
                </a>
              </h6>
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default ForgotPassword;
