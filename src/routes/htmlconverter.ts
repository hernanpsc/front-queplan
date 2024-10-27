import { Router } from "express";
import * as express from "express";
import {  createImage } from '../controllers/htmlconverter';

const router = Router();

router.use(express.json());


router.get('/', (req, res) => { createImage(req, res); }); // Nueva ruta


export { router };
