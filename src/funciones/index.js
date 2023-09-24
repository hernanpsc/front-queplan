import { readdirSync } from 'fs';
import { join, parse } from 'path';

// Obtén la ruta absoluta de la carpeta "funciones"
const funcionesFolder = join(__dirname, 'funciones');

// Lee los nombres de los archivos en la carpeta "funciones"
const archivosFunciones = readdirSync(funcionesFolder);

// Crea un objeto para almacenar todas las funciones exportadas
const todasLasFunciones = {};

// Importa cada archivo de la carpeta "funciones"
archivosFunciones.forEach((archivo) => {
  if (archivo.endsWith('.js')) {
    const nombreFuncion = parse(archivo).name;
    todasLasFunciones[nombreFuncion] = require(join(funcionesFolder, archivo));
  }
});

export default todasLasFunciones;
