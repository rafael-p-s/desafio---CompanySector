import { connection } from "../config/database-config.js";

//C
export async function postSetor(descricao, empresa_id) {
  const client = await connection();
  try {
    const insertSetorQuery = `
      INSERT INTO setor (descricao)
      VALUES ($1)
      RETURNING id;`;

    const insertSetorValues = [descricao];
    const result = await client.query(insertSetorQuery, insertSetorValues);

    const setor_id = result.rows[0].id;

    const insertEmpresaSetorQuery = `
      INSERT INTO empresa_setor (id_empresa, id_setor)
      VALUES ($1, $2);`;

    const insertEmpresaSetorValues = [empresa_id, setor_id];
    await client.query(insertEmpresaSetorQuery, insertEmpresaSetorValues);

    return { success: true, message: "Setor cadastrado com sucesso!" };
  } catch (error) {
    console.error("Error in postSetor function: ", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

//R
export async function getSetoresByDescricao(descricao) {
  const client = await connection();
  try {
    const selectSetoresQuery = `
      SELECT id, descricao FROM setor
      WHERE descricao ILIKE $1
      LIMIT 10;`;

    const setoresResult = await client.query(selectSetoresQuery, [
      `%${descricao}%`,
    ]);
    return setoresResult.rows;
  } catch (error) {
    console.error("Error trying to fetch setor by descricao: ", error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

//U
export async function putSetor(id, descricao) {
  const client = await connection();
  try {
    const updateSetorQuery = `
      UPDATE setor
      SET descricao = $1
      WHERE id = $2`;

    const updateSetorValues = [descricao, id];
    await client.query(updateSetorQuery, updateSetorValues);

    return { success: true, message: "Setor atualizado com sucesso!" };
  } catch (error) {
    console.error("Error in putSetor function: ", error);
    throw error;
  } finally {
    if (client) {
      client.release();
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
