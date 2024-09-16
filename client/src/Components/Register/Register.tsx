import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../services/apiConfig";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; // Dropdown for userType and band

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            {/* User Type Selection */}
            <div className="mb-4">
              <Label htmlFor="userType">I am a</Label>
              <Select
                onValueChange={(value) => formik.setFieldValue("userType", value)}
                value={formik.values.userType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.userType && formik.errors.userType && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.userType}
                </div>
              )}
            </div>

            {/* Conditional Band Selection for Recruiters */}
            {formik.values.userType === "Recruiter" && (
              <div className="mb-4">
                <Label htmlFor="bandId">Select Band</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("bandId", Number(value))
                  }
                  value={formik.values.bandId?.toString() || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your band" />
                  </SelectTrigger>
                  <SelectContent>
                    {bands.map((band) => (
                      <SelectItem
                        key={band.bandId}
                        value={band.bandId.toString()}
                      >
                        {band.name} - {band.schoolName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.bandId && formik.errors.bandId && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.bandId}
                  </div>
                )}
              </div>
            )}

            {/* Shared Form Fields */}
            <div className="mb-4">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                placeholder="Enter your username"
              />
              {formik.touched.userName && formik.errors.userName && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.userName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                placeholder="Enter your first name"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.firstName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                placeholder="Enter your last name"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.lastName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                placeholder="+1234567890"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder="Confirm your password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            {/* Conditionally render Student-specific fields */}
            {formik.values.userType === "Student" && (
              <>
                <div className="mb-4">
                  <Label htmlFor="instrument">Instrument</Label>
                  <Input
                    id="instrument"
                    name="instrument"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.instrument}
                    placeholder="Enter your instrument"
                  />
                  {formik.touched.instrument && formik.errors.instrument && (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.instrument}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <Label htmlFor="highSchool">High School</Label>
                  <Input
                    id="highSchool"
                    name="highSchool"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.highSchool}
                    placeholder="Enter your high school"
                  />
                  {formik.touched.highSchool && formik.errors.highSchool && (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.highSchool}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.graduationYear.toString()}
                    placeholder="Enter your graduation year"
                  />
                  {formik.touched.graduationYear &&
                    formik.errors.graduationYear && (
                      <div className="text-red-600 text-sm mt-2">
                        {formik.errors.graduationYear}
                      </div>
                    )}
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Registering..." : "Register"}
            </Button>

            {/* Error/Success Messages */}
            {formik.status && formik.status.success === false && (
              <div className="text-red-600 text-center mt-4">
                Registration failed: {formik.status.message}
              </div>
            )}

            {/* Redirect to Login */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
