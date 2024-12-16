import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";


import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../STYLES/AdminGuide.css";

function AdminGuide() {
  return (
    <>
      {/** HEADER */}
      <Navbar className="customNavMHP" sticky="top">
        <Container>
          <Navbar.Brand href="/MART_balikLandingPageNiSya">
            <div className="d-flex">
              <div className="fontColorFORM">
                <h3 className="customH3FORM">BUKSU</h3>
                <h3 className="customH3FORM">GSU MOTORPOOL</h3>
                <h5 className="customH5FORM">Request Management System</h5>
              </div>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <main>
        <Container>
          <Row>
            <div className="alignmentAG">
              <div className="">
                <Button variant="primary" className="customColorButton">
                  <FontAwesomeIcon icon={faArrowLeft} size="xl" />{" "}
                </Button>
              </div>

              <div className="">
                <h3 className="m-0"  style={{textAlign: "center"}}>Admin Guide</h3>
              </div>
            </div>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default AdminGuide;
