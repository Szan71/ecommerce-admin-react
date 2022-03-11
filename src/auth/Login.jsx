import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/action";

const myStyle = {
  paddingLeft: "2.5rem",
  paddingRight: "2.5rem",
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onValidation = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    axios
      .post(`/auth/login`, values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", true);
        dispatch(loginAction());
        history.push("/home");

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formikForm = useFormik({
    initialValues: loginForm,
    onSubmit,
    validationSchema: onValidation,
  });

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h1 style={{ textAlign: "center" }}>Login </h1>
            <form onSubmit={formikForm.handleSubmit}>
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
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="link-danger"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
