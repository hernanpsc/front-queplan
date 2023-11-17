import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { getEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa } from "../services/empresas";

const  getItems = async (req:Request,res:Response) => {
  try {
    const  response = await getEmpresas();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_ITEMS')
}
};

const  getItemById = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getEmpresaById(id);
    if (!response) {
      res.status(404).send('empresa not found');
    }
      res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_ITEMS')
  }
};

const createItem = async ({body}: Request, res: Response) => {
  try {
    const result = await createEmpresa(body);
    if (result) {
      res.status(201).send(`Se creó una nueva empresa: ID ${result._id}.`);
    } else {
      res.status(500).send('Falló al crear una nueva empresa.');
    }
  } catch (e) {
    handleHttp(res,'ERROR_CREATE_EMPRESA')
  }
};

const  updateItem = async (req: Request, res: Response) => {
  try {
    const  result = await updateEmpresa(req,res);
    if (result) {
      res.status(404).send('empresa not found');
    }
  } catch (e) {
    handleHttp(res,'ERROR_UPDATE_EMPRESA')
  }
};

const  deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const result = await deleteEmpresa(id);
    if (result && result.deletedCount) {
      return res.status(202).send(`Clinica eliminada: ID ${id}`);
  } else if (!result) {
    return res.status(400).send(`Falló eliminar clinica: ID ${id}`);
  } else if (!result.deletedCount) {
    return res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
  }
  } catch (e) {
    handleHttp(res,'ERROR_DELETE_EMPRESA')
  }
};

export { getItems, getItemById, createItem, updateItem, deleteItem}


