import { fastify } from "fastify";
//Create Tables:
import { createTables } from "./database-config/createTables.js";
//Controller:
//Empresa:
import {
  postEmpresa,
  getEmpresa,
  putEmpresa,
  deleteEmpresa,
} from "./controller/controller-empresa.js";

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
server.put("/cadcompany/:id", (req, res) => {
  const id = req.params.id;
  const result = putEmpresa(id);
  res.send(result);
});
//API D
server.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteEmpresa(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error("Error in delete route: ", error);
      res.status(500).send("Internal Server Error");
    });
});

server.listen(lhport, () => {
  console.log(`Backend running on port: ${lhport}`);
});
