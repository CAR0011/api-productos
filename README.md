# api-productos

# API Básica de Gestión de Productos

Esta API RESTful fue desarrollada con **Node.js y Express**, y permite **gestionar un listado de productos** de una tienda.  
Los datos se almacenan en un archivo local `productos.json`, sin necesidad de usar una base de datos.

---

##  Instalación de dependencias

1. Clonar o descargar este repositorio:
   ```bash
   git clone https://github.com/CAR0011/api-productos.git
cd api-productos
npm install
npm run dev
npm start

Endpoints disponibles
Método	Ruta	Descripción
GET	/productos	Devuelve la lista completa de productos.
GET	/productos/:id	Devuelve un producto según su ID.
GET	/productos/disponibles	Devuelve solo los productos con disponible: true.
POST	/productos	Agrega un nuevo producto. Se asigna automáticamente un id y una fecha_ingreso.
PUT	/productos/:id	Actualiza los datos de un producto existente.
DELETE	/productos/:id	Elimina un producto por su ID.
