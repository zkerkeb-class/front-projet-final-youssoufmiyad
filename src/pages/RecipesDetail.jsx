import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRecipe } from "../utils/recipes";
import { useAuth } from "../hooks/useAuth";

const RecipesDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState();
  const { isAuthenticated, user, addRecipeToUser } = useAuth();

  const handleSave = () => {
    if (isAuthenticated && user) {
      addRecipeToUser(recipe._id)
        .then(() => {
          console.log("Recette enregistrée avec succès");
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement de la recette:", error);
        });
    } else {
      console.warn("Utilisateur non authentifié ou pas d'utilisateur trouvé");
    }
  }

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

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <div>
      <h1>Recette detail</h1>
      {isAuthenticated ? (
        <div className="action">
          <button onClick={handleSave}>Enregistrer</button>
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
          <p>{recipe.instructions.en || recipe.instructions}</p>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default RecipesDetail;
