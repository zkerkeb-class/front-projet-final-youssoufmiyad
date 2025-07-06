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
      <ul className="nav-links">
        <li>
          <a href="/Recettes">Recettes</a>
        </li>
        {isAuthenticated ? (
          <li>
            <a href={`/${user.slug}`}>Profil</a>
          </li>
        ) : (
          false
        )}
      </ul>

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
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
