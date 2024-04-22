import { fastify } from "fastify";
//Config DB:
import { connection } from "./config/database-config.js";
//Create Tables:
import { createTables } from "./database-config/createTables.js";

const server = fastify();
const lhport = 3333;
// server.use(fastify.json());

await createTables();
//Server created
server.get("/", (req, res) => {
  return res.send({
    evento: "Avaliação",
    feito: "Rafael Prado",
  });
});

//C
// server.post("/cadcompany", (req, res) => {
//   return "create";
// });
// res.status(201).json(com);

//R
// server.get("/read", () => {
//   return "read";
// });
//U
// server.put("/:id", (req, res) => {
//   return "update.";
// });

//D
// server.delete("/:id", (req, res) => {
//   return "delete";
// });

server.listen(lhport, () => {
  console.log(`Backend running on port: ${lhport}`);
});
