import { Request, Response } from 'express';
import * as servicios from './index'; 
import * as functions from '../funciones';
import PreciosModel from '../models/precios'; 
import { getProduct } from './precios'
import { handleHttp } from '../utils/error.handle';
import { Document } from 'mongoose';
import { Clinicas } from '../interfaces/clinicas';
import { Empresa } from '../interfaces/empresas';
import { DescOS  } from '../interfaces/empresas';
import ClinicasModel from './../models/clinicas';
import PlanesModel from './../models/planes';
import EmpresaModel from './../models/empresas';
export const  calcularPrecio = async (req: Request, res: Response) => {
 try{
const formCotizar = req.body;
const {group,empresa_prepaga,edad_1,edad_2,numkids,edadHijo1,
  edadHijo2,
  edadHijo3,
  edadHijo4,
  edadHijo5,
  categoriaMono,plan_type,tipo,agree,aporteOS,sueldo,aporte,monoadic,cantAport,afinidad,bonAfinidad,supras,segvida,segvida1,region,}=formCotizar;
console.log('formCotizar  : ');console.log(formCotizar)

const calcularGrupo = (edad_1: number, edad_2: number, numkids: number, group: string) => {
  let edad1 = edad_1;
  let edad2 = edad_2;
  let ageHijo1 = edadHijo1;
  let ageHijo2 = edadHijo2;
  let ageHijo3 = edadHijo3;
  let ageHijo4 = edadHijo4;
  let ageHijo5 = edadHijo5;
  let num_kids = numkids;

  if (group === '1' ) {
    edad2 = 0;
    num_kids = 0;
  } 
  else if ( group === '2'){
    edad2 = 0;
  } else if ( group === '3'){
    num_kids = 0;
  } else {}
  // // if (edad_2 === null) {
  // //   edad2 = 0; tipo
   // // } else if (numkids === null) {
  // //   num_kids = 0;
  // }
  let grupo = functions.grupoFamiliar(edad1, edad2, num_kids, group,ageHijo1,ageHijo2,ageHijo3,ageHijo4,ageHijo5);
  return grupo;
};
// Llamada a la función para obtener el grupo
const grupo = calcularGrupo(edad_1, edad_2, numkids, group);
console.log('grupo : ',grupo)

  const beneficiariosF184 = cantAport;
  console.log('beneficiariosF184 : ',beneficiariosF184)

  const eleccionSueldoOAporte = aporteOS;
  console.log('eleccionSueldoOAporte : ',eleccionSueldoOAporte)

  const sueldoSueldoOAporte = sueldo;
  console.log('sueldoSueldoOAporte : ',sueldoSueldoOAporte)

  const categoria_Mono = categoriaMono;
  console.log('categoria_Mono : ',grupo)


    
// const companies = await EmpresaModel.find({ "factores.mono": { $exists: true } });
const companies = await EmpresaModel.find({});


const factores = companies.map((empresa) => {
  // Asegúrate de que 'factores' esté definido, de lo contrario devuelve un objeto vacío.
  const nombre = empresa.name ? String(empresa.name) : '';
  const factores = empresa.factores || {}; // Si 'factores' no existe, asigna un objeto vacío.

  // Devuelve un nuevo objeto con el nombre y toda la propiedad 'factores'.
  return { nombre, factores };
});
// const factores = companies.map(empresa => {
//   // Asegúrate de que el campo 'name' esté definido y conviértelo a string.
//   const nombre = empresa.name ? String(empresa.name) : '';
//   const promo = Array.isArray(empresa.factores?.monotributo) ? empresa.factores?.monotributo : []; // Verifica que 'promociones' sea un array

//   // Verifica si 'factores' está definido, luego extrae 'coeficiente' y 'mono'.
//   const coeficiente = empresa.factores?.coeficiente || null;  // Si no existe, asigna null
//   const monotributo = Array.isArray(empresa.factores?.mono) ? empresa.factores?.mono : []; // Verifica que 'mono' sea un array

//   // const os = Array.isArray(empresa.factores?.monotributo) ? empresa.factores?.monotributo : []; // Verifica que 'mono' sea un array```javascript

//   return {nombre,coeficiente,monotributo,promo};
// });
console.log('factores .',factores)
const aporte_OS = [tipo,beneficiariosF184,eleccionSueldoOAporte,sueldoSueldoOAporte,categoria_Mono,factores]
console.log('aporte_OS .',aporte_OS)

// Array donde almacenaremos las deducciones
let arrayDeducciones = [];


  // Iterar sobre las empresas para calcular las deducciones
  for (let i = 0; i < companies.length; i++) {
    // Llamar a la función calculodescOS y asegurarnos que el tipo de retorno es DescOS
    let descOS = functions.calculodescOS(aporte_OS, companies[i].name);
    arrayDeducciones.push({
      name: companies[i].name ?? '',
      deduction: descOS[0] ?? 0,  // Se accede a la propiedad 'deduction' sin errores de
      bonificaciones: descOS[2] ?? 0,
      tipo_Ingreso_Original_P_D: tipo,
      tipo_Ingreso_P_D_Monotributo: descOS[1] ?? ''  // Se accede a 'tipo_IngresoPDMI' de forma segura
    });
  }
console.log(' GENERAL arrayDeducciones  : ',arrayDeducciones)

const ids = functions.ids_prepagas(grupo,arrayDeducciones);
console.log(' ids : ',ids);



async function fetchProductPrice(id: string) {
  // console.log( ' funcion en linea 183 : id: ', id)
 return await getProduct(id);
}

// <! ----------FIN DE LA SECCION COEFICIENTES---------------------------------------------------->

async function fetchPrices() {
  const prices: { [key: string]: any } = {};

 
  const productQueries = [
    { variable: 'precioSanCor1Hijo', id: ids[0][2] },
    { variable: 'precioSanCor2Hijo', id: ids[0][3] },
    { variable: 'precioSanCorTitular', id: ids[0][0] },
    { variable: 'precioConyugeSanCor', id: ids[0][1] },
    { variable: 'precio_titular_Omint', id: ids[1][0] },
    { variable: 'precio_conyuge_Omint', id: ids[1][1] },
    { variable: 'precio_hijo1_Omint', id: ids[1][2] },
    { variable: 'precio_hijo2_Omint', id: ids[1][3] },
    { variable: 'priceAdultosPr', id: ids[14][0] },
    { variable: 'pricePrHijoMenir1', id: ids[14][1] },
    { variable: 'pricePrHijoMenir25', id: ids[14][2] },
    { variable: 'precioTitularSwiss', id: ids[3][0] },
    { variable: 'precioConyugeSwiss', id: ids[3][1] },
    { variable: 'precioHijo1Swiss', id: ids[3][2] },
    { variable: 'precioHijo2Swiss', id: ids[3][3] },
    { variable: 'priceGrupoGaleno', id: ids[2][0] },
    { variable: 'precioMedifeAdultos', id: ids[4][0] },
    { variable: 'precioMedifeHIJO0a1', id: ids[4][1] },
    { variable: 'precioMedifeHIJO2a20', id: ids[4][2] },
    { variable: 'precioMedifeHIJO21a29', id: ids[4][3] },
    { variable: 'precioPrevencion', id: ids[5][0] },
    { variable: 'precioDoctoredGrupo', id: ids[6][0] },
    { variable: 'precioDoctoredHijo3', id: ids[6][1] },
    { variable: 'precioDoctoredAd', id: ids[6][2] },
    { variable: 'precioAvalianTitular', id: ids[7][0] },
    { variable: 'precioAvalianConyuge', id: ids[7][1] },
    { variable: 'precioAvalianHijo1', id: ids[7][2] },
    { variable: 'precioAvalianHijo2', id: ids[7][3] },
    { variable: 'precioAvalianHijo3', id: ids[7][4] },
    { variable: 'precioAvalianHijo25', id: ids[7][5] },
    { variable: 'precioTitularRas', id: ids[8][0] },
    { variable: 'precioConyugeRas', id: ids[8][1] },
    { variable: 'precioHijo1Ras', id: ids[8][2] },
    { variable: 'precioHijo2Ras', id: ids[8][3] },
    { variable: 'precioHijo3Ras', id: ids[8][4] },
    { variable: 'precioTitularCristal', id: ids[8][5] },
    { variable: 'precioConyugeCristal', id: ids[8][6] },
    { variable: 'precioHijo1Cristal', id: ids[8][7] },
    { variable: 'precioHijo2Cristal', id: ids[8][8] },
    { variable: 'precioHijo3Cristal', id: ids[8][9] },
    { variable: 'precioLuispasteurAdultos', id: ids[9][0] },
    { variable: 'precioLuispasteurNieto', id: ids[9][1] },
    { variable: 'precioLuispasteurAdicional', id: ids[9][2] },
    { variable: 'precioLuispasteurHijo', id: ids[9][3] },
    { variable: 'precioAsmepriv', id: ids[10][0] },
    { variable: 'precioAdmenorUno', id: ids[10][1] },
    { variable: 'precioAsmeprivHijoHasta21', id: ids[10][2] },
    { variable: 'precioAsmeprivRecargoHijo21a29', id: ids[10][3] },
    { variable: 'precioAsmeprivModuloMat', id: ids[10][4] },
    { variable: 'precioBayresAdultos', id: ids[11][0] },
    { variable: 'precioBayresHijoHasta25', id: ids[11][1] },
    { variable: 'precioBayresAd18a49', id: ids[11][2] },
    { variable: 'precioBayresJovenSinMaternidad', id: ids[11][3] },
    { variable: 'precioBayresInd18a29', id: ids[11][4] },
    { variable: 'precioHominis', id: ids[12][0] },
    { variable: 'precioSaludcentralTitular', id: ids[13][0] },
    { variable: 'precioSaludcentralConyuge', id: ids[13][1] },
    { variable: 'precioSaludcentralHijo1', id: ids[13][2] },
    { variable: 'precioSaludcentralHijo2', id: ids[13][3] }
  ];

 const promises = productQueries.map(async (query) => {
  // Verificar si el ID es válido
  if (!query.id) {
    console.warn(`ID no válido para la variable: ${query.variable}`);
    return { [query.variable]: null };
  }

  try {
    const result = await fetchProductPrice(query.id);

    // Devolver el resultado, incluso si es vacío
    return { [query.variable]: result ? { precios: result } : { precios: {} } };
  } catch (error) {
    console.error(`Error al obtener precio para ID ${query.id}:`, error);
    // En caso de error, devolver un valor nulo para esta variable
    return { [query.variable]: null };
  }
});

// Ejecutar todas las promesas y combinarlas en el objeto `prices`
const results = await Promise.all(promises);

// Combinar resultados en el objeto `prices`
results.forEach((result) => Object.assign(prices, result));

return prices;

}



   const prices = await fetchPrices();
const imprimirPrices = functions.imprimirPrecios(prices,ids)
  //  const ids = functions.imprimirPrecios(prices,tipo_IngresoPDMI,group,idAdultosMedife,ids[5],ids[6],ids[7],ids[8],ids[9],ids[10],ids[11],ids[12])

   let concatenarPrecios = functions.valor_prepagas(prices,grupo,arrayDeducciones);




let empresas: string[] = [];
let planesPorEmpresa: { [key: string]: Document[] } = {};

async function obtenerEmpresasDisponibles() {
    empresas = await PlanesModel.distinct('empresa');
    return empresas;
  }
empresas = await obtenerEmpresasDisponibles();

let allPlanes = await PlanesModel.find({}); 

// console.log('allPlanes  : ' + allPlanes)
// console.log('concatenarPrecios  : ' + concatenarPrecios)
  const combinedPlans = functions.combinePlansWithPrices(allPlanes, concatenarPrecios);
  // console.log('combinedPlans  : ' + combinedPlans)


  for (const plan of combinedPlans) {
    const empresa = 'planes_' + plan.empresa;
    planesPorEmpresa[empresa] = planesPorEmpresa[empresa] || [];
    planesPorEmpresa[empresa].push(plan);
  }

const planesSwiss = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa === 'Swiss Medical');
const filteredPlansGaleno = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);    
 // Filtrar los planes con precioCalculado mayor que 0
