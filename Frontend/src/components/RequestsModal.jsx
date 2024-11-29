import React, { useState,useEffect } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ViewRequest from "../pages/MOTORPOOL/ViewRequest";  
const RequestsModal = ({ requestShow, requestClose, customStyles }) => {
  
  /******************************************* SA REQUEST DATA TABLE NI SYA ************/

  const [requestData,setRequestData] = useState("");
  const navigate = useNavigate();

  const fetchPendingRequest = async () =>
  {
      try{
            const response = await fetch('http://localhost:8000/admin/fetch_pending_request',{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })

            const data =  await response.json()
            
            if (data.data) {
              setRequestData(data.data);  // Set data to the state correctly
              
            } else {
              console.log("No data found:", data.message);  // Optionally log if no data
              setRequestData([]);  // Set an empty array if no pending requests are found
            }
      }catch(error)
          {
          alert('error fetching pending request')
        }
  }

  useEffect(() => {
    fetchPendingRequest();  // Fetch pending requests when the component mounts
  }, []); 

  // State to handle clickable ATT/RTT column
  const [selectedAttRtt, setSelectedAttRtt] = useState(null);

  const handleAttRttClick = async (row) => {
    const requestId = row.request_identifier;
    const userId = row.reference_id;
    navigate(`/admin/view_request/${requestId}/${userId}`);
  };

  // Custom cell for clickable attRtt column
  const attRttCell = (row) => (
    <span
      style={{
        color: "#0760A1",
        textDecoration: "underline",
        cursor: "pointer",        
      }}
      onClick={() => handleAttRttClick(row)}
    > REVIEW REQUEST
      {row.ViewRequest}
    </span>
  );

  // Columns configuration
  const requestColumns = [,
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
      name: "ATT and RTT",
      cell: attRttCell, // Use the custom cell renderer
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

  

  return (
    <Modal
      show={requestShow}
      onHide={requestClose}
      size="xl"
      
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            color: "#CD8800",
          }}
        >
          ATT and RTT Requests
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

export default RequestsModal;
