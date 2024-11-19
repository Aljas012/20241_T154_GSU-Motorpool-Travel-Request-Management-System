import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../styles/LandingPage.css";

function AdminLandingPage() {
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

  const headerStyle = {
    margin: 0,
    fontFamily: "Helvetica",
  };

  const [email, setEmail] = useState(""); // For email input
  const [password, setPassword] = useState(""); // For password input
  const [error, setError] = useState(null); // For handling errors


  const handleSubmit = async (e) =>
  {

      e.preventDefault();
      const data = { email, password };
  
      try {
        const response = await fetch("http://localhost:8000/admin/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const json =  response.json();
        if (!response.ok) {
          nullFields();
          setError(json.error); // Show error if login fails
          console.log('unable to logged in --from response unsuccessful in if condition')
        } else {
          // Clear the form and reset state if login is successful
          
          setEmail("");
          setPassword("");
          setError(null);

          localStorage.setItem("auth_token", json.token); // Store the JWT token
          localStorage.setItem("admin_info", JSON.stringify(json.admin));

    
          const adminInfo = JSON.parse(localStorage.getItem("admin_info")); // Parse the stored JSON
          const id = adminInfo.admin_id; // Access the correct key for the user ID

          console.log('admin logged in successfully')
          
         
        }
      } catch (err) {
        setError("An error occurred, please try again."); // Catch network errors
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
          <div>
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
              </h4>
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
                  autoComplete = "current-email"
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
            </Form>

            <div>
              {/** LOG IN AS ADMIN */}
              <h6
                className="text-center mt-5"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
                <a
                  href="/"
                  style={{
                    color: "#767676",
                    fontFamily: "Helvetica",
                  }}
                >
                  Login as User
                </a>
              </h6>

              {/** FORGOT PASSWORD */}
              <h6
                className="text-center"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
                <a
                  href="/forgot-password"
                  style={{
                    color: "#767676",
                    textDecoration: "none",
                    fontFamily: "Helvetica",
                  }}
                >
                  Forgot Password?
                </a>
              </h6>
            </div>
          </div>
        </Col>

        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 4, offset: 2 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="../images/BukSULOGO.png"
              alt="SVG Icon"
              style={{
                width: "50%",
                height: "auto",
                filter: "invert(100%) grayscale(100%)",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLandingPage;
