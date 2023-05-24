"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cotizacion_controller_1 = require("../controllers/cotizacion.controller");
const router = (0, express_1.Router)();
router.post('/cotizar', cotizacion_controller_1.cotizacionController.calcularPrecio);
exports.default = router;
//# sourceMappingURL=cotizacion.routes.js.map