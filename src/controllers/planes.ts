import { Request, Response } from 'express';
import { collections } from '../config/database';
import * as mongodb from "mongodb";
import { handleHttp } from "../utils/error.handle";
import { Planes } from '../interfaces/planes'; // Reemplaza con la importación adecuada de tu tipo de documento
import { getPlanes, getPlanById, createPlan, updatePlan, deletePlan } from "../services/planes";


const getItems = async (req:Request,res:Response) =>{
  try {
  const response = await getPlanes();
  res.send(response)
  } catch (e) {
      handleHttp(res,'ERROR_GET_ITEMS')
  }
  };


const  getItemById = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const  response = await getPlanById(id);
    const data = response ? response : "NOT_FOUND"
        res.send(data)
  } catch (e) {
    handleHttp(res,'ERROR_GET_ITEM')
}
};

const createItem = async ({body}: Request, res: Response) => {
  try {
    const plan = body;
    // Convierte el _id a ObjectId
    if (plan._id) {
      plan._id = new mongodb.ObjectId(plan._id);
    }
    const result = await createPlan(plan);
  } catch (e) {
    handleHttp(res,'ERROR_CREATE_ITEMS')
};
};

const  updateItem = async ({ params, body }:Request,res:Response) => {
  try {
    const { id }  = params;
    const  result = await updatePlan(id, body);
    if (!result) {
      res.status(404).send('plan not found');
    }
  } catch (e) {
    handleHttp(res,'ERROR_UPDATE_ITEMS')
  }
};

const  deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const result = await deletePlan(id);
    if (result && result.deletedCount) {
      res.status(202).send(`Plan eliminado: ID ${id}`);
  } else if (!result) {
      res.status(400).send(`Falló eliminar plan: ID ${id}`);
  } else if (!result.deletedCount) {
      res.status(404).send(`Fallo eliminar plan: ID ${id}`);
  };
  } catch (e) {
    handleHttp(res,'ERROR_DELETE_ITEMS')
};
};

export {getItems, getItemById, createItem, updateItem, deleteItem }


