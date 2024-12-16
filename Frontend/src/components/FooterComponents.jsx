import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #0760A1 0%, #02233B 100%)",
        position: "fixed",
        bottom: "0",
        width: "100%",
        zIndex: "10",
      }}
      className="text-white py-3"
    >
      <Container>
        <Row className="text-center">
          <Col>
            <h6>Telephone Number: 8663 34522</h6>
          </Col>
          <Col>
            <h6>Email: GSUMotorpool@gmail.com</h6>
          </Col>
          <Col>
            <h6>Facebook Page: BuksuMotorpool</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
