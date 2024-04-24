import React, { useState } from "react";
import "./index.css";

export function CNPJinput({
  label,
  onChange,
  value,
  maxLength = 18, // Alterado para o novo formato do CNPJ
  placeholderText,
}) {
  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "";

    // Limpar todos os caracteres não numéricos
    const cleanedValue = cnpj.replace(/[^\d]/g, "");

    // Adicionar zeros à esquerda se o CNPJ tiver menos de 14 dígitos
    const paddedValue = cleanedValue.padStart(14, "0");

    // Formatar o CNPJ
    const formattedCNPJ =
      paddedValue.substring(0, 2) +
      "." +
      paddedValue.substring(2, 5) +
      "." +
      paddedValue.substring(5, 8) +
      "/" +
      paddedValue.substring(8, 12) +
      "-" +
      paddedValue.substring(12, 14);

    return formattedCNPJ;
  };

  const [internalValue, setInternalValue] = useState(formatCNPJ(value));

  const handleInputChange = (e) => {
    const { value: inputValue } = e.target;

    // Limpar todos os caracteres não numéricos
    const cleanedValue = inputValue.replace(/[^\d]/g, "");

    setInternalValue(cleanedValue);

    // Chamar o onChange com o valor limpo
    if (onChange) onChange(cleanedValue);
  };

  const handleBlur = () => {
    // Ao perder o foco, formatar o CNPJ
    setInternalValue(formatCNPJ(internalValue));
  };

  return (
    <>
      <label style={{ fontSize: "20px", margin: "10px" }}>{label}</label>
      <input
        className="input_cnpj"
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        onBlur={handleBlur} // Ao perder o foco, formatar o CNPJ
        placeholder={placeholderText}
        maxLength={maxLength}
      />
    </>
  );
}
