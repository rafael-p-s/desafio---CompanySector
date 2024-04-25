import { connection } from "../config/database-config.js";

export async function createTableEmpresa() {
  const client = await connection();
  try {
    // Criar tabela empresa
    await client.query(`
      CREATE TABLE IF NOT EXISTS empresa (
        id SERIAL4 NOT NULL PRIMARY KEY,
        razao_social VARCHAR NOT NULL,
        nome_fantasia VARCHAR,
        cnpj VARCHAR NOT NULL
      )
    `);
    const select = await client.query("SELECT * FROM empresa");
    if (!select.rows.length) {
      await client.query(`
        INSERT INTO empresa (razao_social, nome_fantasia, cnpj)
        VALUES ('Teste Social', 'Teste Fantasia', '##############')
      `);
    }
  } catch (error) {
    console.error("Erro ao criar tabela empresa:", error);
  } finally {
    if (client) {
      await client.release();
    }
  }
}
