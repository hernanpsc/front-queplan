"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cotizacionController = void 0;
exports.cotizacionController = {
    calcularPrecio: (req, res) => {
        const formCotizar = req.body;
        console.log('Datos recibidos del formulario:', formCotizar);
        // Lógica para procesar los datos y devolver la respuesta correspondiente
        // ...
        const precioCalculado = 100; // Ejemplo de precio calculado
        res.status(200).json({ precio: precioCalculado });
    }
};
//# sourceMappingURL=cotizacion.controller.js.map