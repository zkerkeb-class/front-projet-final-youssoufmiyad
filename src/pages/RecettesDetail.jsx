import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRecipe } from "../utils/recipes";
import { useAuth } from "../hooks/useAuth";

const RecettesDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let recipe = await getRecipe(slug);
        setRecipe(recipe);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>Recette detail</h1>
      {isAuthenticated ? (
        <div className="action">
          <button>Enregistrer</button>
          {user && user._id === recipe?.chef?._id ? (
            <button>Modifier</button>
          ) : (
            false
          )}
        </div>
      ) : (
        false
      )}
      {recipe ? (
        <div className="recipe-detail">
          <h2>{recipe.title.en}</h2>
          <p>{recipe.description}</p>
          <ul>
            {recipe.ingredients
              ? recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.ingredient}</li>
                ))
              : false}
          </ul>
          <p>{recipe.instructions}</p>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default RecettesDetail;
