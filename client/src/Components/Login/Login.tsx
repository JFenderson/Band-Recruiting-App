/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";

interface LoginValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<LoginValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await login(values.username, values.password);
        setStatus({ success: true });
        navigate("/dashboard"); // Redirect to the dashboard
      } catch (error: any) {
        setStatus({
          success: false,
          message: error.response?.data || "An unexpected error occurred",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  
  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        {formik.status && formik.status.success === true && (
          <div>Login successful!</div>
        )}
        {formik.status && formik.status.success === false && (
          <div>Login failed: {formik.status.message}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
