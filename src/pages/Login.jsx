import React, { useState, useEffect } from "react";
import { useAsyncValue, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(email, password);
      if (isAuthenticated) navigate(-1);
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
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
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
            Se connecter
          </button>
        </form>
        <p>
          Pas encore inscrit ?{" "}
          <a
            onClick={() => {
              navigate("/signup");
            }}
          >
            Inscrivez-vous
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
