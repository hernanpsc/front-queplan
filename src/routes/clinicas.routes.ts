import * as express from "express";
import { getClinicas, getClinicaById, createClinica, updateClinica, deleteClinica, searchClinicas } from '../controllers/clinicas.controller';

export const clinicasRouter = express.Router();
clinicasRouter.use(express.json());
clinicasRouter.get('/',getClinicas);
clinicasRouter.get('/:id', getClinicaById);
clinicasRouter.post('/', createClinica);
clinicasRouter.put('/:id', updateClinica);
clinicasRouter.delete('/:id', deleteClinica);
clinicasRouter.get('/search', searchClinicas);

