import React, { useState } from "react";
import "./index.css";

export function CNPJinput({
  label,
  onChange,
  value,
  maxLength = 14,
  placeholderText,
}) {
  const [internalValue, setInternalValue] = useState(value || "");

  const handleInputChange = (event) => {
    const { value: inputValue } = event.target;

    // Allow only digits and backspace key
    const allowedChars = /^\d|\b$/;
    if (!allowedChars.test(inputValue)) {
      return; // Prevent invalid characters
    }

    // Limit input to maxLength
    const trimmedValue = inputValue.slice(0, maxLength);
    setInternalValue(trimmedValue);

    if (onChange) onChange(trimmedValue); // Pass the formatted value to onChange
  };

  return (
    <>
      <label style={{ fontSize: "20px", margin: "10px" }}>{label}</label>
      <input
        className="input_cnpj"
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        placeholder={placeholderText}
        maxLength={maxLength}
      />
    </>
  );
}
