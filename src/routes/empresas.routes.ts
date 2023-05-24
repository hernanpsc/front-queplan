import * as express from "express";
import { getEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa } from '../controllers/empresas.controller';

export const empresasRouter = express.Router();
empresasRouter.use(express.json());
empresasRouter.get('/',getEmpresas);
empresasRouter.get('/:id', getEmpresaById);
empresasRouter.post('/', createEmpresa);
empresasRouter.put('/:id', updateEmpresa);
empresasRouter.delete('/:id', deleteEmpresa);

