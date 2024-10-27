import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
var htmlConvert = require('html-convert');

export const createImage = (req: Request, res: Response) => {
    const convert = htmlConvert();
    console.log('htmlConvert: arrancando');

    // Obtener los datos del cuerpo de la solicitud
    // const { items } = req.body;
    const products = [
        { "name": "Swiss Medical SMG02", "precio": 42331 },
        { "name": "Producto 2", "precio": 32000 },
        { "name": "Producto 3", "precio": 45000 },
        { "name": "Producto 4", "precio": 51000 }
    ];
    // Generar HTML dinámico
     // Generar HTML dinámico
     const htmlContent = `
     <!DOCTYPE html>
     <html lang="es">
     <head>
         <meta charset="UTF-8">
         <title>Lista de Productos</title>
     </head>
     <body>
         <h1>Lista de Productos</h1>
         <ul>
             ${products.map(product => `<li>${product.name}: $${product.precio}</li>`).join('')}
         </ul>
     </body>
     </html>
     `;
    // Ruta temporal para guardar el HTML
    const htmlFilePath = path.join(__dirname, '../controllers', 'temp.html');
    const outputImagePath = path.join(__dirname, '../controllers', 'simple.png');

    // Guardar el HTML en un archivo
    fs.writeFileSync(htmlFilePath, htmlContent);

    // Convertir el archivo HTML a PNG
    fs.createReadStream(htmlFilePath)
        .pipe(convert())
        .pipe(fs.createWriteStream(outputImagePath))
        .on('finish', () => {
            // Enviar la imagen generada al cliente
            res.sendFile(outputImagePath, (err) => {
                if (err) {
                    res.status(500).send({ error: 'Error al enviar la imagen', details: err });
                }
                // Limpiar el archivo temporal después de enviarlo
                fs.unlink(htmlFilePath, (err) => {
                    if (err) console.error('Error al eliminar el archivo HTML temporal:', err);
                });
            });
        })
        .on('error', (err: any) => {
            // Manejar errores
            res.status(500).send({ error: 'Error al convertir HTML a imagen', details: err });
        });
};
