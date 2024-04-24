import React, { useState, useEffect } from "react";
//Axios:
import axios from "axios";
//CSS:
import "./index.css";
//Components:
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/inputGeral/";

export function CadSector() {
  const [formData, setFormData] = useState({
    empresa_id: "",
    descricao: "",
  });

  const [empresa, setEmpresa] = useState([]);
  const [empresasFetched, setEmpresasFetched] = useState(false);

  const fetchEmpresa = async () => {
    try {
      const response = await axios.get("http://localhost:3333/empresa");
      setEmpresa(response.data);
      setEmpresasFetched(true);
    } catch (error) {
      console.error("Erro ao buscar empresas: ", error);
    }
  };

  useEffect(() => {
    // Verifica se os empresas já foram buscados
    if (!empresasFetched) {
      fetchEmpresa();
    }
  }, [empresasFetched]);

  const handleEmpresaChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, empresa_id: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3333/cadsector",
        formData
      );
      console.log("Response from backend: ", response.data);
      setFormData({
        descricao: "",
        empresa_id: "",
      });
      alert("Setor cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar setor: ", error);
      alert("Erro ao cadastrar setor. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <NavBar>Cadastro Setor</NavBar>
      <form onSubmit={handleSubmit}>
        <div className="div_cad_empresa">
          <div className="div_select">
          <label className="select_label" htmlFor="setor">
            Empresa:
          </label>
          <select
            id="empresa"
            name="empresa_id"
            value={formData.empresa_id}
            onChange={handleEmpresaChange}
            required
          >
            <option value="">Selecione o Empresa</option>
            {empresa.map((empresaItem) => (
              <option key={empresaItem.id} value={empresaItem.id}>
                {empresaItem.razao_social}
              </option>
            ))}
          </select>
          </div>

          <InputGeral
            label="Nome do Setor: "
            type="var"
            name="descricao"
            value={formData.descricao}
            placeholderText="Digite o nome do setor..."
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
          />
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
