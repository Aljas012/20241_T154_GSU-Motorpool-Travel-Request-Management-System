import React from "react";
import { Navbar, Container } from "react-bootstrap";

function RTTNav() {
  return (
    <Navbar
      style={{
        background: "linear-gradient(90deg, #0760A1 0%, #02233B 100%)",
        fontFamily: "Helvetica",
        height: "97.5px",
      }}
    >
      <Container className="d-flex flex-column align-items-start">
        <div className="text-left">
          <h4 className="text-white fw-bold mb-0">Request To Travel</h4>
          <h5 className="text-white mb-0">Request Management System</h5>
        </div>
      </Container>
    </Navbar>
  );
}

export default RTTNav;
