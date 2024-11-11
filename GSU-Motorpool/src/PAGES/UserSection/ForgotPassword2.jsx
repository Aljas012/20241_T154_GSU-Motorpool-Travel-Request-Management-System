import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../STYLES/ForgotPassword.css";

import BG from "../../ASSETS/ForgotPasswordBG.svg";

import NavBarComponent from "../../COMPONENTS/UserNavBar/NavBarComponent";

function ForgotPassword2() {
  return (
    <>
      <NavBarComponent />

      <main>
        <Container>
          <Row className="fullHeight">
            <Col md={7}>
              <div>
                <h5 className="customHeaderFP">RECOVER ACCOUNT</h5>

                <Form className="customForm">
                  <Form.Group className="mb-2" controlId="MART">
                    <Form.Control
                      className="customInputFieldFP"
                      type="password"
                      placeholder="New Password"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="MART">
                    <Form.Control
                      className="customInputFieldFP"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Form.Group>

                  <Button className="customButton1FP" type="submit">Recover Account</Button>

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
            <Col md={5}>
              <div>
                <img src={BG} alt="BG" className="backgroundImageFP" />
              </div>
            </Col>
          </Row>

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
        </Container>
      </main>
    </>
  );
}

export default ForgotPassword2;
