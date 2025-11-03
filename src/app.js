import express from "express";
import productosRouter from "./routes/productos.routes.js";
import { manejarErrores } from "./middlewares/manejarErrores.js";

const app = express();

// Para que Express entienda JSON en el body
app.use(express.json());

// Rutas
app.use("/productos", productosRouter);

// Salud (opcional)
app.get("/", (req, res) => {
  res.json({ ok: true, mensaje: "API productos operativa" });
});

// Manejo de errores (siempre al final)
app.use(manejarErrores);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
