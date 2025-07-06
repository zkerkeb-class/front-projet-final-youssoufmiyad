import React, { useState, useEffect } from "react";
import { getCategories } from "../utils/categories";
import Repeater from "../components/repeater/Repeater";
import IngredientForm from "../components/ingredientForm/IngredientForm";
import TagForm from "../components/tagForm/TagForm";
import { addRecipe, associateRecipeWithChef } from "../utils/recipes";
import { useAuth } from "../hooks/useAuth";

const AddRecipe = () => {
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [instructionsFr, setInstructionsFr] = useState("");
  const [instructionsEn, setInstructionsEn] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);

  const [image, setImage] = useState("");
  const [fileFormat, setFileFormat] = useState(true); // true for URL, false for file
  const [video, setVideo] = useState("");

  const [categories, setCategories] = useState([]);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };
    fetchCategories().catch((error) => {
      console.error("Error fetching categories:", error);
    });
  }, []);

  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  useEffect(() => {}, [ingredients, tags]);

  const handleSubmit = (e) => {
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
      image,
      video,
      chef: user._id, // Assurez-vous que l'utilisateur est connecté
    };
    console.log(recipeData);
    console.log("Token:", token);
    addRecipe(recipeData, token)
      .then((data) => {
        // Associer la recette avec le chef (utilisateur)
        associateRecipeWithChef(data._id, user._id, token)
          .then(() => {
            console.log("Recette ajoutée avec succès:", data);
            // Réinitialiser le formulaire après l'ajout
            setTitleFr("");
            setTitleEn("");
            setCategory("");
            setArea("");
            setInstructionsFr("");
            setInstructionsEn("");
            setIngredients([]);
            setTags([]);
            setImage("");
            setVideo("");
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'association de la recette avec le chef:",
              error
            );
            alert(
              "Erreur lors de l'association de la recette avec le chef. Veuillez réessayer."
            );
          });
        alert("Recette ajoutée avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la recette:", error);
        alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.");
      });
  };
  return (
    <section>
      <div className="container">
        <h1>Ajouter une recette</h1>
        <form onSubmit={handleSubmit}>
          <h2>Informations</h2>
          <div className="form-group form-group-50">
            <label htmlFor="title_en">Titre de la recette (anglais)</label>
            <input
              type="text"
              id="title_en"
              placeholder="Entrez le titre de la recette"
              onChange={(e) => setTitleEn(e.target.value)}
              value={titleEn}
              required
            />
          </div>
          <div className="form-group form-group-50">
            <label htmlFor="title_fr">Titre de la recette (français)</label>
            <input
              type="text"
              id="title_fr"
              placeholder="Entrez le titre de la recette"
              onChange={(e) => setTitleFr(e.target.value)}
              value={titleFr}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories
                ? categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name?.en}
                    </option>
                  ))
                : false}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="area">Origine</label>
            <input
              type="text"
              id="area"
              placeholder="Entrez l'origine de la recette"
              onChange={(e) => setArea(e.target.value)}
              value={area}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructions_en">Instructions (anglais)</label>
            <textarea
              rows={5}
              id="instructions_en"
              placeholder="Entrez les instructions de la recette en anglais"
              onChange={(e) => setInstructionsEn(e.target.value)}
              value={instructionsEn}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructions_fr">Instructions (français)</label>
            <textarea
              rows="5"
              id="instructions_fr"
              placeholder="Entrez les instructions de la recette en français"
              onChange={(e) => setInstructionsFr(e.target.value)}
              value={instructionsFr}
            />
          </div>
          <div className="ingredients">
            <h2>Ingredients</h2>
            <Repeater
              FormComponent={IngredientForm}
              initialValue={{ ingredient: "", measure: "" }}
              onChange={handleIngredientsChange}
            />
          </div>
          <div className="tags">
            <h2>Tags</h2>
            <Repeater
              FormComponent={TagForm}
              initialValue={{ tag: "" }}
              onChange={handleTagsChange}
            />
          </div>
          <div className="form-group form-group-50">
            <label htmlFor="image">photo de la recette</label>
            <input
              type={fileFormat ? "url" : "file"}
              id="image"
              accept="image/*"
              onChange={(e) => {
                if (fileFormat) {
                  setImage(e.target.value);
                } else {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
              value={fileFormat ? image : ""}
              placeholder="Entrez l'image de la recette"
            />
            <label htmlFor="url">url</label>
            <input
              type="radio"
              id="url"
              name="file_format"
              defaultChecked
              onChange={() => {
                setFileFormat(!fileFormat);
              }}
            />
            <label htmlFor="file">fichier</label>
            <input
              type="radio"
              id="file"
              name="file_format"
              onChange={() => {
                setFileFormat(!fileFormat);
              }}
            />
          </div>
          <div className="form-group form-group-50">
            <label htmlFor="video">Vidéo de la recette</label>
            <input
              type="url"
              id="video"
              placeholder="Entrez l'URL de la vidéo de la recette"
              onChange={(e) => setVideo(e.target.value)}
              value={video}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
