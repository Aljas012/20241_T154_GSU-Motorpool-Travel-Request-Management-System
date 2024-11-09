import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../STYLES/UserLandingPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

import BSUIcon from "../../ASSETS/BSUIcon.svg";

function UserLandingPage() {
  return (
    <main className="user-landing-page">
      <Container fluid className="background-container">
        <Row>
          {/** */}
          <Col md={6} className="divCenter">
            <div>
              {/** HEADER */}
              <div className="mb-5">
                <h1 className="textGradient textFont textPadding ">BUKSU</h1>
                <h1 className="textGradient textFont textPadding ">
                  GSU MOTORPOOL
                </h1>
                <h2 className="textFont textSize1 colorOrange textPadding">
                  Request Management System
                </h2>
              </div>

              {/** HEAADER FOR INPUTS */}
              <div className="mb-2">
                <h2 className="textSize1 textFont colorGray textPadding">
                  Sign-in to your Account!
                </h2>
              </div>

              {/** FORM */}
              <div className="mb-2">
                <Form>
                  {/** INPUT FIELD FOR EMAIL */}
                  <div className="alignCenter position-relative mb-2">
                    <Form.Control
                      id="MART"
                      type="email"
                      placeholder="Email"
                      className="customInputField"
                    />

                    <FontAwesomeIcon
                      icon={faUser}
                      className="customBounce iconStyle"
                    />
                  </div>

                  {/** INPUT FIELD FOR PASSWORD */}
                  <div className="alignCenter position-relative  mb-2">
                    <Form.Control
                      id="MART"
                      type="password"
                      placeholder="Password"
                      className="customInputField"
                    />

                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="customBounce iconStyle"
                    />
                  </div>

                  {/** LOG IN BUTTON */}
                  <div>
                    <Button className="customButton" type="submit">
                      Log In
                    </Button>
                  </div>
                </Form>
              </div>

              {/** EXTRAS */}
              <div className="alignCenter1">
                {/** SIGN IN WITH GOOGLE */}
                <div className="mb-3">
                  <p className="textFont1">
                    or sign in with{" "}
                    <a href="/MART" className="noLine google-animation">
                      <span
                        style={{ color: "#FF4B26" }}
                        className="google-letter"
                      >
                        G
                      </span>
                      <span
                        style={{ color: "#FFD500" }}
                        className="google-letter"
                      >
                        o
                      </span>
                      <span
                        style={{ color: "#12B347" }}
                        className="google-letter"
                      >
                        o
                      </span>
                      <span
                        style={{ color: "#0F993E" }}
                        className="google-letter"
                      >
                        g
                      </span>
                      <span
                        style={{ color: "#167EE6" }}
                        className="google-letter"
                      >
                        l
                      </span>
                      <span
                        style={{ color: "#167EE6" }}
                        className="google-letter"
                      >
                        e
                      </span>
                    </a>
                  </p>
                </div>

                <div className="mb-4 effects-link">
                  <a href="/MART" className="textFont2">
                    <p>
                      <span className="letter">L</span>
                      <span className="letter">o</span>
                      <span className="letter">g</span>
                      <span className="letter">i</span>
                      <span className="letter">n</span>
                      <span className=""> </span>
                      <span className="letter">a</span>
                      <span className="letter">s</span>
                      <span className=""> </span>
                      <span className="letter">A</span>
                      <span className="letter">d</span>
                      <span className="letter">m</span>
                      <span className="letter">i</span>
                      <span className="letter">n</span>
                    </p>
                  </a>
                </div>

                <div className="effects-link">
                  <a href="/MART" className="textFont3">
                    <p>
                      <span className="letter">F</span>
                      <span className="letter">o</span>
                      <span className="letter">r</span>
                      <span className="letter">g</span>
                      <span className="letter">o</span>
                      <span className="letter">t</span>
                      <span className=""> </span>
                      <span className="letter">P</span>
                      <span className="letter">a</span>
                      <span className="letter">s</span>
                      <span className="letter">s</span>
                      <span className="letter">w</span>
                      <span className="letter">o</span>
                      <span className="letter">r</span>
                      <span className="letter">d</span>
                      <span className="letter">?</span>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </Col>

          {/** */}
          <Col md={6} className="divCenter1">
            <div>
              {/** HEADER */}
              <div>
                <h3 className="textFont4 textPadding">
                  Educate. Innovate. Lead.
                </h3>
                <h2 className="textFont5 textPadding">Welcome Back!</h2>
              </div>

              <div className="mt-3">
                {/** SIGN UP BUTTON */}
                <Button className="customButton1">
                  <div className="alignCenter2">
                    <img src={BSUIcon} alt="BSU" className="iconStyle1" />
                    No Account Yet? Sign Up
                  </div>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default UserLandingPage;
