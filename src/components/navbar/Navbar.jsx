import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

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
        <button onClick={logout}>Déconnexion</button>
      ) : (
        <button onClick={()=>{navigate("./login")}}>Connexion</button>
      )}

      <button
        onClick={() => {
          changeLanguage("fr");
        }}
      >
        FR
      </button>
      <button
        onClick={() => {
          changeLanguage("en");
        }}
      >
        EN
      </button>
    </nav>
  );
};

export default Navbar;
