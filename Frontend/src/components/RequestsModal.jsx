import React, { useState,useEffect } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ViewRequest from "../pages/MOTORPOOL/ViewRequest";  
import { style } from "framer-motion/client";
const RequestsModal = ({ requestShow, requestClose, customStyles }) => {
  
  /******************************************* SA REQUEST DATA TABLE NI SYA ************/

  const [requestData,setRequestData] = useState("");
  const navigate = useNavigate();
   const [errorModal,setShowErrorModal] = useState(false)
      const [errorMessage,setErrorMessage] = useState('')
      const [errorColor,setErrorColor] = useState('')
      const [errorIcon,setErrorIcon] = useState('')
      const [errorDiv,setErrorDiv] = useState('')
      const warning = '#FCC737'
      const danger = '#C63C51'
      const success = '#6EC207'
  

  
  useEffect(() => {
  const fetchPendingRequest = async () =>
  {
    const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
    const token = adminInfo.admin_token;

      try{
            const response = await fetch('http://localhost:8000/admin/fetch_pending_request',{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
            })
            const data =  await response.json()
            if (data.data) {
              setRequestData(data.data);  

            } else {
              console.log("No data found:", data.message); 
              setRequestData([]); 
            }
      }catch(error)
          {
            setShowErrorModal(true)     
            setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
            setErrorColor('white')
            setErrorDiv(danger)
            setErrorMessage('Something went wrong. Please check your internet connection.')
        }
  }

    fetchPendingRequest(); 
  }, []); 


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
    <>
      <Modal show={errorModal} centered>
                        <Modal.Body style={{ backgroundColor: errorColor, borderRadius: '0px', display: 'flex',
                            justifyContent: 'center',alignItems: 'center',flexDirection: 'column',padding: 0,}}>
                          <img src={errorIcon} alt="no internet" height="60px" width="60px" draggable={false} style={{marginBottom: "1.5em",marginTop:'2rem'}}/>
                          <p style={{color: 'black',textAlign:'center',margin:'.5rem'}}>{errorMessage}</p>
                          <div style={{display:'flex',backgroundColor:errorDiv,width:'100%',  padding: '10px',marginTop:'1em',justifyContent:'center'}}>
                          <button style={{ backgroundColor: 'transparent',border:'none',margin:'.8em',color:'white'}} onClick={()=>setShowErrorModal(false)}> DISMISS </button>
                         </div>
                        </Modal.Body>
                   </Modal>


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
    </>
  );
};

export default RequestsModal;
