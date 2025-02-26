"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attributeSchema = new mongoose_1.Schema({
    id: { type: String, default: null },
    name: { type: String, required: true },
    value_id: { type: String, default: null },
    value_name: { type: String, required: true },
    attribute_group_id: { type: String, default: null },
    attribute_group_name: { type: String, required: true },
    value_type: { type: String, default: null }
});
const planSchema = new mongoose_1.Schema({
    item_id: { type: String },
    name: { type: String },
    empresa: { type: String },
    price: { type: Number },
    precio: { type: Number },
    rating: { type: Number },
    copagos: { type: Boolean },
    category: { type: String },
    tags: { type: [mongoose_1.Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed] para que acepte cualquier objeto
    hijosSolos: { type: Boolean },
    folletos: { type: [mongoose_1.Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed]
    images: { type: [mongoose_1.Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed]
    attributes: { type: [attributeSchema], required: true },
    Cirugia_Estetica: { type: Boolean },
    Cobertura_Nacional: { type: Boolean },
    Habitacion_Individual: { type: Boolean },
    Ortodoncia_Adultos: { type: Boolean },
    PMO_Solo_por_Aportes: { type: Boolean },
    Sin_Copagos: { type: Boolean },
    raiting: { type: Number },
    valueSlide3: { type: Number },
    valueSlide4: { type: Number },
    aporteOS: { type: Number },
    imagenes: { type: mongoose_1.Schema.Types.Mixed }, // Cambiar a Schema.Types.Mixed si es un objeto más complejo
    clinicas: { type: [mongoose_1.Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed]
}, { timestamps: true });
const PlanesModel = (0, mongoose_1.model)('planes', planSchema);
exports.default = PlanesModel;
//# sourceMappingURL=planes.js.map