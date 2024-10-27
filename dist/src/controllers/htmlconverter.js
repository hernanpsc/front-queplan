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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.getItems = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const error_handle_1 = require("../utils/error.handle");
const html_convert_1 = __importDefault(require("html-convert"));
const clinicas_1 = require("../services/clinicas");
const getItems = async (req, res) => {
    // console.log('hola getItems clinicas')
    try {
        const response = await (0, clinicas_1.getProducts)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICAS');
    }
};
exports.getItems = getItems;
// Configurar la función para crear la imagen
const createImage = (req, res) => {
    const convert = (0, html_convert_1.default)();
    console.log('htmlConvert: arrancando');
    // Ruta del archivo HTML
    const htmlFilePath = path.join(__dirname, '../controllers', 'simple.html');
    const outputImagePath = path.join(__dirname, '../controllers', 'simple.png');
    // Convertir el archivo HTML a PNG
    fs.createReadStream(htmlFilePath)
        .pipe(convert())
        .pipe(fs.createWriteStream(outputImagePath))
        .on('finish', () => {
        // Enviar la imagen generada al cliente
        res.sendFile(outputImagePath);
    })
        .on('error', (err) => {
        // Manejar errores
        res.status(500).send({ error: 'Error al convertir HTML a imagen', details: err });
    });
};
exports.createImage = createImage;
//# sourceMappingURL=htmlconverter.js.map