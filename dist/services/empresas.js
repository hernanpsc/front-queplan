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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpresa = exports.updateEmpresa = exports.createEmpresa = exports.getEmpresaById = exports.getEmpresas = void 0;
const empresas_1 = __importDefault(require("../models/empresas"));
const mongodb = __importStar(require("mongodb"));
const getEmpresas = async () => {
    const responseGet = await empresas_1.default.find({});
    return responseGet;
};
exports.getEmpresas = getEmpresas;
const getEmpresaById = async (id) => {
    const responseGetOne = await empresas_1.default.findOne({ _id: id });
    return responseGetOne;
};
exports.getEmpresaById = getEmpresaById;
const createEmpresa = async (item) => {
    const responseCreate = await empresas_1.default.create(item);
    return responseCreate;
};
exports.createEmpresa = createEmpresa;
const updateEmpresa = async (req, res) => {
    const id = req?.params?.id;
    const empresa = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const responseUpdate = await empresas_1.default.findOneAndUpdate(query, empresa, { new: true });
    return responseUpdate;
};
exports.updateEmpresa = updateEmpresa;
const deleteEmpresa = async (id) => {
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await empresas_1.default.deleteOne(query);
    return result;
};
exports.deleteEmpresa = deleteEmpresa;
//# sourceMappingURL=empresas.js.map