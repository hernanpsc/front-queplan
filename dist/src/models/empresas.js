"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const empresaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    sigla: {
        type: String,
        required: true
    },
    lineas: {
        type: [String]
    },
    factores: {
        coeficiente: Number
    }
});
const EmpresaModel = (0, mongoose_1.model)('empresas', empresaSchema);
exports.default = EmpresaModel;
//# sourceMappingURL=empresas.js.map