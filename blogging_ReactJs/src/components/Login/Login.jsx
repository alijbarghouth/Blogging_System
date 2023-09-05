import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regSchema } from "../../Schemas/Register";
import { loginSchema } from "../../Schemas/Login";

function Login() {
  let [error, setError] = useState([]);
  let navigate = useNavigate();

  let { errors, values, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
      },
      validationSchema: regSchema,
      onSubmit: register,
    });

  const {
    values: loginValues,
    handleChange: loginHandleChange,
    handleSubmit: loginHandleSubmit,
    errors: loginErrors,
    touched: loginTouched,
    handleBlur: loginhandleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: login,
  });
  async function register(values) {
    let { data } = await axios.post(
      "http://127.0.0.1:8001/api/register",
      values
    );
    if (data.message === "User created successfully") {
      console.log("Registered Successfully");
      navigate("/");
    } else {
      setError(data.err[0]);
    }
    console.log(data);
  }

  async function login(values) {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8001/api/login",
        values
      );
      if (data.message === "User Logined successfully") {
        localStorage.setItem("token", data.authorization.token);
        navigate("/");
      } else {
        setError([{ message: "Login failed. Please check your credentials." }]);
      }
    } catch (error) {
      setError([
        {
          message:
            "email or pawword is not correct",
        },
      ]);
    }
  }
  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />

              {error.map((err) => {
                return <div className="alert alert-danger">{err.message}</div>;
              })}
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="mt-5">
                    <div className="card-front">
                      <div className="center-wrap">
                        <form
                          className="section text-center"
                          method="post"
                          onSubmit={loginHandleSubmit}>
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              value={loginValues.email}
                              onChange={loginHandleChange}
                              onBlur={loginhandleBlur}
                              name="email"
                              id="exampleInputEmail1"
                              placeholder="Email"
                              aria-describedby="emailHelp"
                              className={`form-style ${
                                loginErrors.email && loginTouched.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {loginErrors.email && loginTouched.email ? (
                              <div className="small text-danger">
                                {loginErrors.email}
                              </div>
                            ) : (
                              <></>
                            )}
                            <i className="input-icon uil uil-at" />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              value={loginValues.password}
                              onChange={loginHandleChange}
                              onBlur={loginhandleBlur}
                              placeholder="Password"
                              name="password"
                              id="exampleInputPassword1"
                              className={`form-style ${
                                loginErrors.password && loginTouched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {loginErrors.password && loginTouched.password ? (
                              <div className="small text-danger">
                                {loginErrors.password}
                              </div>
                            ) : (
                              <></>
                            )}
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <button type="submit" className="btn mt-4">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <form
                        method="post"
                        className="section text-center"
                        onSubmit={handleSubmit}>
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            placeholder="Username"
                            id="exampleInputName"
                            aria-describedby="emailHelp"
                            className={` form-style ${
                              errors.name && touched.name ? "is-invalid" : ""
                            }`}
                          />
                          {errors.name && touched.name ? (
                            <div className="small text-danger">
                              {errors.name}
                            </div>
                          ) : (
                            <></>
                          )}
                          <i className="input-icon uil uil-user" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            placeholder="Email"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            className={` form-style ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                          />
                          {errors.email && touched.email ? (
                            <div className="small text-danger">
                              {errors.email}
                            </div>
                          ) : (
                            <></>
                          )}
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                            name="password"
                            id="exampleInputPassword1"
                            className={`form-style ${
                              errors.password && touched.password
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.password && touched.password ? (
                            <div className="small text-danger">
                              {errors.password}
                            </div>
                          ) : (
                            <></>
                          )}
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button type="submit" className="btn mt-4">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
