import { model } from 'mongoose';
import models from '../models'; 


const getModelByName = async (modelName: string) => {

    const modeloEncontrado = (await models).find((modelInfo: { nombre: string; }) => modelInfo.nombre === modelName);
    if (!modeloEncontrado) {
      throw new Error(`El modelo ${modelName} no está registrado en Mongoose.`);
    }
    return modeloEncontrado.modelo;
  };
  
const createProduct = async (item: any,schema: string) => {
    const Model = model(schema); 
    const responseCreate = await Model.create(item)
    return responseCreate;
};

const getProducts = async (schema: string) => {
    const Model = await getModelByName(schema);
    const responseGet = await Model.find({});
    return responseGet
};

const getProduct = async (id: string,schema: string) => {
    const Model = await getModelByName(schema);
    const responseGetOne = await Model.findOne({_id:id})
    return responseGetOne
};

const updateProduct = async (id: string, data: any, schema: string) => {
    const Model = await getModelByName(schema);
    const responseUpdate = await Model.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteProduct = async (id: string, schema: string) => {
    const Model = await getModelByName(schema);
    const responsedelete = await Model.deleteOne({_id:id})
    return responsedelete
};

const searchProducts = async (query: string, concept:string,schema: string) => {
     const Model = await getModelByName(schema);
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await Model.find({
        concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    })
    return responseSearch
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts };
