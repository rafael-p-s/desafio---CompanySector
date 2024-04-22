import React, { useState } from "react";

export function MaskedCNPJInput({ label, onChange, value }) {
  const [internalValue, setInternalValue] = useState(value || "");

  const handleMaskChange = (event) => {
    const { value: inputValue } = event.target;
    const formattedValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-digit characters
    const formattedParts = formattedValue.match(/(\d{3})(\d{3})(\d{3})(\d{2})/) || [];
    const maskedValue = formattedParts.join(".").slice(0, 14); // Construct masked value
    setInternalValue(maskedValue);
    if (onChange) onChange(maskedValue); // Pass the formatted value to onChange
  };

  return (
    <div className="cnpj-input">
      <label>{label}</label>
      <input
        type="text"
        value={internalValue}
        onChange={handleMaskChange}
        placeholder="XX.XXX.XXX/XXXX-XX"
        maxLength={14}
        pattern="[0-9]{14}"
      />
    </div>
  );
}
