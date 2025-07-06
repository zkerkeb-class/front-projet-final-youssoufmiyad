import React from "react";
import { useTranslation } from "react-i18next";

function IngredientForm({ value, onChange, index }) {
  const {t} = useTranslation();
  return (
    <div className="grid gap-2">
      <label>
        {t("ingredient")} #{index + 1}
        <input
          type="text"
          value={value.ingredient || ""}
          onChange={(e) => onChange({ ...value, ingredient: e.target.value })}
          className="border p-1 w-full"
        />
      </label>
      <label>
        {t("measure")} #{index + 1}
        <input
        type="text"
          value={value.measure || ""}
          onChange={(e) => onChange({ ...value, measure: e.target.value })}
          className="border p-1 w-full"
        />
      </label>
    </div>
  );
}

export default IngredientForm;