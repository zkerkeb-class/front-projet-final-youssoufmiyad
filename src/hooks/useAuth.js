// src/hooks/useAuth.js
import { useState } from "react";
import api from "../utils/axios"; // ton instance avec token auto

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

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };
}
