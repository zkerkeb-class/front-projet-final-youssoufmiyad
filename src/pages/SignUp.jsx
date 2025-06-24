import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
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
    <section>
      <div className="container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              placeholder="Entrez votre prénom"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              placeholder="Entrez votre nom"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            S'inscrire
          </button>
        </form>
        <p>
          Déjà inscrit ?{" "}
          <a
            onClick={() => {
              navigate("/login");
            }}
          >
            Connectez-vous
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
