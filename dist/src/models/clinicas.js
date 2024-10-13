"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoberturaModel = void 0;
const mongoose_1 = require("mongoose");
// Definir el esquema de las coberturas
const coberturaSchema = new mongoose_1.Schema({
    key: String,
    label: String,
    children: [{
            key: String,
            id: String,
            label: String,
            partialSelected: Boolean
        }],
    partialSelected: Boolean
});
const clinicasSchema = new mongoose_1.Schema({
    nombre: String,
    entity: String,
    cartillas: [String],
    coberturas: [coberturaSchema],
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
        descripcion: String
    },
    tipo: String,
    especialidades: [String],
    rating: Number,
    select: Boolean
});
// Crear el modelo de Mongoose para las coberturas
const CoberturaModel = (0, mongoose_1.model)('Cobertura', coberturaSchema);
exports.CoberturaModel = CoberturaModel;
const ClinicasModel = (0, mongoose_1.model)('clinicas', clinicasSchema);
exports.default = ClinicasModel;
//# sourceMappingURL=clinicas.js.map