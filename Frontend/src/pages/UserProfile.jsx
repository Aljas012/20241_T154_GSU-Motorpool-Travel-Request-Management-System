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

function UserProfile() {
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

                <div style={{ textAlign: "center" }}>
                  <h2
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      color: "#CD8800",
                      paddingBottom: "1rem",
                    }}
                  >
                    User Profile
                  </h2>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 style={{ fontFamily: "Helvetica", fontWeight: "600" }}>
                  User Information
                </h5>

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

              <div>
                <Card style={{ backgroundColor: "#F1F1F1" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "10px 10px 10px 10px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      Name:{" "}
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      Gerome Aljas
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "10px 10px 10px 10px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      Email:{" "}
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      220123022@student.buksu.edu.ph
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "10px 10px 10px 10px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      Office Code:{" "}
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      567122
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "10px 10px 10px 10px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      College of:{" "}
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      Technology
                    </h5>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                        Password:{" "}
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

                    <a href="" style={{ marginLeft: "auto" }}>
                      View Password Information
                    </a>
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
                      Update User Information
                    </a>
                  </div>
                </Card>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1.5rem",
                }}
              >
                <h5 style={{ fontFamily: "Helvetica", fontWeight: "600" }}>
                  Travel History
                </h5>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Card
                  style={{
                    height: "100px",
                    width: "200px",
                    border: "0",
                    background:
                      "linear-gradient(180deg, #0760A1 0%, #02233B 100%)", // Gradient background
                    position: "relative", // Set parent container to relative for absolute positioning inside
                  }}
                >
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      padding: "10px 0 0 10px",
                    }}
                  >
                    Today's Request
                  </h6>

                  <div
                    style={{
                      position: "absolute", // Position the element absolutely
                      bottom: "10px", // Distance from the bottom of the card
                      right: "22px", // Distance from the right side of the card
                    }}
                  >
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#FFFFFF",
                      }}
                    >
                      #
                    </h6>
                  </div>
                </Card>

                <Card
                  style={{
                    height: "100px",
                    width: "200px",
                    border: "0",
                    background:
                      "linear-gradient(180deg, #0760A1 0%, #02233B 100%)", // Your specified gradient
                  }}
                >
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      padding: "10px 0 0 10px",
                    }}
                  >
                    Total Request
                  </h6>

                  <div
                    style={{
                      position: "absolute", // Position the element absolutely
                      bottom: "10px", // Distance from the bottom of the card
                      right: "22px", // Distance from the right side of the card
                    }}
                  >
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#FFFFFF",
                      }}
                    >
                      #
                    </h6>
                  </div>
                </Card>

                <Card
                  style={{
                    height: "100px",
                    width: "200px",
                    border: "0",
                    background:
                      "linear-gradient(180deg, #0760A1 0%, #02233B 100%)", // Your specified gradient
                  }}
                >
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      padding: "10px 0 0 10px",
                    }}
                  >
                    Number of Services Completed
                  </h6>

                  <div
                    style={{
                      position: "absolute", // Position the element absolutely
                      bottom: "10px", // Distance from the bottom of the card
                      right: "22px", // Distance from the right side of the card
                    }}
                  >
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#FFFFFF",
                      }}
                    >
                      #
                    </h6>
                  </div>
                </Card>
              </div>
            </Col>

            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Horizontally centers the image
                  alignItems: "center", // Vertically centers the image
                  height: "91%", // Ensures the parent div takes full height of the Col
                }}
              >
                <img
                  src="./images/UserProfileBG.png"
                  alt="bg"
                  style={{ width: "60%", height: "auto" }}
                />
              </div>

              {/* Log Out Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Center the button horizontally
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => {
                    // Handle your click event here
                    alert("clicked!");
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#CD8800",
                    width: "50%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontFamily: "Helvetica",
                    fontWeight: "600",
                  }}
                >
                  Log Out
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <FooterComponent></FooterComponent>
    </>
  );
}

export default UserProfile;
