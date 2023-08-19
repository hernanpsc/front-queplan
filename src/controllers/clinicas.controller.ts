import { Request, Response } from 'express';
import { collections } from '../conection/database';
import * as mongodb from "mongodb";



export const  getClinicas = async (req: Request, res: Response) => {
  try {
    const  clinicas = await collections.clinicas.find({}).toArray();
    res.status(200).send(clinicas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  getClinicaById = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const  clinica = await collections.clinicas.findOne(query);
    if (!clinica) {
      return res.status(404).send('clinica not found');
    }
    res.status(200).send(clinica);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  createClinica = async (req: Request, res: Response) => {
  try {
    const clinica = req.body;
      // Convierte el _id a ObjectId
      if (clinica._id) {
        clinica._id = new mongodb.ObjectId(clinica._id);
      }
    const result = await collections.clinicas.insertOne (clinica);
    if (result.acknowledged) {
      res.status(201).send(`Se creo una nueva clinica: ID ${result.insertedId}.`);
  } else {
      res.status(500).send("Falló crear una nueva clinica.");
  }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
 

  

export const updateClinica = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const { _id, ...updatedClinica } = req.body; // Destructuración para eliminar el campo _id
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.clinicas.replaceOne(query, updatedClinica); // Usa updatedClinica en lugar de req.body
    if (result.modifiedCount === 0) {
      return res.status(404).send('clinica not found');
    }
    res.status(200).send(await collections.clinicas.findOne(query));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  deleteClinica = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.clinicas.deleteOne(query);
    if (result && result.deletedCount) {
      res.status(202).send(`Clinica eliminada: ID ${id}`);
  } else if (!result) {
      res.status(400).send(`Falló eliminar clinica: ID ${id}`);
  } else if (!result.deletedCount) {
      res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
  }
  } catch (error) {
    res.status(500).send(error.message);
  }
};




