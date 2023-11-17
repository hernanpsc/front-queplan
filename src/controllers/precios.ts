import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { ParamsDictionary  } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { getPrecios, getPrecioById, getPrecioByParam } from "../services/precios";


const  getValores = async (req:Request,res: Response) => {
  try {
    const response = await getPrecios();
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_PRECIOS')
}
};


const getValorById = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getPrecioById(id);
    const data = response ? response : "NOT_FOUND"
        res.send(data)
      } catch (e) {
    handleHttp(res,'ERROR_GET_PRECIO')
}
};


const getValorByParam = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, id: string)  => {
  try {
    const response = await getPrecioByParam(req,res,id);
    const data = response ? response : "NOT_FOUND"
        res.send(data)
        } catch (e) {
    handleHttp(res,'ERROR_GET_PRECIO')
}
};


export { getValores,getValorById,getValorByParam }