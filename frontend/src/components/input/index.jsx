import React from "react";
import "./index.css";
export function InputGeral({ label, onChange, type, placeholderText }) {
  return (
    <>
      <label style={{fontSize:"20px",margin:"10px"}}>{label}</label>
      <input onChange={onChange} type={type} placeholder={placeholderText} />
    </>
  );
}
