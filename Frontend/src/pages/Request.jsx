import React, { useState,useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import DataTable from 'react-data-table-component';
import { Modal, Button } from 'react-bootstrap';
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




  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleShow = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);









  // Columns definition
  const columns = [
    {
      name: 'TIME OF REQUEST',
      selector: row => row.request_time, // Access request_time directly from the row object
    },
    {
      name: 'DATE OF REQUEST',
      selector: row => row.request_date, // Access request_date directly from the row object
    },
    {
      name: 'AUTHORITY TO TRAVEL INFO',
      selector: row => (
        <button
        onClick={() => handleShow(row.imgUrl.file_name)} // Trigger the modal
        style={{
          color: 'blue',
          textDecoration: 'underline',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textDecorationLine:false
        }}
      >
        VIEW DETAILS
      </button>
      ), // Ensure the value rendered is a string or something React can render
    },
    {
      name: 'REQUEST STATUS',
      selector: row => (
        <span style={{
          color: row.status === 'Pending' ? 'RED' : 'GREEN' // Change color based on status
        }}>
          {row.status}
        </span>)
    },
  ];



    

  useEffect(() => {
    const listOfPendingSubmition = async () =>
           {
              const userInfo = JSON.parse(localStorage.getItem("user_info"));
              const reference_id = userInfo?.user_id;

            try{
                const response = await fetch('http://localhost:8000/user/pending_request',
                     {
                        method:'POST',
                        headers: {
                          'Content-Type': 'application/json', // Important for sending JSON data
                      },
                        body: JSON.stringify({ reference_id: reference_id }),
                  });

                  
                    const responseData  =  await response.json();
                    setData(responseData);

            }catch(error)
                {
                  alert('unable to run the try statement in frontend  -catch')
              }
        }
        listOfPendingSubmition(); 
      }, []);


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
              <div style={{ overflowX: 'auto', padding: '20px' }}>
      <table
        style={{
          width: '100%',
          border: '1px solid #ddd',
          borderCollapse: 'collapse',
          textAlign: 'center',
          margin: '10px 0',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f4f4f4',
              color: '#333',
              border: '1px solid #ddd',
              padding: '8px',
              textAlign: 'center',
            }}
          >
            {columns.map((column) => (
              <th key={column.name} style={{ padding: '12px', fontWeight: 'bold' }}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6e6e6')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff')}
              >
                {columns.map((column) => (
                  <td
                    key={column.name}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      fontWeight: 'normal',
                      fontSize: '14px',
                      color: '#333',
                    }}
                  >
                    {column.selector(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
             <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                        {data.length === 0 ? (
                          <p> No requests available at the moment. Please check back later or try again.</p> // Display this message if no data found
                        ) : (
                          <div className="spinner-grow m-3" role="status">
                            <span className="sr-only">Currently fetching data from the backend...</span>
                          </div>
                        )}
                      </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
              
              <Modal show={showModal} onHide={handleClose}>
        
        <Modal.Body>
          <img
            src={modalContent}
            alt="Travel Authority"
            style={{ width: '100%', height: 'auto' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </Col>
          </Row>
        </Container>
      </main>
      <FooterComponent />
    </>
  );
}

export default Request;
