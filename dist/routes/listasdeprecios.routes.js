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
exports.listasdepreciosRouter = void 0;
const express = __importStar(require("express"));
const listasdeprecios_controller_1 = require("../controllers/listasdeprecios.controller");
exports.listasdepreciosRouter = express.Router();
exports.listasdepreciosRouter.use(express.json());
exports.listasdepreciosRouter.get('/', listasdeprecios_controller_1.getPrecios);
exports.listasdepreciosRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    return (0, listasdeprecios_controller_1.getPrecioById)(req, res, id);
});
exports.listasdepreciosRouter.get('/prices', listasdeprecios_controller_1.getPrices);
exports.listasdepreciosRouter.get('/like/:id', (req, res) => {
    const { id } = req.params;
    return (0, listasdeprecios_controller_1.getPrecioByParam)(req, res, id);
});
// listasdepreciosRouter.post('/', createPrecio);
// listasdepreciosRouter.put('/:id', updatePrecio);
// listasdepreciosRouter.delete('/:id', deletePrecio);
//# sourceMappingURL=listasdeprecios.routes.js.map