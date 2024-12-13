import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar className="customNavMHP">
      <Container fluid style={{ padding: "0 3rem 0 3rem" }}>
        <Navbar.Brand href="http://localhost:5173/admin/homepage">
          <div className="d-flex">  
            <div>
              <img
                src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732383925/BukSULogo.svg"
                alt="BSU"
                className="customLogoMHP"
              />
            </div>
            <div className="fontColorMHP">
              <h3 className="customH3MHP">BUKSU</h3>
              <h3 className="customH3MHP">GSU MOTORPOOL</h3>
              <h5 className="customH5MHP">Request Management System</h5>
            </div>
          </div>
        </Navbar.Brand>

        <div>
          <div className="alignmentMHP">
            <h6
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontWeight: "550",
                margin: "0",
              }}
            >
              Admin
            </h6>
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732368935/profileIcon_i2zkef.svg"
              alt="icon"
              style={{
                height: "4rem",
                width: "auto",
              }}
            />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
