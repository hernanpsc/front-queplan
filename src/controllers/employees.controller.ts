import { Request, Response } from 'express';
import { collections } from '../conection/database';
import * as mongodb from "mongodb";



export const  getEmployees = async (req: Request, res: Response) => {
  try {
    const  employees = await collections.employees.find({}).toArray();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const  employee = await collections.employees.findOne(query);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const  createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = req.body;
    const result = await collections.employees.insertOne (employee);
    if (result.acknowledged) {
      res.status(201).send(`Se creo una nueva employee: ID ${result.insertedId}.`);
  } else {
      res.status(500).send("Falló crear una nueva employee.");
  }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
 

  

export const  updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const employee = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const  result = await collections.employees.replaceOne(query, req.body);
    if (result.modifiedCount === 0) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).send(await collections.employees.findOne(query));
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const  deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.employees.deleteOne(query);
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




