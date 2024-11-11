import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBarComponent from "../../COMPONENTS/UserNavBar/NavBarComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import "../../STYLES/SignUpManual.css";
import BG from "../../ASSETS/SignUpBG.svg";

import officeOptions from "../../ASSETS/officeOptions";

function SignUpManual() {
  return (
    <>
      {/** HEADER */}
      <NavBarComponent></NavBarComponent>

      {/** BODY */}
      <main>
        <Container>
          <Row className="fullHeight">
            <Col md={5} className="tunga">
              <div className="align">
                <img src={BG} alt="BG" className="backgroundImage" />
              </div>
            </Col>

            <Col md={7} className="tunga">
              <div className="align">
                {/** FORM SA MANUAL SIGN UP */}
                <Form className="customForm">
                  {/** PARA SA NAME */}
                  <Form.Group className="mb-2 d-flex" controlId="MART">
                    <Form.Control
                      className="customInputFieldSU"
                      type="text"
                      placeholder="Name"
                      required
                    />

                    {/** SELECTION SA OFFICES */}
                    <Form.Select className="customSelectSU" required>
                      {officeOptions.map((option, index) => (
                        <option
                          key={index}
                          value={option.value}
                          disabled={option.disabled || false}
                        >
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/** PARA SA EMAIL*/}
                  <Form.Group className="mb-2" controlId="MART">
                    <Form.Control
                      className="customInputFieldSU"
                      type="email"
                      placeholder="Institutional Email"
                      required
                    />
                  </Form.Group>

                  {/** PARA SA PASSWORD */}
                  <Form.Group className="mb-2" controlId="MART">
                    <Form.Control
                      className="customInputFieldSU"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="customButtonSU">
                    Create Account
                  </Button>

                  {/**  */}
                  <div className="align2">
                    <div className="line" />
                    <p className="noMargin customPad">or</p>
                    <div className="line" />
                  </div>

                  <div>
                    <Button
                      className="customButton1SU"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <FontAwesomeIcon icon={faGoogle} className="customIconSU" />
                      Sign Up with Google
                    </Button>
                  </div>

                  <div className="align1 customP mt-4">
                    <p>
                      This site is protected by reCAPTCHA,
                      <br />
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Services{" "}
                      </a>
                      apply
                    </p>
                  </div>
                </Form>
              </div>
            </Col>

            <div className="align1 ">
              <p className="customP1">
                Already Have an Account?{" "}
                <a href="/MART" className="effects">
                  <span className="letter">L</span>
                  <span className="letter">o</span>
                  <span className="letter">g</span>
                  <span> </span>
                  <span className="letter">i</span>
                  <span className="letter">n</span>
                </a>
              </p>
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default SignUpManual;
