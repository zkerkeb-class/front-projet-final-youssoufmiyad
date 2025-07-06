import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipesDetail from "./pages/RecipesDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import AdminRecipes from "./pages/admin/Recipes";
import CreateRecipe from "./pages/admin/CreateRecipe";
import AdminModifyRecipe from "./pages/admin/ModifyRecipe";
import ModifyRecipe from "./pages/ModifyRecipe";
import Profil from "./pages/Profil";
import { createContext } from "react";
import Navbar from "./components/navbar/Navbar";
import AddRecipe from "./pages/AddRecipe";
import RecipesSaved from "./pages/RecipesSaved";

function App() {
  const authContext = createContext();
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recettes" element={<Recipes />} />
          <Route path="/recettes/:slug" element={<RecipesDetail />} />
		  <Route path="/recettes/ajouter-une-recette" element={<AddRecipe/>}/>
		  <Route path="/recettes/modifier/:id" element={<ModifyRecipe/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:slug" element={<Profil />} />
		  <Route path="/mes-recettes" element={<RecipesSaved />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/recipes" element={<AdminRecipes />} />
          <Route path="/admin/recipes/create" element={<CreateRecipe />} />
          <Route path="/admin/recipes/modify/:id" element={<AdminModifyRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
