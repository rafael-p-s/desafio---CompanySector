import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "admin", // nome do usuário no banco
  host: "localhost", //local de acesso
  database: "admin", //nome do banco
  password: "admin",
  port: 5432, // porta de acesso.
});

export async function connection() {
  return pool.connect(); // retorna a conexão do pool
}
