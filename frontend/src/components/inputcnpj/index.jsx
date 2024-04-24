import React from "react";

export function NumericInput({
  label,
  name,
  value,
  onChange,
  placeholderText,
  maxLength,
}) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Remove tudo que não for número
    const filteredValue = inputValue.replace(/\D/g, "");
    // Limita o tamanho máximo
    const truncatedValue = filteredValue.slice(0, maxLength);
    // Chama a função de onChange com o valor tratado
    onChange({ target: { name, value: truncatedValue } });
  };

  return (
    <div className="input_container">
      <label className="input_label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input_field"
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholderText}
        maxLength={maxLength}
      />
    </div>
  );
}
