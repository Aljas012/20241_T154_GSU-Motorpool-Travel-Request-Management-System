import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';

const HeadApprovedATT = ({
  viewHeadApprovedATTModalShow,
  viewHeadApprovedATTModalClose,
}) => {
  const [modalContent, setModalContent] = useState('');
  const [contentType, setContentType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const { reference_id, requestId } = useParams();

  useEffect(() => {
    const fetchUsersAtt = async () => {
      const data = { reference_id, requestId };
      console.log('Fetching data with:', data);
      try {
        const response = await fetch(`http://localhost:8000/admin/fetch_users_approved_att/${requestId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log("Cannot fetch att data in the backend");
          return;
        }

        const responseData = await response.json();
        console.log('Fetched data:', responseData); // Log the entire response
        
        // Access the file_name property from the response
        const fileUrl = responseData.data.file_name; // Correctly access file_name
        console.log('File URL:', fileUrl); // Log the URL to check if it's valid
        
        setModalContent(fileUrl); // Set modal content to the URL
        setContentType(isPDF(fileUrl) ? 'pdf' : 'image'); // Determine content type
        setIsLoading(false); // Stop loading after setting content
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadError(true); // Set load error state
      }
    };
    fetchUsersAtt();
  }, [reference_id, requestId]);

  const isPDF = (url) => {
    return url?.toLowerCase().endsWith('.pdf');
  };

  return (
    <Modal
      show={viewHeadApprovedATTModalShow} // Correct state usage
      onHide={viewHeadApprovedATTModalClose} // Correct handler for closing the modal
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
          Authority To Travel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card
              style={{
                backgroundColor: "#F1F1F1",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <Card.Body>
                <Col>
                  <div className="alignmentVRTT" style={{ alignItems: "center" }}>
                    {isLoading ? (
                      <p>Loading...</p> // Display loading text or spinner
                    ) : loadError ? (
                      <p>Error loading document.</p> // Display error message
                    ) : isPDF(modalContent) ? (
                      <iframe
                        src={modalContent}
                        type="application/pdf"
                        style={{
                          width: '100%',
                          height: '70vh',
                          border: 'none',
                        }}
                      />
                    ) : (
                      <img
                        src={modalContent}
                        alt="Authority to Travel Document"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '70vh',
                          objectFit: 'contain'
                        }}
                      />
                    )}
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default HeadApprovedATT;
