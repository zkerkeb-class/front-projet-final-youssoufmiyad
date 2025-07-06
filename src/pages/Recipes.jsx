import React from "react";
import { useEffect, useState } from "react";
import { getRecipes } from "../utils/recipes";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import RecipeCard from "../components/recipeCard/RecipeCard";
import Pagination from "../components/Pagination";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = await getRecipes(page);
        setRecipes(allRecipes.recipes);
        setTotalPages(allRecipes.totalPages);
      } catch (error) {
        console.error(t("recipeFetchError"), error);
      }
    };

    fetchRecipes();
  }, [page]);

  useEffect(() => {
    console.log(totalPages);
  }, [totalPages]);

  return (
    <div>
      <div className="container container-sm">
        <h1>{t("recipes")}</h1>
      </div>
      <div className="container">
        <div className="recipes-list">
          {recipes.length > 0
            ? recipes.map((recipe) => {
                return <RecipeCard key={recipe._id} recipe={recipe} />;
              })
            : false}
        </div>
      </div>
      <div className="container">
        <Pagination page={page} totalPages={totalPages}/>
      </div>
    </div>
  );
};

export default Recipes;
