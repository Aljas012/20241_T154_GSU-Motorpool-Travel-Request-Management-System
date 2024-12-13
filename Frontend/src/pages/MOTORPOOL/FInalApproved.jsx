import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import NavbarComponent from "../../components/NavbarComponent.jsx";
import HeadApprovedATT from "../../components/HeadApprovedATT.jsx";
import HeadApprovedRTT from "../../components/HeadApprovedRTT.jsx";
import HeadApprovedDTT from "../../components/HeadApprovedDTT.jsx";

function FinalApproved() {
  /** VIEW APPROVED ATT MODAL FUNC */
  const [ApprovedATTShow, setApprovedViewATTModalShow] = useState(false);
  const viewHeadApprovedATTModalClose = () => setApprovedViewATTModalShow(false);
  const viewHeadApprovedATTModalShow = () => setApprovedViewATTModalShow(true);

  /** VIEW APPROVED RTT MODAL FUNC */
  const [ApprovedRTTShow, setApprovedViewRTTModalShow] = useState(false);
  const viewHeadApprovedRTTModalClose = () => setApprovedViewRTTModalShow(false);
  const viewHeadApprovedRTTModalShow = () => setApprovedViewRTTModalShow(true);

  /** VIEW APPROVED DTT MODAL FUNC */
  const [ApprovedDTTShow, setApprovedViewDTTModalShow] = useState(false);
  const viewHeadApprovedDTTModalClose = () => setApprovedViewDTTModalShow(false);
  const viewHeadApprovedDTTModalShow = () => setApprovedViewDTTModalShow(true);
  const { userId, requestId } = useParams(); 
  const [fileUrl, setFileUrl] = useState(''); // State to hold the file URL

  const fetchUsersAtt = async () => {
// Ensure you get these from useParams
    const data = { userId, requestId };
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
      const fetchedFileUrl = responseData.data.file_name; // Correctly access file_name
      console.log('File URL:', fetchedFileUrl); // Log the URL to check if it's valid
      
      setFileUrl(fetchedFileUrl); // Set the file URL to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank'); // Open the file URL in a new tab
    } else {
      console.error("File URL is not available for download.");
    }
  };

  useEffect(() => {
    fetchUsersAtt();
  }, []);



  const fetchRttPdf = async () =>
       {
        const rttData = {requestId};
        try{
          const generateRttPdf = await fetch('http://localhost:8000/admin/generate_rtt',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rttData)
          })

          if(!generateRttPdf.ok){
            console.log('Something is wrong in the backend. Cannot create pdf')
            return;
          }
          console.log('generate pdf success')
          const rttPdf = await generateRttPdf.json();

        }catch(error)
           {
            console.log('Something went wrong while fetching the rtt pdf', error)
        }
    }

    const generateDttPdf = async (e) =>{
      
        const dttData = {requestId};
        alert(requestId)
        try{
          const generateDttPdf = await fetch('http://localhost:8000/admin/generate_dtt',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dttData)
          })
          console.log('success')
          if(!generateDttPdf.ok){
            console.log('Something is wrong in the backend. Cannot create pdf')
            return;
          }

        const pdfBlob = await generateDttPdf.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        console.log("PDF generated successfully. Redirecting to the PDF...");

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Approved drivers ticket.pdf"; 
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link); 
        URL.revokeObjectURL(pdfUrl);
        }catch(error){
          console.log('Something went wrong while fetching the dtt pdf', error)
        }
    }





  return (
    <>
      <NavbarComponent />

      <main>
        <Container>
          <Row style={{ height: "100vh" }}>
            <Col>
              <Card className="mt-4" style={{ backgroundColor: "#f2f2f2" }}>
                <Card.Body>
                  <div>
                    <div className="lineBorderVR1 alignmentFA">
                      <div>
                        <a
                          className="customA3 alignment2"
                          onClick={viewHeadApprovedATTModalShow}
                        >
                          <h5 className="customH5Request">
                            View ATT Information 
                          </h5>
                        </a>
                      </div>

                      <div
                        style={{
                          paddingRight: "1.8rem",
                        }}
                      >
                        <Button onClick={handleDownload} variant="link">
                          <img
                            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732457009/downloadIcon_szyrw2.svg"
                            alt="Download"
                            className="customIcon2"
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="lineBorderVR1 alignmentFA">
                      <div>
                        <a
                          className="customA3 alignment2"
                          onClick={viewHeadApprovedRTTModalShow}
                        >
                          <h5 className="customH5Request">
                            View Approved RTT Information
                          </h5>
                        </a>
                      </div>

                      <div
                        style={{
                          paddingRight: "1.8rem",
                        }}
                      >
                        <a href="">
                          <img
                            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732457009/downloadIcon_szyrw2.svg"
                            alt="asd"
                            className="customIcon2"
                          />
                        </a>
                      </div>
                    </div>

                    <div className="lineBorderVR1 alignmentFA">
                      <div>
                        <a
                          className="customA3 alignment2"
                          onClick={viewHeadApprovedDTTModalShow}
                        >
                          <h5 className="customH5Request">
                            View Approved DTT Information
                          </h5>
                        </a>
                      </div>

                      <div
                        style={{
                          paddingRight: "1.8rem",
                        }}
                      >
                        <button style={{border:'none'}}onClick= {(e) =>{generateDttPdf(); e.preventDefault();}} >
                        <a href="">
                          <img
                            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732457009/downloadIcon_szyrw2.svg"
                            alt="asd"
                            className="customIcon2"
                          />
                        </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/** VIEW HEAD APPROVED ATT MODAL */}
          <HeadApprovedATT
            viewHeadApprovedATTModalShow={ApprovedATTShow}
            viewHeadApprovedATTModalClose={viewHeadApprovedATTModalClose}
          />

          {/** VIEW HEAD APPROVED RTT MODAL */}
          <HeadApprovedRTT
            viewHeadApprovedRTTModalShow={ApprovedRTTShow}
            viewHeadApprovedRTTModalClose={viewHeadApprovedRTTModalClose}
          />

          {/** VIEW HEAD APPROVED DTT MODAL */}
          <HeadApprovedDTT
            viewHeadApprovedDTTModalShow={ApprovedDTTShow}
            viewHeadApprovedDTTModalClose={viewHeadApprovedDTTModalClose}
          />
        </Container>
      </main>
    </>
  );
}

export default FinalApproved;
