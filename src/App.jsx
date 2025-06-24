import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Recettes from "./pages/Recettes";
import RecettesDetail from "./pages/RecettesDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import Recipes from "./pages/admin/Recipes";
import CreateRecipe from "./pages/admin/CreateRecipe";
import ModifyRecipe from "./pages/admin/ModifyRecipe";
import Profil from "./pages/Profil";
import { createContext } from "react";
import Navbar from "./components/navbar/Navbar";

function App() {
  const authContext = createContext();
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recettes" element={<Recettes />} />
          <Route path="/recettes/:slug" element={<RecettesDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:slug" element={<Profil />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/recipes" element={<Recipes />} />
          <Route path="/admin/recipes/create" element={<CreateRecipe />} />
          <Route path="/admin/recipes/modify/:id" element={<ModifyRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
