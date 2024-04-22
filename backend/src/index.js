import { fastify } from "fastify";
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
import { postSetor, putSetor } from "./controller/controller-setor.js";

const server = fastify();
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
//API U
server.put("/cadcompany/:id", async (req, res) => {
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
server.delete("/cadcompany/:id/setor/:setor_id", async (req, res) => {
  try {
    const { id, setor_id } = req.params;
    const result = await deleteEmpresaSetor(id, setor_id);
    res.send(result);
  } catch (error) {
    console.error(
      "Error in /cadcompany/:id/setor/:setor_id DELETE route: ",
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

server.listen(lhport, () => {
  console.log(`Backend running on port: ${lhport}`);
});
