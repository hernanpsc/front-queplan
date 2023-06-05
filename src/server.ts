import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Request, Response } from "express";

import { connectToDatabase } from "./conection/database";
import { employeesRouter } from "./routes/employees.routes";
import { empresasRouter } from "./routes/empresas.routes";
import { planesRouter } from "./routes/planes.routes";
import { clinicasRouter } from "./routes/clinicas.routes";
import { cotizacionRouter } from './routes/cotizacion.routes';
import { collections } from './conection/database';
import { listasdepreciosRouter } from "./routes/listasdeprecios.routes";
import { postsRouter } from "./routes/posts.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI, PORT } = process.env;


if (!ATLAS_URI) {
  console.error("No ATLAS_URI environment variable has been defined in config.env");
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();

    app.use(cors());

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use("/employees", employeesRouter);
    app.use("/empresas", empresasRouter);
    app.use("/planes", planesRouter);
    app.use("/clinicas", clinicasRouter);
    app.use('/cotizacion', cotizacionRouter);
    app.use('/precios', listasdepreciosRouter);
    app.use('/posts', postsRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:` + PORT + `...`);
    });
  })
  .catch(error => console.error(error));

export const getEmployees2 = async (req: Request, res: Response) => {
  try {
    const employees = await collections.employees.find({}).toArray();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
