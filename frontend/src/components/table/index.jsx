import React from "react";
//CSS:
import "./index.css";
//Component:
import { ButtonBtn } from "../buttons/button";
export function TableHome() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Razão Social</th>
            <th>Nome Fantasia</th>
            <th>CNPJ</th>
            <th>Setor(es)</th>
            <th>
              <ButtonBtn>Editar</ButtonBtn>
            </th>
            <th>
              <ButtonBtn>Deletar</ButtonBtn>
            </th>
          </tr>
        </thead>
      </table>
    </>
  );
}
