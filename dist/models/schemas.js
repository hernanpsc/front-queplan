"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ubicacionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ubicacionSchema = new mongoose_1.Schema({
    calle_y_numero: String,
    telefono: String,
    barrio: String,
    partido: String,
    region: String,
    provincia: String,
    CP: String
});
//# sourceMappingURL=schemas.js.map