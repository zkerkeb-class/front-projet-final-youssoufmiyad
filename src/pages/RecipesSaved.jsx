import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getRecipe, getRecipeById } from "../utils/recipes";
import extractWords from "../utils/extractWords";

const RecipesSaved = () => {
  const { isAuthenticated, getSavedRecipes } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      setRecipes(await getSavedRecipes());
    };
    getRecipes().catch((error) => {
      console.error("Error fetching saved recipes:", error);
    });
  }, []);

  isAuthenticated || navigate("/login");
  return (
    <div>
      <h1>{t("recipesSaved")}</h1>
      <div className="recipes-list">
        {recipes.length > 0
          ? recipes.map((recipe) => {
              return (
                <div key={recipe._id} className="recipe-card">
                  <h2>{recipe.title.en}</h2>
                  {/* <p>{recipe.description}</p> */}
                  <ul>
                    {recipe.ingredients
                      ? recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient.ingredient}</li>
                        ))
                      : false}
                  </ul>
                  <p>
                    {recipe.description ??
                      extractWords(recipe.instructions, 60)}
                  </p>
                </div>
              );
            })
          : false}
      </div>
    </div>
  );
};

export default RecipesSaved;
