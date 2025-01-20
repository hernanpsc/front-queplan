"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanes = exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
exports.obtenerPlanesConClinicas = obtenerPlanesConClinicas;
const clinicas_1 = __importDefault(require("./../models/clinicas"));
const planes_1 = __importDefault(require("./../models/planes"));
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
        const products = await planes_1.default.find({}); // Fetch plans from the database
        const clinicas = await clinicas_1.default.find({}); // Fetch clinics from the database
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
            await planes_1.default.updateOne({ _id: products[i]._id }, { $set: { clinicas: clinicPlan } });
            console.log(`Plan actualizado: ${products[i]._id}`);
        }
        return products; // Devuelve la lista de productos actualizados
    }
    catch (error) {
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
const createProduct = async (item) => {
    const responseCreate = await planes_1.default.create(item);
    return responseCreate;
};
exports.createProduct = createProduct;
const getProducts = async () => {
    const responseGet = await planes_1.default.find({});
    return responseGet;
};
exports.getProducts = getProducts;
const getProduct = async (id) => {
    const responseGetOne = await planes_1.default.findOne({ _id: id });
    console.log(' responseGetOne : ', id);
    return responseGetOne;
};
exports.getProduct = getProduct;
const updateProduct = async (id, data) => {
    const responseUpdate = await planes_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const responsedelete = await planes_1.default.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteProduct = deleteProduct;
const searchProducts = async (query) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await planes_1.default.find({
        concept: { $regex: query, $options: 'i' },
    });
    return responseSearch;
};
exports.searchProducts = searchProducts;
const getPlanes = async () => {
    console.log('getPlanes ');
    const responseGet = await obtenerPlanesConClinicas();
    return responseGet;
};
exports.getPlanes = getPlanes;
//# sourceMappingURL=planes.js.map