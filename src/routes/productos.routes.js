import { Router } from "express";
import {
  obtenerTodos,
  obtenerPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerDisponibles
} from "../controllers/productos.controller.js";
import {
  validarProductoParaCrear,
  validarProductoParaActualizar
} from "../middlewares/validarProducto.js";

const router = Router();

// GET /productos
router.get("/", obtenerTodos);

// GET /productos/disponibles
router.get("/disponibles", obtenerDisponibles);

// GET /productos/:id
router.get("/:id", obtenerPorId);

// POST /productos
router.post("/", validarProductoParaCrear, crearProducto);

// PUT /productos/:id
router.put("/:id", validarProductoParaActualizar, actualizarProducto);

// DELETE /productos/:id
router.delete("/:id", eliminarProducto);

export default router;
