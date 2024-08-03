import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../loginPage/Login.css";
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    } else if (userDetails.password != userDetails.confirmPassword) {
      toast.error("password and confirmpassword did not matched!");
      return;
    }
    const response = await axios.post(baseUrl + "/api/user/register", {
      email: userDetails.email,
      password: userDetails.password,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      await sessionStorage.setItem("user-token", response.data.token);
      await sessionStorage.setItem("sessionId", response.data.sessionId);
      setUserDetails({
        email: "",
        password: "",
        confirmPassword: "",
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
      <h2> Register </h2>
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
        <div className="input-feild-container">
          <label htmlFor=""> Confirm Password </label>
          <input
            className="input-field"
            type="password"
            name="confirmPassword"
            placeholder="Enter your password"
            onChange={onChangeInputHandler}
            value={userDetails.confirmPassword}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <p>
          Already have an account ?
          <Link to="/login" style={{ color: "green" }}>
            {" "}
            Login here{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
