"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
// Obtén la ruta absoluta de la carpeta "funciones"
const funcionesFolder = (0, path_1.join)(__dirname, 'funciones');
// Lee los nombres de los archivos en la carpeta "funciones"
const archivosFunciones = (0, fs_1.readdirSync)(funcionesFolder);
// Crea un objeto para almacenar todas las funciones exportadas
const todasLasFunciones = {};
// Importa cada archivo de la carpeta "funciones"
archivosFunciones.forEach((archivo) => {
    if (archivo.endsWith('.js')) {
        const nombreFuncion = (0, path_1.parse)(archivo).name;
        todasLasFunciones[nombreFuncion] = require((0, path_1.join)(funcionesFolder, archivo));
    }
});
exports.default = todasLasFunciones;
//# sourceMappingURL=index.js.map