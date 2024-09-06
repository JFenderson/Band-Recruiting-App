import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";


const RecruiterProfileManagement: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      companyName: "",
      profilePicture: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      companyName: Yup.string().required("Company Name is required"),
      profilePicture: Yup.string().url("Invalid URL"),
    }),
    onSubmit: async (values) => {
      try {
        const recruiterId = localStorage.getItem("userId");
        const payload = { ...values };

        if (!recruiterId) {
          console.error("No recruiter ID found in localStorage");
          return;
        }

        const response = await api.put(`/Recruiter/${recruiterId}`, payload);
        console.log("API response:", response);

        alert("Profile updated successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to update profile", error);
        alert("Failed to update profile");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
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
        <label htmlFor="companyName">Company Name</label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.companyName}
        />
        {formik.touched.companyName && formik.errors.companyName ? (
          <div>{formik.errors.companyName}</div>
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
  );
};

export default RecruiterProfileManagement;
