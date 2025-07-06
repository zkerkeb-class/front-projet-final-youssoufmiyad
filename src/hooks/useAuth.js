// src/hooks/useAuth.js
import { useState } from "react";
import api from "../utils/axios"; // ton instance avec token auto
import { getRecipesByUserId, getSavedRecipesByUserId } from "../utils/users";

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      throw new Error(err.response?.data?.message || "Erreur de connexion");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const addRecipeToUser = async (recipeId) => {
    if (!token) {
      throw new Error("Utilisateur non authentifié");
    }
    try {
      const res = await api.post(`/users/${user._id}/add-recipe`, { recipeId });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Erreur lors de l'ajout de la recette"
      );
    }
  };

  const getSavedRecipes = async () => {
    if (!user || !user.savedRecipes) {
      return [];
    }
    let recipes = await getSavedRecipesByUserId(user._id);
    return recipes || [];
  };

  const getRecipes = async () => {
    if (!user || !user.recipes) {
      return [];
    }
    let recipes = await getRecipesByUserId(user._id);
    return recipes || [];
  };

  return {
    token,
    user,
    login,
    logout,
    addRecipeToUser,
    getSavedRecipes,
    getRecipes,
    isAuthenticated: !!token,
  };
}
