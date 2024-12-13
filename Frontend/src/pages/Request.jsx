import React, { useState,useEffect } from "react";
import { Container, Row, Col, Form, Card, Table,} from "react-bootstrap";
import DataTable from 'react-data-table-component';
import { Modal, Button } from 'react-bootstrap';
import NavBarWithBellComponents from "../components/NavBarWithBellComponents";
import FooterComponent from "../components/FooterComponents";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading';
import "../styles/Table.css";

function Request() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const id = userInfo?.user_id;
  const [pdfUrl, setPdfUrl] = useState('');
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [contentType, setContentType] = useState('');
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorModal,setShowErrorModal] = useState(false)
      const [errorMessage,setErrorMessage] = useState('')
      const [errorColor,setErrorColor] = useState('')
      const [errorIcon,setErrorIcon] = useState('')
      const [errorDiv,setErrorDiv] = useState('')
      const warning = '#FCC737'
      const danger = '#C63C51'
      const [pdfKey, setPdfKey] = useState(0);



  const isPDF = (fileName) => {
    return fileName && fileName.toLowerCase().endsWith('.pdf');
  };

  const isImage = (fileName) => {
    return fileName && (
      fileName.toLowerCase().endsWith('.jpg') ||
      fileName.toLowerCase().endsWith('.jpeg') ||
      fileName.toLowerCase().endsWith('.png') ||
      fileName.toLowerCase().endsWith('.gif')
    );
  };

  const handleShow = async (content, type) => {
    setIsLoading(true);
    setPdfKey(prevKey => prevKey + 1);
    console.log('Content URL:', content); // Debug log

    if (type === 'pdf') {
      // Try to get the direct PDF URL
      try {
        const response = await fetch(content);
        if (!response.ok) throw new Error('Failed to load PDF');
        
        // Get the direct URL from the response
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setModalContent(pdfUrl);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setLoadError(true);
        setModalContent(content); // Fallback to original URL
      }
    } else {
      setModalContent(content);
    }
    
    setContentType(type);
    setShowModal(true);
  };

  const handleClose = () => {
    if (modalContent && modalContent.startsWith('blob:')) {
      URL.revokeObjectURL(modalContent);
    }
    setShowModal(false);
    setIsLoading(true);
    setLoadError(false);
  };

  const columns = [
    {
      name: 'TIME OF REQUEST',
      selector: row => row.request_time,
    },
    {
      name: 'DATE OF REQUEST',
      selector: row => row.request_date,
    },
    {
      name: 'AUTHORITY TO TRAVEL INFO',
  selector: row => {
    const fileName = row.imgUrl?.file_name;
    console.log('File URL:', fileName); // Debug log
    
    if (isPDF(fileName)) {
      return (
        <button
          onClick={() => handleShow(fileName, 'pdf')}
          style={{
            color: 'blue',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          View PDF
        </button>
          );
        } else if (isImage(fileName)) {
          return (
            <button
              onClick={() => handleShow(fileName, 'image')}
              style={{
                color: 'green',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Image
            </button>
          );
        }
        return <span>Unsupported File Type</span>;
      }
    },
    {
      name: 'REQUEST STATUS',
      selector: row => (
        <span style={{
          color: row.status === 'Declined' ? 'RED' : 'GREEN'
        }}>
          {row.status}
        </span>
      )
    },
  ];

  const handleClick = () => {
    navigate(`/user/id=${id}/homepage`);
  };

  useEffect(() => {
    const listOfPendingSubmition = async () => {
      setIsLoading(true); // Start loading
      const userInfo = JSON.parse(localStorage.getItem("user_info"));
      const reference_id = userInfo?.user_id;

      try {
        const response = await fetch('http://localhost:8000/user/pending_request',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reference_id: reference_id }),
          });
          if(!response.ok)
              {
                setShowErrorModal(true);
                setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
                setErrorColor('white');
                setErrorDiv(warning);
                setErrorMessage('Something went wrong!. Not on you but on the server. ');
                setIsLoading(false);
          }

        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false); // Stop loading after data is received
      } catch(error) {
        setShowErrorModal(true);
        setErrorIcon('https://res.cloudinary.com/dvhfgstud/image/upload/v1732116882/warning_xpcpdr.png');
        setErrorColor('white');
        setErrorDiv(danger);
        setErrorMessage('Something went wrong. Please check your internet connection and try again.');
        setIsLoading(false); // Stop loading on error
      }
    };
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
              
              <Modal 
                show={showModal} 
                onHide={handleClose} 
                centered
                dialogClassName="custom-modal-width"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{contentType === 'pdf' ? 'PDF Document' : 'Image'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '1rem' }}>
                  {contentType === 'pdf' ? (
                    <div style={{ 
                      height: '70vh',
                      width: '100%',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      {isLoading && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1000,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          <ReactLoading 
                            type="spin"
                            color="#0d6efd"
                            height={50}
                            width={50}
                          />
                          <p style={{ 
                            marginTop: '10px', 
                            color: '#666',
                            textAlign: 'center' 
                          }}>
                            Loading PDF...
                          </p>
                        </div>
                      )}
                      <iframe
                        key={pdfKey}
                        src={modalContent}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        style={{ 
                          border: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          display: isLoading ? 'none' : 'block'
                        }}
                        onLoad={() => {
                          setTimeout(() => setIsLoading(false), 1000);
                        }}
                      />
                      {loadError && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center'
                        }}>
                          <p>Unable to display PDF.</p>
                          <Button 
                            variant="primary" 
                            onClick={() => window.open(modalContent, '_blank')}
                          >
                            Open PDF
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      height: '70vh',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={modalContent}
                        alt="Travel Authority"
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/path/to/fallback/image.png';
                        }}
                      />
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  {(contentType === 'pdf' || contentType === 'image') && (
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = modalContent;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      Open in New Tab
                    </Button>
                  )}
                </Modal.Footer>
              </Modal>



              <Modal show={errorModal} centered>
                            <Modal.Body style={{ backgroundColor: errorColor, borderRadius: '0px', display: 'flex',
                                justifyContent: 'center',alignItems: 'center',flexDirection: 'column',padding: 0,}}>
                              <img src={errorIcon} alt="no internet" height="90px" width="90px" draggable={false} style={{marginBottom: "1.5em",marginTop:'2rem'}}/>
                              <p style={{color: 'black',textAlign:'center',margin:'.5rem'}}>{errorMessage}</p>
                              <div style={{display:'flex',backgroundColor:errorDiv,width:'100%',  padding: '10px',marginTop:'1em',justifyContent:'center'}}>
                              <button style={{ backgroundColor: 'transparent',border:'none',margin:'.8em',color:'white'}} onClick={()=>setShowErrorModal(false)}> DISMISS </button>
                            </div>
                            </Modal.Body>
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
