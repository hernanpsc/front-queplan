import { Request, Response } from 'express';
import { collections } from '../conection/database';
import * as mongodb from "mongodb";



export const  getPlanes = async (req: Request, res: Response) => {
  try {
    const  planes = await collections.todoslosplanes.find({}).toArray();
    res.status(200).send(planes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  getPlanById = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const  plan = await collections.todoslosplanes.findOne(query);
    if (!plan) {
      return res.status(404).send('plan not found');
    }
    res.status(200).send(plan);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  createPlan = async (req: Request, res: Response) => {
  try {
    const plan = req.body;
    const result = await collections.todoslosplanes.insertOne (plan);
    if (result.acknowledged) {
      res.status(201).send(`Se creo una nueva plan: ID ${result.insertedId}.`);
  } else {
      res.status(500).send("Falló crear una nueva plan.");
  }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
 

  

export const  updatePlan = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const plan = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const  result = await collections.todoslosplanes.replaceOne(query, plan);
    if (result.modifiedCount === 0) {
      return res.status(404).send('plan not found');
    }
    res.status(200).send(await collections.todoslosplanes.findOne(query));
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const  deletePlan = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.todoslosplanes.deleteOne(query);
    if (result && result.deletedCount) {
      res.status(202).send(`Plan eliminado: ID ${id}`);
  } else if (!result) {
      res.status(400).send(`Falló eliminar plan: ID ${id}`);
  } else if (!result.deletedCount) {
      res.status(404).send(`Fallo eliminar plan: ID ${id}`);
  }
  } catch (error) {
    res.status(500).send(error.message);
  }
};




