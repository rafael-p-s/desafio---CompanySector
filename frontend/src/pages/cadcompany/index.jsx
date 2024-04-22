import React from "react";
//CSS:
import "./index.css";
//Components:
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/input";
import { CNPJinput } from "../../components/inputcnpj";

export function CadCompany() {
  return (
    <>
      <NavBar>Cadastro Empresa</NavBar>
      <form action="" method="post">
        <div className="div_razao_fantasia">
          <InputGeral
            label="Razão Social:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="Digite a Razão Social..."
          />
          <InputGeral
            label="Nome Fantasia:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="Digite o nome Fantasia..."
          />
        </div>
        <div className="div_cnpj_setor">
          <CNPJinput
            label="CNPJ:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="Digite o CNPJ..."
            maxLength="14"
          />
          <InputGeral
            label="Setor:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="Busque o setor..."
          />
        </div>
        <div className="div_tabela">
          <table>
            <thead>
              <tr>
                <th>Setor</th>
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
