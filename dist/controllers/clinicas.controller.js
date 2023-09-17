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
exports.searchClinicas = exports.deleteClinica = exports.updateClinica = exports.createClinica = exports.getClinicaById = exports.getClinicas = void 0;
const database_1 = require("../conection/database");
const mongodb = __importStar(require("mongodb"));
const getClinicas = async (req, res) => {
    try {
        const clinicas = await database_1.collections.clinicas.find({}).toArray();
        res.status(200).send(clinicas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getClinicas = getClinicas;
const getClinicaById = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const clinica = await database_1.collections.clinicas.findOne(query);
        if (!clinica) {
            return res.status(404).send('clinica not found');
        }
        res.status(200).send(clinica);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getClinicaById = getClinicaById;
const createClinica = async (req, res) => {
    try {
        const clinica = req.body;
        // Convierte el _id a ObjectId
        if (clinica._id) {
            clinica._id = new mongodb.ObjectId(clinica._id);
        }
        const result = await database_1.collections.clinicas.insertOne(clinica);
        if (result.acknowledged) {
            res.status(201).send(`Se creo una nueva clinica: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send("Falló crear una nueva clinica.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};
exports.createClinica = createClinica;
const updateClinica = async (req, res) => {
    try {
        const id = req?.params?.id;
        const { _id, ...updatedClinica } = req.body; // Destructuración para eliminar el campo _id
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.clinicas.replaceOne(query, updatedClinica); // Usa updatedClinica en lugar de req.body
        if (result.modifiedCount === 0) {
            return res.status(404).send('clinica not found');
        }
        res.status(200).send(await database_1.collections.clinicas.findOne(query));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateClinica = updateClinica;
const deleteClinica = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.clinicas.deleteOne(query);
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
exports.deleteClinica = deleteClinica;
const searchClinicas = async (req, res) => {
    try {
        const query = req.query.textSearch; // Asegúrate de que query es una cadena
        // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
        const clinicas = await database_1.collections.clinicas.find({
            nombre: { $regex: query, $options: 'i' },
        }).toArray();
        res.status(200).send(clinicas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.searchClinicas = searchClinicas;
//# sourceMappingURL=clinicas.controller.js.map