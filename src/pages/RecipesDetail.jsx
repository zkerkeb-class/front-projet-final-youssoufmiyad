import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRecipe } from "../utils/recipes";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const RecipesDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState();
  const { isAuthenticated, user, addRecipeToUser } = useAuth();
  const { t, i18n } = useTranslation();

  const handleSave = () => {
    if (isAuthenticated && user) {
      addRecipeToUser(recipe._id)
        .then(() => {
          console.log(t("recipeSavedSuccess"));
        })
        .catch((error) => {
          console.error(
            t("recipeSavedError"),
            error
          );
        });
    } else {
      console.warn(t("userNotAuth"));
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let recipe = await getRecipe(slug);
        setRecipe(recipe);
      } catch (error) {
        console.error(t("recipeFetchError"), error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>
        {i18n.language === "fr"
          ? recipe?.title.fr || recipe?.title.en
          : recipe?.title.en || recipe?.title.fr}
      </h1>
      {isAuthenticated ? (
        <div className="action">
          <button onClick={handleSave}>{t("save")}</button>
          {user && user._id === recipe?.chef?._id ? (
            <button>{t("modify")}</button>
          ) : (
            false
          )}
        </div>
      ) : (
        false
      )}
      {recipe ? (
        <div className="recipe-detail">
          <p>{recipe.description}</p>
          <ul>
            {recipe.ingredients
              ? recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.ingredient}</li>
                ))
              : false}
          </ul>
          <p>{recipe.instructions.en || recipe.instructions}</p>
        </div>
      ) : (
        <p>{t("loadRecipe")}</p>
      )}
    </div>
  );
};

export default RecipesDetail;
