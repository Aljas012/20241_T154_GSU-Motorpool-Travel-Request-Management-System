import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

function NavBarWithBellComponent() {
  return (
    <Navbar
      style={{
        background: "linear-gradient(90deg, #0760A1 0%, #02233B 100%)",
        fontFamily: "Helvetica"
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <div className="text-left">
          <h4 className="text-white fw-bold mb-0">BUKSU</h4>
          <h4 className="text-white fw-bold mb-0">GSU MOTORPOOL</h4>
          <h5 className="text-white mb-0">Request Management System</h5>
        </div>
        <div>
         
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBarWithBellComponent;
