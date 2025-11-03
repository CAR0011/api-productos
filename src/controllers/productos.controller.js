import { leerProductos, guardarProductos } from "../utils/db.js";

function siguienteId(lista) {
  if (lista.length === 0) return 1;
  const max = Math.max(...lista.map(p => p.id));
  return max + 1;
}

export async function obtenerTodos(req, res, next) {
  try {
    const lista = await leerProductos();
    return res.json(lista);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const lista = await leerProductos();
    const encontrado = lista.find(p => p.id === id);
    if (!encontrado) {
      return res.status(404).json({ error: { message: "Producto no encontrado" } });
    }
    return res.json(encontrado);
  } catch (error) {
    next(error);
  }
}

export async function obtenerDisponibles(req, res, next) {
  try {
    const lista = await leerProductos();
    const disponibles = lista.filter(p => p.disponible === true);
    return res.json(disponibles);
  } catch (error) {
    next(error);
  }
}

export async function crearProducto(req, res, next) {
  try {
    const { nombre, precio, descripcion, disponible } = req.body;

    const lista = await leerProductos();
    const nuevo = {
      id: siguienteId(lista),
      nombre,
      precio,
      descripcion,
      disponible,
      fecha_ingreso: new Date().toISOString()
    };

    lista.push(nuevo);
    await guardarProductos(lista);

    return res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
}

export async function actualizarProducto(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { nombre, precio, descripcion, disponible } = req.body;

    const lista = await leerProductos();
    const idx = lista.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: { message: "Producto no encontrado" } });
    }

    // Actualizacion parcial (solo lo que venga)
    if (nombre !== undefined) lista[idx].nombre = nombre;
    if (precio !== undefined) lista[idx].precio = precio;
    if (descripcion !== undefined) lista[idx].descripcion = descripcion;
    if (disponible !== undefined) lista[idx].disponible = disponible;

    await guardarProductos(lista);
    return res.json(lista[idx]);
  } catch (error) {
    next(error);
  }
}

export async function eliminarProducto(req, res, next) {
  try {
    const id = Number(req.params.id);
    const lista = await leerProductos();
    const idx = lista.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: { message: "Producto no encontrado" } });
    }

    const eliminado = lista.splice(idx, 1)[0];
    await guardarProductos(lista);

    return res.json({ message: "Producto eliminado", producto: eliminado });
  } catch (error) {
    next(error);
  }
}
