import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/** USER INTERFACES */
import UserLandingPage from "./pages/UserLandingPage";
import SignupGoogle from "./pages/SignupGoogle";
import UserHomePage from "./pages/UserHomePage";
import AuthorityToTravelForm from "./pages/AuthorityToTravelForm";
import RequestToTravelForm from "./pages/RequestToTravelForm";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverAccount from "./pages/RecoverAccount";
import AboutUs from "./pages/AboutUs";
import UserGuide from "./pages/UserGuide";
import Request from "./pages/Request";
import Profile from "./pages/UserProfile";
import PrivateRoute from "./routeChecker";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProtectedRoute from "./routeChecker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserLandingPage />} />
        <Route path="/user/signup_google" element={<SignupGoogle />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/user/recover_account" element={<RecoverAccount />} />
          <Route path="/user/:id/homepage" element={<UserHomePage />} />
          <Route path="/user/att_forms" element={<AuthorityToTravelForm />} />
          <Route path="/user/request_forms" element={<RequestToTravelForm />} />
          <Route path="/user/forgot_password" element={<ForgotPassword />} />
          <Route path="/user/about_us" element={<AboutUs />} />
          <Route path="/user/user_guide" element={<UserGuide />} />
          <Route path="/user/request" element={<Request />} />
          <Route path="/user/:id/profile" element={<Profile />} />
          {'<Route path="/user/att_forms/download" element={<AuthorityToTravelFormDownload />} />'}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
