"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicasRouter = void 0;
const express = __importStar(require("express"));
const clinicas_controller_1 = require("../controllers/clinicas.controller");
exports.clinicasRouter = express.Router();
exports.clinicasRouter.use(express.json());
exports.clinicasRouter.get('/', clinicas_controller_1.getClinicas);
exports.clinicasRouter.get('/:id', clinicas_controller_1.getClinicaById);
exports.clinicasRouter.post('/', clinicas_controller_1.createClinica);
exports.clinicasRouter.put('/:id', clinicas_controller_1.updateClinica);
exports.clinicasRouter.delete('/:id', clinicas_controller_1.deleteClinica);
exports.clinicasRouter.get('/search', clinicas_controller_1.searchClinicas);
//# sourceMappingURL=clinicas.routes.js.map