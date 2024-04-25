import React, { useState, useEffect } from "react";
//CSS:
import "./index.css";
//Component:
import { ButtonBtn } from "../buttons/button";
//Axios:
import axios from "axios";
import { NavLink } from "react-router-dom";

export function TableHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3333/");
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Erro ao buscar dados da tabela: ", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3333/");
      setData(response.data || []); // Se response.data for undefined, setData para um array vazio
    } catch (error) {
      console.error("Erro ao buscar dados da tabela: ", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Editar item com ID:", id);
  };

  const handleDelete = async (id_empresa, id_setor) => {
    console.log(id_empresa);
    console.log(id_setor);
    console.log("Dentro do btn deletar.");
    try {
      const isConfirmed = window.confirm("Deseja realmente excluir?");

      if (isConfirmed) {
        await axios.delete(
          `http://localhost:3333/${id_empresa}/setor/${id_setor}`
        );
        console.log("Item deletado com sucesso!");
        fetchData(); // Atualiza os dados após a deleção
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Razão Social</th>
              <th>Nome Fantasia</th>
              <th>CNPJ</th>
              <th>Setor</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((empresa) => (
              <tr key={empresa.empresa_id}>
                <td>{empresa.razao_social}</td>
                <td>{empresa.nome_fantasia}</td>
                <td>{empresa.cnpj}</td>
                <td>
                  {empresa.descricao ? (
                    <div>{empresa.descricao}</div>
                  ) : (
                    <div>Sem setores</div>
                  )}
                </td>
                <td>
                  <NavLink to={`/editcompany/${empresa.empresa_id}`}>
                    <button onClick={() => handleEdit(empresa.empresa_id)}>
                      Editar
                    </button>
                  </NavLink>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(empresa.empresa_id, empresa.setor_id)
                    }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
