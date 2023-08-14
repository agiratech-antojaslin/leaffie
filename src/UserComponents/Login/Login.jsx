import React, { useState, useEffect } from "react";
import "./Login.css";
import login from "../../assets/images/login.jpg";
import { ActionCreators } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:8000/api/auth/login";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // let users = JSON.parse(localStorage.getItem("users"));
      // if (users) {
      //   users.forEach((user) => {
      //     if (user.email === formValues.email) {
      //       if (user.password === formValues.password) {
      //         dispatch(ActionCreators.getLogin(user));
      //         localStorage.setItem("loggedUser", JSON.stringify(user));
      //         navigate("/profile");
      //       } else {
      //         setSubmitError(true);
      //         setLoginError("Invalid Login Credentials!");
      //       }
      //     } else {
      //       setSubmitError(true);
      //       setLoginError("User Not Found!");
      //     }
      //   });
      // } else {
      //   let defaultUser = {
      //     username: "Admin",
      //     email: "admin@gmail.com",
      //     password: "Admin@123",
      //     phone: "1234567890",
      //     address: "address 1, address 2, city, pincode.",
      //   };
      //   localStorage.setItem("users", JSON.stringify([defaultUser]));
      //   let users = JSON.parse(localStorage.getItem("users"));
      //   users.forEach((user) => {
      //     if (user.email === formValues.email) {
      //       if (user.password === formValues.password) {
      //         dispatch(ActionCreators.getLogin(user));
      //         localStorage.setItem("loggedUser", JSON.stringify(user));
      //         navigate("/profile");
      //       } else {
      //         setSubmitError(true);
      //         setLoginError("Invalid Login Credentials!");
      //       }
      //     } else {
      //       setSubmitError(true);
      //       setLoginError("User Not Found!");
      //     }
      //   });
      // }
      axios.post(baseURL, formValues).then((response) => {
        if(response.data.code === 200) {
          dispatch(ActionCreators.getLogin(response.data.data));
          localStorage.setItem("loggedUser", JSON.stringify(response.data.data));
          navigate("/profile");
        } else {
          setLoginError(response.data.message);
        }
      }) 
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
    return errors;
  };
  return (
    <div className="leaffie-login">
      <div className="leaffie-login_content container">
        <div className="row">
          <div className="col-6 px-0">
            <img src={login} alt="" className="img-fluid" />
          </div>
          <div className="col-6">
            <div className="leaffie-login_content--title">
              <h3>Login</h3>
            </div>
            <div className="leaffie-login_content--body px-5">
              {submitError ? (
                <div class="alert alert-danger" role="alert">
                  {loginError}
                </div>
              ) : null}

              <form
                className="leaffie-contact-us_content--form"
                onSubmit={handleSubmit}
              >
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
                <div className="text-center mt-3">
                  Not a member yet? <Link to="/register">Register</Link>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-login">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
