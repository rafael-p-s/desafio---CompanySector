import { connection } from "../config/database-config.js";

//C
export async function postSetor(dicricao, impresa_id) {
  const client = await connection();
  try {
    const insertEmpresaQuery = `
          INSERT INTO empresa (dicricao)
          VALUES ($1)
          RETURNING id;`;

    const insertEmpresaValues = [dicricao];
    const empresaResult = await client.query(
      insertEmpresaQuery,
      insertEmpresaValues
    );

    const empresa_id = empresaResult.rows[0].id;

    const insertEmpresaSetorQuery = `
          INSERT INTO empresa_setor (id_empresa, id_setor)
          VALUES ($1, $2);`;

    const insertEmpresaSetorValues = [empresa_id, impresa_id];
    await client.query(insertEmpresaSetorQuery, insertEmpresaSetorValues);

    return { success: true, message: "Setor cadastrado com sucesso!" };
  } catch (error) {
    console.error("Error trying to insert into the 'setor' table: ", error);
    // throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

//R
//   export async function getSetor() {
//     const client = await connection();
//     try {
//       const result = await client.query(
//         "SELECT empresa.id AS empresa_id, empresa.razao_social, empresa.nome_fantasia,empresa.cnpj, setor.id AS setor_id, setor.descricao FROM empresa INNER JOIN empresa_setor ON empresa.id = empresa_setor.id_empresa INNER JOIN setor ON empresa_setor.id_setor = setor.id"
//       );
//       return result.rows;
//     } catch (error) {
//       console.error("Error to try read in the table empresa: ", error);
// throw error;
//     } finally {
//       if (client) {
//         client.release();
//       }
//     }
//   }

//U
export async function putSetor(setor_id, descricao, empresa_id) {
  const client = await connection();
  try {
    // Primeiro, atualizamos o setor na tabela 'setor'
    const updateSetorQuery = `
            UPDATE setor SET descricao = $2
            WHERE id = $1`;

    const updateSetorValues = [setor_id, descricao];
    await client.query(updateSetorQuery, updateSetorValues);

    // Agora, atualizamos o setor na tabela 'empresa_setor' com o novo setor
    const updateEmpresaSetorQuery = `
            UPDATE empresa_setor
            SET id_setor = $2
            WHERE id_empresa = $1`;

    const updateEmpresaSetorValues = [empresa_id, setor_id];
    await client.query(updateEmpresaSetorQuery, updateEmpresaSetorValues);

    // Se tudo correu bem, retornamos uma mensagem de sucesso
    return { success: true, message: "Setor atualizado com sucesso!" };
  } catch (error) {
    console.error("Error trying to update the 'setor' table: ", error);
    // throw error;
  } finally {
    if (client) {
      await client.release();
    }
  }
}

//D
export async function deleteSetor(setor_id) {
  const client = await connection();
  try {
    //First delete the setor from "empresa_setor"
    const deletesetorSetorQuery = `
          DELETE FROM empresa_setor
          WHERE id_setor = $1;`;

    await client.query(deletesetorSetorQuery, [setor_id]);

    // Second delette setor from table "setor"
    const deleteSetorQuery = `
          DELETE FROM setor
          WHERE id = $1;`;

    await client.query(deleteSetorQuery, [setor_id]);

    return { success: true, message: "Setor excluída com sucesso!" };
  } catch (error) {
    console.error("Error trying to delete from the 'setor' table: ", error);
    // throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
