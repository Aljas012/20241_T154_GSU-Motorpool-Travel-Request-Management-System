import React, { useState, useEffect } from "react";
import {Navbar,Container,Row,Col,Form,Card,Button,Modal,DropdownButton,Dropdown,InputGroup,} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavBarComponents";
import FooterComponent from "../components/FooterComponents";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Spinner from 'react-bootstrap/Spinner';


const updateSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Data Updated!",
    text: "Your information has been updated successfully!",
    confirmButtonText: "Continue!",
    width: "500px", // Adjusted width for a more consistent alert size
    padding: "20px", // Added padding to give space for content
    // Optional: You can also customize the buttons or other elements if needed
    customClass: {
      title: "custom-title",
      text: "custom-text",
      confirmButton: "custom-confirm-button",
    },
  });
};



const handleLogout = () => {

  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_info");
  window.location.href = "http://localhost:5173"; 
};


const confirmLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to log out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Log Out",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      handleLogout();
    }
  });
};

function UserProfile() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [inputName, setName] = useState("");
  const [inputEmail, setEmail] = useState("");
  const [inputOffice, setOffice] = useState("");
  const [newCode, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("user_info")) || {};
  const id = userInfo.user_id;
  const office_code = userInfo.office_code || "";
  const college_name = userInfo.college_name || "";
  const name = userInfo.name || "";
  const email = userInfo.email || "";

  // Initialize state with localStorage values
  useEffect(() => {
    const userInfo = localStorage.getItem("user_info");

    if (userInfo) {
      // If user_info exists in localStorage, parse it
      const parsedUserInfo = JSON.parse(userInfo);
      setName(parsedUserInfo.name || "");
      setEmail(parsedUserInfo.email || "");
      setOffice(parsedUserInfo.office || "");
      setCode(parsedUserInfo.office_code || "");
    } else {
      // If user_info is not found in localStorage
      console.error("User info not found in localStorage");
      // Optionally, navigate the user to the login page or show an error message
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = () => {
    navigate(`/user/id=${id}/homepage`);
  };

  const handleRefresh = () => {
    sessionStorage.setItem("refreshFlag", "true");
    window.location.reload();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const officeSelected = (event) => {
    const selectedOffice = event.target.value;
    const [code, college] = selectedOffice.split(" | "); // Split the values by comma
    setCode(code);
    setOffice(college.toUpperCase());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedInformation = {
      inputName,
      inputEmail,
      inputOffice, // office
      newCode, // office_code
      collegeName: inputOffice, // Assuming inputOffice holds the college name
    };

    const token = localStorage.getItem("auth_token");
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userId = userInfo?.user_id;

    if (!token) {
      console.error("Token is missing");
      setError("Authorization token is missing. Please log in again.");
      return;
    }

    if (!userId) {
      console.error("User ID is missing from localStorage");
      setError("User ID is missing. Please try logging in again.");
      return;
    }

    const url = `http://localhost:8000/user/${userId}/update_profile`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(updatedInformation),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        console.error("Update failed", json);
        setError(json.message || "Failed to update profile. Please try again.");
        return;
      }

      // Update state and localStorage with the new data immediately
      const updatedUserInfo = {
        ...userInfo,
        name: inputName,
        email: inputEmail,
        office: inputOffice,
        office_code: newCode,
        college_name: inputOffice, // Here we update the college_name
      };

      // Update the localStorage with the updated user info
      localStorage.setItem("user_info", JSON.stringify(updatedUserInfo));

      // Immediately update the state with the updated values
      // setName(inputName);
      // setEmail(inputEmail);
      // setOffice(inputOffice);
      // setCode(newCode);

      // Provide success feedback
      // handleRefresh(); // option ni if di mag work ang update
      updateSuccess();

      //  // Reset form fields after a successful update
      setName(inputName);
      setEmail(input);
      setOffice(college_name);
      setCode(office_code);

      // Clear errors
      setError(null);
    } catch (error) {
      console.error("Error during update", error);
      setError(
        "An error occurred while updating the profile. Please try again."
      );
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("auth_token");
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userId = userInfo?.user_id;

    if (!token || !userId) {
      console.error("Token or user ID is missing");
      return;
    }

    const url = `http://localhost:8000/user/${userId}/profile`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      if (response.ok) {
        // Update the state with the new user data
        setName(userData.name);
        setEmail(userData.email);
        setOffice(userData.college_name);
        setCode(userId.office_code);

        // Update localStorage with the latest data as well
        localStorage.setItem(
          "user_info",
          JSON.stringify({
            ...userInfo,
            name: userData.name,
            email: userData.email,
            office: userData.college_name,
            office_code: userData.office_code,
          })
        );
      } else {
        console.error("Failed to fetch updated user data:", userData.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };




  const [requestCount, setRequestCount] = useState(null);
  const [todaysRequest, setTodaysRequest] = useState(null);
  const [totalCompletedServices,setCompletedServices] = useState(null)


  const countTotalRequest = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userId = userInfo?.user_id;
    setLoading(true);
    try {
     
      const response = await fetch(`http://localhost:8000/user/total_request`, {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.log("Unable to fetch total request!");
      } 
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not in JSON format");
        return;
      }
      setLoading(false);

      const responseData = await response.json(); 
      setRequestCount(responseData.requestCount);
      setTodaysRequest(responseData.totalToday)
    } catch (error) {
      console.error("Error fetching total requests:", error);
    }
  };
  



  const completedServices = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userId = userInfo?.user_id;  
    setLoading(true);
    try {
      
        let response = await fetch('http://localhost:8000/user/completed_services', {
            method: "POST",
            body: JSON.stringify({ userId }), 
            headers: {
                "Content-Type": "application/json",  
            },
        });

        if (!response.ok) {
          console.error(`Failed to fetch completed services. Status: ${response.status}`);
          alert("Failed to fetch completed services. Please try again later.");
       
          return;
      }

        const responseData = await response.json();  
        setLoading(false);
        if (typeof responseData.completedCount === "number") {
          console.log(`Completed Services: ${responseData.completedCount}`);
          setCompletedServices(responseData.completedCount); // Update state
      } else {
          console.error("Unexpected response format:", responseData);
          alert("An error occurred while processing the response.");
      }
  } catch (error) {
      console.error("Error while fetching completed services:", error);
      alert("An error occurred while fetching completed services. Please try again later.");
  }
};



        useEffect(() => {
          countTotalRequest();
          completedServices();
          fetchUserData()
        }, []); 
      
  return (
    <>
      <NavbarComponent></NavbarComponent>

      <main>
        <Container>
          <Row>
            <Col>
              <div>
                {/** BACK BUTTON */}
                <Button
                  onClick={handleClick} // Handle click event
                  style={{
                    backgroundColor: "#0760A1", // Blue background color for the button
                    color: "#FFFFFF", // Text color (icon color will inherit this)
                    cursor: "pointer", // Change cursor to pointer to indicate clickability
                    display: "flex", // Use flex to center the icon
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                    border: "none", // Remove border
                    borderRadius: "4px", // Optional: Rounded corners
                    width: "3rem",
                    height: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft} // Use the left arrow icon
                    style={{ color: "#FFFFFF", width: "28px", height: "auto" }} // Set icon color to white
                  />
                </Button>

                <div style={{ textAlign: "center" }}>
                  <h2
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      color: "#CD8800",
                      paddingBottom: "1rem",
                    }}
                  >
                    User Profile
                  </h2>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 style={{ fontFamily: "Helvetica", fontWeight: "600" }}>
                  User Information
                </h5>

                {/* Clickable SVG icon on the right side */}
                <button
                  onClick={() => {
                    // Handle your click event here
                    alert("SVG clicked!");
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                
                </button>
              </div>

              <div>
                <Card style={{ backgroundColor: "#F1F1F1" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "15px 15px 15px 15px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      NAME:
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      {name}
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "15px 15px 15px 15px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      EMAIL:
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      {email}
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "15px 15px 15px 15px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      OFFICE CODE:
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      {office_code}
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "15px 15px 15px 15px",
                    }}
                  >
                    <h5 style={{ fontFamily: "Helvetica", margin: 0 }}>
                      COLLEGE/OFFICE:
                    </h5>
                    <h5
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        margin: 0, // Remove default margin to prevent spacing
                        marginLeft: "8px", // Optional: Space between label and value
                      }}
                    >
                      {college_name}
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      padding: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button onClick={toggleModal} variant="primary">
                      {" "}
                      <i className="fa-regular fa-pen-to-square"></i> UPDATE
                      INFORMATION
                    </Button>
                  </div>
                </Card>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1.5rem",
                }}
              >
                <h5 style={{ fontFamily: "Helvetica", fontWeight: "600" }}>
                  Travel History
                </h5>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Card
                  style={{
                    height: "100px",
                    width: "200px",
                    border: "0",
                    background:
                      "linear-gradient(180deg, #0760A1 0%, #02233B 100%)", // Gradient background
                    position: "relative", // Set parent container to relative for absolute positioning inside
                  }}
                >
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      padding: "10px 0 0 10px",
                    }}
                  >
                    Today's Request
                  </h6>

                  <div
                    style={{
                      position: "absolute", // Position the element absolutely
                      bottom: "10px", // Distance from the bottom of the card
                      right: "22px", // Distance from the right side of the card
                    }}
                  >
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#FFFFFF",
                      }}
                    >
                      {loading ? ( <Spinner animation="border" /> ) : ( <p>{todaysRequest !== null ? `${todaysRequest}` : ""}</p> )}
                   
                    </h6>
                  </div>
                </Card>

                <Card
                  style={{
                    height: "100px",
                    width: "200px",
                    border: "0",
                    background:
                      "linear-gradient(180deg, #0760A1 0%, #02233B 100%)", // Your specified gradient
                  }}
                >
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      padding: "10px 0 0 10px",
                    }}
                  >
                    Total Request
                  </h6>

                  <div
                    style={{
                      position: "absolute", // Position the element absolutely
                      bottom: "10px", // Distance from the bottom of the card
                      right: "22px", // Distance from the right side of the card
                    }}
                  >
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#FFFFFF",
                      }}
                    >
                           
                           {loading ? ( <Spinner animation="border" /> ) : ( <p>{requestCount !== null ? `${requestCount}` : ""}</p> )}
                    </h6>
                  </div>
                </Card>

                <Card
                  style={{
                    height: "100px",
                    width: "200px",
                    border: "0",
                    background:
                      "linear-gradient(180deg, #0760A1 0%, #02233B 100%)", // Your specified gradient
                  }}
                >
                  <h6
                    style={{
                      fontFamily: "Helvetica",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#FFFFFF",
                      padding: "10px 0 0 10px",
                    }}
                  >
                    Number of Services Completed
                  </h6>

                  <div
                    style={{
                      position: "absolute", // Position the element absolutely
                      bottom: "10px", // Distance from the bottom of the card
                      right: "22px", // Distance from the right side of the card
                    }}
                  >
                    <h6
                      style={{
                        fontFamily: "Helvetica",
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#FFFFFF",
                      }}
                    >
                       {loading ? ( <Spinner animation="border" /> ) : ( <p>{totalCompletedServices !== null ? `${totalCompletedServices}` : ""}</p> )}
                    </h6>
                  </div>
                </Card>
              </div>
              <Modal show={modal} onHide={toggleModal} centered>
                <Modal.Header>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <Modal.Title>UPDATE INFORMATION</Modal.Title>{" "}
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3 d-flex align-items-center">
                      <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa-regular fa-user"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder={name}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={inputName}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex align-items-center">
                      <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa-regular fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder={email}
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                          value={inputEmail}
                          readOnly
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Select
                      id="office_list"
                      aria-label="Office"
                      value={`${newCode}|${inputOffice}`}
                      onChange={officeSelected}
                    >
                      <option value=""> Select Offices</option>
                      <option value="" disabled>
                        {" "}
                        A{" "}
                      </option>
                      <option value="A101-4F2D1E8C9B |  Accounting Unit (Assessment) ">
                        Accounting Unit (Account)
                      </option>
                      <option value="A102-7D4C1A0E3B |  Accounting Unit (Assessment) - 102">
                        Accounting Unit (Assessment)
                      </option>
                      <option
                        value="A314-5E2F1D0B4A | Admission and Testing Unit (ATU) / Student Welfare and
                        Engagement Unit (SWEU)"
                      >
                        Admission and Testing Unit (ATU) / Student Welfare and
                        Engagement Unit (SWEU)
                      </option>
                      <option value="" disabled>
                        B
                      </option>
                      <option value="B168-9F1C2A4D7D |   Bids & Awards Committee (BAC) / Procurement Unit (PU)">
                        Bids & Awards Committee (BAC) / Procurement Unit (PU)
                      </option>
                      <option value="B193-2B3D5F6E8E | Board Room">
                        Board Room{" "}
                      </option>
                      <option value="B194-A3D5E9F8F7 | Board Secretary">
                        Board Secretary
                      </option>
                      <option value="B312-4E7D1A2B3D | Botanical Gardens and Herbarium (BGH)">
                        Botanical Gardens and Herbarium (BGH)
                      </option>
                      <option value="B114-2D4F1A8C6A | Budget Unit">
                        Budget Unit{" "}
                      </option>
                      <option value="B342-9F2E1B6D3B | Bukidnon Study Center (BSC) / University Museum">
                        Bukidnon Study Center (BSC) / University Museum
                      </option>
                      <option value="B307-1A5F3E8D6C | BukSU Cooperative ">
                        BukSU Cooperative
                      </option>
                      <option value="B308-F9E1B2A7D8 | BukSU Faculty Association (BSUFA)">
                        BukSU Faculty Association (BSUFA)
                      </option>
                      <option value="B314-A6D4C1F7E9 |  Business Affairs Unit (BAU)">
                        Business Affairs Unit (BAU)
                      </option>
                      <option value="" disabled>
                        C
                      </option>
                      <option value="C109-8E2D3B7F5C | COLLEGE OF ARTS AND SCIENCES">
                        CAS Guidance
                      </option>
                      <option value="C103-9F2E1A6D3D |  Cashiering Unit (Window 1 & 2)">
                        Cashiering Unit (Window 1 & 2)
                      </option>
                      <option value="C139-3F1D8B2E9D |  Center for Innovative Teaching and Learning (CITL)">
                        Center for Innovative Teaching and Learning (CITL)
                      </option>
                      <option value="C137-7F2D5E8C1A |  Chief Administrative Office (CAO) Admin">
                        Chief Administrative Office (CAO) Admin
                      </option>
                      <option value="C129-9E3D1A6B8C | Chief Administrative Office (CAO) Finance">
                        Chief Administrative Office (CAO) Finance
                      </option>
                      <option value="C185-1D4F9E2B4A |  Chief Administrative Office (CAO) Finance Officer">
                        Chief Administrative Office (CAO) Finance Officer
                      </option>
                      <option value="C182-5F1D9E3B6A | COLLEGE OF ARTS AND SCIENCES">
                        College of Arts and Sciences (CAS) Dean’s Office
                      </option>
                      <option value="C145-7E2D9F1B2B | COLLEGE OF BUSINESS ">
                        College of Business (COB) Dean’s Office
                      </option>
                      <option value="C157-A8F6D3B2C5 | COLLEGE OF EDUCATION">
                        College of Education (COE) Dean’s Office
                      </option>
                      <option value="C145-1D9F8A4B7D | COLLEGE OF LAW">
                        College of Law (COL) Dean’s Office & Faculty
                      </option>
                      <option value="C172-6F3D8E1A4F | COLLEGE OF MEDICINE">
                        College of Medicine (COM) Dean’s Office thru CON
                      </option>
                      <option value="C172-9E2D1F8A3D | COLLEGE OF NURSING">
                        College of Nursing (CON) Dean’s Office & Faculty
                      </option>
                      <option value="C184-5A7D9F1B2D | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE">
                        College of Public Administration and Governance (CPAG)
                        Dean’s Office
                      </option>
                      <option value="C183-9F1D4B7A8C | COLLEGE OF TECHNOLOGY">
                        College of Technology (COT) Dean’s Office
                      </option>
                      <option value="C106-7A9D1F2B4A  | Commission on Audit (COA) ">
                        Commission on Audit (COA)
                      </option>
                      <option value="" disabled>
                        D
                      </option>
                      <option value="D415-8E1D4F7C5D |  Dental Clinic">
                        Dental Clinic
                      </option>
                      <option value="D411-6F2D5A1C8E |  Disaster Risk Reduction & Management Unit (DRRM)">
                        Disaster Risk Reduction & Management Unit (DRRM)
                      </option>
                      <option value="D205-7A9E4F1B6D | Dormitory - Hostel">
                        Dormitory - Hostel
                      </option>
                      <option value="D171-1A9E3D5C7A | Dormitory - Kalala">
                        Dormitory - Kalala
                      </option>
                      <option value="D180-5F3D9B4C2D |  Dormitory - Mahogany">
                        Dormitory - Mahogany
                      </option>
                      <option value="D197-7E2D5F1C3D | Dormitory - Rubia">
                        Dormitory - Rubia
                      </option>
                      <option value="D195-4A8D2F1B6D | Dormitory - Rubia Cafeteria">
                        Dormitory - Rubia Cafeteria
                      </option>
                      <option value="D165-2F7E9A3C1D | DXBU">DXBU </option>
                      <option value="" disabled>
                        E
                      </option>
                      <option value="E122-3F1D5B9E7A |   Economic Enterprise Unit (EEU)">
                        Economic Enterprise Unit (EEU)
                      </option>
                      <option value="E141-1D5A7B9C2A |  Elementary Laboratory School">
                        Elementary Laboratory School
                      </option>
                      <option value="E144-3D7F8A5B1D |  Environmental Health & Safety Office (EHSO)">
                        Environmental Health & Safety Office (EHSO)
                      </option>
                      <option value="E176-9F1D3A5B2D |  Extension Director">
                        Extension Director
                      </option>
                      <option value="" disabled>
                        F
                      </option>
                      <option value="F200-2D7E1F9B5A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS DevCom & ComDev Department
                      </option>
                      <option value="F147-8A9D1F3C4B | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Economics Department
                      </option>
                      <option value="F128-7D4E1A5B9C | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS General Education Department
                      </option>
                      <option value="F148-9E1D3F5B7D | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS General Science Department
                      </option>
                      <option value="F124-1D9E3B7C8A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Language and Letters Department (LLD),
                        English & Filipino, Graduate Studies
                      </option>
                      <option value="F148-5A3F9E2D1A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Mathematics Department
                      </option>
                      <option value="F128-9D5A1E3B6D | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Natural Science Department
                      </option>
                      <option value="F148-1B7E3D5C9D | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Philosophy Department
                      </option>
                      <option value="F103-9E1D7B5C8A | COLLEGE OF ARTS AND SCIENCES">
                        Faculty - CAS Social Science Department
                      </option>
                      <option value="F189-2D7E1A6B5A | COLLEGE OF BUSINESS">
                        Faculty - COB Accountancy Department
                      </option>
                      <option value="F182-9D5A1E3B6A | COLLEGE OF BUSINESS">
                        Faculty - COB Business Administration Department
                      </option>
                      <option value="F103-7A9D1F6C3D | COLLEGE OF BUSINESS">
                        Faculty - COB Hospitality Management Department
                      </option>
                      <option value="F172-4D3E1F7B9D | COLLEGE OF EDUCATION">
                        Faculty - COE Elementary Laboratory School
                      </option>
                      <option value="F187-1F2D5A9C4D | COLLEGE OF EDUCATION">
                        Faculty - COE P. E. Chairperson
                      </option>
                      <option value="F137-7D3F8A1C2B | COLLEGE OF EDUCATION">
                        Faculty - COE P. E. Department
                      </option>
                      <option value="F178-5A9D1E2F6D | COLLEGE OF EDUCATION">
                        Faculty - COE Secondary Laboratory School
                      </option>
                      <option value="F179-4D3E1B7A8C | COLLEGE OF TECHNOLOGY">
                        Faculty - COT Automotive Department
                      </option>
                      <option value="F184-6A7F3D9B1A | COLLEGE OF TECHNOLOGY">
                        Faculty - COT Food Technology
                      </option>
                      <option value="F203-8B1D9F7E5A | COLLEGE OF TECHNOLOGY">
                        Faculty - COT IT, Electronics Department
                      </option>
                      <option value="F203-1D5E8A7F9A | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE">
                        Faculty - CPAG Bachelor of Public Administration (BPA)
                        Department
                      </option>
                      <option value="F203-7D9A1E5B6A | COLLEGE OF PUBLIC ADMINISTRATION AND GOVERNANCE">
                        Faculty - CPAG Chairperson of DPA and MPA
                      </option>
                      <option value="" disabled>
                        G
                      </option>
                      <option value="G107-2D9A5B7F1C | Gender & Development (GAD) Unit">
                        Gender & Development (GAD) Unit
                      </option>
                      <option value="G147-1F9D2A3B8C | General Services Unit (GSU)">
                        General Services Unit (GSU)
                      </option>
                      <option value="G097-7F2D1A9C5A | Graduate Studies Office Ms. Margarita">
                        Graduate Studies Office Ms. Margarita
                      </option>
                      <option value="G104-8F2D1E9A6D | Guard House 1 (Near BNHS)">
                        Guard House 1 (Near BNHS)
                      </option>
                      <option value="G106-9E5D3A1F4D |  Guard House 2 (Main Gate)">
                        Guard House 2 (Main Gate)
                      </option>
                      <option value="G106-2D9E4B1A5C |  Guard House 3 (Near Zeta)">
                        Guard House 3 (Near Zeta)
                      </option>
                      <option value="G116-5F1D7A3E9B |  Guidance Office ">
                        Guidance Office
                      </option>
                      <option value="" disabled>
                        H
                      </option>
                      <option value="H141-2D3E5F9B6C |  HRMU Learning and Development ">
                        HRMU Learning and Development
                      </option>
                      <option value="H739-4D8F2A7B1E | Hotel Laboratory, Casisang">
                        Hotel Laboratory, Casisang
                      </option>
                      <option value="H306-9D1A5F7C3D | HRMU Performance Management">
                        HRMU Performance Management
                      </option>
                      <option value="H191-7E2D5A8C3A | HRMU Staff">
                        HRMU Staff - 191
                      </option>
                      <option value="" disabled>
                        I
                      </option>
                      <option value="I179-4C7D9E1B5F | ICTU Audio Visual Center (AVC)">
                        ICTU Audio Visual Center (AVC)
                      </option>
                      <option value="I121-3E2F5A9B6C |  ICTU Computer Laboratory-Telephone Concerns">
                        ICTU Computer Laboratory-Telephone Concerns
                      </option>
                      <option value="I131-7B3D9F1A5D | ICTU Data Center ">
                        ICTU Data Center
                      </option>
                      <option value="I198-5A7F2D9B6A |  ICTU Mini-Theater">
                        ICTU Mini-Theater
                      </option>
                      <option value="I128-3D2E1F9C8B | ICTU Officer">
                        ICTU Officer
                      </option>
                      <option value="I311-9F7A4C2D1A |  Information Unit (IU)">
                        Information Unit (IU)
                      </option>
                      <option value="I110-2F9A6D3B7A |  Intellectual Property & Technology Transfer Unit (IPTTU)">
                        Intellectual Property & Technology Transfer Unit (IPTTU)
                      </option>
                      <option value="I300-5D1F7A9C3A |   Internal Audit Unit (IAU)">
                        Internal Audit Unit (IAU)
                      </option>
                      <option
                        value="I313-4F8D1A7B9A |  International Affairs & Linkages Unit (IALU) & Alumni
                        Relations Unit (ARU)"
                      >
                        International Affairs & Linkages Unit (IALU) & Alumni
                        Relations Unit (ARU)
                      </option>
                      <option value="" disabled>
                        L
                      </option>
                      <option value="L141-1F9D3A7B8A | Legal Unit">
                        Legal Unit - 141
                      </option>
                      <option value="L302-8A9D1F7E3D | Library - 1st Floor (Learning Commons)">
                        Library - 1st Floor (Learning Commons)
                      </option>
                      <option value="L303-2E7D5F1A8D |  Library - 2nd Floor (Office of the University Librarian)">
                        Library - 2nd Floor (Office of the University Librarian)
                      </option>
                      <option value="L303-7F2D8A9C5D |  Library - 3rd Floor (Sentro ng Wika at Kultura)">
                        Library - 3rd Floor (Sentro ng Wika at Kultura)
                      </option>
                      <option value="L174-4F1D2E3C8B |  Library - Basement (Graduate School Lawang)">
                        Library - Basement (Graduate School Lawang)
                      </option>
                    </Form.Select>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "20px",
                        marginTop: 15,
                      }}
                    >
                      <Button variant="secondary" onClick={toggleModal}>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={toggleModal}
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <p>Please input the fields that are needed to be updated</p>
                </Modal.Footer>
              </Modal>
            </Col>

            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Horizontally centers the image
                  alignItems: "center", // Vertically centers the image
                  height: "91%", // Ensures the parent div takes full height of the Col
                }}
              >
                <img
                  src="./images/UserProfileBG.png"
                  alt="bg"
                  style={{ width: "60%", height: "auto" }}
                />
              </div>

              {/* Log Out Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Center the button horizontally
                  alignItems: "center",
                }}
              >
                <button
                  onClick={confirmLogout}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#CD8800",
                    width: "50%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontFamily: "Helvetica",
                    fontWeight: "600",
                  }}
                >
                  Log Out
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <FooterComponent></FooterComponent>
    </>
  );
}

export default UserProfile;
