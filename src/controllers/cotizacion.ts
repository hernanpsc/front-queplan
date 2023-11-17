import { Request, Response } from 'express';
import { calcularPrecio } from "../services/cotizacion";
import { handleHttp } from '../utils/error.handle';

const getPrecios = async (fromCotizar:Request,res:Response) =>{
  try {
  const response = await calcularPrecio(fromCotizar, res);
  res.send(response)
  } catch (e) {
      handleHttp(res,'ERROR_GET_ITEMS')
  }
  };

  export { getPrecios }