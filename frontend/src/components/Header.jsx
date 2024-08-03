import React, { useEffect } from "react";
import "./Header.css";
import axios from "axios";
import { baseUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onLogout = async () => {
    const response = await axios.post(baseUrl + "/api/user/logout", {
      sessionId: sessionStorage.getItem("sessionId"),
    });
    console.log(response);
    if (response.data.success) {
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("user-token");
      navigate("/");
    }
  };
  useEffect(() => {
    if (!sessionStorage.getItem("user-token")) {
      navigate("/");
    }
  }, []);
  return (
    <header className="header">
      <div>
        <h2> Event Management </h2>
      </div>
      <div>
        <button onClick={onLogout} className="btn btn-danger">
          {" "}
          Logout{" "}
        </button>
      </div>
    </header>
  );
};

export default Header;
