"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    item_id: String,
    name: String,
    empresa: String,
    price: Number,
    precio: Number,
    rating: Number,
    copagos: Boolean,
    category: String,
    tags: [String],
    hijosSolos: Boolean,
    folletos: [String],
    images: [String],
    clinicas: [String],
    attributes: [String],
    Cirugia_Estetica: Boolean,
    Cobertura_Nacional: Boolean,
    Habitacion_Individual: Boolean,
    Ortodoncia_Adultos: Boolean,
    PMO_Solo_por_Aportes: Boolean,
    Sin_Copagos: Boolean,
    raiting: Number,
    valueSlide3: Number,
    valueSlide4: Number,
    aporteOS: Number,
});
const PlanesModel = (0, mongoose_1.model)('planes', planSchema);
exports.default = PlanesModel;
//# sourceMappingURL=planes.js.map