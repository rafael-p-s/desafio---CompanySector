import React from "react";

export function InputGeral({ label, onChange, type, placeholderText }) {
  return (
    <>
      <label>{label}</label>
      <input onChange={onChange} type={type} placeholder={placeholderText} />
    </>
  );
}
