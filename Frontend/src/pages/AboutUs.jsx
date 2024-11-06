import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";

import NavBarWithBellComponents from "../components/NavBarWithBellComponents";
import FooterComponent from "../components/FooterComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AboutUs() {
  const handleClick = () => {
    alert("Left arrow clicked!"); // Replace with your desired action
  };

  return (
    <>
      <NavBarWithBellComponents />

      <main>
        <Container>
          <Row>
            <Col>
              <div>
                {/** BACK BUTTON */}
                <Button
                  onClick={handleClick} // Handle click event
                  style={{
                    backgroundColor: "#0760A1", // Blue background color for the button
                    color: "#FFFFFF", // Text color (icon color will inherit this)
                    cursor: "pointer", // Change cursor to pointer to indicate clickability
                    display: "flex", // Use flex to center the icon
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                    border: "none", // Remove border
                    borderRadius: "4px", // Optional: Rounded corners
                    width: "3rem",
                    height: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft} // Use the left arrow icon
                    style={{ color: "#FFFFFF", width: "28px", height: "auto" }} // Set icon color to white
                  />
                </Button>
              </div>

              <div style={{textAlign: "center"}}>
                <h2
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "600",
                    color: "#CD8800",
                    padding: "1rem 0 1.5rem 0"
                  }}
                >
                  About Us
                </h2>

                <div style={{ fontFamily: "Helvetica", textAlign: "justify", padding: "0 21rem 0 21rem" }}>
                  <p>
                    The Motorpool Unit of BUKIDNON State University (BSU) is
                    dedicated to providing reliable and efficient transportation
                    services to support our university community. As an integral
                    part of BSU's campus operations, we manage and maintain the
                    university's fleet of vehicles to ensure safe, timely, and
                    professional transportation services for academic
                    activities, administrative functions, and official
                    university events.
                  </p>

                  <p>
                    Our unit takes pride in delivering excellent service through
                    proper vehicle maintenance, professional fleet management,
                    and responsive scheduling. We work tirelessly to support
                    BSU's mission by facilitating the mobility needs of our
                    faculty, staff, and students while maintaining the highest
                    standards of safety and efficiency.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <FooterComponent />
    </>
  );
}

export default AboutUs;
