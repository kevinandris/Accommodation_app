import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);
  /* displaying the matched password sentence */
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }); /* Don't add [] to this useEffect otherwise the password match paragraph wont appear */

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* FormData() needed because we have a file */
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register">
      <div className="image" />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            placeholder="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />

          <label htmlFor="image">
            <IoCloudUploadOutline size={20} />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile  photo"
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type="submit" disabled={!passwordMatch}>
            REGISTER NOW
          </button>
        </form>
        <a href="/login">Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
