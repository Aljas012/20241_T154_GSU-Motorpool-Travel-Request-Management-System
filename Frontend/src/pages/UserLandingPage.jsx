import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup,Modal, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Fixed missing import
import Swal from "sweetalert2";
import "../styles/LandingPage.css";



function UserLandingPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  
  const toggleModal = () => {
    setModal(!modal);
  };

  const alertWindow = () => {
    Swal.fire({
      position: "center-left",
      icon: "error",
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      height:"40px",
      width: "400px",
      customClass: {
        popup: "my-popup", // Custom class for additional styling
        icon: "my-icon",   // Custom class for the icon
      },
      didOpen: () => {
        // You can use inline styling if you prefer
        const icon = document.querySelector(".swal2-icon.swal2-error");
        if (icon) {
          icon.style.width = "30px";  // Adjust the width
          icon.style.height = "30px"; // Adjust the height
        }
      },
    });
  };

  const nullInputs = () => {
    Swal.fire({
      position: "center-left",
      icon: "warning",
      title: "Missing Information",
      text: "Input fields cannot be left blank!",
      height:"40px",
      width: "400px",
      customClass: {
        popup: "my-popup", // Adding a custom class to the popup element
      },
      didOpen: () => {  
        // Inline styling for the warning icon
        const icon = document.querySelector(".swal2-icon.swal2-warning");
        if (icon) {
          icon.style.fontSize = "1rem"; // Adjust the font size
          icon.style.width = "30px";    // Adjust the width
          icon.style.height = "30px";   // Adjust the height
        }
        
        // Inline styling for the popup
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.marginLeft = "270px"; // Apply inline margin-left to the popup
        }
      },
    });
  };




  const nullField = () => {
    Swal.fire({
      position: "center-left",
      icon: "warning",
      title: "Missing Information",
      text: "Input fields cannot be left blank!",
      width: "400px",
      height: "20px",
      customClass: {
        popup: "my-popup", // Adding a custom class to the popup element
      },
      didOpen: () => {
        // Inline styling via the custom class for styling after the popup opens
        const popup = Swal.getPopup(); // Get the popup element
        popup.style.marginLeft = "790px"; // Apply inline margin-left to the popup
      },
    });
  };

  const leftImageStyle = {
    backgroundImage: "url('/images/GSU_BG.png')",
    backgroundSize: "58% 100%",
    backgroundPosition: "left top",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    zIndex: 1,
  };

  const rightImageStyle = {
    backgroundImage: "url('/images/GSUREC_BG.png')",
    backgroundSize: "55% 100%",
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    right: 0,
    height: "100vh",
    width: "100%",
    zIndex: 2,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 3,
    padding: "20px",
    height: "100%",
  };

  const nullFields = () => {
    alertWindow();
  }; //alert window function

  const headerStyle = {
    margin: 0,
    fontFamily: "Helvetica",
  };


  const [email, setEmail] = useState(""); // For email input
  const [password, setPassword] = useState(""); // For password input
  const [error, setError] = useState(null); // For handling errors
  
  
  function validateEmail(email) {
    // Define the allowed email domains
    if(email !== "")
    {
    const allowedDomains = ['@buksu.edu.ph', '@student.buksu.edu.ph'];
    const isValid = allowedDomains.some((domain) => email.endsWith(domain));
    return isValid;}
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };
    
            
          if (email === "" || password === "") {
              Swal.fire({
                icon: 'error',
                title: 'null input fields',
                text: 'Please occupy all input fields to',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#FF0000',
              });
              return; 
            }
            
            
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'The email must end with @buksu.edu.ph or @student.buksu.edu.ph.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#FF0000',
      });
      return; // Stop further execution if the email is invalid
    }

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
        
      const json = await response.json();
      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'The email or password you entered is incorrect. Please try again.',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#FF0000',
        });
        return; 
      } else {
        // Clear the form and reset state if login is successful

        setEmail("");
        setPassword("");
        setError(null);
        localStorage.setItem("auth_token", json.token); // Store the JWT token
        localStorage.setItem("user_info", JSON.stringify(json.user));
        console.log("email: " + email);
        console.log("password: " + password);
        const userInfo = JSON.parse(localStorage.getItem("user_info")); // Parse the stored JSON
        const id = userInfo.user_id; // Access the correct key for the user ID
        navigate(`/user/id=${id}/homepage`);
      }
    } catch (err) {
      alertWindow();
    }


  };






  //===========================================================================================
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPin, setForgotPin] = useState(""); // Added this state
  const [verifiedPassword,setVerifiedPassword] = useState(""); 
  const [inputtedPassword, setInputtedPassword] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false); // Set to false initially
  const [showPinModal, setShowPinModal] = useState(false);
  const [showChangePassword,setShowNewPassword] = useState(false)

  const toggleEmailModal = () => setShowEmailModal(!showEmailModal);
  const togglePinModal = () => setShowPinModal(!showPinModal);
  const toggleChangePassword = () => setShowNewPassword(!showChangePassword);



 /**================ EMAIL CHECKER =================== */

  const sendEmailHandler = async () => {
    console.log(forgotEmail); 
    const emailData = { email: forgotEmail };

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email format is valid and ends with '.com'
    if (!emailRegex.test(forgotEmail) || !forgotEmail.endsWith('.com')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email Format',
        text: 'Please input a valid email address!',
        customClass: {
          icon: 'custom-icon', // Adding a custom class to the icon
        },
        didOpen: () => {
          // Inline styling to resize the icon
          const icon = Swal.getIcon(); // Get the icon element
          icon.style.width = '80px'; // Set the width of the icon
          icon.style.height = '80px'; // Set the height of the icon
        }
      });
      
        return; // Stop the function execution if the email format is invalid
      }


    try {
      const response = await fetch("http://localhost:8000/user/email_verification", {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Verification Sent',
          text: 'A verification code has been sent to your email.',
          customClass: {
            icon: 'custom-icon', // Adding a custom class to the icon
          },
          didOpen: () => {
            // Inline styling to resize the icon
            const icon = Swal.getIcon(); // Get the icon element
            icon.style.width = '50px'; // Set the width of the icon
            icon.style.height = '50px'; // Set the height of the icon
          }
        });
        
        setShowEmailModal(false);
        setShowPinModal(true);
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: json.error || 'Failed to send the verification code. Maybe due to unregistered email address or invalid format!',
        });
      }
      
    } catch (error) {
      // Handle network or unexpected errors
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'There was an error sending the request. Please check your internet connection and try again.',
      });
    }
  };

  // Function to handle the PIN verification
  const pinHandler = async () => {
    console.log('Forgot Pin:', forgotPin);
    console.log('Forgot Email:', forgotEmail);
    
    const data = { forgotPin, forgotEmail };
    console.log('Data being sent to backend:', data);

    try {
      const response = await fetch('http://localhost:8000/user/verify_code', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Verification Successful',
          text: 'Your PIN has been successfully verified!',
          confirmButtonText: 'OK',
        });

        setShowPinModal(false);
        setShowNewPassword(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid PIN',
          text: 'The PIN you entered is incorrect. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'There was an error verifying your PIN. Please try again.',
      });
    }
  };



  //========================== CHANGE PASSWORD HANDLER ====================================

  const changePasswordHandler = async () => {
    if (verifiedPassword !== inputtedPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords Do Not Match',
        text: 'Please make sure both passwords are the same!',
      });
      return;
    }
  
    const data = { inputtedPassword, forgotEmail };
  
    try {
      const response = await fetch('http://localhost:8000/user/change_password', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error Changing Password',
          text: json.mssg || 'An unexpected error occurred. Please try again later.',
        });
        console.error('Error:', json);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed Successfully',
          text: json.mssg || 'Your password has been updated successfully.',
        });
        console.log('Password changed successfully:', json);
        setShowNewPassword(false)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'An error occurred while trying to change the password. Please check your internet connection and try again.',
      });
      console.error('Error occurred:', error);
    }
  };
  
  



    
  return (
    <Container fluid style={{ position: "relative", height: "100vh" }}>
      <div style={leftImageStyle}></div>
      <div style={rightImageStyle}></div>

      <Row
        style={contentStyle}
        className="justify-content-center align-items-center h-100"
      >
        {/** FIRST COLUMN / LEFT SIDE */}
        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 4, offset: 0 }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <Form id="landingpage" onSubmit={handleSubmit}>
              <h2
                style={{
                  ...headerStyle,
                  color: "#0760A1",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                }}
              >
                BUKSU
              </h2>
              <h2
                style={{
                  ...headerStyle,
                  color: "#0760A1",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                }}
              >
                GSU MOTORPOOL
              </h2>
              <h4
                style={{
                  ...headerStyle,
                  color: "#CD8800",
                  fontWeight: 600,
                  fontSize: "1.75rem",
                }}
              >
                Request Management System
              </h4>{" "}
              
              <h4
                style={{
                  ...headerStyle,
                  color: "#767676",
                  fontWeight: 600,
                  marginTop: "3rem",
                }}
              >
                Sign-in to your account!
              </h4>
              {/** EMAIL INPUT FIELD */}
              <InputGroup className="mb-3 mt-2 input-shadow">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} size="lg" fixedWidth />
                </InputGroup.Text>
                <Form.Control
                  id="email"
                  size="lg"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  autoComplete="current-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </InputGroup>
              {/** PASSWORD INPUT FIELD */}
              <InputGroup className="mb-3 input-shadow">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} size="lg" fixedWidth />
                </InputGroup.Text>
                <Form.Control
                  id="password"
                  size="lg"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </InputGroup>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-100"
              >
                Login
              </Button>
              {/** SIGN IN WITH GOOGLE */}
              <h5
                className="text-center mt-3"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
                or sign in with{" "}
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: "#FF4B26" }}>G</span>
                  <span style={{ color: "#FFD500" }}>o</span>
                  <span style={{ color: "#12B347" }}>o</span>
                  <span style={{ color: "#0F993E" }}>g</span>
                  <span style={{ color: "#167EE6" }}>l</span>
                  <span style={{ color: "#167EE6" }}>e</span>
                </a>
              </h5>
              {/** FORGOT PASSWORD */}
              <h5
                className="text-center mt-5"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              ></h5>
              {/** FORGOT PASSWORD */}
              <div style={{ textAlign: "center" }}>
                <a
                  href="/admin/AdminLandingPage"
                  style={{
                    textDecoration: "none",
                    display: "block",
                    color: "black",
                    marginBlock: "5px",
                  }}
                >
                  ADMIN LOGIN
                </a>
                <button type="button" class="btn btn-outline-secondary"onClick={toggleEmailModal}>Forgot Password?</button>
              </div>
            </Form>
          </div>
        </Col>

        {/** MODAL FOR  */}

        <Modal show={showEmailModal} onHide={toggleEmailModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center justify-content-center">
            Email Verification Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            sendEmailHandler(); // Call the email sending function
          }}>
            <Form.Group className="mb-3 d-flex align-items-center">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ padding: "15px" }}>
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={forgotEmail} // Bind the state value
                  onChange={(e) => setForgotEmail(e.target.value)} // Update the state on input change
                  aria-describedby="basic-addon1"
                  style={{ padding: "12px" }}
                />
                <Button type="submit" className="btn btn-primary">
                  SEND CODE
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-center justify-content-center">
          <p>Enter your email to receive a verification code and proceed.</p>
        </Modal.Footer>
      </Modal>

      {/* PIN Verification Modal */}
      <Modal show={showPinModal} onHide={togglePinModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center justify-content-center">
            INPUT VALID PIN
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            pinHandler() // Call your pin verification function here if needed
          }}>
            
            <Form.Group className="mb-3 d-flex align-items-center">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ padding: "15px" }}>
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="PIN"
                  aria-label="PIN"
                  value={forgotPin} // Bind the state value
                  onChange={(e) => setForgotPin(e.target.value)} // Update the state on input change
                  aria-describedby="basic-addon1"
                  style={{ padding: "12px" }}
                />
                <Button type="submit" className="btn btn-primary">
                  VERIFY
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-center justify-content-center">
          <p>Enter your PIN to verify and proceed.</p>
        </Modal.Footer>
      </Modal>

      <Modal show={showChangePassword} onHide={toggleChangePassword} centered>
  <Modal.Header closeButton>
    <Modal.Title className="text-center justify-content-center">
      CHANGE PASSWORD
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        changePasswordHandler(); // Call your password change handler
      }}
    >
      {/* Use Stack to align input fields and button vertically */}
      <Stack gap={3}>
        {/* First Input Field */}
        <InputGroup>
          <Form.Control
            placeholder="New Password"
            aria-label="new password"
            value={inputtedPassword} // Bind the state value
            onChange={(e) => setInputtedPassword(e.target.value)} // Update the state on input change
            style={{ padding: "12px" }}
          />
        </InputGroup>

        {/* Second Input Field */}
        <InputGroup>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            aria-label="confirm password"
            value={verifiedPassword} // Bind the state value
            onChange={(e) => setVerifiedPassword(e.target.value)} // Update the state on input change
            style={{ padding: "12px" }}
          />
        </InputGroup>

        {/* Submit Button */}
        <Button type="submit" className="btn btn-primary w-100">
          UPDATE
        </Button>
      </Stack>
    </Form>
  </Modal.Body>
  <Modal.Footer className="text-center justify-content-center">
    <p>Enter your new password and click the UPDATE button.</p>
  </Modal.Footer>
</Modal>




        {/** SECOND COLUMN / RIGHT SIDE */}
        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 4, offset: 2 }}
        >
          <div style={{ marginLeft: "4.5rem", textAlign: "left" }}>
            <h4
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontStyle: "italic",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Educate. Innovate. Lead
            </h4>
            <h3
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontWeight: 700,
                fontSize: "2rem",
              }}
            >
              Welcome Back!
            </h3>

            {/** SIGN UP PORTION */}
            <Button
              variant="primary"
              type="button"
              className="d-flex align-items-center justify-content-center"
              style={{
                fontFamily: "Helvetica",
                padding: "0.75rem 1.5rem",
                fontSize: "1.25rem",
                height: "4rem",
                width: "25rem",
                marginTop: "1rem",
                marginBottom: "2rem",
                borderRadius: "1.5rem",
              }}
              onClick={() => navigate("/user/signup_google")}
            >
              <img
                src="./images/BSU_LOGO.png"
                alt="Login Icon"
                style={{ width: "38px", height: "38px", marginRight: "10px" }}
              />
              No account yet? Signup
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserLandingPage;
