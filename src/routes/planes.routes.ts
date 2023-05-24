import * as express from "express";
import { getPlanes, getPlanById, createPlan, updatePlan, deletePlan } from '../controllers/planes.controller';

export const planesRouter = express.Router();
planesRouter.use(express.json());
planesRouter.get('/',getPlanes);
planesRouter.get('/:id', getPlanById);
planesRouter.post('/', createPlan);
planesRouter.put('/:id', updatePlan);
planesRouter.delete('/:id', deletePlan);

