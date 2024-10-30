import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function LandingPage() {
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
    height: "100%", // Added height to allow vertical centering
  };

  const headerStyle = {
    margin: 0,
    fontFamily: "Helvetica",
  };

  return (
    <Container fluid style={{ position: "relative", height: "100vh" }}>
      <div style={leftImageStyle}></div>
      <div style={rightImageStyle}></div>

      <Row
        style={contentStyle}
        className="justify-content-center align-items-center h-100"
      >
        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 0 }} // Shift column to center more on medium screens
          lg={{ span: 4, offset: 0 }} // Shift column to center more on large screens
          className="text-left"
        >
          <div style={{marginBottom: "2rem"}}>
            <Form id="landingpage">
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

              <InputGroup className="mb-3 mt-2 input-shadow">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} size="lg" fixedWidth />
                </InputGroup.Text>
                <Form.Control id="email"
                  size="lg"
                  type="email" // Use lowercase 'email'
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3 input-shadow">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} size="lg" fixedWidth />
                </InputGroup.Text>
                <Form.Control id="password"
                  size="lg"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-100" // Ensures button is full width
              >
                Login
              </Button>

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
                  <span style={{ color: "##167EE6" }}>e</span>
                </a>
              </h5>

              <h5
                className="text-center mt-5"
                style={{ fontFamily: "Helvetica", color: "#767676" }}
              >
                <a
                  href="/forgot-password" // Replace with the actual URL for the Forgot Password page
                  style={{
                    color: "#767676",
                    textDecoration: "none",
                    fontFamily: "Helvetica",
                  }}
                >
                  Forgot Password?
                </a>
              </h5>
            </Form>
          </div>
        </Col>

        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 2 }} // Shift column to center more on medium screens
          lg={{ span: 4, offset: 2 }} // Shift column to center more on large screens
          className="text-left"
        >
          <div style={{ marginLeft: "4.5rem", textAlign: "left" }}>
            {" "}
            {/* Ensure text alignment */}
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
            <Button
              variant="primary"
              type="submit"
              className="d-flex align-items-center justify-content-center" // Removed mx-auto for consistent alignment
              style={{
                fontFamily: "Helvetica",
                padding: "0.75rem 1.5rem",
                fontSize: "1.25rem",
                height: "4rem",
                width: "25rem", // Ensure this width is responsive
                marginTop: "1rem", // Add some margin on top to separate from h3
                marginBottom: "2rem",
                borderRadius: "1.5rem", // Rounded corners
              }}
            >
              <img
                src="./images/BSU_LOGO.png" // Replace with your image source
                alt="Login Icon" // Provide an appropriate alt text
                style={{ width: "38px", height: "38px", marginRight: "10px" }} // Adjust size and margin as needed
              />
              No account yet? Signup
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
