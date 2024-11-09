import { Request, Response } from 'express';
import * as servicios from './index'; 
import * as functions from '../funciones';
import PreciosModel from '../models/precios'; 
import { getProduct } from './precios'
import { handleHttp } from '../utils/error.handle';
import { Document } from 'mongoose';
import { Clinicas } from '../interfaces/clinicas';
import { Empresa } from '../interfaces/empresas';
import ClinicasModel from './../models/clinicas';
import PlanesModel from './../models/planes';
import EmpresaModel from './../models/empresas';
export const  calcularPrecio = async (req: Request, res: Response) => {
 try{
const formCotizar = req.body;
const {group,empresa_prepaga,edad_1,edad_2,numkids,plan_type,tipo,agree,aporteOS,sueldo,aporte,monoadic,cantAport,afinidad,bonAfinidad,supras,segvida,segvida1,region,}=formCotizar;
console.log('formCotizar  : ');console.log(formCotizar)

const calcularGrupo = (edad_1: number, edad_2: number, numkids: number, group: string) => {
  let edad1 = edad_1;
  let edad2 = edad_2;
  let num_kids = numkids;
  if (group === '1' ) {
    edad2 = 0;
    num_kids = 0;
  } else if ( group === '2'){
    edad2 = 0;
  } else if ( group === '3'){
    num_kids = 0;
  } else {}
  // if (edad_2 === null) {
  //   edad2 = 0;
  // } else if (numkids === null) {
  //   num_kids = 0;
  // }
  let grupo = functions.grupoFamiliar(edad1, edad2, num_kids, group);
  return grupo;
};
// Llamada a la función para obtener el grupo
const grupo = calcularGrupo(edad_1, edad_2, numkids, group);

  const porcentaje: { [nombreEmpresa: string]: number } = {};
  const beneficiariosF184 = cantAport;
  const eleccionSueldoOAporte = aporteOS;
  const sueldoSueldoOAporte = sueldo;
  const categoria_Mono = "";
  const arrayValorMonotXCategoria: any[] = [];

    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];

    let tipo_IngresoPDMI = functions.tipoAsociado(tipo);
    const aporte_OS = [tipo_IngresoPDMI,beneficiariosF184,eleccionSueldoOAporte,sueldoSueldoOAporte,categoria_Mono,arrayValorMonotXCategoria]

// <! ----------SANCOR---------------------------------------------------->
let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos,group);
let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos,group);
let idSancorConyuge: string
if (grupo[0] == 2) {
  idSancorConyuge = idSancor1[1];
// console.log(idSancorConyuge)
}else {idSancorConyuge
  =idSancor[0]}
// console.log(idSancorConyuge)
// <! -----------------------------OMINT---------------------------------------------------->
let idOmint =  functions.productIdOmint(edad_1, tipo, 'titular',group);
// <! -----------------------------GALENO--------------------------------------------------->
let idGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos,group);
// <! ----------PREMEDIC-------------------------------------------------------------------->
let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos,group);
// <! ----------SWISS----------------------------------------------------------------------->
let idTitularSwiss = functions.productIdSwiss(edad_1, tipo_IngresoPDMI,group);
let idConyugeSwiss = functions.productIdSwiss(edad_2, tipo_IngresoPDMI,group);

// <! ----------MEDIFE---------------------------------------------------->
let idAdultosMedife = functions.productIdMedife(edad_1,edad_1, tipo_IngresoPDMI);
// <! ----------PREVENCION---------------------------------------------------->
let idPrevencion = functions.productIdPrevencion(edad_1,edad_1, numkids, tipo_IngresoPDMI);
// <! ----------DOCTORED---------------------------------------------------->
let IdDoctored = functions.productIdDoctored(edad_1, edad_2, tipo_IngresoPDMI, numkids,group)

async function fetchProductPrice(id: string) {
  // console.log( ' funcion en linea 183 : id: ', id)
 return await getProduct(id);
}

