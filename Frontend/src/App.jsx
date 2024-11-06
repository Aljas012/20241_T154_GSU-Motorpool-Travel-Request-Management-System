import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
/** USER INTERFACES */
import UserLandingPage from "./pages/UserLandingPage";
import SignupGoogle from "./pages/SignupGoogle";
import UserHomePage from "./pages/UserHomePage";
import AuthorityToTravelForm from "./pages/AuthorityToTravelForm";
import RequestToTravelForm from "./pages/RequestToTravelForm";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const fetchLogin = async () => {
    const data = await axios.get("/user/login");
  };

  useEffect(() => {
    const fetchdata = async () => {};
    fetchdata();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<UserLandingPage />} />
          <Route path="/user/homepage" element={<UserHomePage />} />
          <Route path="/user/signup_google" element={<SignupGoogle />} />
          <Route path="/user/att_forms" element={<AuthorityToTravelForm />} />
          <Route path="/user/request_forms" element={<RequestToTravelForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
