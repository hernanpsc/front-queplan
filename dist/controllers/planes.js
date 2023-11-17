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
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const mongodb = __importStar(require("mongodb"));
const error_handle_1 = require("../utils/error.handle");
const planes_1 = require("../services/planes");
const getItems = async (req, res) => {
    try {
        const response = await (0, planes_1.getPlanes)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.getItems = getItems;
const getItemById = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, planes_1.getPlanById)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEM');
    }
};
exports.getItemById = getItemById;
const createItem = async ({ body }, res) => {
    try {
        const plan = body;
        // Convierte el _id a ObjectId
        if (plan._id) {
            plan._id = new mongodb.ObjectId(plan._id);
        }
        const result = await (0, planes_1.createPlan)(plan);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_ITEMS');
    }
    ;
};
exports.createItem = createItem;
const updateItem = async ({ params, body }, res) => {
    try {
        const { id } = params;
        const result = await (0, planes_1.updatePlan)(id, body);
        if (!result) {
            res.status(404).send('plan not found');
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_ITEMS');
    }
};
exports.updateItem = updateItem;
const deleteItem = async ({ params }, res) => {
    try {
        const { id } = params;
        const result = await (0, planes_1.deletePlan)(id);
        if (result && result.deletedCount) {
            res.status(202).send(`Plan eliminado: ID ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Falló eliminar plan: ID ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Fallo eliminar plan: ID ${id}`);
        }
        ;
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_ITEMS');
    }
    ;
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=planes.js.map