import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { getCategories } from "../utils/categories";
import { getRecipeById, modifyRecipe } from "../utils/recipes";
import IngredientForm from "../components/ingredientForm/IngredientForm";
import TagForm from "../components/tagForm/TagForm";
import Repeater from "../components/repeater/Repeater";

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
        console.error("Error fetching recipe:", error);
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
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

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
        console.log("Recette modifiée avec succès");
        navigate(`/recettes/${slug}`);
      } else {
        console.error(
          "Erreur lors de la modification de la recette : ",
          response.data
        );
      }
    } catch (error) {
      console.error("Error modifying recipe:", error);
    }
  };

  return (
    <div>
      <h1>Modifier la recette</h1>
      {recipe ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titre (Français):</label>
            <input
              type="text"
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Titre (English):</label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Catégorie:</label>
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
            <label>Zone:</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Instructions (Français):</label>
            <textarea
              value={instructionsFr}
              onChange={(e) => setInstructionsFr(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Instructions (English):</label>
            <textarea
              value={instructionsEn}
              onChange={(e) => setInstructionsEn(e.target.value)}
              required
            />
          </div>
          <div className="ingredients">
            <h2>Ingredients</h2>
            <Repeater
              FormComponent={IngredientForm}
              initialValue={{ ingredient: "", measure: "" }}
              initialValues={ingredients}
              onChange={handleIngredientsChange}
            />
          </div>
          <div className="tags">
            <h2>Tags</h2>
            <Repeater
              FormComponent={TagForm}
              initialValue={{ tag: "" }}
              initialValues={tags.map((tag) => ({ tag }))}
              onChange={handleTagsChange}
            />
          </div>

          <button type="submit">Modifier la recette</button>
        </form>
      ) : (
        <p>Chargement de la recette...</p>
      )}
    </div>
  );
};

export default ModifyRecipe;
