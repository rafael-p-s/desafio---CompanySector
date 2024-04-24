import { fastify } from "fastify";
import cors from "@fastify/cors";
//Create Tables:
import { createTables } from "./database-config/createTables.js";
//Controller:
//Empresa:
import {
  postEmpresa,
  getEmpresasComSetores,
  putEmpresa,
  deleteEmpresaSetor,
} from "./controller/controller-empresa.js";
import {
  postSetor,
  putSetor,
  getSetoresByDescricao,
} from "./controller/controller-setor.js";

import { connection } from "./config/database-config.js";

const server = fastify();
await server.register(cors, {});
const lhport = 3333;

await createTables();

// server.get("/", (req, res) => {
//   return res.send({
//     evento: "Avaliação",
//     feito: "Rafael Prado",
//   });
// });

//API C
server.post("/cadcompany", async (req, res) => {
  try {
    const { razao_social, nome_fantasia, cnpj, setor_id } = req.body;
    console.log("Received request body:", req.body);
    const result = await postEmpresa(
      razao_social,
      nome_fantasia,
      cnpj,
      setor_id
    );
    res.send(result);
  } catch (error) {
    console.error("Error in /cadcompany route: ", error);
    res.status(500).send("Internal Server Error");
  }
});
//SETOR
server.post("/cadsector", async (req, res) => {
  try {
    const { descricao, empresa_id } = req.body;
    const result = await postSetor(descricao, empresa_id);
    res.send(result);
  } catch (error) {
    console.error("Error in /cadsector route: ", error);
    res.status(500).send("Internal Server Error");
  }
});
//API R
server.get("/", async (req, res) => {
  try {
    const empresasComSetores = await getEmpresasComSetores();
    res.send(empresasComSetores);
  } catch (error) {
    console.error("Error where try to list in the home/table route: ", error);
    res.status(500).send("Internal Server Error");
  }
});
//SETOR
server.get("/setor", async (req, res) => {
  const client = await connection();
  try {
    const result = await client.query("SELECT * FROM setor");
    // console.log("Setores encontrados:", result.rows); // Adicionando um log para verificar
    res.send(result.rows);
  } catch (error) {
    console.error("Erro ao buscar setor:", error);
    res.status(500).send({ error: "Erro ao buscar setor." });
  }
});
//API U
server.put("/editarcompany/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { razao_social, nome_fantasia, cnpj } = req.body;
    const result = await putEmpresa(id, razao_social, nome_fantasia, cnpj);
    res.send(result);
  } catch (error) {
    console.error("Error in /cadcompany/:id route: ", error);
    res.status(500).send("Internal Server Error");
  }
});
server.put("/cadsector/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;
    const result = await putSetor(id, descricao);
    res.send(result);
  } catch (error) {
    console.error("Error in /cadsector/:id route: ", error);
    res.status(500).send("Internal Server Error");
  }
});
//API D
server.delete("/:id/setor/:id_setor", async (req, res) => {
  try {
    const { id, id_setor } = req.params;
    const result = await deleteEmpresaSetor(id, id_setor);
    res.send(result);
  } catch (error) {
    console.error(
      "Error in /cadcompany/:id/setor/:id_setor DELETE route: ",
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

server.listen(lhport, () => {
  console.log(`Backend running on port: ${lhport}`);
});
