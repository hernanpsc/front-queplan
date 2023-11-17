import { Request, Response } from 'express';
import { collections } from '../config/database';
import * as mongodb from "mongodb";

const  getClinicas = async (req: Request, res: Response) => {
    const  clinicas = await collections.clinicas?.find({}).toArray();
    return clinicas
  };

const  getClinicaById = async ({params}: Request, res: Response) => {
    const { id }=  params;
    const query = { _id: new mongodb.ObjectId(id) };
    const  clinica = await collections.clinicas?.findOne(query);
    return clinica
};

const  createClinica = async (req: Request, res: Response) => {
    const clinica = req.body;
      // Convierte el _id a ObjectId
      if (clinica._id) {
        clinica._id = new mongodb.ObjectId(clinica._id);
      }
    const result = await collections.clinicas?.insertOne (clinica);
    if (result?.acknowledged) {
      res.status(201).send(`Se creo una nueva clinica: ID ${result.insertedId}.`);
  } else {
      res.status(500).send("Falló crear una nueva clinica.");
  }
};
 
const updateClinica = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const { _id, ...updatedClinica } = req.body; // Destructuración para eliminar el campo _id
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.clinicas?.replaceOne(query, updatedClinica); // Usa updatedClinica en lugar de req.body
    if (result?.modifiedCount === 0) {
      return res.status(404).send('clinica not found');
    }
    res.status(200).send(await collections.clinicas?.findOne(query));
};

const  deleteClinica = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.clinicas?.deleteOne(query);
    if (result && result.deletedCount) {
      res.status(202).send(`Clinica eliminada: ID ${id}`);
  } else if (!result) {
      res.status(400).send(`Falló eliminar clinica: ID ${id}`);
  } else if (!result.deletedCount) {
      res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
  }
};



const searchClinicas = async (req: Request, res: Response) => {
    const query = req.query.textSearch as string; // Asegúrate de que query es una cadena

    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const clinicas = await collections.clinicas?.find({
      nombre: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    }).toArray();

    res.status(200).send(clinicas);
};

export { getClinicas, getClinicaById, createClinica, updateClinica, deleteClinica, searchClinicas };

