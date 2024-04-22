import { fastify } from "fastify";

const server = fastify();
//Server created
server.get("/", () => {
  return "Hello World!";
});

server.listen({
  port: 3333,
});

//C

//R

//U

//D