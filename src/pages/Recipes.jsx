import React from "react";
import { useEffect, useState } from "react";
import { getRecipes } from "../utils/recipes";
import { useSearchParams } from "react-router";
import extractWords from "../utils/extractWords";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = await getRecipes(searchParams.get("page") || 1);
        setRecipes(allRecipes.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recettes</h1>
      <div className="recipes-list">
        {recipes.length > 0
          ? recipes.map((recipe) => {
              return (
                <div key={recipe._id} className="recipe-card">
                  <h2>{recipe.title.en}</h2>
                  {/* <p>{recipe.description}</p> */}
                  <a href={`/recettes/${recipe.slug}`}>
                    <img src={recipe.imageUrl} alt="" />
                  </a>
                  <ul>
                    {recipe.ingredients
                      ? recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient.ingredient}</li>
                        ))
                      : false}
                  </ul>
                  <p>
                    {recipe.description ??
                      extractWords(recipe.instructions.en || recipe.instructions, 60)}
                  </p>
                </div>
              );
            })
          : false}
      </div>
    </div>
  );
};

export default Recipes;
