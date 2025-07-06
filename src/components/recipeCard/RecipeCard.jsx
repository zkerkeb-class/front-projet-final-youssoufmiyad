import React from "react";
import extractWords from "../../utils/extractWords";
import { useTranslation } from "react-i18next";

const RecipeCard = ({ recipe }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="recipe-card">
      <a href={`/recettes/${recipe.slug}`}>
        <picture className="thumbnail">
          <img src={recipe.imageUrl} />
        </picture>
        <h2>{recipe.title.en}</h2>
      </a>
      <h3 className="caracteristics">
        <span className="category">{recipe.category}</span>&nbsp;|&nbsp;
        <span className="area">{recipe.area}</span>
      </h3>
      <p>
        {extractWords(
          i18n.language === "fr"
            ? recipe.instructions.fr ||
                recipe.instructions.en ||
                recipe.instructions
            : recipe.instructions.en ||
                recipe.instructions.fr ||
                recipe.instructions,
          60
        )}
      </p>
      <div className="tags">
        <h3>Tags : </h3>
        {recipe.tags?.length > 0
          ? recipe.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                          {index < recipe.tags.length - 1 ?',\u00A0' : null}

              </span>
            ))
          : t("noTagsAssociated")}
      </div>
    </div>
  );
};

export default RecipeCard;
