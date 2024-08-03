import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import WeatherDetails from "../../components/WeatherDetails";
import "./EventDetails.css";

const EventDetails = () => {
  const location = useLocation();
  const { eventDetails } = location.state;

  const [showWeatherModal, setShowWeatherModal] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="detials-container">
      <h2> Event Details </h2>
      <div className="event-details-container">
        <h3>
          {" "}
          <span>Title</span> : {eventDetails.title}{" "}
        </h3>
        <h4>
          {" "}
          <span>Location</span> : {eventDetails.location}{" "}
        </h4>
        <h4>
          {" "}
          <span>Guest</span> : {eventDetails.guest}{" "}
        </h4>
        <h5>
          {" "}
          <span>Date</span> : {formatDate(eventDetails.date)}{" "}
        </h5>
        <p>
          {" "}
          <span>Description</span> : {eventDetails.description}{" "}
        </p>
        <button
          className="btn btn-success"
          onClick={() => setShowWeatherModal(true)}
        >
          Know the weather location
        </button>
      </div>
      <WeatherDetails
        show={showWeatherModal}
        handleClose={() => setShowWeatherModal(false)}
        location={eventDetails.location}
      />
    </div>
  );
};

export default EventDetails;
