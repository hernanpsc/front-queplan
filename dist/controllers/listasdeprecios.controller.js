"use strict";
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
exports.getPrecioByParam = exports.getPrecioById = exports.getPrecios = exports.getPrices = void 0;
const database_1 = require("../conection/database");
const getPrices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const precios = yield database_1.collections.precios.find().toArray();
        return precios;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error al obtener precios');
    }
});
exports.getPrices = getPrices;
const getPrecios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const precios = yield database_1.collections.precios.find({}).toArray();
        return res.status(404).send(precios);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPrecios = getPrecios;
const getPrecioById = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const precio = yield database_1.collections.precios.findOne({ _id: id });
        if (!precio) {
            return res.status(404).send('precio not found');
        }
        res.status(200).send(precio);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPrecioById = getPrecioById;
const getPrecioByParam = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const precio = yield database_1.collections.precios.find({ _id: { $regex: id } }).toArray();
        if (!precio) {
            return precio;
        }
        res.status(200).send(precio);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPrecioByParam = getPrecioByParam;
// export const getPrecioByParam = async (req: Request, res: Response, param: string) => {
//   try {
//       const precios = await getPrecios(req, res);
//       const precio = precios.find(p => p[param] === true);
//       return precio;
//   } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//   }
// };
//# sourceMappingURL=listasdeprecios.controller.js.map