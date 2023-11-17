
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes"
import dbConnect from "./config/mongo";


import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;

const whitelist = [
    'http://localhost:4200',
    'http://localhost:4300',
    'http://localhost:4400',
    'http://localhost:4500',
    'https://sakai-ng-front.vercel.app',
    'https://soloclinic.vercel.app',
    'https://front-prepagas.vercel.app'
  ];
  const portRegex = /^http:\/\/localhost(?::\d+)?$/;
  
  const filteredWhitelist = whitelist.filter((origin) => portRegex.test(origin));
  
 

const app = express()
app.use(cors({
      origin: '*',

    // origin: filteredWhitelist,
    allowedHeaders: ['Authorization', 'Content-Type']

  }));
app.use(express.json())
app.use(router);
app.use(bodyParser.json({ limit: '50mb' })); // Puedes ajustar el límite según tus necesidades
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

dbConnect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:` + PORT + `...`);

    });
  })
  .catch(error => console.error(error));
