import { Request, Response } from 'express';
import { ParamsDictionary  } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { collections } from '../config/database';
import { Precios } from "../interfaces/precios";
import PreciosModel from '../models/precios'; 


  const  getPrecios = async () => {
  const  precios = await PreciosModel.find({});
    return precios;
  };


const getPrecioById = async (id: string) => {
const precio = await PreciosModel.findOne({ _id: id });
return precio;
  };


const getPrecioByParam = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, id: string)  => {
const precio = await collections.precios?.find({ _id: { $regex: id } }).toArray();
return precio;
  };


export { getPrecios, getPrecioById, getPrecioByParam };

