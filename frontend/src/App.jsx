import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import Register from "./pages/registerPage/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/landingPage/Landing";
import EventDetails from "./pages/eventDetailsPage/EventDetails";

export const baseUrl = "https://claw-event-management-backend.onrender.com";
const userToken = sessionStorage.getItem("user-token");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Landing />} />
        <Route path="/event-details" element={<EventDetails />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
