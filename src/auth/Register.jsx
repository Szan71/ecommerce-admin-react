import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "../api/axios";
import {Link, useHistory} from "react-router-dom";

const myStyle = {
  paddingLeft: "2.5rem",
  paddingRight: "2.5rem",
};


const Register = () => {
  const history = useHistory();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    axios
      .post(`/auth/register`, values)
      .then((res) => {
        console.log(res);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formikForm = useFormik({
    initialValues: registerForm,
    onSubmit,
    validationSchema: onValidation,
  });

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h1 style={{textAlign:"center"}}>Register</h1>
            <form onSubmit={formikForm.handleSubmit}>
              {/* Name input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter you name"
                  value={formikForm?.values.name}
                  onBlur={formikForm.handleChange}
                  onChange={formikForm.handleChange}
                />
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={formikForm?.values.email}
                  onBlur={formikForm.handleChange}
                  onChange={formikForm.handleChange}
                />
              </div>

              {/* Password input */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={formikForm?.values.password}
                  onBlur={formikForm.handleChange}
                  onChange={formikForm.handleChange}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={myStyle}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;