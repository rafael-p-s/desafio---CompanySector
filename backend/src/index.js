import { fastify } from "fastify";
//Create Tables:
import { createTables } from "./database-config/createTables.js";
//Controller:
import { postEmpresa, getEmpresa } from "./controller/controller-empresa.js";

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
server.post("/cadcompany", (req, res) => {
  const result = postEmpresa();
  res.send(result);
});
//API R
server.get("/", (req, res) => {
  const result = getEmpresa();
  res.send(result);
});
//API U

//API D


server.listen(lhport, () => {
  console.log(`Backend running on port: ${lhport}`);
});
