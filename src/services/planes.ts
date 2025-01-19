import ClinicasModel from './../models/clinicas';
import PlanesModel from "./../models/planes";

// async function addClinicas() {
//   try {
//     const products = await PlanesModel.find({}); // Fetch plans from the database
//     const clinicas = await ClinicasModel.find({}); // Fetch clinics from the database
    


//     if (!products || !clinicas) {
//       return [];
//     }

//     // Creamos una variable para almacenar la combinación de planes y clínicas
//     const combinedPlans = [];

//     for (let i = 0; i < products.length; i++) {
//       const clinicPlan = [];

//       // Iterar sobre las clínicas para verificar si están asociadas con el plan
//       for (let x in clinicas) {
//         const itemId = products[i].item_id;
        

//         // Asegurarse de que item_id esté definido antes de verificar la inclusión
//         if (itemId && clinicas[x].cartillas.includes(itemId)) {
//           console.log('itemId :  ', itemId);
//           clinicPlan.push(clinicas[x]);
//         }
//       }

//       // Crear un objeto para combinar el plan con sus clínicas
//       const combinedPlan = {
//         plan: products[i],
//         clinicas: clinicPlan,
//       };
//       // await PlanesModel.updateOne({ _id: products[i]._id }, { clinicas: clinicPlan });

//       // Agregar la combinación a la lista de resultados
//       combinedPlans.push(combinedPlan);
//     }

//     console.log('combinedPlans: ', combinedPlans);
//     return combinedPlans;
    
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }


// async function obtenerPlanesConClinicas() {
//   const planesConClinicas = await addClinicas();
//   return planesConClinicas;
// }


async function addClinicas() {
  try {
    const products = await PlanesModel.find({}); // Fetch plans from the database
    const clinicas = await ClinicasModel.find({}); // Fetch clinics from the database

    if (!products || !clinicas) {
      return [];
    }

    // Iterar sobre los productos (planes)
    for (let i = 0; i < products.length; i++) {
      const clinicPlan = [];

      // Iterar sobre las clínicas para verificar si están asociadas con el plan
      for (let x in clinicas) {
        const itemId = products[i].item_id;

        // Asegurarse de que item_id esté definido antes de verificar la inclusión
        if (itemId && clinicas[x].cartillas.includes(itemId)) {
          console.log('itemId: ', itemId);

          const { _id, cartillas, coberturas, ...clinicData } = clinicas[x].toObject();

                  
          
                    clinicPlan.push(clinicData);
        }
      }

      // Actualizar la propiedad 'clinicas' del plan en la base de datos
      await PlanesModel.updateOne(
        { _id: products[i]._id }, 
        { $set: { clinicas: clinicPlan } }
      );
      
      console.log(`Plan actualizado: ${products[i]._id}`);
    }

    return products;  // Devuelve la lista de productos actualizados

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
    console.log( ' responseGetOne : ', id)

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
console.log('getPlanes ')
    const responseGet = await obtenerPlanesConClinicas();

    return responseGet
}; 
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts ,getPlanes};

export { obtenerPlanesConClinicas };
