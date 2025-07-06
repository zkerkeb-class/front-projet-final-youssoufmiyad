import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { getCategories } from "../utils/categories";
import { getRecipeById, modifyRecipe } from "../utils/recipes";
import IngredientForm from "../components/ingredientForm/IngredientForm";
import TagForm from "../components/tagForm/TagForm";
import Repeater from "../components/repeater/Repeater";
import { useTranslation } from "react-i18next";

const ModifyRecipe = () => {
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [instructionsFr, setInstructionsFr] = useState("");
  const [instructionsEn, setInstructionsEn] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [fileFormat, setFileFormat] = useState(true); // true for URL
  const [video, setVideo] = useState("");
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [slug, setSlug] = useState("");
  const { user, token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let recipe = await getRecipeById(id);
        setRecipe(recipe);
        setTitleFr(recipe.title.fr);
        setTitleEn(recipe.title.en);
        setCategory(recipe.category);
        setArea(recipe.area);
        setInstructionsFr(recipe.instructions.fr);
        setInstructionsEn(recipe.instructions.en);
        setIngredients(recipe.ingredients);
        setTags(recipe.tags);
        setImage(recipe.imageUrl);
        setVideo(recipe.videoUrl);
        setSlug(recipe.slug);
      } catch (error) {
        console.error(t("recipeFetchError"), error);
      }
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error(t("categoriesFetchError"), error);
      }
    };
    fetchCategories();
  }, []);

  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients);
  };

  const handleTagsChange = (updatedTagObjects) => {
    setTags(updatedTagObjects.map((obj) => obj.tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title: {
        en: titleEn,
        fr: titleFr,
      },
      category,
      area,
      instructions: {
        en: instructionsEn,
        fr: instructionsFr,
      },
      ingredients,
      tags,
      imageUrl: image,
      videoUrl: video,
    };
    try {
      const response = await modifyRecipe(id, recipeData, token);
      if (response.status === 202 || response.data?._id) {
        console.log(t("recipeModifiedSuccess"));
        navigate(`/recettes/${slug}`);
      } else {
        console.error(
          t("recipeModifiedError"),
          response.data
        );
      }
    } catch (error) {
      console.error(t("recipeModifiedError"), error);
    }
  };

  return (
    <div>
      <h1>{t("modifyRecipe")}</h1>
      {recipe ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t("title")} ({t("frLabel")}):</label>
            <input
              type="text"
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              required
            />
          </div>
          <div>
            <label>{t("title")} ({t("enLabel")}):</label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label>{t("category")}:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name?.en || cat.name?.fr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>{t("area")}:</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>
          <div>
            <label>{t("instructions")} ({t("frLabel")}):</label>
            <textarea
              value={instructionsFr}
              onChange={(e) => setInstructionsFr(e.target.value)}
              required
            />
          </div>
          <div>
            <label>{t("instructions")} ({t("enLabel")}):</label>
            <textarea
              value={instructionsEn}
              onChange={(e) => setInstructionsEn(e.target.value)}
              required
            />
          </div>
          <div className="ingredients">
            <h2>{t("ingredients")}</h2>
            <Repeater
              FormComponent={IngredientForm}
              initialValue={{ ingredient: "", measure: "" }}
              initialValues={ingredients}
              onChange={handleIngredientsChange}
            />
          </div>
          <div className="tags">
            <h2>{t("tags")}</h2>
            <Repeater
              FormComponent={TagForm}
              initialValue={{ tag: "" }}
              initialValues={tags.map((tag) => ({ tag }))}
              onChange={handleTagsChange}
            />
          </div>

          <button type="submit">{t("modifyRecipe")}</button>
        </form>
      ) : (
        <p>{t("loadRecipe")}</p>
      )}
    </div>
  );
};

export default ModifyRecipe;
