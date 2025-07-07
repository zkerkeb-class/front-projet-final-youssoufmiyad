import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });

    navigate("/login");
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Erreur lors de l'inscription");
    }
  }
};
  
  return (
    <section className="auth-page">
      <div className="container">
        <h1>{t("signup")}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">{t("firstname")}</label>
            <input
              type="text"
              id="firstname"
              placeholder={t("firstnamePlaceholder")}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">{t("lastname")}</label>
            <input
              type="text"
              id="lastname"
              placeholder={t("lastnamePlaceholder")}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              placeholder={t("emailPlaceholder")}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              placeholder={t("passwordPlaceholder")}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {t("signup")}
          </button>
        </form>
        <p>
          {t("alreadyMember")+" "}
          <a
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("loginCta")}
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
