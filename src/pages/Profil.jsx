import React, { useState, useEffect } from "react";
import { getRecipesByUserId, getUser } from "../utils/users";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Profil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { slug } = useParams();
  const auth = useAuth();
  const [createdRecipes, setCreatedRecipes] = useState();
  const [savedRecipes, setSavedRecipes] = useState();

  useEffect(() => {
    const queryUser = async () => {
      let user = await getUser(slug);
      if (!user) {
        console.error("User not found");
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
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    } else {
      const fetchUserData = async () => {
        try {
          setCreatedRecipes(getRecipesByUserId(user?._id));
          setSavedRecipes(getRecipesByUserId(user?._id));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <div className="profil-detail">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>Role : {user.role}</p>
          <p>Email: {user.email}</p>
          <p>Slug: {user.slug}</p>
          <div className="saved-recipes">
            <h3>Recettes sauvegardées</h3>
            {savedRecipes?.length > 0 ? (
              <ul>
                {savedRecipes.map((recipe, index) => (
                  <li key={index}>
                    {recipe.title?.en}
                    <button onClick={() => navigate(`/recettes/${recipe.slug}`)}>Voir</button>
                    <button onClick={() => auth.removeSavedRecipe(recipe._id)}>Supprimer</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune recette sauvegardée</p>
            )}
          </div>
          <div className="created-recipes">
            <h3>Recettes créées</h3>
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
              <p>Aucune recette créée</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default Profil;
