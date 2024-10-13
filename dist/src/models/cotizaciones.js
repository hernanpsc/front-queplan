"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define el schema para tu documento de cotización
const cotizacionSchema = new mongoose_1.Schema({
    empresas: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    contacto: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    cotizacion: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    // Otros campos que puedas necesitar
});
const CotizacionModel = (0, mongoose_1.model)("Cotizacion", cotizacionSchema);
exports.default = CotizacionModel;
//# sourceMappingURL=cotizaciones.js.map