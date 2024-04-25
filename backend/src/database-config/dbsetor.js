import { connection } from "../config/database-config.js";

export async function createTableSetor() {
  const client = await connection();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS setor (id SERIAL4  NOT NULL PRIMARY KEY, descricao VARCHAR NOT NULL)"
    );
    const select = await client.query("SELECT * FROM setor");
    if (!select.rows.length) {
      await client.query(`INSERT INTO setor (descricao)
      VALUES ('teste descricao');`);
    }
  } catch (error) {
    console.error("Error ao criar tabela setor: ", error);
  } finally {
    client.release();
  }
}