const companies = await EmpresaModel.find({});
  
  
const empresasConCoeficientes = companies.map(empresa => {
  const nombre = String(empresa.name); // Asegúrate de que sea una cadena
  return { [nombre]: empresa.factores?.coeficiente };
});

// Acceder al coeficiente de una empresa en particular por su nombre
async function buscar_mi_coeficiente(type:string){
const coeficiente = empresasConCoeficientes.find(empresa => empresa[type]);
if (coeficiente) { return coeficiente } else {
// console.log(`No se encontró la empresa ${type}.`);
}
}


async function fetchPrices() {
  const prices: { [key: string]: any } = {};

  const productQueries = [
      { variable: 'priceAdultosPr', id: 'premedic' + functions.productIdPremedic(edad_1, edad_2, tipo, numHijos, group) },
      { variable: 'pricePrHijoMenir1', id: 'premedic' + tipo + 'AD-1anio' },
      { variable: 'pricePrHijoMenir25', id: 'premedic' + tipo + 'AD-25' },
      { variable: 'precioTitularSwiss', id: 'swiss' + idTitularSwiss },
      { variable: 'precioConyugeSwiss', id: 'swiss' + idConyugeSwiss },
      { variable: 'precioHijo1Swiss', id: 'swiss' + tipo_IngresoPDMI + '1h' },
      { variable: 'precioHijo2Swiss', id: 'swiss' + tipo_IngresoPDMI + '2h' },
      { variable: 'precio_titular_Omint', id: idOmint[0] },
      { variable: 'precio_conyuge_Omint', id: functions.productIdOmint(edad_2, tipo, 'conyuge', group)[1] },
      { variable: 'precio_hijo1_Omint', id: idOmint[2] },
      { variable: 'precio_hijo2_Omint', id: idOmint[3] },
      { variable: 'precio1Hijo', id: idSancor[2] },
      { variable: 'precio2Hijo', id: idSancor[3] },
      { variable: 'precioTitular', id: idSancor[0] },
      { variable: 'precioConyuge', id: idSancorConyuge },
      { variable: 'priceGrupoGaleno', id: 'galeno' + idGaleno },
      { variable: 'idAdultosMedife', id: idAdultosMedife },
      { variable: 'idHIjo0a1', id: tipo_IngresoPDMI + 'HIJO0a1' },
      { variable: 'idHIjo0a20', id: tipo_IngresoPDMI + 'HIJO2a20' },
      { variable: 'idHIjo0a25', id: tipo_IngresoPDMI + 'HIJO25' },
      { variable: 'idPrevencion', id: idPrevencion },
      { variable: 'precioDoctoredGrupo', id:  IdDoctored[0] },
      { variable: 'precioDoctoredHijo3', id:  IdDoctored[1] },
      { variable: 'precioDoctoredAd', id:  IdDoctored[2] }
       ];
  const promises = productQueries.map(async (query) => {
      // console.log(`Fetching price for ${query.variable} with ID: ${query.id}`);
      try {
          const result = await fetchProductPrice(query.id);
          return { [query.variable]: result };
      } catch (error) {
          console.error(`Error fetching price for ${query.id}:`, error);
          return { [query.variable]: null };
      }
  });

  const results = await Promise.all(promises);
  results.forEach((result) => Object.assign(prices, result));

  return prices;
}

   const prices = await fetchPrices();
// console.log(' prices ' ,prices)

// console.log('aporte_OS  : ' + aporte_OS);
// console.log('edad_2  : '+ edad_2);
// console.log('numHijos  : '+ numHijos);
// console.log('numhijo2  : '+numhijo2 );
// console.log('precio_titular  : '+ prices.precio_titular_Omint.precios);
// console.log('precio_conyuge  : '+ prices.precio_conyuge_Omint.precios);
// console.log('precio_hijo1  : '+prices.precio_hijo1_Omint.precios );
// console.log('precio_hijo2  : '+ prices.precio_hijo2_Omint.precios);
// console.log('edad_ID1OMINT  : '+ idOmint[0]);
// console.log('conPromo  : '+ afinidad);
// console.log('promocion  : '+bonAfinidad );
// console.log('coeficiente  : '+ buscar_mi_coeficiente('OMINT'));
// console.log('group  : '+ group);
console.log('Id Doctored Grupo  :'+ IdDoctored[0]);

