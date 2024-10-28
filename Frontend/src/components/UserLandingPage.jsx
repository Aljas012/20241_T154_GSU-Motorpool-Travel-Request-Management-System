import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faBell,
} from "@fortawesome/free-regular-svg-icons";

import FooterComponent from "./FooterComponents";

function UserLandingPage() {
  const handleButtonClickATT = () => {
    // Replace with the path to your file
    window.location.href = "/path-to-your-file";
  };

  const handleButtonClickRTT = () => {
    // Replace with the path to your file
    window.location.href = "/f";
  };
  return (
    <>
      <Navbar style={{ backgroundColor: "#0760A1", fontFamily: "Helvetica" }}>
        <Container className="d-flex justify-content-between align-items-center">
          <div className="text-left">
            <h4 className="text-white fw-bold mb-0">BUKSU</h4>
            <h4 className="text-white fw-bold mb-0">GSU MOTORPOOL</h4>
            <h5 className="text-white mb-0">Request Management System</h5>
          </div>
          <div>
            {/* Clickable FontAwesome Icon */}
            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => alert("Bell Icon Clicked!")} // Replace this with your desired functionality
            >
              <FontAwesomeIcon
                icon={faBell}
                className="text-white"
                size="2x" // Adjust size: "lg", "2x", "3x", "4x", etc.
              />
            </button>
          </div>
        </Container>
      </Navbar>

      <main>
        <Container style={{ minHeight: "80vh" }}>
          <Row>
            <Row className="d-flex align-items-center mt-3">
              <Col>
                <div style={{ marginTop: "1rem" }}>
                  <h5
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: 500,
                      marginBottom: 0,
                    }}
                  >
                    INFORMATION TECHNOLOGY DEPARTMENT
                  </h5>
                  <h4 style={{ fontFamily: "Helvetica", fontWeight: 700 }}>
                    OFFICE CODE:{" "}
                    <span style={{ color: "#CD8800" }}>BLANKO SA DAW</span>
                  </h4>
                </div>
              </Col>

              <Col className="d-flex justify-content-center">
                <a
                  href="/home"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 1.8rem",
                    fontWeight: "500",
                  }}
                  className="mx-2"
                >
                  Home
                </a>
                <a
                  href="/about"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 1.8rem",
                    fontWeight: "500",
                  }}
                  className="mx-2"
                >
                  About
                </a>
                <a
                  href="/user-guide"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 1.8rem",
                    fontWeight: "500",
                  }}
                  className="mx-2"
                >
                  User Guide
                </a>
                <a
                  href="/request"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem 1.8rem",
                    fontWeight: "500",
                  }}
                  className="mx-2"
                >
                  Request
                </a>
                <a
                  href="/profile"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1rem",
                    fontWeight: "500",
                  }}
                  className="mx-2"
                >
                  Profile
                </a>
              </Col>
            </Row>

            <Row>
              <Col>
                <h6 style={{ fontFamily: "Helvetica", marginTop: "1rem" }}>
                  Results for{" "}
                  <span style={{ fontWeight: "700" }}>
                    Malaybalay City, Bukidnon
                  </span>
                </h6>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row", // Stack items horizontally
                    alignItems: "center", // Align them vertically
                  }}
                >
                  <img
                    src="./images/WEATHER_ICON.png"
                    alt="weatherIcon"
                    style={{ width: "55px", height: "auto" }} // Adjust size as needed
                  />
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "500",
                      marginLeft: "0.8rem", // Space between image and text
                      marginTop: "5px",
                      fontSize: "50px",
                    }}
                  >
                    24
                  </h6>

                  <div style={{ marginBottom: "1.2rem" }}>
                    <span
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "400",
                        marginLeft: "0.8rem", // Space between temperature and Celsius symbol
                        fontSize: "16px", // Slightly smaller than temperature value
                      }}
                    >
                      °C
                    </span>
                    <span
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "400",
                        marginLeft: "2px", // Space between Celsius and Fahrenheit
                        fontSize: "16px", // Slightly smaller than temperature value
                      }}
                    >
                      |°F
                    </span>
                  </div>

                  <div style={{ marginLeft: "1rem" }}>
                    <p
                      style={{
                        fontFamily: "Helvetica",
                        margin: "0", // Remove margin
                        padding: "0", // Remove padding
                        lineHeight: "1.2", // Adjust line height for tighter fit
                        fontSize: "14px", // Set font size
                      }}
                    >
                      Precipitation: 69%
                    </p>
                    <p
                      style={{
                        fontFamily: "Helvetica",
                        margin: "0", // Remove margin
                        padding: "0", // Remove padding
                        lineHeight: "1.2", // Adjust line height for tighter fit
                        fontSize: "14px", // Set font size
                      }}
                    >
                      Humidity: 77%
                    </p>
                    <p
                      style={{
                        fontFamily: "Helvetica",
                        margin: "0", // Remove margin
                        padding: "0", // Remove padding
                        lineHeight: "1.2", // Adjust line height for tighter fit
                        fontSize: "14px", // Set font size
                      }}
                    >
                      Wind: 5km/h
                    </p>
                  </div>
                </div>

                <div style={{ margin: "2rem 0 2rem 0" }}>
                  <Card style={{ width: "70%", height: "20rem" }}>
                    <Card.Body></Card.Body>
                  </Card>
                </div>
              </Col>

              <Col>
                <Form>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column", // Stack elements vertically
                      alignItems: "start", // Center items horizontally
                      marginTop: "2rem",
                    }}
                  >
                    <div style={{ marginLeft: "8.5rem" }}>
                      <h4
                        style={{
                          fontFamily: "Helvetica",
                          fontWeight: "600",
                          margin: 0,
                          color: "#0760A1",
                          textAlign: "start", // Center the text
                        }}
                      >
                        GOOD DAY BUKSUAN
                      </h4>
                      <h4
                        style={{
                          fontFamily: "Helvetica",
                          fontWeight: "500",
                          margin: 0,
                          textAlign: "start", // Center the text
                        }}
                      >
                        Hope you have a great day!
                      </h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column", // Stack elements vertically
                        alignItems: "center", // Center items horizontally
                        marginTop: "0.5rem",
                        marginLeft: "6rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", // Keep the main direction as column
                          alignItems: "flex-start", // Align items to the start
                          marginTop: "3rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex", // Flex container for image and button
                            alignItems: "center", // Center items vertically
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              marginTop: "8px",
                              marginRight: "0.5rem", // Space between image and button
                            }}
                          >
                            <img
                              src="./images/Ell2.png"
                              alt="Descriptive text"
                              style={{
                                width: "2.5rem",
                                height: "auto",
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontFamily: "Helvetica",
                                color: "#FFFFFF", // Change the color as needed
                                fontWeight: "600", // Make the number bold
                                fontSize: "1.3rem", // Adjust font size as needed
                              }}
                            >
                              1
                            </span>
                          </div>

                          <button
                            onClick={handleButtonClickATT}
                            style={{
                              padding: "0.5rem 1rem",
                              background:
                                "linear-gradient(to right, #0760A1 80%, #CD8800 80%)",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              width: "15rem",
                              fontFamily: "Helvetica",
                              fontWeight: "600",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span style={{ marginLeft: "0.8rem" }}>
                              Authority to travel
                            </span>
                            <FontAwesomeIcon
                              icon={faArrowAltCircleRight}
                              size="lg"
                            />
                          </button>
                        </div>
                      </div>

                      <h6
                        style={{
                          fontFamily: "Helvetica",
                          color: "#0760A1",
                          marginTop: "0.5rem", // Adjust spacing as needed
                          textAlign: "center", // Center the text
                          width: "100%", // Optional: to take full width of the container
                          marginLeft: "5.2rem",
                        }}
                      >
                        Request authorization for official travel
                      </h6>

                      {/* Second Button Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", // Keep the main direction as column
                          alignItems: "flex-start", // Align items to the start
                        }}
                      >
                        <div
                          style={{
                            display: "flex", // Flex container for image and button
                            alignItems: "center", // Center items vertically
                          }}
                        >
                          {/* IMAGE 2 */}
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              marginTop: "8px",
                              marginRight: "0.5rem", // Space between image and button
                            }}
                          >
                            <img
                              src="./images/Ell2.png"
                              alt="Descriptive text"
                              style={{
                                width: "2.5rem",
                                height: "auto",
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontFamily: "Helvetica",
                                color: "#FFFFFF", // Change the color as needed
                                fontWeight: "600", // Make the number bold
                                fontSize: "1.3rem", // Adjust font size as needed
                              }}
                            >
                              2
                            </span>
                          </div>

                          <button
                            onClick={handleButtonClickRTT}
                            style={{
                              padding: "0.5rem 1rem",
                              background:
                                "linear-gradient(to right, #0760A1 80%, #CD8800 80%)",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              width: "15rem",
                              fontFamily: "Helvetica",
                              fontWeight: "600",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span style={{ marginLeft: "0.8rem" }}>
                              Request to travel
                            </span>
                            <FontAwesomeIcon
                              icon={faArrowAltCircleRight}
                              size="lg"
                            />
                          </button>
                        </div>
                      </div>
                      <h6
                        style={{
                          fontFamily: "Helvetica",
                          color: "#0760A1",
                          marginTop: "0.5rem", // Adjust spacing as needed
                          textAlign: "center", // Center the text
                          width: "100%", // Optional: to take full width of the container
                          marginLeft: "4.2rem",
                        }}
                      >
                        Submit travel request and itineraries
                      </h6>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Row>
        </Container>
      </main>

      <FooterComponent />
    </>
  );
}

export default UserLandingPage;
