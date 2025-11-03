export function validarProductoParaCrear(req, res, next) {
  const { nombre, precio, descripcion, disponible } = req.body;

  const errores = [];

  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    errores.push("El campo 'nombre' es obligatorio y debe ser texto.");
  }

  if (precio === undefined || typeof precio !== "number" || !(precio > 0)) {
    errores.push("El campo 'precio' debe ser un numero mayor a cero.");
  }

  if (!descripcion || typeof descripcion !== "string" || descripcion.trim().length < 10) {
    errores.push("El campo 'descripcion' debe tener al menos 10 caracteres.");
  }

  if (disponible !== undefined && typeof disponible !== "boolean") {
    errores.push("El campo 'disponible' debe ser booleano (true/false) si se envia.");
  }

  if (errores.length > 0) {
    return res.status(400).json({
      error: {
        message: "Entrada invalida",
        detalles: errores
      }
    });
  }
  if (req.body.disponible === undefined) {
    req.body.disponible = true;
  }

  next();
}

export function validarProductoParaActualizar(req, res, next) {
  const { nombre, precio, descripcion, disponible } = req.body;
  const errores = [];

  if (nombre !== undefined && (typeof nombre !== "string" || nombre.trim() === "")) {
    errores.push("Si se envia 'nombre', debe ser texto no vacio.");
  }

  if (precio !== undefined && (typeof precio !== "number" || !(precio > 0))) {
    errores.push("Si se envia 'precio', debe ser un numero mayor a cero.");
  }

  if (descripcion !== undefined && (typeof descripcion !== "string" || descripcion.trim().length < 10)) {
    errores.push("Si se envia 'descripcion', debe tener al menos 10 caracteres.");
  }

  if (disponible !== undefined && typeof disponible !== "boolean") {
    errores.push("Si se envia 'disponible', debe ser booleano.");
  }

  if (errores.length > 0) {
    return res.status(400).json({
      error: {
        message: "Entrada invalida",
        detalles: errores
      }
    });
  }

  next();
}
