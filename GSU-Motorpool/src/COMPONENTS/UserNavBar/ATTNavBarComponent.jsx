import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ATTNavBarComponent() {
  return (
    <Navbar
      style={{ background: "linear-gradient(90deg, #0760A1 0%, #02233B 100%)" }}
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/MART_balikLandingPageNiSya">
          <div style={{ color: "#FFFFFF", padding: ".5rem 0 .5rem 0"}}>
            <h3
              style={{
                fontFamily: "Helvetica",
                fontWeight: "600",  
                margin: "0",
              }}
            >
              Authority To Travel
            </h3>
            <h5
              style={{
                fontFamily: "Helvetica",
                fontWeight: "500",
                margin: "0",
              }}
            >
              Request Management System
            </h5>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default ATTNavBarComponent;
