import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const onChangeInputHandler = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
    // console.log(userDetails);
  };
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    // console.log(userDetails);
    if (!userDetails) {
      toast.error("Enter the login details");
      return;
    } else if (!userDetails.email) {
      toast.error("Enter your email");
      return;
    } else if (!userDetails.password) {
      toast.error("Enter correct password");
      return;
    }
    const response = await axios.post(baseUrl + "/api/user/login", {
      email: userDetails.email,
      password: userDetails.password,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      sessionStorage.setItem("user-token", response.data.token);
      sessionStorage.setItem("sessionId", response.data.sessionId);
      setUserDetails({
        email: "",
        password: "",
      });
      navigate("/events");
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user-token")) {
      navigate("/events");
    }
  }, []);

  return (
    <div className="login-container">
      <h2> Login </h2>
      <form className="login-form-container" onSubmit={onSubmitForm}>
        <div className="input-feild-container">
          <label htmlFor=""> E-mail </label>
          <input
            className="input-field"
            type="email"
            name="email"
            id=""
            placeholder="Enter your emial/gmail"
            onChange={onChangeInputHandler}
            value={userDetails.email}
          />
        </div>
        <div className="input-feild-container">
          <label htmlFor=""> Password </label>
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={onChangeInputHandler}
            value={userDetails.password}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <p>
          Don't have an account ?
          <Link to="/register" style={{ color: "green" }}>
            {" "}
            Register here{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
