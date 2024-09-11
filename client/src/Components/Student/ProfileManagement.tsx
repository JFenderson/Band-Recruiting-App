import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar";

const ProfileManagement: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      graduationYear: "",
      instrument: "",
      highSchool: "",
      profilePicture: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      graduationYear: Yup.number(),
      instrument: Yup.string(),
      highSchool: Yup.string(),
      profilePicture: Yup.string().url("Invalid URL"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values);
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }

        const payload = {
          ...values,
          graduationYear: parseInt(values.graduationYear, 10),
        };
        console.log("Payload:", payload);

        const response = await api.put(`/Student/${userId}`, payload);
        console.log("API response:", response);

        alert("Profile updated successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to update profile", (error as Error).message);
        alert("Failed to update profile");
      }
    },
  });

  return (
    <div>
      <Navbar />

      <form onSubmit={formik.handleSubmit}>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="graduationYear">Graduation Year</label>
          <input
            id="graduationYear"
            name="graduationYear"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.graduationYear}
          />
          {formik.touched.graduationYear && formik.errors.graduationYear ? (
            <div>{formik.errors.graduationYear}</div>
          ) : null}
        </div>

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
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.profilePicture}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture ? (
            <div>{formik.errors.profilePicture}</div>
          ) : null}
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileManagement;
