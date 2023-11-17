"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../models"));
const getModelByName = async (modelName) => {
    const modeloEncontrado = (await models_1.default).find((modelInfo) => modelInfo.nombre === modelName);
    if (!modeloEncontrado) {
        throw new Error(`El modelo ${modelName} no está registrado en Mongoose.`);
    }
    return modeloEncontrado.modelo;
};
const createProduct = async (item, schema) => {
    const Model = (0, mongoose_1.model)(schema);
    const responseCreate = await Model.create(item);
    return responseCreate;
};
exports.createProduct = createProduct;
const getProducts = async (schema) => {
    const Model = await getModelByName(schema);
    const responseGet = await Model.find({});
    return responseGet;
};
exports.getProducts = getProducts;
const getProduct = async (id, schema) => {
    const Model = await getModelByName(schema);
    const responseGetOne = await Model.findOne({ _id: id });
    return responseGetOne;
};
exports.getProduct = getProduct;
const updateProduct = async (id, data, schema) => {
    const Model = await getModelByName(schema);
    const responseUpdate = await Model.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id, schema) => {
    const Model = await getModelByName(schema);
    const responsedelete = await Model.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteProduct = deleteProduct;
const searchProducts = async (query, concept, schema) => {
    const Model = await getModelByName(schema);
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await Model.find({
        concept: { $regex: query, $options: 'i' },
    });
    return responseSearch;
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=items.js.map