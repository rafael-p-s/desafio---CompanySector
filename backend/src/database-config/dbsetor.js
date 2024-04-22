import { connection } from "../config/database-config.js";

export async function createTableSetor() {
  const cliente = await connection();
  try {
    await cliente.query(
      "CREATE TABLE IF NOT EXISTS setor (id SERIAL4  NOT NULL PRIMARY KEY, descricao VARCHAR NOT NULL)"
    );
  } catch (error) {
    console.error("Error ao criar tabela setor: ", error);
  } finally {
    cliente.release();
  }
}
