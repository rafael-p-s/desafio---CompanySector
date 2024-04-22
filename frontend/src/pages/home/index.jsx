import React from "react";
//Components:
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { TableHome } from "../../components/table";


export function Home() {
  return (
    <>
      <NavBar>Company.Sector</NavBar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <ButtonBtn
          style={{
            backgroundColor: "#398E2B",
            color: "#FFFFFF",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            fontSize: "16px",
            margin: "0px 5px",
          }}
          to="/cadcompany"
        >
          +Empresa
        </ButtonBtn>
        <ButtonBtn
          style={{
            backgroundColor: "#2B478E",
            color: "#FFFFFF",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            fontSize: "16px",
            margin: "0px 5px",
          }}
          to="/cadsector"
        >
          +Setor
        </ButtonBtn>
      </div>
      <TableHome />
    </>
  );
}
