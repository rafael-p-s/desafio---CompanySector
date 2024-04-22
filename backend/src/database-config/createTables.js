import { createTableEmpresa } from "./dbempresa.js";
import { createTableSetor } from "./dbsetor.js";
import { createTableEmpresaSetor } from "./dbempresa_setor.js";

export async function createTables() {
  await createTableEmpresa();
  await createTableSetor();
  await createTableEmpresaSetor();
}
createTables().catch(console.error);
