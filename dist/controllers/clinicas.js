"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const clinicas_1 = require("../services/clinicas");
const getItems = async (req, res) => {
    try {
        const response = await (0, clinicas_1.getClinicas)(req, res);
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICAS');
    }
};
exports.getItems = getItems;
const getItemById = async (req, res) => {
    try {
        const response = await (0, clinicas_1.getClinicaById)(req, res);
        const data = response ? response : "NOT_FOUND";
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICA');
    }
};
exports.getItemById = getItemById;
const createItem = async (req, res) => {
    try {
        const responseItem = await (0, clinicas_1.createClinica)(req, res);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_CLINICA');
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const response = await (0, clinicas_1.updateClinica)(req, res);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_CLINICA');
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const response = await (0, clinicas_1.deleteClinica)(req, res);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_CLINICA');
    }
    ;
};
exports.deleteItem = deleteItem;
const searchItem = async (req, res) => {
    try {
        const response = await (0, clinicas_1.searchClinicas)(req, res);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH_CLINICA');
    }
    ;
};
exports.searchItem = searchItem;
//# sourceMappingURL=clinicas.js.map