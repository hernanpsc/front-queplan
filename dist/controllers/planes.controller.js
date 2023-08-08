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
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getPlanes = void 0;
const database_1 = require("../conection/database");
const mongodb = __importStar(require("mongodb"));
const getPlanes = async (req, res) => {
    try {
        const planes = await database_1.collections.todoslosplanes.find({}).toArray();
        res.status(200).send(planes);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPlanes = getPlanes;
const getPlanById = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const plan = await database_1.collections.todoslosplanes.findOne(query);
        if (!plan) {
            return res.status(404).send('plan not found');
        }
        res.status(200).send(plan);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPlanById = getPlanById;
const createPlan = async (req, res) => {
    try {
        const plan = req.body;
        const result = await database_1.collections.todoslosplanes.insertOne(plan);
        if (result.acknowledged) {
            res.status(201).send(`Se creo una nueva plan: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send("Falló crear una nueva plan.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};
exports.createPlan = createPlan;
const updatePlan = async (req, res) => {
    try {
        const id = req?.params?.id;
        const plan = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.todoslosplanes.replaceOne(query, plan);
        if (result.modifiedCount === 0) {
            return res.status(404).send('plan not found');
        }
        res.status(200).send(await database_1.collections.todoslosplanes.findOne(query));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updatePlan = updatePlan;
const deletePlan = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await database_1.collections.todoslosplanes.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Plan eliminado: ID ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Falló eliminar plan: ID ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Fallo eliminar plan: ID ${id}`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deletePlan = deletePlan;
//# sourceMappingURL=planes.controller.js.map