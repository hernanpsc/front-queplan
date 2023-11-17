import { Request, Response } from 'express';
import { Planes } from "../interfaces/planes"

import { Empresa } from "../interfaces/empresas"

import * as mongodb from "mongodb";

import PlanesModel from '../models/planes'; 

const getPlanes = async () => {
  const planes = await PlanesModel.find({});
  return planes;
};

const  getPlanById = async (id: string) => {
    const  plan = await PlanesModel.findOne({_id:id});
    return plan
};

const createPlan = async (item:Planes) => {
    if (item._id) {
      item._id = new mongodb.ObjectId(item._id);
    }
    const responseCreate = await PlanesModel.create(item);
    return responseCreate
};
 
const  updatePlan = async (id: string, data: Empresa) => {
    const responseUpdate = await PlanesModel.findOneAndUpdate({_id:id},data,{new: true});
    return responseUpdate
};

const  deletePlan = async (id: string) => {
    const result = await PlanesModel.deleteOne({_id:id});
    return result
};

export { getPlanes, getPlanById, createPlan, updatePlan, deletePlan }

