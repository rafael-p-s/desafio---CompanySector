import { connection } from "../config/database-config.js";

export async function createTableEmpresa() {
  const client = await connection(); 
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS empresa (id SERIAL4 NOT NULL PRIMARY KEY, razao_social VARCHAR NOT NULL, nome_fantasia VARCHAR, cnpj VARCHAR NOT NULL)"
    );
  } catch (error) {
    console.error("Erro ao criar tabela empresa:", error);
  } finally {
    if (client) {
      await client.release();
    }
  }
}
