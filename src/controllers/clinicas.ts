import { Request, Response } from 'express';
import { collections } from '../config/database';
import { handleHttp } from "../utils/error.handle";

import * as mongodb from "mongodb";
import {  getClinicas, getClinicaById, createClinica, updateClinica, deleteClinica, searchClinicas } from "../services/clinicas";




const  getItems = async (req: Request, res: Response) => {
  try {
    const  response = await getClinicas(req,res);
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_CLINICAS')
  }
};

const  getItemById = async (req: Request, res: Response) => {
  try {
    const  response = await getClinicaById(req,res);
    const data = response ? response : "NOT_FOUND"
    res.status(200).send(data);
  }  catch (e) {
    handleHttp(res,'ERROR_GET_CLINICA')
  }
};

const  createItem = async (req: Request, res: Response) => {
  try {
    const responseItem = await createClinica(req,res);
        res.send(responseItem);

  } catch (e) {
    handleHttp(res,'ERROR_CREATE_CLINICA')
  }
};
 
const updateItem = async (req: Request, res: Response) => {
  try {
    const response = await updateClinica( req,res );
    res.send( response )
  } catch (e) {
    handleHttp(res,'ERROR_UPDATE_CLINICA')
  }
};

const  deleteItem = async (req: Request, res: Response) => {
  try {
    const response = await deleteClinica(req,res);
    res.send(response)
  } catch (e) {
    handleHttp(res,'ERROR_DELETE_CLINICA')
};
}


const searchItem = async (req: Request, res: Response) => {
  try {
    const response = await searchClinicas(req,res);
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_SEARCH_CLINICA')
};
};

export { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  }