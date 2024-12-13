import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const FinalApprovalModal = ({ finalShow, finalClose, customStyles }) => {
  const [data,setData] = useState([])
  const [userRequestData,setuserRequestData] = useState([])
  const navigate = useNavigate();



  useEffect(() => {
    
  const fetchApprovedRequest = async ()=>
      {
      try{
          const response = await fetch('http://localhost:8000/admin/fetch_approved_request',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
            if(!response.ok)
             {
              console.log('There are currently no approved request by the admin')
              setData([]);
              return;
            }
            const responseData = await response.json()

            const requestData = responseData.requestData || {};
            const fetchUserRequestData = responseData.fetchUserRequestData || {};
            
            const combinedData = [{
              reference_id: requestData.reference_id,
              requestor_name: fetchUserRequestData.requestor_name,
              status: requestData.status, // Ensure this is taken from requestData
              date_of_travel: requestData.date_of_travel,
              request_date: requestData.request_date,
              collegeName: fetchUserRequestData.collegeName,
              organization_name: fetchUserRequestData.organization_name,
              requestId: fetchUserRequestData._id,
              userId: fetchUserRequestData.reference_id
              // Add more fields as needed
          }];

            setData(combinedData);
            setuserRequestData(fetchUserRequestData);
      }catch(error)
       {
        console.log('Something went wrong while trying to run the fetching of approved data.')
      }
  }

fetchApprovedRequest();
},[]);
  




  const [selectedRttDtt, setSelectRttDtt] = useState(null);

  const handleRttDtt = (RttDtt) => {

    alert('clicked')
    finalClose(); 
    navigate(`/admin/Final_approved/${row.reference_id}/${row.requesId}${row.userId}`);
  };
  const RttDttCell = (row) => (
    <span
      style={{
        color: "#0760A1",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onClick={() =>  navigate(`/admin/Final_approved/${row.requestId}/${row.userId}`)}
    >
      {row.rttDtt || 'View Details'}
    </span>
  );

  const requestColumns = [
    {
      name: "Date Requested",
      selector: (row) => row.date_of_travel.toUpperCase(),
    },
    {
      name: "Requestor",
      selector: (row) => row.requestor_name.toUpperCase(),
    },
    {
      name: "RTT and DTT",
      cell: RttDttCell, 
    },
    {
      name: "Status",
      selector: (row) => row.status.toUpperCase(),
    },
  ];

  return (
    /** FINAL APPROVAL MODAL */
    <Modal
      show={finalShow}
      onHide={finalClose}
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
          Final Approval
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
                    data={data}
                    customStyles={customStyles}
                    highlightOnHover
                    pagination
                    fixedHeader
                    style={{display: 'flex',textAlign: 'center'}}
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

export default FinalApprovalModal;
