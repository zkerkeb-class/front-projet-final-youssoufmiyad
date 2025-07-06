import React, { useState, useEffect } from "react";
import { getRecipesByUserId, getUser } from "../utils/users";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Profil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { slug } = useParams();
  const auth = useAuth();
  const [createdRecipes, setCreatedRecipes] = useState();
  const [savedRecipes, setSavedRecipes] = useState();
  const {t} = useTranslation();

  useEffect(() => {
    const queryUser = async () => {
      let user = await getUser(slug);
      if (!user) {
        console.error(t("userNotFound"));
        return;
      }
      setUser(user);
    };
    queryUser();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchUserData = async () => {
        try {
          setCreatedRecipes(await auth.getRecipes());
          setSavedRecipes(await auth.getSavedRecipes());
        } catch (error) {
          console.error(t("userFetchError"), error);
        }
      };
      fetchUserData();
    } else {
      const fetchUserData = async () => {
        try {
          setCreatedRecipes(getRecipesByUserId(user?._id));
          setSavedRecipes(getRecipesByUserId(user?._id));
        } catch (error) {
          console.error(t("userFetchError"), error);
        }
      };
      fetchUserData();
    }
  }, []);

  return (
    <div>
      <h1>{t("profil")}</h1>
      {user ? (
        <div className="profil-detail">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{t("role")}: {user.role}</p>
          <p>{t("email")}: {user.email}</p>
          <p>{t("slug")}: {user.slug}</p>
          <div className="saved-recipes">
            <h3>{t("recipesSaved")}</h3>
            {savedRecipes?.length > 0 ? (
              <ul>
                {savedRecipes.map((recipe, index) => (
                  <li key={index}>
                    {recipe.title?.en}
                    <button onClick={() => navigate(`/recettes/${recipe.slug}`)}>{t("view")}</button>
                    <button onClick={() => auth.removeSavedRecipe(recipe._id)}>{t("delete")}</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("noSavedRecipes")}</p>
            )}
          </div>
          <div className="created-recipes">
            <h3>{t("recipesCreated")}</h3>
            {createdRecipes?.length > 0 ? (
              <ul>
                {createdRecipes.map((recipe, index) => (
                  <li key={index}>{recipe.title?.en}
                    <button onClick={() => navigate(`/recettes/${recipe.slug}`)}>Voir</button>
                    {auth.isAuthenticated && user._id === recipe.chef && (
                      <button onClick={() => navigate(`/recettes/modifier/${recipe._id}`)}>Modifier</button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("noCreatedRecipes")}</p>
            )}
          </div>
        </div>
      ) : (
        <p>{t("loadUser")}</p>
      )}
    </div>
  );
};

export default Profil;
