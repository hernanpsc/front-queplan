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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getPlanes = void 0;
const database_1 = require("../conection/database");
const mongodb = __importStar(require("mongodb"));
const getPlanes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planes = yield database_1.collections.todoslosplanes.find({}).toArray();
        res.status(200).send(planes);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPlanes = getPlanes;
const getPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const plan = yield database_1.collections.todoslosplanes.findOne(query);
        if (!plan) {
            return res.status(404).send('plan not found');
        }
        res.status(200).send(plan);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPlanById = getPlanById;
const createPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = req.body;
        const result = yield database_1.collections.todoslosplanes.insertOne(plan);
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
});
exports.createPlan = createPlan;
const updatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        const plan = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = yield database_1.collections.todoslosplanes.replaceOne(query, plan);
        if (result.modifiedCount === 0) {
            return res.status(404).send('plan not found');
        }
        res.status(200).send(yield database_1.collections.todoslosplanes.findOne(query));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updatePlan = updatePlan;
const deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = yield database_1.collections.todoslosplanes.deleteOne(query);
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
});
exports.deletePlan = deletePlan;
//# sourceMappingURL=planes.controller.js.map