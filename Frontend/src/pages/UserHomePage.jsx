import React from "react";
import decodeAndStoreUserInfo from "./middleware/decoderToken";
import NavBarWithBellComponent from "../components/NavBarWithBellComponents";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Container, Row, Col, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faBell,
} from "@fortawesome/free-regular-svg-icons";

import FooterComponent from "../components/FooterComponents";

function UserHomePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    // Decode and store user info in localStorage
    decodeAndStoreUserInfo();

    // Retrieve and parse user info
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Safeguard for userInfo properties
  const id = userInfo ? userInfo.user_id : "";

  const handleButtonClickATT = () => {
    navigate("/user/att_forms");
  };

  const handleButtonClickRTT = () => {
    navigate("/user/request_forms");
  };

  return (
    <>
      {/** HEADER */}
      <NavBarWithBellComponent />

      {/** BODY */}
      <main>
        <Container style={{ minHeight: "80vh" }}>
          <Row>
            <Row className="d-flex align-items-center mt-3">
              {/** DEPARTMENT OG OFFICE CODE / UPPER LEFT */}
              <Col>
                <div style={{ marginTop: "1rem" }}>
                  <h5
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: 500,
                      marginBottom: 0,
                    }}
                  >
                    {userInfo ? userInfo.college_name : "Loading..."}
                  </h5>
                  <h4 style={{ fontFamily: "Helvetica", fontWeight: 700 }}>
                    OFFICE CODE:{" "}
                    <span style={{ color: "#CD8800" }}>
                      {userInfo ? userInfo.office_code : "Loading..."}
                    </span>
                  </h4>
                </div>
              </Col>

              {/** NAVIGATIONS / UPPER RIGHT */}
              <Col className="d-flex justify-content-center">
                <a
                  href=""
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
                  href="/user/about_us"
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
                  href="/user/user_guide"
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
                  href="/user/request"
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
                  href={`/user/id=${id}/profile`} // Ensure proper string interpolation
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
              {/** FIRST COLUMN / LEFT SIDE */}
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
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="../images/WEATHER_ICON.png"
                    alt="weatherIcon"
                    style={{ width: "55px", height: "auto" }}
                  />

                  {/** DIRI TUNG SA WEATHER/TEMPERATURE */}
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "500",
                      marginLeft: "0.8rem",
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
                        marginLeft: "0.8rem",
                        fontSize: "16px",
                      }}
                    >
                      °C
                    </span>
                    <span
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "400",
                        marginLeft: "2px",
                        fontSize: "16px",
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

                {/** DIRI TUNG CALENDAR */}
                <div style={{ margin: "2rem 0 2rem 0" }}>
                  <Card style={{ width: "70%", height: "20rem" }}>
                    <Card.Body>{/** DIRI DAPAT */} </Card.Body>
                  </Card>
                </div>
              </Col>

              {/** SECOND COLUMN / RIGHT SIDE */}
              <Col>
                <Form id="userlandingpage">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
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
                          textAlign: "start",
                        }}
                      >
                        Good day, BUKSUan
                      </h4>
                      <h4
                        style={{
                          fontFamily: "Helvetica",
                          fontWeight: "500",
                          margin: 0,
                          textAlign: "start",
                        }}
                      >
                        Hope you have a great day!
                      </h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "0.5rem",
                        marginLeft: "6rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginTop: "3rem",
                        }}
                      >
                        {/** FIRST BUTTON SECTION / ATT */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              marginTop: "8px",
                              marginRight: "0.5rem",
                            }}
                          >
                            <img
                              src="../images/Ell2.png"
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
                                color: "#FFFFFF",
                                fontWeight: "600",
                                fontSize: "1.3rem",
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
                          marginTop: "0.5rem",
                          textAlign: "center",
                          width: "100%",
                          marginLeft: "5.2rem",
                        }}
                      >
                        Request authorization for official travel
                      </h6>

                      {/* SECOND BUTTON SECTION / RTT */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              marginTop: "8px",
                              marginRight: "0.5rem",
                            }}
                          >
                            <img
                              src="../images/Ell2.png"
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
                                color: "#FFFFFF",
                                fontWeight: "600",
                                fontSize: "1.3rem",
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

      {/** FOOTER */}
      <FooterComponent />
    </>
  );
}

export default UserHomePage;
