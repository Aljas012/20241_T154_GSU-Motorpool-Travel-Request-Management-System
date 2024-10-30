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

import NavbarComponent from "./NavBarComponents";
import "./SignupGoogle.css";

function SignupGoogle() {
  return (
    <>
      <NavbarComponent />

      <Container>
        <Row>
          <Col>
            <img
              src="./images/PICT1.png"
              alt="pict1"
              className="img-fluid" // Makes the image responsive
              style={{
                maxWidth: "25rem",
                height: "auto",
                marginTop: "5rem",
                marginLeft: "2rem  ",
              }} // Adjust max width as needed
            />
          </Col>

          <Col>
            <Card style={{ backgroundColor: "#F1F1F1", marginTop: "5rem" }}>
              <Card.Body>
                <Form style={{ padding: "1.2rem" }}>
                  <InputGroup className="mb-3">
                    <Form.Control id="email"
                      type="email" // Specify type for email
                      placeholder="Institutional Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      style={{
                        backgroundColor: "#0760A1", // Set background color
                        color: "white", // Set text color
                        fontFamily: "Helvetica", // Set font family
                        border: "none", // Eliminate border
                        padding: "1rem", // Increase padding for larger field
                        fontSize: "1.rem", // Increase font size
                        height: "2.8rem", // Set a larger height
                      }}
                      className="custom-email-input" // Apply custom class for placeholder
                      autoComplete="off" // Disable autofill
                      readOnly
                      onFocus={(e) => e.target.removeAttribute('readonly')} // Remove readonly on focus
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control id="password"
                      type="password" // Specify type for password
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                      style={{
                        backgroundColor: "#0760A1", // Set background color
                        color: "white", // Set text color
                        fontFamily: "Helvetica", // Set font family
                        border: "none", // Eliminate border
                        padding: "1rem", // Increase padding for larger field
                        fontSize: "1.rem", // Increase font size
                        height: "2.8rem", // Set a larger height
                      }}
                      className="custom-email-input " // Apply custom class for placeholder
                    />
                  </InputGroup>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: "#0760A1",
                      fontFamily: "Helvetica",
                      border: "none",
                      fontSize: "1rem", // Increase font size
                      height: "2.8rem", // Set a larger height
                      borderRadius: "1.5rem", // Rounded corners
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

                  <Button
                    type="submit"
                    className="w-100 d-flex align-items-center justify-content-center mb-2" // Added justify-content-center
                    style={{
                      backgroundColor: "#F1F1F1",
                      fontFamily: "Helvetica",
                      border: "1px solid #00000080",
                      fontSize: "1rem",
                      height: "2.8rem",
                      borderRadius: "1.5rem",
                      color: "#0760A1",
                      paddingLeft: "0.5rem", // Optional: Add some left padding
                    }}
                  >
                    <img
                      src="./images/GOOGLE_LOGO.png" // Replace with your actual image path
                      alt="Google Logo"
                      style={{
                        width: "28px", // Adjust size as needed
                        height: "28px",
                        marginLeft: "0.5rem",
                        flexShrink: 0, // Prevent the image from shrinking
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
                    {/* Centered text */}
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
          <div className="text-center">
            <h6 style={{ color: "#767676", marginTop: "5rem" }}>
              Already have an Account?{" "}
              <a
                href="/login" // Replace with your actual login URL
                style={{
                  color: "#CD8800",
                  textDecoration: "none", // Remove underline
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
