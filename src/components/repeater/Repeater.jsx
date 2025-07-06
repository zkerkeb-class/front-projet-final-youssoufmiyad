import React, { useState } from "react";

function Repeater({
  FormComponent,
  initialValue,
  initialValues = [],
  onChange,
}) {
  const [forms, setForms] = useState(() =>
    initialValues.length > 0
      ? initialValues.map((val) => ({
          id: Date.now() + Math.random(),
          data: val,
        }))
      : [{ id: Date.now(), data: initialValue }]
  );
  const handleChange = (newForms) => {
    setForms(newForms);
    if (onChange) {
      onChange(newForms.map((f) => f.data));
    }
  };

  const addForm = () => {
    const newForms = [...forms, { id: Date.now(), data: initialValue }];
    handleChange(newForms);
  };

  const updateFormData = (id, newData) => {
    const newForms = forms.map((f) =>
      f.id === id ? { ...f, data: newData } : f
    );
    handleChange(newForms);
  };

  const removeForm = (id) => {
    const newForms = forms.filter((f) => f.id !== id);
    handleChange(newForms);
  };

  return (
    <div className="space-y-4">
      {forms.map(({ id, data }, index) => (
        <div key={id} className="p-4 border rounded relative">
          <FormComponent
            value={data}
            onChange={(newData) => updateFormData(id, newData)}
            index={index}
          />
          <button
            onClick={() => removeForm(id)}
            className="absolute top-2 right-2 text-red-500"
          >
            🗑
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addForm}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        +
      </button>
    </div>
  );
}
export default Repeater;
