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
  ListGroup,
} from "react-bootstrap";

import FooterComponent from "./FooterComponents";
import NavbarComponent from "./NavBarComponents";

function UserLandingPage() {
  return (
    <>
      <NavbarComponent />

      <main>
        <Container>
          <Row>
            <Row className="d-flex align-items-center">
              <Col>
                <div style={{ marginTop: "1rem" }}>
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: 500,
                      marginBottom: 0,
                    }}
                  >
                    INFORMATION TECHNOLOGY DEPARTMENT
                  </h6>
                  <h5 style={{ fontFamily: "Helvetica", fontWeight: 700 }}>
                    OFFICE CODE:{" "}
                    <span style={{ color: "#CD8800" }}>BLANKO SA DAW</span>
                  </h5>
                </div>
              </Col>

              <Col className="d-flex justify-content-around">
                <a
                  href="/home"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                  }}
                  className="mx-2"
                >
                  Home
                </a>
                <a
                  href="/about"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                  }}
                  className="mx-2"
                >
                  About
                </a>
                <a
                  href="/user-guide"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                  }}
                  className="mx-2"
                >
                  User Guide
                </a>
                <a
                  href="/profile"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                  }}
                  className="mx-2"
                >
                  Profile
                </a>
              </Col>
            </Row>

            <Row></Row>
          </Row>
        </Container>
      </main>

      <FooterComponent />
    </>
  );
}

export default UserLandingPage;