console.log('Doctored Grupo  :');

console.log(prices.precioDoctoredGrupo.precios);
console.log('Id Doctored Hijo 3  :'+ IdDoctored[1]);
console.log('Doctored Hijo 3  :');

console.log(prices.precioDoctoredHijo3.precios);
console.log('Id Doctored Ad  :'+ IdDoctored[2]);
console.log(' Doctored Ad  :');
console.log(prices.precioDoctoredAd.precios );

// <! -----------------------------ID PREMEDIC START---------------------------------------------------->

 let valor_OMINT = functions.valorOmint(aporte_OS,edad_2,numHijos,numhijo2,prices.precio_titular_Omint.precios,prices.precio_conyuge_Omint.precios,prices.precio_hijo1_Omint.precios,prices.precio_hijo2_Omint.precios,idOmint[0],afinidad,bonAfinidad,buscar_mi_coeficiente('OMINT'),group);
// console.log(' valor_OMINT ' ,valor_OMINT)
 let valor_Premedic = functions.valor_Premedic(aporte_OS,buscar_mi_coeficiente('Premedic'),grupo[3],prices.priceAdultosPr.precios,prices.pricePrHijoMenir25.precios,prices.pricePrHijoMenir1.precios,edadIdPremedic,afinidad,bonAfinidad,group)
// console.log(' valor_Premedic ' ,valor_Premedic)
 let valor_SanCor = functions.valor_SanCor(aporte_OS,buscar_mi_coeficiente('SanCor Salud'),edad_1,edad_2,grupo[3],prices.precio1Hijo.precios,prices.precio2Hijo.precios,prices.precioTitular.precios,prices.precioConyuge.precios,numhijo2,grupoFam,segvida,segvida1,supras,afinidad,bonAfinidad,gen);
// console.log(' valor_SanCor ' ,valor_SanCor)
 let valor_Galeno = functions.valor_Galeno(aporte_OS,prices.priceGrupoGaleno.precios,buscar_mi_coeficiente('Galeno'));    
// console.log(' valor_Galeno ' ,valor_Galeno)

 let valor_Swiss = functions.valor_Swiss(aporte_OS,edad_2,numkids,numhijo2,prices.precioTitularSwiss.precios,prices.precioConyugeSwiss.precios,prices.precioHijo1Swiss.precios,prices.precioHijo2Swiss.precios,buscar_mi_coeficiente('Swiss Medical'),group)
console.log(' valor_Swiss ' ,valor_Swiss)
  let valor_Doctored = functions.valor_Doctored(aporte_OS,buscar_mi_coeficiente('Doctored'),grupo[3],prices.precioDoctoredGrupo.precios,prices.precioDoctoredHijo3.precios,group)
  console.log(' valor_Doctored ' ,valor_Doctored)

for ( let i=0 ; i < prices.length ; i++){
console.log(prices[i])
}

let empresas: string[] = [];
let planesPorEmpresa: { [key: string]: Document[] } = {};

async function obtenerEmpresasDisponibles() {
    empresas = await PlanesModel.distinct('empresa');
    return empresas;
  }
empresas = await obtenerEmpresasDisponibles();
// console.log('empresas : ' + empresas)
let allPlanes = await PlanesModel.find({}); // Consulta a la base de datos para obtener los planes
// console.log('allPlanes : ')  
// console.log(allPlanes)  
const concatenarPrecios = valor_OMINT.concat(valor_SanCor,valor_Premedic,valor_Galeno,valor_Swiss,valor_Doctored);
// console.log('concatenarPrecios: ')  
// console.log(concatenarPrecios)  

  const combinedPlans = functions.combinePlansWithPrices(allPlanes, concatenarPrecios);
// console.log('combinedPlans :')
// console.log(combinedPlans)

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