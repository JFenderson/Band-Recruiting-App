/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../services/apiConfig";
import { Link, useNavigate } from "react-router-dom";

interface RegistrationValues {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  confirmPassword: string;
  userType: string;
  bandId?: number;
  instrument: string;
  highSchool: string;
  graduationYear: number;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [bands, setBands] = useState<
    { bandId: number; name: string; schoolName: string }[]
  >([]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const response = await api.get("/bands");
        setBands(response.data);
      } catch (error) {
        console.error("Failed to fetch bands:", error);
      }
    };

    fetchBands();
  }, []);

  const formik = useFormik<RegistrationValues>({
    initialValues: {
      userName: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      userType: "Student",
      bandId: undefined,
      instrument: "",
      highSchool: "",
      graduationYear: 0,
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be 20 characters or less")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(
          /^\+?[1-9]\d{1,14}$/,
          "Phone number is not valid. It should be a valid international phone number."
        )
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      firstName: Yup.string()
        .min(3, "First name must be at least 3 characters")
        .max(20, "First name must be 20 characters or less")
        .required("First name is required"),
      lastName: Yup.string()
        .min(3, "Last name must be at least 3 characters")
        .max(20, "Last name must be 20 characters or less")
        .required("Last name is required"),
      userType: Yup.string()
        .oneOf(["Student", "Recruiter", "Admin"], "Invalid user type")
        .required("User type is required"),
      instrument: Yup.string().when("userType", {
        is: "Student",
        then: (schema) =>
          schema
            .min(3, "Instrument must be at least 3 characters")
            .max(20, "Instrument must be 20 characters or less")
            .required("Instrument is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      highSchool: Yup.string().when("userType", {
        is: "Student",
        then: (schema) =>
          schema
            .min(3, "High School must be at least 3 characters")
            .max(20, "High School must be 20 characters or less")
            .required("High School is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      graduationYear: Yup.number().when("userType", {
        is: "Student",
        then: (schema) =>
          schema
            .min(2000, "Invalid year")
            .max(2100, "Invalid year")
            .required("Graduation Year is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      bandId: Yup.number().when("userType", {
        is: "Recruiter",
        then: (schema) =>
          schema.required("Band selection is required for Recruiters"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Form Submitted", values);
        if (values.userType === "Recruiter") {
          await api.post("/Account/register", {
            userName: values.userName,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            password: values.password,
            userType: values.userType,
            bandId: values.bandId,
          });
        } else {
          await api.post("/Account/register", {
            userName: values.userName,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            password: values.password,
            instrument: values.instrument,
            highSchool: values.highSchool,
            graduationYear: values.graduationYear,
            userType: values.userType,
          });
        }
        navigate("/login");
      } catch (error: any) {
        console.error("Registration failed:", error);
        if (error.response && error.response.data) {
          setStatus({ success: false, message: error.response.data });
        } else {
          setStatus({
            success: false,
            message: "An unexpected error occurred",
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userType">User Type</label>
          <select
            id="userType"
            name="userType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userType}
          >
            <option value="Student">Student</option>
            <option value="Recruiter">Recruiter</option>
          </select>
          {formik.touched.userType && formik.errors.userType ? (
            <div>{formik.errors.userType}</div>
          ) : null}
        </div>

        {/* Conditionally render the band selection if the user is a Recruiter */}
        {formik.values.userType === "Recruiter" && (
          <div>
            <label htmlFor="bandId">Select Band</label>
            <select
              id="bandId"
              name="bandId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bandId || ""} // Set to empty string if undefined
            >
              <option value="">Select a band...</option>
              {bands.map((band) => (
                <option key={band.bandId} value={band.bandId}>
                  {band.name} - {band.schoolName}
                </option>
              ))}
            </select>
            {formik.touched.bandId && formik.errors.bandId ? (
              <div>{formik.errors.bandId}</div>
            ) : null}
          </div>
        )}

        {/* Form fields for all users */}
        <div>
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div>{formik.errors.userName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            placeholder="+1234567890" // Example placeholder for international format
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        {/* Conditionally render the Student-specific fields */}
        {formik.values.userType === "Student" && (
          <div>
            <div>
              <label htmlFor="instrument">Instrument</label>
              <input
                id="instrument"
                name="instrument"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instrument}
              />
              {formik.touched.instrument && formik.errors.instrument ? (
                <div>{formik.errors.instrument}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="highSchool">High School</label>
              <input
                id="highSchool"
                name="highSchool"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.highSchool}
              />
              {formik.touched.highSchool && formik.errors.highSchool ? (
                <div>{formik.errors.highSchool}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="graduationYear">Graduation Year</label>
              <input
                id="graduationYear"
                name="graduationYear"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.graduationYear}
              />
              {formik.touched.graduationYear && formik.errors.graduationYear ? (
                <div>{formik.errors.graduationYear}</div>
              ) : null}
            </div>
          </div>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        {formik.status && formik.status.success === true && (
          <div>Registration successful!</div>
        )}
        {formik.status && formik.status.success === false && (
          <div>Registration failed: {formik.status.message}</div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
