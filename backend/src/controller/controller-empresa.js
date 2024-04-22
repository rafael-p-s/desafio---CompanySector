import { fastify } from "fastify";
import { connection } from "../config/database-config.js";

//C
export async function postEmpresa(razao_social, nome_fantasia, cnpj, setor_id) {
  const client = await connection();
  try {
    const insertEmpresaQuery = `
        INSERT INTO empresa (razao_social, nome_fantasia, cnpj)
        VALUES ($1, $2, $3)
        RETURNING id;`;

    const insertEmpresaValues = [razao_social, nome_fantasia, cnpj];
    const empresaResult = await client.query(
      insertEmpresaQuery,
      insertEmpresaValues
    );

    const empresa_id = empresaResult.rows[0].id;

    const insertEmpresaSetorQuery = `
        INSERT INTO empresa_setor (id_empresa, id_setor)
        VALUES ($1, $2);`;

    const insertEmpresaSetorValues = [empresa_id, setor_id];
    await client.query(insertEmpresaSetorQuery, insertEmpresaSetorValues);

    return { success: true, message: "Empresa cadastrada com sucesso!" };
  } catch (error) {
    console.error("Error trying to insert into the 'empresa' table: ", error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
//R
export async function getEmpresa() {
  const client = await connection();
  try {
    const result = await client.query(
      "SELECT empresa.id AS empresa_id, empresa.razao_social, empresa.nome_fantasia,empresa.cnpj, setor.id AS setor_id, setor.descricao FROM empresa INNER JOIN empresa_setor ON empresa.id = empresa_setor.id_empresa INNER JOIN setor ON empresa_setor.id_setor = setor.id"
    );
    return result.rows;
  } catch (error) {
    console.error("Error to try read in the table empresa: ", error);
    // throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

//U
export async function putEmpresa(
  empresa_id,
  razao_social,
  nome_fantasia,
  cnpj,
  setor_id
) {
  const client = await connection();
  try {
    //First update empresa:
    const updateEmpresaQuery = `
        UPDATE empresa SET razao_social = $2, nome_fantasia = $3, cnpj = $4
        WHERE id = $1`;

    const updateEmpresaValues = [empresa_id, razao_social, nome_fantasia, cnpj];
    await client.query(updateEmpresaQuery, updateEmpresaValues);

    //After update empresa_setor, with the new setor:
    const updateEmpresaSetorQuery =
      "UPDATE empresa_setor SET id_setor = $2 WHERE id_empresa = $1";

    //if ok:
    return { success: true, message: "Empresa atualizada com sucesso!" };
  } catch (error) {
    console.error("Error trying to update the 'empresa' table ", error);
    // throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

//D
export async function deleteEmpresa(empresa_id) {
  const client = await connection();
  try {
    //First delete the empresa from "empresa_setor"
    const deleteEmpresaSetorQuery = `
        DELETE FROM empresa_setor
        WHERE id_empresa = $1;`;

    await client.query(deleteEmpresaSetorQuery, [empresa_id]);

    // Second delette empresa from table "empresa"
    const deleteEmpresaQuery = `
        DELETE FROM empresa
        WHERE id = $1;`;

    await client.query(deleteEmpresaQuery, [empresa_id]);

    return { success: true, message: "Empresa excluída com sucesso!" };
  } catch (error) {
    console.error("Error trying to delete from the 'empresa' table: ", error);
    // throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
