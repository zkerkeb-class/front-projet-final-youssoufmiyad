import React from "react";

function TagForm({ value, onChange, index }) {
  return (
    <div className="grid gap-2">
      <label>
        Tag #{index + 1}
        <input
          type="text"
          value={value.tag || ""}
          onChange={(e) => onChange({ ...value, tag: e.target.value })}
          className="border p-1 w-full"
        />
      </label>
    </div>
  );
}

export default TagForm;