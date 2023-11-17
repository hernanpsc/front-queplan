"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clinicasSchema = new mongoose_1.Schema();
const ClinicasModel = (0, mongoose_1.model)('clinicas', clinicasSchema);
exports.default = ClinicasModel;
//# sourceMappingURL=clinicas.js.map