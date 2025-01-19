import { Router } from "express";
import * as express from "express";
import { updateClinicas,getItems  } from '../controllers/planes';

const router = Router();
// Usando la opción más concisa

router.get('/', (req, res) => { updateClinicas(req, res); });

export { router }