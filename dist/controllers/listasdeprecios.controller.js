"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrecioByParam = exports.getPrecioById = exports.getPrecios = exports.getPrices = void 0;
const database_1 = require("../conection/database");
const getPrices = async (req, res) => {
    try {
        const precios = await database_1.collections.precios.find().toArray();
        return precios;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error al obtener precios');
    }
};
exports.getPrices = getPrices;
const getPrecios = async (req, res) => {
    try {
        const precios = await database_1.collections.precios.find({}).toArray();
        return res.status(404).send(precios);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPrecios = getPrecios;
const getPrecioById = async (req, res, id) => {
    try {
        const precio = await database_1.collections.precios.findOne({ _id: id });
        if (!precio) {
            return res.status(404).send('precio not found');
        }
        res.status(200).send(precio);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPrecioById = getPrecioById;
const getPrecioByParam = async (req, res, id) => {
    try {
        const precio = await database_1.collections.precios.find({ _id: { $regex: id } }).toArray();
        if (!precio) {
            return precio;
        }
        res.status(200).send(precio);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
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