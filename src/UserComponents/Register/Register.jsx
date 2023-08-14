import React, { useState, useEffect } from "react";
import "./Register.css";
import register from "../../assets/images/register.jpg";
import { ActionCreators } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:8000/api/auth/register";

export default function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    shippingAddress: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let user = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        phone: formValues.phoneNumber,
        address: formValues.shippingAddress
      }
      dispatch(
        ActionCreators.addUser(user)
      );
      axios.post(baseURL, user).then((response) => {
        //setProducts(response.data.data);
        console.log("Response: ", response)
        if(response.data.code === 200) {
          navigate("/login");
        }
      });
      // if(JSON.parse(localStorage.getItem("users")) != null) {
      //   let users = JSON.parse(localStorage.getItem("users"))
      //   users.push(user);
      //   localStorage.setItem("users", JSON.stringify(users))
      // } else {
      //   localStorage.setItem("users", JSON.stringify([user]))
      // }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNumberRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password > 16) {
      errors.password = "Password cannot be more than 16 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords not match with each other";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required!";
    } else if (!phoneNumberRegex.test(values.phoneNumber)) {
      errors.phoneNumber = "This is not a valid phone number";
    }
    if (!values.shippingAddress) {
      errors.shippingAddress = "Shipping Address is required!";
    }
    return errors;
  };

  return (
    <div className="leaffie-register">
      <div className="leaffie-register_content container">
        <div className="row">
          <div className="col-6 px-0">
            <img src={register} alt="" className="img-fluid" />
          </div>
          <div className="col-6">
            <div className="leaffie-register_content--title">
              <h3>Register</h3>
            </div>
            <div className="leaffie-register_content--body px-5">
              <form
                className="leaffie-contact-us_content--form"
                onSubmit={handleSubmit}
                name="registerForm"
              >
                <div className="row">
                  <div className="col-12">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="username"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                    <small className="text-danger">{formErrors.username}</small>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <small className="text-danger">{formErrors.email}</small>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <small className="text-danger">{formErrors.password}</small>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                    />
                    <small className="text-danger">
                      {formErrors.confirmPassword}
                    </small>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formValues.phoneNumber}
                      onChange={handleChange}
                    />
                    <small className="text-danger">
                      {formErrors.phoneNumber}
                    </small>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label>Shipping Address</label>
                    <textarea
                      className="form-control"
                      placeholder="Shipping Address"
                      name="shippingAddress"
                      value={formValues.shippingAddress}
                      onChange={handleChange}
                    ></textarea>
                    <small className="text-danger">
                      {formErrors.shippingAddress}
                    </small>
                  </div>
                </div>
                <div className="text-center mt-3">
                  Already a member? <Link to="/login">Login</Link>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-register">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
