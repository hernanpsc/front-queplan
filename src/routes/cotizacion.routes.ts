import * as express from "express";
import { calcularPrecio} from '../controllers/cotizacion.controller';

export const cotizacionRouter = express.Router();
cotizacionRouter.use(express.json());
cotizacionRouter.post('/', calcularPrecio);




