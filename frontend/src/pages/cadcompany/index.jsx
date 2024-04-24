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

  const [setor, setSetor] = useState([]);
  const [setoresFetched, setSetoresFetched] = useState(false);

  const fetchSetor = async () => {
    try {
      const response = await axios.get("http://localhost:3333/setor");
      setSetor(response.data);
      setSetoresFetched(true); // Marcamos como true para indicar que os setores foram buscados
    } catch (error) {
      console.error("Erro ao buscar setores: ", error);
    }
  };

  useEffect(() => {
    // Verifica se os setores já foram buscados
    if (!setoresFetched) {
      fetchSetor();
    }
  }, [setoresFetched]); // Dependência alterada para setoresFetched

  const handleInputChange = (e) => {
    console.log(e.target);
    if (e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      return;
    }
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
            <label htmlFor="setor">Setor:</label>
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
            {/* {formData.setor_id ? (
              <div>
                Setor selecionado:{" "}
                {
                  setor.find(
                    (setorItem) => setorItem.id === parseInt(formData.setor_id)
                  ) ? (
                    setor.find(
                      (setorItem) => setorItem.id === parseInt(formData.setor_id)
                    ).descricao
                  ) : (
                    "Setor não encontrado"
                  )
                }
              </div>
            ) : (
              <div>Sem setor selecionado</div>
            )} */}
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
