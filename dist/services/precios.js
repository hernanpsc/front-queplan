"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrecioByParam = exports.getPrecioById = exports.getPrecios = void 0;
const database_1 = require("../config/database");
const precios_1 = __importDefault(require("../models/precios"));
const getPrecios = async () => {
    const precios = await precios_1.default.find({});
    return precios;
};
exports.getPrecios = getPrecios;
const getPrecioById = async (id) => {
    const precio = await precios_1.default.findOne({ _id: id });
    return precio;
};
exports.getPrecioById = getPrecioById;
const getPrecioByParam = async (req, res, id) => {
    const precio = await database_1.collections.precios?.find({ _id: { $regex: id } }).toArray();
    return precio;
};
exports.getPrecioByParam = getPrecioByParam;
//# sourceMappingURL=precios.js.map