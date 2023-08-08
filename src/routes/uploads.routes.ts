import * as express from "express";
import { fileUpload } from '../controllers/uploads.controller';

export const uploadsRouter = express.Router();
uploadsRouter.post('/', fileUpload);
