import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user-token")) {
      navigate("/events");
    }
  }, []);
  return (
    <div className="main-container">
      <h1> Welcome to Event Management Application </h1>
      <div>
        <button
          style={{ margin: "1rem" }}
          className="btn btn-success"
          onClick={() => navigate("/login")}
        >
          {" "}
          Login{" "}
        </button>
        <button
          style={{ margin: "1rem" }}
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          {" "}
          Register{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;
