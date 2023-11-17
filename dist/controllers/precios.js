"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValorByParam = exports.getValorById = exports.getValores = void 0;
const error_handle_1 = require("../utils/error.handle");
const precios_1 = require("../services/precios");
const getValores = async (req, res) => {
    try {
        const response = await (0, precios_1.getPrecios)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PRECIOS');
    }
};
exports.getValores = getValores;
const getValorById = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, precios_1.getPrecioById)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PRECIO');
    }
};
exports.getValorById = getValorById;
const getValorByParam = async (req, res, id) => {
    try {
        const response = await (0, precios_1.getPrecioByParam)(req, res, id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PRECIO');
    }
};
exports.getValorByParam = getValorByParam;
//# sourceMappingURL=precios.js.map