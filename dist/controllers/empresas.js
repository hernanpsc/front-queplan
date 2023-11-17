"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const empresas_1 = require("../services/empresas");
const getItems = async (req, res) => {
    try {
        const response = await (0, empresas_1.getEmpresas)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.getItems = getItems;
const getItemById = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, empresas_1.getEmpresaById)(id);
        if (!response) {
            res.status(404).send('empresa not found');
        }
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.getItemById = getItemById;
const createItem = async ({ body }, res) => {
    try {
        const result = await (0, empresas_1.createEmpresa)(body);
        if (result) {
            res.status(201).send(`Se creó una nueva empresa: ID ${result._id}.`);
        }
        else {
            res.status(500).send('Falló al crear una nueva empresa.');
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_EMPRESA');
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const result = await (0, empresas_1.updateEmpresa)(req, res);
        if (result) {
            res.status(404).send('empresa not found');
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_EMPRESA');
    }
};
exports.updateItem = updateItem;
const deleteItem = async ({ params }, res) => {
    try {
        const { id } = params;
        const result = await (0, empresas_1.deleteEmpresa)(id);
        if (result && result.deletedCount) {
            return res.status(202).send(`Clinica eliminada: ID ${id}`);
        }
        else if (!result) {
            return res.status(400).send(`Falló eliminar clinica: ID ${id}`);
        }
        else if (!result.deletedCount) {
            return res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_EMPRESA');
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=empresas.js.map