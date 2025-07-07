import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav>
      

      {isAuthenticated ? (
        <button className="btn btn-primary" onClick={logout}>
          Déconnexion
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("./login");
          }}
        >
          Connexion
        </button>
      )}

      <button
        className="btn btn-primary"
        onClick={() => {
          changeLanguage("fr");
        }}
      >
        FR
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          changeLanguage("en");
        }}
      >
        EN
      </button>
      <ul className="nav-links" style={{ display: "flex", gap: "10px" }}>
        <li>
          <a className="btn btn-primary" href="/Recettes">Recettes</a>
        </li>
        {isAuthenticated ? (
          <li>
            <a className="btn btn-primary" href={`/${user.slug}`}>Profil</a>
          </li>
        ) : (
          false
        )}
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
