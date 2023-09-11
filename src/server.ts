import * as dotenv from "dotenv";
import path from 'path';
import cors from "cors";
import express from "express";
import multer from "multer";
import bodyParser from 'body-parser';
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
import { uploadsRouter } from "./routes/uploads.routes";


// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI, PORT } = process.env;

const whitelist = [
  'http://localhost:4200',
  'http://localhost:4300',
  'http://localhost:4400',
  'http://localhost:4500',
  'https://sakai-ng-front.vercel.app',
  'https://soloclinic.vercel.app',
  'https://brokersalud.vercel.app',
  'https://front-prepagas.vercel.app'
];
const portRegex = /^http:\/\/localhost(?::\d+)?$/;

const filteredWhitelist = whitelist.filter((origin) => portRegex.test(origin));

if (!ATLAS_URI) {
  console.error("No ATLAS_URI environment variable has been defined in config.env");
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' })); // Puedes ajustar el límite según tus necesidades
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cors({
      origin: whitelist,
      allowedHeaders: ['Authorization', 'Content-Type']
    }));

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.get('/clinicas/search', (req, res) => {
      // Obtén los parámetros de la consulta
      const { q, offset, limit } = req.query;
    
      // Simula una respuesta similar a la de MercadoLibre
      const response = {
        site_id: 'MLA',
        query: q,
        results: [
          // Aquí deberías poner los resultados reales
          { id: '1', title: 'Resultado 1' },
          { id: '2', title: 'Resultado 2' },
          // ...
        ],
        paging: {
          total: 100, // Total de resultados disponibles
          offset: parseInt(offset as string) || 0,
          limit: parseInt(limit as string) || 20,
        },
      };
    
      res.json(response);
    });
    app.use(express.static('./uploads'));
    app.use("/employees", employeesRouter);
    app.use("/empresas", empresasRouter);
    app.use("/planes", planesRouter);
    app.use("/clinicas", clinicasRouter);
    app.use('/cotizacion', cotizacionRouter);
    app.use('/precios', listasdepreciosRouter);
    app.use('/posts', postsRouter);
    app.use('/uploads', uploadsRouter);

    // ...
    
    
    
    
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
