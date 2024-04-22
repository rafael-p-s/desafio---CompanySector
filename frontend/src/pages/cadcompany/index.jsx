import React, { useState } from "react";
//CSS:
import "./index.css";
//Components:
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/input";
//CNPJ mask:
import { MaskedCNPJInput } from "../../components/inputcnpj";

export function CadCompany() {


  return (
    <>
      <NavBar>Cadastro Empresa</NavBar>
      <form action="" method="post">
        <div>
          <InputGeral
            label="Razão Social:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="..."
          />
          <InputGeral
            label="Nome Fantasia:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText="..."
          />
        </div>
        <div>
        <MaskedCNPJInput
            label="Nome Fantasia:"
            onchange={(e) => console.log(e.target.value)}
            type="text"
            placeholderText=""
          />
        </div>
        
      </form>
    </>
  );
}