const galenoPlanes = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa !== 'GALENO');

const filteredPlans = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);  
  
const otrasEmpresasPlanes = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa !== 'OMINT');

// Separar en dos arrays: uno para OMINT y otro para las otras empresas
const planesOmint = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa === 'OMINT');

const combinedPlansOmintFiltrados = planesOmint.filter((plan: any) => {
  if (tipo === 'P') {
    if (plan.item_id.endsWith('20') || plan.item_id.endsWith('1500_22') || plan.item_id.endsWith('24') || plan.item_id.endsWith('21')) {
      return false;
    }
    return true;
  }

  if (tipo === 'D') {
    if (plan.item_id.endsWith('1500_21')) {
      return false;
    }
    if (plan.item_id.endsWith('S')) {
      return true;
    }
  }

  return false;
});

let planesOmintAgrupados  = functions.agruparYTransformarPlanes(combinedPlansOmintFiltrados);
const resultadoFinal = otrasEmpresasPlanes.concat(planesOmintAgrupados);
  
const resultado = combinedPlans.filter((plan: { precio: number; }) => {
     if (tipo === 'P' && plan.precio === 0){
       return false;
       }
       return true;
       });
   
// console.log('resultado   :')
// console.log(resultado)
 res.status(200).json(resultado)
      } catch(e) {
        handleHttp(res, 'ERROR_GET_ITEMS'); 
      }
};