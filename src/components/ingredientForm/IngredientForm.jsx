import React from "react";

function IngredientForm({ value, onChange, index }) {
  return (
    <div className="grid gap-2">
      <label>
        Ingredient #{index + 1}
        <input
          type="text"
          value={value.ingredient || ""}
          onChange={(e) => onChange({ ...value, ingredient: e.target.value })}
          className="border p-1 w-full"
        />
      </label>
      <label>
        Mesure
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