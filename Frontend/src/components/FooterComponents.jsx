import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer
      style={{
        backgroundColor: "#0760A1",
        position: "relative",
        bottom: "0",
        width: "100%",
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