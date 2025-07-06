import React from "react";
import { useEffect, useState } from "react";
import { getRecipes } from "../utils/recipes";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import RecipeCard from "../components/recipeCard/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/recettes?page=${newPage}`);
  };

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
        <div className="pagination">
          {page > 1 && (
            <>
              <button
                onClick={() => {
                  handlePageChange(page - 1);
                }}
              >
                {page - 1}
              </button>
            </>
          )}
          <button disabled>{page}</button>
          {totalPages > Number(page) + 3 ? (
            <>
              <button
                onClick={() => {
                  handlePageChange(page + 1);
                }}
              >
                {Number(page) + 1}
              </button>
              <button
                onClick={() => {
                  handlePageChange(page + 2);
                }}
              >
                {Number(page) + 2}
              </button>
              <button
                onClick={() => {
                  handlePageChange(page + 3);
                }}
              >
                {Number(page) + 3}
              </button>
              <div className="suspension-dots">...</div>
            </>
          ) : (
            Array.from({ length: totalPages - Number(page) }, (_, idx) => (
              <button key={Number(page) + idx + 1}>
                {Number(page) + idx + 1}
              </button>
            ))
          )}
          <button
            onClick={() => {
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
