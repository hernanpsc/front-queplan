import { Request, Response } from 'express';
import multer from "multer";
import * as dotenv from "dotenv";

dotenv.config();

const { ATLAS_URI, PORT } = process.env;

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = Date.now();
    cb(null, `${fileName}.${ext}`);
  },
  destination: function(req, file, cb) {
    cb(null, './uploads');
  }
});

const upload = multer({ storage });

export const fileUpload = async (req: Request, res: Response) => {
  try {
    // Middleware de carga de archivos, aquí se procesa el archivo y lo guarda en `req.file`
    upload.single('myFile')(req, res, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      // Acceso a la información del archivo
      const file = req.file.filename;
      
      res.send({ data: 'ok', url: `http://localhost:` + PORT + `/` + `${file}` });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
