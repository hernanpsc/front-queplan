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
exports.deleteEmpresa = exports.updateEmpresa = exports.createEmpresa = exports.getEmpresaById = exports.getEmpresas = void 0;
const database_1 = require("../conection/database");
const mongodb = __importStar(require("mongodb"));
const getEmpresas = async (req, res) => {
    try {
        const empresas = await database_1.collections.empresas.find({}).toArray();
        res.status(200).send(empresas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getEmpresas = getEmpresas;
const getEmpresaById = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const empresa = await database_1.collections.empresas.findOne(query);
        if (!empresa) {
            return res.status(404).send('empresa not found');
        }
        res.status(200).send(empresa);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getEmpresaById = getEmpresaById;
const createEmpresa = async (req, res) => {
    try {
        const empresa = req.body;
        console.log(empresa._id);
        // Convierte el _id a ObjectId
        if (empresa._id) {
            empresa._id = new mongodb.ObjectId(empresa._id);
        }
        console.log(empresa._id);
        const result = await database_1.collections.empresas.insertOne(empresa);
        if (result.acknowledged) {
            res.status(201).send(`Se creó una nueva empresa: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send('Falló crear una nueva empresa.');
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};
exports.createEmpresa = createEmpresa;
const updateEmpresa = async (req, res) => {
    try {
        const id = req?.params?.id;
        const empresa = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.empresas.replaceOne(query, req.body);
        if (result.modifiedCount === 0) {
            return res.status(404).send('empresa not found');
        }
        res.status(200).send(await database_1.collections.empresas.findOne(query));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateEmpresa = updateEmpresa;
const deleteEmpresa = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.empresas.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Clinica eliminada: ID ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Falló eliminar clinica: ID ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteEmpresa = deleteEmpresa;
//# sourceMappingURL=empresas.controller.js.map