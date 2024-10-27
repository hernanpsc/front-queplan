import { Router } from "express";
import * as express from "express";
import {  createImage } from '../controllers/htmlconverter';

const router = Router();

router.use(express.json());


// Ruta que genera la imagen
router.get('/', (req, res) => {
    console.log('Accediendo a la ruta /'); // Agregado: Log en la consola
    createImage(req, res);
}); 

export { router };
