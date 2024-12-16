import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const MotorpoolApprovedModal = ({ requestShow, requestClose, customStyles }) => {
  const [combinedData, setCombinedData] = useState([]); // Holds fetched data
  const [errorModal,setShowErrorModal] = useState(false)
          const [errorMessage,setErrorMessage] = useState('')
          const [errorColor,setErrorColor] = useState('')
          const [errorIcon,setErrorIcon] = useState('')
          const [errorDiv,setErrorDiv] = useState('')
          const warning = '#FCC737'
          const danger = '#C63C51'
          const success = '#6EC207'
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const adminInfo = JSON.parse(localStorage.getItem("admin_info"))
      const token = adminInfo.admin_token;
      try {
        const response = await fetch(
          "http://localhost:8000/admin/fetch_pending_request_approval",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );
        if (!response.ok) {
          console.log('cannot fetch data.')
          return;
        }
        const responseData = await response.json();
        const combined = responseData.adminRequests.map(adminRequest => {
          const requestDetail = responseData.requestDetails.find(
            detail => detail._id === adminRequest.reference_id
          );
          return {
            ...adminRequest,
            requestDetails: requestDetail || {}
          };
        });

        setCombinedData(combined);
        console.log('The combined data is ',combined)


      } catch (error) {
        setShowErrorModal(true)     
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1734240543/warning_4_sla1qv.png')
        setErrorColor('white')
        setErrorDiv(danger)
        setErrorMessage('Something went wrong. Please check your internet connection.')
      }
    };
    fetchData();
  }, []);


  const handleAttRttClick = (row) => {
    console.log("Row data:", row);
    console.log("Request ID:", row.request_identifier);
    console.log("User ID:", row.reference_id);

    const userId = row._id;   //reference id sa request 
    const  requestId  = row.reference_id;  //id sa user na nag request
    navigate(`/admin/head_final_approved/${requestId}/${userId}`);
  };

  const details = (row) => (
    <span
      style={{
        color: "#0760A1",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onClick={() => handleAttRttClick(row)}
    >
      {row.details || "View Request"}
    </span>
  );


  const requestColumns = [
    {
      name: "Requestor",
      selector: (row) => row.requestDetails.requestor_name || "N/A", 
    },
    {
      name: "College/Office",
      selector: (row) => row.requestDetails.collegeName || "N/A",
    },
    {
      name: "Office Code",
      selector: (row) => row.requestDetails.officeCode || "N/A",
    },
    {
      name: "Details",
      cell: details, 
    },
    {
      name: "Status",
      selector: (row) => row.requestDetails.status || "Pending",
    },
  ];

  return (
    <>

        <Modal show={errorModal} centered>
               <Modal.Body style={{ backgroundColor: errorColor,
                                     borderRadius: '0px', display: 'flex', justifyContent: 'center',
                                     alignItems: 'center',flexDirection: 'column',padding: 0,}}>
                                    <img src={errorIcon} alt="no internet" height="60px" width="60px" draggable={false} style={{marginBottom: "1.5em",marginTop:'2rem'}}/>
                                     <p style={{color: 'black',textAlign:'center',margin:'.5rem'}}>{errorMessage}</p>
                                    <div style={{display:'flex',backgroundColor:errorDiv,width:'100%',  padding: '10px',marginTop:'1em',justifyContent:'center'}}>
                                    <button style={{ backgroundColor: 'transparent',border:'none',margin:'.8em',color:'white'}} onClick={()=>setShowErrorModal(false)}> DISMISS </button>
                                    </div>
               </Modal.Body>
              </Modal>
      


    <Modal show={requestShow} onHide={requestClose} size="xl">
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
                <DataTable
                  columns={requestColumns}
                  data={combinedData} // Use adminRequestData here
                  customStyles={customStyles}
                  highlightOnHover
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight="450px"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default MotorpoolApprovedModal;
