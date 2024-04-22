import { connection } from "../config/database-config.js";

export async function createTableEmpresaSetor() {
  const client = await connection();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS empresa_setor (id_empresa SERIAL4 NOT NULL REFERENCES empresa(id), id_setor SERIAL4 NOT NULL REFERENCES setor(id))"
    );
    console.log("Tabela Empresa_Setor criada com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabela Empresa_Setor: ", error);
  } finally {
    if (client) {
      await client.release();
    }
  }
}
