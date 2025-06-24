import React from 'react'
import { useNavigate } from 'react-router'
import {useAuth} from "../hooks/useAuth";

const RecettesSaved = () => {
  const {isAuthenticated, user} = useAuth();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  isAuthenticated || navigate("/login");
  return (
    <div>
      <h1>Recettes enregistrées</h1>
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
                  <p>{recipe.description ?? extractWords(recipe.instructions, 60)}</p>
                </div>
              );
            })
          : false}
      </div>
    </div>
  )
}

export default RecettesSaved
