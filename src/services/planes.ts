import ClinicasModel from './../models/clinicas';
import PlanesModel from "./../models/planes";

async function addClinicas() {
  try {
    const products = await PlanesModel.find({}); // Consulta a la base de datos para obtener los planes
    const clinicas = await ClinicasModel.find({}); // Consulta a la base de datos para obtener las clínicas

    if (!products || !clinicas) {
      // Manejo de error si las consultas no devuelven resultados
      return [];
    }

    for (let i = 0; i < products.length; i++) {
      const clinicPlan = [];

      for (let x in clinicas) {
        const incluyeId = clinicas[x].cartillas.includes(products[i].item_id);

        if (incluyeId) {
          clinicPlan.push(clinicas[x]);
        }
      }
      // Actualizar los documentos en MongoDB
      await PlanesModel.updateOne({ _id: products[i]._id }, { clinicas: clinicPlan });
    }
// console.log(products)
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function obtenerPlanesConClinicas() {
  const planesConClinicas = await addClinicas();
  return planesConClinicas;
}




// Use the models as needed



// import { ClinicasModel, CotizacionModel, EmployeesModel, EmpresasModel,ItemModel,PlanesModel,UsersModel,PlanesModel} from '../models';


  
const createProduct = async (item: any) => {
    const responseCreate = await PlanesModel.create(item)
    return responseCreate;
};

const getProducts = async () => {
    const responseGet = await PlanesModel.find({});
    return responseGet
};

const getProduct = async (id: string) => {
   

    
    const responseGetOne = await PlanesModel.findOne({_id:id})
    // console.log( ' responseGetOne : ', id)

    return responseGetOne
};

const updateProduct = async (id: string, data: any) => {
    const responseUpdate = await PlanesModel.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteProduct = async (id: string) => {
    const responsedelete = await PlanesModel.deleteOne({_id:id})
    return responsedelete
};

const searchProducts = async (query: string) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await PlanesModel.find({
        concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    })
    return responseSearch
};

const getPlanes = async () => {

    const responseGet = await obtenerPlanesConClinicas();

    return responseGet
}; 
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts ,getPlanes};

export { obtenerPlanesConClinicas };
