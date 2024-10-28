import React from "react";
import NavbarComponent from "./components/NavBarComponents";
import FooterComponent from "./components/FooterComponents";
import SignupGoogle from "./components/SignupGoogle";
import LandingPageComponents from "./components/LandingPageComponents";
import UserLandingPage from "./components/UserLandingPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css"; // Make sure to import your CSS file

/*function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">

      </div>
      <FooterComponent />
    </div>
  );
}*/

function App() {
  return <UserLandingPage />;
}

export default App;
