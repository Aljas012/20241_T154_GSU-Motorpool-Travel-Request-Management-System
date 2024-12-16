import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import bsuLogo from "../ASSETS/bsuLogo.svg";

import "../STYLES/ATTandRTT_Request.css";

function ATTandRTT_Request() {
  // Sample data

  // Columns configuration
  const columns = [
    {
      name: "Requestor",
      selector: (row) => row.requestor,
      sortable: true,
    },
    {
      name: "College/Office",
      selector: (row) => row.collegeOffice,
      sortable: true,
    },
    {
      name: "Office Code",
      selector: (row) => row.officeCode,
    },
    {
      name: "ATT and RTT",
      selector: (row) => row.attRtt,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  // Custom styles for the DataTable
  const customStyles = {
    header: {
      style: {
        fontSize: "22px", // Customize font size
        fontWeight: "bold", // Make the title bold
        color: "#0760A1", // Change font color
        fontFamily: "Helvetica",
        backgroundColor: "#f0f0f0", // Light grey background for header
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        justifyContent: "center",
        backgroundColor: "#f1f1f1", // Light grey background for header cells
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        borderLeft: "1px solid #ddd",
      },
    },
    table: {
      style: {
        backgroundColor: "#e9f7fb", // Light blue background for the table body
      },
    },
    rows: {
      style: {
        backgroundColor: "#f9f9f9", // Light grey for rows
        "&:nth-child(odd)": {
          backgroundColor: "#f1f1f1", // Alternating row color
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f1f1f1", // Blue background for pagination
        color: "#000000", // White text color for pagination
        borderTop: "1px solid #ddd", // Optional: border at the top of pagination
      },
    },
  };

  return (
    <>
    
      <Navbar className="customNavMHP" sticky="top">
        <Container>
          <Navbar.Brand href="/MART_balikLandingPageNiSya">
            <div className="d-flex">
              <div>
                <img src={bsuLogo} alt="BSU" className="customLogoFORM" />
              </div>
              <div className="fontColorFORM">
                <h3 className="customH3FORM">BUKSU</h3>
                <h3 className="customH3FORM">GSU MOTORPOOL</h3>
                <h5 className="customH5FORM">Request Management System</h5>
              </div>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/** BODY */}
      <main>
        <Container>
          <Row>
            <Col>
              <div className="mt-4">
                <Button variant="primary" className="customColorButton">
                  <FontAwesomeIcon icon={faArrowLeft} size="xl" />{" "}
                </Button>
              </div>

              {/* Data Table */}
              <Row className="mt-4">
                <Col>
                  <Card style={{ backgroundColor: "#F1F1F1" }}>
                    <Card.Body>
                      <div style={{ height: "55vh", overflowY: "auto" }}>
                        <DataTable
                          className="customDataTable"
                          title="ATT and RTT Requests"
                          columns={columns}
                          data={data}
                          pagination
                          highlightOnHover
                          striped
                          customStyles={customStyles}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="customFooter">
        <Container>
          <Row>
            <Col>
              <h6 className="m-0">Telephone Number: 8663 34522</h6>
            </Col>
            <Col>
              <h6 className="m-0">Email: GSUMotorpool@gmail.com</h6>
            </Col>
            <Col>
              <h6 className="m-0">Facebook Page: BuksuMotorpool</h6>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default ATTandRTT_Request;
