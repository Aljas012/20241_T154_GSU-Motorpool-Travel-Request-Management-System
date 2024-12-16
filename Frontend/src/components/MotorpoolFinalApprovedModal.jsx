import React, { useState } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";

const MotorpoolApprovedModal = ({ requestShow, requestClose, customStyles }) => {
  
  /******************************************* SA REQUEST DATA TABLE NI SYA ************/

  // State to hold table data
  const [requestData] = useState([
    {
      requestor: "John Doe",
      collegeOffice: "Engineering",
      officeCode: "ENG001",
      details: "View Request",
      status: "Pending",
    },
    {
      requestor: "Jane Smith",
      collegeOffice: "Mathematics",
      officeCode: "MATH001",
      details: "View Request",
      status: "Approved",
    },
  ]);

  // State to handle clickable ATT/RTT column
  const [selectedAttRtt, setSelectedAttRtt] = useState(null);

  const handleAttRttClick = (details) => {
    setSelectedAttRtt(details); // Set the selected attRtt
    console.log("Clicked ATT/RTT:", details); // Debugging output
  };

  // Custom cell for clickable attRtt column
  const details = (row) => (
    <span
      style={{
        color: "#0760A1",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onClick={() => handleAttRttClick(row.details)}
    >
      {row.details}
    </span>
  );

  // Columns configuration
  const requestColumns = [
    {
      name: "Requestor",
      selector: (row) => row.requestor,
    },
    {
      name: "College/Office",
      selector: (row) => row.collegeOffice,
    },
    {
      name: "Office Code",
      selector: (row) => row.officeCode,
    },
    {
      name: "Details",
      cell: details, // Use the custom cell renderer
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  

  return (
    <Modal
      show={requestShow}
      onHide={requestClose}
      size="xl"
      className="glass-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            color: "#CD8800",
          }}
        >
          Motorpool Approved
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1" }}>
              <Card.Body>
                <div>
                  <DataTable
                    columns={requestColumns}
                    data={requestData}
                    customStyles={customStyles}
                    highlightOnHover
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default MotorpoolApprovedModal;
