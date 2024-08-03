import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./WeatherDetails.css";
import { baseUrl } from "../App";

const WeatherDetails = ({ show, handleClose, location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/weather/${location}`);
        setWeatherData(response.data.weather);
        setIsLoading(false);
      } catch (error) {
        console.error("Enter correct name of a city:", error);
        setIsLoading(false);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Weather Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div>Loading...</div>
        ) : weatherData ? (
          <div className="weather-container">
            <h3>
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <div
              style={{
                backgroundColor: "lightblue",
                padding: "1rem",
                margin: "1rem",
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>{weatherData.weather[0].description}</p>
            </div>
            <div className="weather-details">
              <h4>Temperature: {kelvinToCelsius(weatherData.main.temp)} °C</h4>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Sunrise: {convertTimestampToTime(weatherData.sys.sunrise)}</p>
              <p>Sunset: {convertTimestampToTime(weatherData.sys.sunset)}</p>
            </div>
          </div>
        ) : (
          <div>Error fetching weather data, Enter correct name of a city</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WeatherDetails;
