import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.resolve(__dirname, "../../data/productos.json");

// Lee y devuelve el array de productos
export async function leerProductos() {
  try {
    const contenido = await fs.readFile(rutaArchivo, "utf8");
    return JSON.parse(contenido);
  } catch (error) {
    // Si no existe o esta vacio, devolvemos array vacio
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

// Guarda el array completo de productos
export async function guardarProductos(lista) {
  const json = JSON.stringify(lista, null, 2);
  await fs.writeFile(rutaArchivo, json, "utf8");
}
