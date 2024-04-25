import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//CSS
import "./index.css";
//Axios:
import axios from "axios";
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/inputGeral/index";
import { NumericInput } from "../../components/inputcnpj";

export function EditCompany() {
  const { id } = useParams(); //tem q ser = ao id de "/editcompany/:id"
  // console.log(id);

  function handleUpdatePost() {
    axios.put(`/editcompany/${id}`);
  }
  useEffect(() => {
    axios
      .get(`/editcompany/${id}`)
      .then((response) => console.log(response.data));
  }, []);

  return (
    <>
      <NavBar>Editar Empresa</NavBar>
      <form>
        <div className="div_razao_fantasia">
          <InputGeral
            label="Razão Social:"
            type="var"
            name="razao_social"
            placeholderText="Digite a Razão Social..."
          />
          <InputGeral
            label="Nome Fantasia:"
            type="text"
            name="nome_fantasia"
            placeholderText="Digite o nome Fantasia..."
          />
        </div>

        <div className="div_cnpj_setor">
          <NumericInput
            label="CNPJ:"
            type="text"
            name="cnpj"
            placeholderText="Digite o CNPJ..."
            maxLength={14} // Limite de 14 dígitos
          />

          <div className="div_select">
            <label className="select_label" htmlFor="setor">
              Setor:
            </label>
            <select id="setor" name="setor_id" required>
              <option value="">Selecione o Setor</option>
            </select>
          </div>
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
          <button
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
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}
