import React from "react";
import { Navbar, Container } from "react-bootstrap";

function NavbarComponent({ children }) {
  // Accept children as a prop
  return (
    <Navbar
      style={{
        background: "linear-gradient(90deg, #0760A1 0%, #02233B 100%)",
        fontFamily: "Helvetica",
      }}
    >
      <Container className="d-flex flex-column align-items-start">  
        <div className="text-left">
          <h4 className="text-white fw-bold mb-0">BUKSU</h4>
          <h4 className="text-white fw-bold mb-0">GSU MOTORPOOL</h4>
          <h5 className="text-white mb-0">Request Management System</h5>
        </div>
        {children} 
        
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
