import React from "react";
//CSS:
import "./index.css";
//Components:
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/inputGeral/";

export function CadSector() {
  return (
    <>
      <NavBar>Cadastro Setor</NavBar>
      <form action="" method="post">
        <div className="div_cad_setor">
          <InputGeral
            label="Discrição:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="Digite a Razão Social..."
          />
          <InputGeral
            label="Empresa:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="Busque a empresa..."
          />
        </div>
        <div className="div_tabela_setor">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>
                  {/* <ButtonBtn>Deletar</ButtonBtn> */}
                  Deletar
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="div_buttons">
          <ButtonBtn
            style={{
              backgroundColor: "#F10404",
              color: "#FFFFFF",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              fontSize: "20px",
              margin: "0px 5px",
            }}
            to="/"
          >
            Cancelar
          </ButtonBtn>
          <ButtonBtn
            style={{
              backgroundColor: "#2FD467",
              color: "#FFFFFF",
              padding: "10px 30px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              fontSize: "20px",
              margin: "0px 5px",
            }}
          >
            Salvar
          </ButtonBtn>
        </div>
      </form>
    </>
  );
}
