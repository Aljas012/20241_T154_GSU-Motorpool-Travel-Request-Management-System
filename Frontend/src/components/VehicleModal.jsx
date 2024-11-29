import React, { useState,useEffect } from "react";
import { Modal, Row, Col, Card, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ReactLoading from 'react-loading';
import addDriver from "../ASSETS/addDriverIcon.svg";


const VehicleModal = ({ vehicleShow, vehicleClose, customStyles }) => {
  /******************************************* VEHICLE INFORMATION DATA TABLE ************/
  // State to hold table data
  const [vehicleInformationData, setVehicleInformationData] = useState([]);

  // State for the modal visibility
  const [showAddVehicle, setShowModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalImage,setModalImage] = useState('')
  const [buttonColor,setButtonColor] = useState('')
  const [conditionModal,setConditionModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [isClicked, setIsClicked] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    vehicleName: "",
    plateNumber: "",
    status: "",
  });

  



  const fetchVehicles = async () => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:8000/admin/get_all_vehicle', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
        setModalMessage(`Error: Unable to fetch vehicles. Status: ${response.status}`);
        setButtonColor('danger');
        setModalIsOpen(true); 
        setLoading(false);
            return;
        }
        setLoading(false);
        const allVehicleData = await response.json();
        setVehicleInformationData(allVehicleData.data);
        return;
    } catch (error) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
        setModalMessage('Something went wrong while fetching vehicle data. Please try again later.',error.message);
        setButtonColor('danger');
        setModalIsOpen(true); 
    }
};

   
    useEffect(() => {
        fetchVehicles();
    }, []);



  // Columns configuration
  const vehicleInformationColumn = [
    {
      name: "Vehicle",
      selector: (row) => row.vehicleName,
    },
    {
      name: "Plate Number",
      selector: (row) => row.plateNumber,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      button:true,
      cell: (row, index) => (
        <div>
          <img
            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732374824/deleteIcon.svg"
            alt="Delete"
            style={{
              height: "1.5rem",
              cursor: "pointer",
              marginRight: "10px",
            }}
          /*  onClick={() => handleDeleteVehicle(row)}*/
            onClick={() =>   {
              setRowToDelete(row); // Set the row to be deleted
              setConditionModal(true); // Open the modal
               }}
          />
        </div>
      ),
    },
  ];

  // Function to handle input change for new vehicle form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };




  // Function to handle adding a new vehicle
  const handleAddVehicle = async () => {
    setIsClicked(true)
    setLoading(true);
    if (newVehicle.vehicleName && newVehicle.plateNumber) {
      // Prepare data to send to the backend
      const data = {
        vehicleName: newVehicle.vehicleName,
        plateNumber: newVehicle.plateNumber,
     };
  
      try {
        // Make the POST request to the backend
        const response = await fetch('http://localhost:8000/admin/add_vehicle', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Parse the response from the backend
        const responseData = await response.json();
  
        // If the response is not OK (error occurred), alert the user
        if (!response.ok) {
          setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
          setModalMessage('Error adding vehicle. Vehicle already exists.');
          setButtonColor('danger');
          setModalIsOpen(true); 
          setIsClicked(false);
        setLoading(false);
          return;
        }
  
        // Assuming the response contains the newly added vehicle data
        console.log('New vehicle data:', responseData.vehicle); // Log the response data to verify
  
     
        setVehicleInformationData((prevData) => [...prevData, responseData.vehicle]);
        
        setNewVehicle({ vehicleName: '', plateNumber: '', status: '' });
        setShowModal(false);
    
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png');
        setModalMessage('Successfully adding Vehicle');
        setButtonColor('success');
        setModalIsOpen(true); 
        setIsClicked(false);
        setLoading(false);
      } catch (error) {

        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
        setModalMessage('Something went wrong!',error);
        setButtonColor('danger');
        setModalIsOpen(true); 
        setIsClicked(false);
        setLoading(false);
      }
  
    } else {
      setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
      setModalMessage('Please fill out all fields before submitting.');
      setButtonColor('warning');
      setModalIsOpen(true); 
      setIsClicked(false);
        setLoading(false);
      return;
    }
  };



  const handleDeleteVehicle = async (vehicleToDelete) => {
    setIsClicked(true);
    setLoading(true);
      const data = { plateNumber: vehicleToDelete.plateNumber }; // Payload
  
      try {
          const response = await fetch('http://localhost:8000/admin/delete_vehicle', {
          method: 'DELETE', 
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
     
        if (!response.ok) {
          setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
          setModalMessage('Failed to delete the vehicle. Please try again. Please try again.');
          setButtonColor('danger');
          setModalIsOpen(true); // Show error modal
          setIsClicked(false);
          setLoading(false);
          return;
        }
  
        const deleteResponse = await response.json();

        setVehicleInformationData((prevData) =>
        prevData.filter((vehicle) => vehicle.plateNumber !== vehicleToDelete.plateNumber)
        );

        fetchVehicles()
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732291143/checked_prbxuf.png');
        setModalMessage('Successfully deleted vehicle');
        setButtonColor('success');
        setModalIsOpen(true); 
        setIsClicked(false);
        setLoading(false);
      } catch (error) {
        setModalImage('https://res.cloudinary.com/dvhfgstud/image/upload/v1732290025/complain_z5n7bb.png');
        setModalMessage('Something went wrong while deleting the vehicle.',error);
        setButtonColor('danger');
        setModalIsOpen(true); 
        setIsClicked(false);
        setLoading(false);
        return;
      }
    
  };
  
  return (
    <>
    <Modal
      show={vehicleShow}
      onHide={vehicleClose}
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
          Vehicle Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-3">
          <Col>
            <Card style={{ backgroundColor: "#F1F1F1" }}>
              <Card.Body>
                <div>
                  <DataTable
                    columns={vehicleInformationColumn}
                    data={vehicleInformationData}
                    customStyles={customStyles}
                    highlightOnHover
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                  />
                  <div>
                    <button
                      className="customButtonVehicle"
                      onClick={() => setShowModal(true)}
                    >
                      <div className="addDriverIconAlignment">
                        <img
                          src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732374476/vehicleIcon.svg"
                          alt="icon"
                          style={{ height: "1.8rem" }}
                        />
                      </div>
                      Add New Vehicle
                    </button>
                  </div>

                  {/* Modal for adding new vehicle */}
                  <Modal
                    show={showAddVehicle}
                    onHide={() => setShowModal(false)}
                  
                  >
                    <Modal.Header
                      closeButton
                      style={{
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Modal.Title
                        style={{
                          fontSize: "1.7rem",
                          fontWeight: "bold",
                          color: "#CD8800",
                        }}
                      >
                        Add New Vehicle
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                        <Col>
                          <Card style={{ backgroundColor: "#F1F1F1" }}>
                            <Card.Body>
                              <div>
                                <Form>
                                  <Form.Group
                                    className="mb-2"
                                    controlId="vehicleName"
                                  >
                                    <Form.Label>Vehicle Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="vehicleName"
                                      style={{
                                        border: "1px solid #00000066",
                                      }}
                                      value={newVehicle.vehicleName}
                                      onChange={handleInputChange}
                                      placeholder="Enter vehicle's name"
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    className="mb-2"
                                    controlId="plateNumber"
                                  >
                                    <Form.Label>Plate Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="plateNumber"
                                      style={{
                                        border: "1px solid #00000066",
                                      }}
                                      value={newVehicle.plateNumber}
                                      onChange={handleInputChange}
                                      placeholder="Enter plate number"
                                    />
                                  </Form.Group>
                                </Form>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        style={{
                          width: "130px", // Fixed width to prevent resizing
                          height: "45px", // Fixed height to prevent resizing
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </Button>
                      <Button disabled={isClicked}  variant="primary" onClick={handleAddVehicle}   className="d-flex justify-content-center align-items-center" // Using Bootstrap's flex utilities
                      style={{
                        width: "130px", // Fixed width to prevent resizing
                        height: "45px",// Fixed height to prevent resizing
                      }}>
                      {isClicked ? ( <ReactLoading type="spokes" color="#fff" height={20} width={20} display="flex" alignItems="center" justifyContent= "center" position= "relative" />) : ( "Add Vehicle" )}  
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>



    <Modal show={modalIsOpen} 
    onHide={() => setModalIsOpen(false)}s
    centered size="sm"animation={true} >
          <Modal.Body style={{ textAlign: 'center',  padding: '20px', backgroundColor: 'white',  color: '#721c24', }}>

          {modalImage && <img src={modalImage} alt="Modal Image" style={{ width: '50px', height: '50px', marginBottom: '20px', borderRadius: '8px' }} />}
          <p style={{fontSize:".9rem"}}>{modalMessage}</p>

          <Button variant= {buttonColor}onClick={() => setModalIsOpen(false)}
            style={{  marginTop: '15px', width: '100%', borderRadius: '5px', }}>
          continue
          </Button>
        </Modal.Body>
    </Modal>

     

      {/* Confirmation Modal */}
      <Modal show={conditionModal} centered size="sm" animation={true}>
        <Modal.Body
          style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', color: '#721c24' }}
        >
          <h4>Are you sure you want to delete?</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
            <Button
              variant="danger"
              className="d-flex justify-content-center align-items-center" 
              onClick={() => setConditionModal(false)} // Close the modal
              style={{  width: "100px", height: "40px", borderRadius: '5px' }}
            >
              Cancel
            </Button>
            
            <Button
              variant="primary"
              disabled={isClicked} 
              className="d-flex justify-content-center align-items-center" 
              onClick={() => {
                if (rowToDelete) {
                  handleDeleteVehicle(rowToDelete); // Trigger deletion
                  setConditionModal(false); // Close modal after deletion
                }
              }}
              style={{  width: "100px", height: "40px", borderRadius: '5px' }}
            >
            {isClicked ? ( <ReactLoading type="spokes" color="#fff" height={20} width={20} display="flex" alignItems="center" justifyContent= "center" position= "relative" />) : ( "Continue" )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    


  </>

  );
};

export default VehicleModal;
