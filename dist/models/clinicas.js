"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clinicasSchema = new mongoose_1.Schema({
    nombre: String,
    entity: String,
    cartillas: [String],
    coberturas: [String],
    item_id: String,
    ubicacion: {
        calle_y_numero: String,
        telefono: String,
        barrio: String,
        partido: String,
        region: String,
        provincia: String,
        CP: String
    },
    url: String,
    imagen: {
        ruta: String,
        descripcion: String,
    },
    tipo: String,
    especialidades: [String],
    rating: Number,
    select: Boolean,
});
const ClinicasModel = (0, mongoose_1.model)('clinicas', clinicasSchema);
exports.default = ClinicasModel;
//# sourceMappingURL=clinicas.js.map