import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/inputGeral/index";
import { CNPJinput } from "../../components/inputcnpj";

export function CadCompany() {
  const [formData, setFormData] = useState({
    razao_social: "",
    nome_fantasia: "",
    cnpj: "",
    setor_id: "",
  });

  const [setores, setSetores] = useState([]);

  const fetchSetores = async () => {
    try {
      const response = await axios.get("http://localhost:3333/setor");
      // console.log("Dados dos setores recebidos:", response.data);
      setSetores(response.data);
    } catch (error) {
      console.error("Erro ao buscar setores: ", error);
    }
  };

  useEffect(() => {
    fetchSetores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSetorChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, setor_id: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3333/cadcompany",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar empresa: ", error);
    }
  };

  return (
    <>
      <NavBar>Cadastro Empresa</NavBar>
      <form onSubmit={handleSubmit}>
        <div className="div_razao_fantasia">
          <InputGeral
            label="Razão Social:"
            type="text"
            name="razao_social"
            value={formData.razao_social}
            onChange={handleInputChange}
            placeholderText="Digite a Razão Social..."
          />
          <InputGeral
            label="Nome Fantasia:"
            type="text"
            name="nome_fantasia"
            value={formData.nome_fantasia}
            onChange={handleInputChange}
            placeholderText="Digite o nome Fantasia..."
          />
        </div>

        <div className="div_cnpj_setor">
          <CNPJinput
            label="CNPJ:"
            name="cnpj"
            type="text"
            value={formData.cnpj}
            onChange={handleInputChange}
            placeholderText="Digite o CNPJ..."
            maxLength="14"
          />
          <div>
            <label htmlFor="setor_id">Setor:</label>
            <select
              id="setor_id"
              name="setor_id"
              value={formData.setor_id}
              onChange={handleSetorChange}
              className="form-control"
              required
            >
              <option value="">-- Selecione o Setor --</option>
              {setores.map((setor) => (
                <option key={setor.id} value={setor.id}>
                  {setor.descricao}
                </option>
              ))}
            </select>
          </div>
          <div>
            <InputGeral
              label="Buscar Setor:"
              type="text"
              value={searchDescricao}
              onChange={handleSearchChange}
              placeholderText="Buscar por descrição..."
            />
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
            type="submit"
          >
            Salvar
          </ButtonBtn>
        </div>
      </form>
    </>
  );
}
