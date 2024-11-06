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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import NavbarComponent from "../components/NavBarComponents";
import FooterComponent from "../components/FooterComponents";

function PasswordInformation() {
  const handleClick = () => {
    alert("Left arrow clicked!"); // Replace with your desired action
  };
  return (
    <>
      <NavbarComponent></NavbarComponent>

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

              <div style={{ padding: "2rem 15rem 2rem 15rem", marginTop: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="./images/PFPICON.png"
                    alt="icon"
                    style={{ height: "4rem", width: "auto" }}
                  />
                  <h4
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      color: "#0760A1",
                      marginLeft: "10px",
                    }}
                  >
                    USER
                  </h4>
                </div>

                <div style={{ marginTop: "3rem" }}>
                  <h5
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      color: "#0760A1",
                    }}
                  >
                    Password Information
                  </h5>

                  <Card style={{ backgroundColor: "#F1F1F1" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "1.5rem 1rem 1.5rem 0",
                        }}
                      >
                        <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                          Current Password:{" "}
                        </h5>
                        <h5
                          style={{
                            fontFamily: "Helvetica",
                            fontWeight: "600",
                            margin: 0,
                            marginLeft: "8px",
                          }}
                        >
                          Secret
                        </h5>
                      </div>

                      {/* Clickable SVG icon on the right side */}
                      <button
                        onClick={() => {
                          // Handle your click event here
                          alert("SVG clicked!");
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 35 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="fi-rr-eye" clipPath="url(#clip0_821_3209)">
                            <path
                              id="Vector"
                              d="M33.9365 13.9858C31.6746 10.3021 26.5296 4.12164 17.4996 4.12164C8.46965 4.12164 3.32465 10.3021 1.06277 13.9858C0.363542 15.1168 -0.00683594 16.4201 -0.00683594 17.7498C-0.00683594 19.0794 0.363542 20.3828 1.06277 21.5137C3.32465 25.1975 8.46965 31.3779 17.4996 31.3779C26.5296 31.3779 31.6746 25.1975 33.9365 21.5137C34.6357 20.3828 35.0061 19.0794 35.0061 17.7498C35.0061 16.4201 34.6357 15.1168 33.9365 13.9858ZM31.4501 19.9869C29.5076 23.1456 25.1107 28.4612 17.4996 28.4612C9.88861 28.4612 5.49173 23.1456 3.54923 19.9869C3.1338 19.3146 2.91376 18.54 2.91376 17.7498C2.91376 16.9595 3.1338 16.1849 3.54923 15.5127C5.49173 12.3539 9.88861 7.03831 17.4996 7.03831C25.1107 7.03831 29.5076 12.3481 31.4501 15.5127C31.8655 16.1849 32.0855 16.9595 32.0855 17.7498C32.0855 18.54 31.8655 19.3146 31.4501 19.9869Z"
                              fill="#0760A1"
                            />
                            <path
                              id="Vector_2"
                              d="M17.4997 10.4581C16.0575 10.4581 14.6478 10.8858 13.4486 11.687C12.2495 12.4882 11.3149 13.627 10.7631 14.9594C10.2112 16.2918 10.0668 17.7579 10.3481 19.1723C10.6295 20.5868 11.3239 21.886 12.3437 22.9058C13.3634 23.9255 14.6627 24.62 16.0771 24.9014C17.4916 25.1827 18.9577 25.0383 20.2901 24.4864C21.6225 23.9345 22.7613 22.9999 23.5625 21.8008C24.3637 20.6017 24.7913 19.192 24.7913 17.7498C24.789 15.8166 24.0201 13.9633 22.6531 12.5964C21.2862 11.2294 19.4328 10.4604 17.4997 10.4581ZM17.4997 22.1248C16.6344 22.1248 15.7885 21.8682 15.0691 21.3875C14.3496 20.9067 13.7888 20.2235 13.4577 19.424C13.1266 18.6246 13.0399 17.7449 13.2087 16.8963C13.3776 16.0476 13.7942 15.2681 14.4061 14.6562C15.0179 14.0443 15.7975 13.6277 16.6462 13.4589C17.4948 13.2901 18.3745 13.3767 19.1739 13.7078C19.9733 14.039 20.6566 14.5997 21.1374 15.3192C21.6181 16.0386 21.8747 16.8845 21.8747 17.7498C21.8747 18.9101 21.4137 20.0229 20.5933 20.8434C19.7728 21.6639 18.66 22.1248 17.4997 22.1248Z"
                              fill="#0760A1"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_3209">
                              <rect
                                width="35"
                                height="35"
                                fill="white"
                                transform="translate(0 0.25)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <a href="" style={{ marginLeft: "auto" }}>
                        Update Password
                      </a>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <FooterComponent></FooterComponent>
    </>
  );
}

export default PasswordInformation;
