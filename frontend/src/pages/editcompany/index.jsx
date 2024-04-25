import React, { useState, useEffect } from "react";
//CSS
import "./index.css";
//Axios:
import axios from "axios";
import { NavBar } from "../../components/navbar";
import { ButtonBtn } from "../../components/buttons/button";
import { InputGeral } from "../../components/inputGeral/index";
import { NumericInput } from "../../components/inputcnpj";

export function EditCompany() {
  const [formData, setFormData] = useState({
    razao_social: "",
    nome_fantasia: "",
    cnpj: "",
    setor_id: "",
  });

  const [setor, setSetor] = useState([]);
  const [setoresFetched, setSetoresFetched] = useState(false);

  const fetchSetor = async () => {
    try {
      const response = await axios.get("http://localhost:3333/setor");
      setSetor(response.data);
      setSetoresFetched(true);
    } catch (error) {
      console.error("Erro ao buscar setores: ", error);
    }
  };

  useEffect(() => {
    // Verifica se os setores já foram buscados
    if (!setoresFetched) {
      fetchSetor();
    }
  }, [setoresFetched]);

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
      console.log("Response from backend:", response.data);
      setFormData({
        razao_social: "",
        nome_fantasia: "",
        cnpj: "",
        setor_id: "",
      });
      alert("Empresa cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar empresa: ", error);
      alert("Erro ao cadastrar empresa. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <NavBar>Editar Empresa</NavBar>
      <form onSubmit={handleSubmit}>
        <div className="div_razao_fantasia">
          <InputGeral
            label="Razão Social:"
            type="var"
            name="razao_social"
            value={formData.razao_social}
            placeholderText="Digite a Razão Social..."
            onChange={(e) =>
              setFormData({ ...formData, razao_social: e.target.value })
            }
          />
          <InputGeral
            label="Nome Fantasia:"
            type="text"
            name="nome_fantasia"
            value={formData.nome_fantasia}
            placeholderText="Digite o nome Fantasia..."
            onChange={(e) =>
              setFormData({ ...formData, nome_fantasia: e.target.value })
            }
          />
        </div>

        <div className="div_cnpj_setor">
          <NumericInput
            label="CNPJ:"
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            placeholderText="Digite o CNPJ..."
            maxLength={14} // Limite de 14 dígitos
          />

          <div className="div_select">
            <label className="select_label" htmlFor="setor">
              Setor:
            </label>
            <select
              id="setor"
              name="setor_id"
              value={formData.setor_id}
              onChange={handleSetorChange}
              required
            >
              <option value="">Selecione o Setor</option>
              {setor.map((setorItem) => (
                <option key={setorItem.id} value={setorItem.id}>
                  {setorItem.descricao}
                </option>
              ))}
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
