import React, { useState, useEffect } from "react";
import { getUser } from "../utils/users";
import { useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Profil = () => {
  const [user, setUser] = useState();
  const { slug } = useParams();
  const auth = useAuth();

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
            {user.savedRecipes && user.savedRecipes.length > 0 ? (
              <ul>
                {user.savedRecipes.map((recipe, index) => (
                  <li key={index}>{recipe.title.en}</li>
                ))}
              </ul>
            ) : (
              <p>Aucune recette sauvegardée</p>
            )}
          </div>
          <div className="created-recipes">
            <h3>Recettes créées</h3>
            {user.recipes && user.recipes.length > 0 ? (
              <ul>
                {user.recipes.map((recipe, index) => (
                  <li key={index}>{recipe.title.en}</li>
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
