import React from "react";
//React-router-dom
import { NavLink } from "react-router-dom";

export function ButtonBtn({ to, children, style }) {
  return (
    <>
      <NavLink to={to} style={{ color: "#FFFFFF", textDecoration: "none" }}>
        <button style={style}>{children}</button>
      </NavLink>
    </>
  );
}
