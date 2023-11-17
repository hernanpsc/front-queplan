import { Request, Response } from 'express';
import { Empresa } from "../interfaces/empresas"

import EmpresaModel from "../models/empresas";
import * as mongodb from "mongodb";



const  getEmpresas = async () => {
const responseGet = await EmpresaModel.find({});
return responseGet;
  };

const  getEmpresaById = async (id: string) => {
    const responseGetOne = await EmpresaModel.findOne({_id:id});
    return responseGetOne
  };



  const createEmpresa = async (item:Empresa) => {
      const responseCreate = await EmpresaModel.create(item);
      return responseCreate
    };
 

const  updateEmpresa = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const empresa = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const responseUpdate = await EmpresaModel.findOneAndUpdate(query,empresa,{new: true})
    return responseUpdate
   };


const  deleteEmpresa = async (id: string) => {
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await EmpresaModel.deleteOne(query);
    return result
  };

  export { getEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa };


