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
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const database_1 = require("../conection/database");
const mongodb = __importStar(require("mongodb"));
const getEmployees = async (req, res) => {
    try {
        const employees = await database_1.collections.employees.find({}).toArray();
        res.status(200).send(employees);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getEmployees = getEmployees;
const getEmployeeById = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const employee = await database_1.collections.employees.findOne(query);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.status(200).send(employee);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = async (req, res) => {
    try {
        const employee = req.body;
        const result = await database_1.collections.employees.insertOne(employee);
        if (result.acknowledged) {
            res.status(201).send(`Se creo una nueva employee: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send("Falló crear una nueva employee.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    try {
        const id = req?.params?.id;
        const employee = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.employees.replaceOne(query, req.body);
        if (result.modifiedCount === 0) {
            return res.status(404).send('Employee not found');
        }
        res.status(200).send(await database_1.collections.employees.findOne(query));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.employees.deleteOne(query);
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
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.controller.js.map