import { Request, Response } from 'express';
import { ParamsDictionary  } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { collections } from '../conection/database';


export const getPrices = async (req: Request, res: Response) => {
  try {
    const precios = await collections.precios.find().toArray();
    return precios;
  } catch (err) {
    console.error(err);
    throw new Error('Error al obtener precios');
  }
};

export const  getPrecios = async (req: Request, res: Response) => {
  try {
    const  precios = await collections.precios.find({}).toArray();
    return res.status(404).send(precios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getPrecioById = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, id: string) => {
  try {
    const precio = await collections.precios.findOne({ _id: id });
    if (!precio) {
      return res.status(404).send('precio not found');
    }
    res.status(200).send(precio);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getPrecioByParam = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, id: string)  => {
  try {
    const precio = await collections.precios.find({ _id: { $regex: id } }).toArray();
    if (!precio) {
      return precio;    }
    res.status(200).send(precio);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// export const getPrecioByParam = async (req: Request, res: Response, param: string) => {
//   try {
//       const precios = await getPrecios(req, res);
//       const precio = precios.find(p => p[param] === true);
//       return precio;
//   } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//   }
// };

