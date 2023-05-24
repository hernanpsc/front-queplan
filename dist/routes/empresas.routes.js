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
exports.empresasRouter = void 0;
const express = __importStar(require("express"));
const empresas_controller_1 = require("../controllers/empresas.controller");
exports.empresasRouter = express.Router();
exports.empresasRouter.use(express.json());
exports.empresasRouter.get('/', empresas_controller_1.getEmpresas);
exports.empresasRouter.get('/:id', empresas_controller_1.getEmpresaById);
exports.empresasRouter.post('/', empresas_controller_1.createEmpresa);
exports.empresasRouter.put('/:id', empresas_controller_1.updateEmpresa);
exports.empresasRouter.delete('/:id', empresas_controller_1.deleteEmpresa);
//# sourceMappingURL=empresas.routes.js.map