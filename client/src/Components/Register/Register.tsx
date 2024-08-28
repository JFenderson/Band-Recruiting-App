/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/apiConfig';
import { Link, useNavigate } from 'react-router-dom';

interface RegistrationValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<RegistrationValues>({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'Student', // Default user type
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be 20 characters or less')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      userType: Yup.string().oneOf(['Student', 'Recruiter', 'Admin'], 'Invalid user type').required('User type is required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      console.log('Form Submitted', values);
      try {
        const response = await api.post('/Account/register', {
          userName: values.userName,
          email: values.email,
          password: values.password,
          userType: values.userType,
        });
        console.log('Registration successful:', response);
        // Handle successful registration
        localStorage.setItem('token', response.data.token);
        setStatus({ success: true });
        navigate('/login');
      } catch (error: any) {
        console.error('Registration failed:', error);
        if (error.response && error.response.data) {
          setStatus({ success: false, message: error.response.data });
        } else {
          setStatus({ success: false, message: 'An unexpected error occurred' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
          <option value="Admin">Admin</option>
        </select>
        {formik.touched.userType && formik.errors.userType ? (
          <div>{formik.errors.userType}</div>
        ) : null}
      </div>

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
  );
};

export default RegistrationForm;
