import { Request, Response } from 'express';
import { collections } from '../conection/database';
import * as mongodb from "mongodb";



export const  getEmpresas = async (req: Request, res: Response) => {
  try {
    const  empresas = await collections.empresas.find({}).toArray();
    res.status(200).send(empresas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  getEmpresaById = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const  empresa = await collections.empresas.findOne(query);
    if (!empresa) {
      return res.status(404).send('empresa not found');
    }
    res.status(200).send(empresa);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



export const createEmpresa = async (req: Request, res: Response) => {
  try {
    const empresa = req.body;
    // Convierte el _id a ObjectId
    if (empresa._id) {
      empresa._id = new mongodb.ObjectId(empresa._id);
    }
    const result = await collections.empresas.insertOne(empresa);
    if (result.acknowledged) {
      res.status(201).send(`Se creó una nueva empresa: ID ${result.insertedId}.`);
    } else {
      res.status(500).send('Falló crear una nueva empresa.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

 

  

export const  updateEmpresa = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const empresa = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const  result = await collections.empresas.replaceOne(query, req.body);
    if (result.modifiedCount === 0) {
      return res.status(404).send('empresa not found');
    }
    res.status(200).send(await collections.empresas.findOne(query));
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const  deleteEmpresa = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.empresas.deleteOne(query);
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




