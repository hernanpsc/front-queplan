import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
var htmlConvert = require('html-convert');

export const createImage = (req: Request, res: Response) => {
    const convert = htmlConvert();
    console.log('htmlConvert: arrancando');

    // Obtener los datos del cuerpo de la solicitud
    const { items } = req.body;

    // Generar HTML dinámico
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Lista de Items</title>
    </head>
    <body>
        <h1>Lista de Items</h1>
        <ul>
            ${items.map((item: any) => `<li>${item}</li>`).join('')}
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
