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

function UserGuide() {
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

              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "600",
                    color: "#CD8800",
                    paddingBottom: "1rem",
                  }}
                >
                  User Guide
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="d-flex align-items-start">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 35 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "0.5rem" }} // Add some margin to the right
                >
                  <circle
                    id="Ellipse 3"
                    cx="17.5"
                    cy="17.75"
                    r="17.5"
                    fill="#0760A1"
                  />
                  <text
                    x="17.5" // Center text horizontally
                    y="25" // Center text vertically
                    textAnchor="middle" // Align text to the middle
                    fill="#FFFFFF" // Color of the text
                    fontFamily="Helvetica" // Font family
                    fontWeight="bold" // Font weight
                    fontSize="22" // Font size
                  >
                    1
                  </text>
                </svg>
                <div>
                  <h4
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      color: "#0760A1",
                      marginTop: "1px",
                      marginBottom: "0",
                    }}
                  >
                    Authority To Travel (ATT) Process
                  </h4>
                  <p
                    style={{
                      fontFamily: "Helvetica",
                      margin: "0",
                    }}
                  >
                    Digital ATT Form Submission
                  </p>

                  <div style={{ fontFamily: "Helvetica", marginTop: "2rem" }}>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      1. login to the system
                    </h6>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      2. Click "Authority to Travel" button
                    </h6>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      3. Fillout the Required Fields
                    </h6>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      4. Click "Export to PDF" to generate ATT Document
                    </h6>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "700",
                        margin: "0",
                      }}
                    >
                      Physical Signature Requirements
                    </h5>
                    <p style={{ margin: "0" }}>
                      After printing the ATT, obtain signatures in this order:
                    </p>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      1. Chairperson - College
                    </h6>
                    <p style={{ margin: "0", marginLeft: "1.2rem" }}>
                      Submit to your college chairperson/others for signature
                    </p>

                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      2. Dean/Unit Head
                    </h6>
                    <p style={{ margin: "0", marginLeft: "1.2rem" }}>
                      Route to your Dean or Unit Head for approval
                    </p>

                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      3. VPAA/VPAF/VPREI/VPCASS
                    </h6>
                    <p style={{ margin: "0", marginLeft: "1.2rem" }}>
                      Submit to the appropriate Vice President for approval
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="d-flex align-items-start">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 35 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "0.5rem" }} // Add some margin to the right
                >
                  <circle
                    id="Ellipse 3"
                    cx="17.5"
                    cy="17.75"
                    r="17.5"
                    fill="#0760A1"
                  />
                  <text
                    x="17.5" // Center text horizontally
                    y="25" // Center text vertically
                    textAnchor="middle" // Align text to the middle
                    fill="#FFFFFF" // Color of the text
                    fontFamily="Helvetica" // Font family
                    fontWeight="bold" // Font weight
                    fontSize="22" // Font size
                  >
                    1
                  </text>
                </svg>
                <div>
                  <h4
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      color: "#0760A1",
                      marginTop: "1px",
                      marginBottom: "0",
                    }}
                  >
                    Digital Request To Travel Submission
                  </h4>
                  <p
                    style={{
                      fontFamily: "Helvetica",
                      margin: "0",
                    }}
                  >
                    Once you have your fully signed ATT document:
                  </p>

                  <div style={{ fontFamily: "Helvetica", marginTop: "2rem" }}>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      1. Scan the Approved ATT{" "}
                      <a
                        href="https://www.camscanner.com/" // Link to the CamScanner website
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Security best practice for external links
                        style={{ textDecoration: "none", color: "#0760A1" }} // Customize link appearance
                      >
                        (Camscanner)
                      </a>
                    </h6>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      2. Click "Request to Travel" button
                    </h6>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      3. Fillout the Required Fields
                    </h6>
                    <h6 style={{ fontWeight: "600", margin: "2px" }}>
                      4. Complete all required travel information
                    </h6>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "700",
                        margin: "0",
                      }}
                    >
                      Physical Signature Requirements
                    </h5>
                  </div>

                  <div style={{ marginTop: "3rem" }}>
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      1. Click “Browse file” in the upload section
                    </h6>

                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      2. Select the Scanned ATT document
                    </h6>

                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      3. Verify the file/photo name appears in the field 
                    </h6>

                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      4. Click “Send ATT and RTT” to submit your complete request
                    </h6>

                    

                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default UserGuide;
