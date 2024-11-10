import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Table,
} from "react-bootstrap";

import NavBarWithBellComponents from "../components/NavBarWithBellComponents";
import FooterComponent from "../components/FooterComponents";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../styles/Table.css";

function Request() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user_info")); // Parse the stored JSON
  const id = userInfo.user_id; // Access the correct key for the user ID
  const handleClick = () => {
    navigate(`/user/id=${id}/homepage`);
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
                <button
                  onClick={handleClick}
                  style={{
                    backgroundColor: "#0760A1",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    borderRadius: "4px",
                    width: "3rem",
                    height: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft} // Use the left arrow icon
                    style={{ color: "#FFFFFF", width: "28px", height: "auto" }} // Set icon color to white
                  />
                </button>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <Table
                  responsive
                  bordered
                  hover
                  style={{
                    textAlign: "center",
                    fontFamily: "Helvetica",
                    backgroundColor: "#F1F1F1", // Add this line
                    border: "1px solid #00000066",
                  }}
                >
                  <thead style={{ backgroundColor: "#F1F1F1" }}>
                    <tr>
                      <th
                        colSpan={4}
                        style={{
                          color: "#0760A1",
                          textAlign: "start",
                          paddingLeft: "1.5rem", // Adjust this value to move it further to the right
                          backgroundColor: "#F1F1F1",
                        }}
                      >
                        Request Status
                      </th>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: "#F1F1F1" }}>
                        Time of Request
                      </th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>
                        Date of Request
                      </th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>
                        Date of Request
                      </th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>
                        Status of the Request
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ backgroundColor: "#F1F1F1" }}>
                    <tr>
                      <td
                        style={{
                          color: "#0760A1",
                          backgroundColor: "#F1F1F1",
                        }}
                      >
                        9:35 am
                      </td>
                      <td
                        style={{ color: "#0760A1", backgroundColor: "#F1F1F1" }}
                      >
                        6/12/2024
                      </td>
                      <td
                        style={{ color: "#0760A1", backgroundColor: "#F1F1F1" }}
                      >
                        <a
                          href="/details" // Change this to the appropriate link
                          style={{
                            color: "#0760A1",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          View Details
                        </a>
                      </td>
                      <td
                        style={{ color: "#CD8800", backgroundColor: "#F1F1F1" }}
                      >
                        Pending
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          color: "#0760A1",
                          backgroundColor: "#F1F1F1",
                        }}
                      >
                        9:35 am
                      </td>
                      <td
                        style={{ color: "#0760A1", backgroundColor: "#F1F1F1" }}
                      >
                        6/12/2024
                      </td>
                      <td
                        style={{ color: "#0760A1", backgroundColor: "#F1F1F1" }}
                      >
                        <a
                          href="/details" // Change this to the appropriate link
                          style={{
                            color: "#0760A1",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          View Details
                        </a>
                      </td>
                      <td
                        style={{ color: "#CD8800", backgroundColor: "#F1F1F1" }}
                      >
                        Pending
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          color: "#0760A1",
                          backgroundColor: "#F1F1F1",
                        }}
                      >
                        9:35 am
                      </td>
                      <td
                        style={{ color: "#0760A1", backgroundColor: "#F1F1F1" }}
                      >
                        6/12/2024
                      </td>
                      <td
                        style={{ color: "#0760A1", backgroundColor: "#F1F1F1" }}
                      >
                        <a
                          href="/details" // Change this to the appropriate link
                          style={{
                            color: "#0760A1",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          View Details
                        </a>
                      </td>
                      <td
                        style={{ color: "#CD8800", backgroundColor: "#F1F1F1" }}
                      >
                        Pending
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <FooterComponent />
    </>
  );
}

export default Request;
