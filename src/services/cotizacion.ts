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
  } 
  else if ( group === '2'){
    edad2 = 0;
  } else if ( group === '3'){
    num_kids = 0;
  } else {}
  // // if (edad_2 === null) {
  // //   edad2 = 0;
  // // } else if (numkids === null) {
  // //   num_kids = 0;
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

// // <! ----------SANCOR---------------------------------------------------->
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
let IdDoctored = functions.productIdDoctored(edad_1, edad_2, tipo_IngresoPDMI, numkids,group);
// <! ----------AVALIAN---------------------------------------------------->
let IdsAvalian = functions.productIdAvalian(edad_1, edad_2, tipo_IngresoPDMI, group);
// <! ----------CRISTAL y RAS---------------------------------------------------->
let idsCristalyRas = functions.productIdRasCristal(edad_1, edad_2, tipo_IngresoPDMI, group);  
// <! ----------LUIS PASTEUR---------------------------------------------------->
let idsLuisPasteur = functions.productIdLuisPasteur(edad_1, edad_2,numkids, tipo_IngresoPDMI, group)
// <! ----------ASMEPRIV---------------------------------------------------->
let idsAsmepriv = functions.productIdAsmepriv(edad_1, edad_2,numkids, tipo_IngresoPDMI, group)
// <! ----------BAYRES PLAN---------------------------------------------------->
let idsBayresPlan = functions.productIBayres(edad_1, edad_2, group)
// <! ----------HOMINIS---------------------------------------------------->
let idsHominis = functions.productIdHominis(edad_1, edad_2, tipo_IngresoPDMI, numkids, group)


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
      { variable: 'precioSanCor1Hijo', id: idSancor[2] },
      { variable: 'precioSanCor2Hijo', id: idSancor[3] },
      { variable: 'precioSanCorTitular', id: idSancor[0] },
      { variable: 'precioConyugeSanCor', id: idSancorConyuge },
      { variable: 'priceGrupoGaleno', id: 'galeno' + idGaleno },
      { variable: 'precioMedifeAdultos', id: 'medife' + idAdultosMedife },
      { variable: 'precioMedifeHijo0a1', id: 'medife' + tipo_IngresoPDMI + 'HIJO0a1' },
      { variable: 'precioMedifeHijo0a20', id: 'medife' + tipo_IngresoPDMI + 'HIJO2a20' },
      { variable: 'precioMedifeHijo0a25', id: 'medife' + tipo_IngresoPDMI + 'HIJO25' },
      { variable: 'precioPrevencion', id: 'prevencion' + idPrevencion },
      { variable: 'precioDoctoredGrupo', id:  IdDoctored[0] },
      { variable: 'precioDoctoredHijo3', id:  IdDoctored[1] },
      { variable: 'precioDoctoredAd', id:  IdDoctored[2] },
      { variable: 'precioAvalianTitular', id: IdsAvalian[0] },
      { variable: 'precioAvalianConyuge', id: IdsAvalian[1] },
      { variable: 'precioAvalianHijo1', id:  IdsAvalian[2] },
      { variable: 'precioAvalianHijo2', id:  IdsAvalian[3] },
      { variable: 'precioAvalianHijo3', id:  IdsAvalian[4] },
      { variable: 'precioAvalianHijo25', id:  IdsAvalian[5] },
      { variable: 'precioTitularRas', id: idsCristalyRas[0] },
      { variable: 'precioConyugeRas', id: idsCristalyRas[1] },
      { variable: 'precioHijo1Ras', id: idsCristalyRas[2] },
      { variable: 'precioHijo2Ras', id: idsCristalyRas[3] },
      { variable: 'precioHijo3Ras', id: idsCristalyRas[4] },
      { variable: 'precioTitularCristal', id:  idsCristalyRas[5] },
      { variable: 'precioConyugeCristal', id:  idsCristalyRas[6] },
      { variable: 'precioHijo1Cristal', id:  idsCristalyRas[7] },
      { variable: 'precioHijo2Cristal', id:  idsCristalyRas[8] },
      { variable: 'precioHijo3Cristal', id:  idsCristalyRas[9] },
      { variable: 'precioLuispasteurAdultos', id:  idsLuisPasteur[0] },
      { variable: 'precioLuispasteurNieto', id:  idsLuisPasteur[1] },
      { variable: 'precioLuispasteurAdicional', id:  idsLuisPasteur[2] },
      { variable: 'precioLuispasteurHijo', id:  idsLuisPasteur[3] },
      { variable: 'precioAsmepriv', id:  idsAsmepriv[0] },
      { variable: 'precioAdmenorUno', id:  idsAsmepriv[1] },
      { variable: 'precioAsmeprivHijoHasta21', id:  idsAsmepriv[2] },
      { variable: 'precioAsmeprivRecargoHijo21a29', id:  idsAsmepriv[3] },
      { variable: 'precioAsmeprivModuloMat', id:  idsAsmepriv[4] },
      { variable: 'precioBayresAdultos', id:  idsBayresPlan[0] },
      { variable: 'precioBayresHijoHasta25', id:  idsBayresPlan[1] },
      { variable: 'precioBayresAd18a49', id:  idsBayresPlan[2] },
      { variable: 'precioBayresJovenSinMaternidad', id:  idsBayresPlan[3] },
      { variable: 'precioBayresInd18a29', id:  idsBayresPlan[4] },
      { variable: 'precioHominis', id:  idsHominis }      
       ];


  const promises = productQueries.map(async (query) => {
      // console.log(`Fetching price for ${query.variable} with ID: ${query.id}`);
      try {
          const result = await fetchProductPrice(query.id);
          return { [query.variable]: result };
      } catch (error) {
          // console.error(`Error fetching price for ${query.id}:`, error);
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
// functions.imprimirPrecios (prices,tipo_IngresoPDMI,group,idAdultosMedife,idPrevencion,IdDoctored,IdsAvalian,idsCristalyRas,idsLuisPasteur,idsAsmepriv,idsBayresPlan,idsHominis)

// // <! -----------------------------ID PREMEDIC START---------------------------------------------------->

 let valor_OMINT = functions.valorOmint(aporte_OS,edad_2,numHijos,numhijo2,prices.precio_titular_Omint.precios,prices.precio_conyuge_Omint.precios,prices.precio_hijo1_Omint.precios,prices.precio_hijo2_Omint.precios,idOmint[0],afinidad,bonAfinidad,buscar_mi_coeficiente('OMINT'),group);
// // console.log(' valor_OMINT ' ,valor_OMINT)
 let valor_Premedic = functions.valor_Premedic(aporte_OS,buscar_mi_coeficiente('Premedic'),grupo[3],prices.priceAdultosPr.precios,prices.pricePrHijoMenir25.precios,prices.pricePrHijoMenir1.precios,edadIdPremedic,afinidad,bonAfinidad,group)
// // console.log(' valor_Premedic ' ,valor_Premedic)
 let valor_SanCor = functions.valor_SanCor(aporte_OS,buscar_mi_coeficiente('SanCor Salud'),edad_1,edad_2,grupo[3],prices.precioSanCor1Hijo.precios,prices.precioSanCor2Hijo.precios,prices.precioSanCorTitular.precios,prices.precioConyugeSanCor.precios,numhijo2,grupoFam,segvida,segvida1,supras,afinidad,bonAfinidad,gen);
// // console.log(' valor_SanCor ' ,valor_SanCor)
 let valor_Galeno = functions.valor_Galeno(aporte_OS,prices.priceGrupoGaleno.precios,buscar_mi_coeficiente('Galeno'));    
// // console.log(' valor_Galeno ' ,valor_Galeno)
 let valor_Swiss = functions.valor_Swiss(aporte_OS,edad_2,numkids,numhijo2,prices.precioTitularSwiss.precios,prices.precioConyugeSwiss.precios,prices.precioHijo1Swiss.precios,prices.precioHijo2Swiss.precios,buscar_mi_coeficiente('Swiss Medical'),group)
// // console.log(' valor_Swiss ' ,valor_Swiss)
 let valor_Doctored = functions.valor_Doctored(aporte_OS,buscar_mi_coeficiente('Doctored'),grupo[3],prices.precioDoctoredGrupo.precios,prices.precioDoctoredHijo3.precios,group)
// // console.log(' valor_Doctored ' ,valor_Doctored)
 let valor_Prevencion = functions.valor_Prevencion(aporte_OS,buscar_mi_coeficiente('Prevencion'),grupo[3],prices.precioPrevencion.precios,group)
// // console.log(' valor_Prevencion ' ,valor_Prevencion)
 let valor_Avalian = functions.valor_Avalian(aporte_OS,buscar_mi_coeficiente('Avalian'),edad_1,edad_2,grupo[3], grupoFam,afinidad,bonAfinidad, prices.precioAvalianTitular.precios,prices.precioAvalianConyuge.precios,prices.precioAvalianHijo1.precios,prices.precioAvalianHijo2.precios,prices.precioAvalianHijo3.precios,prices.precioAvalianHijo25.precios);
// // console.log(' valor_Avalian ' ,valor_Avalian)
// let valor_Ras = functions.valor_Ras(aporte_OS,buscar_mi_coeficiente('Ras'), group, bonAfinidad, prices.precioTitularRas.precios, prices.precioConyugeRas.precios, prices.precioHijo1Ras.precios, prices.precioHijo2Ras.precios, prices.precioHijo3Ras.precios);
// // console.log(' valor_Ras ' ,valor_Ras)
//  let valor_Cristal = functions.valor_Cristal(aporte_OS,buscar_mi_coeficiente('Cristal'), group, bonAfinidad, prices.precioTitularCristal.precios, prices.precioConyugeCristal.precios, prices.precioHijo1Cristal.precios, prices.precioHijo2Cristal.precios, prices.precioHijo3Cristal.precios);
// // console.log(' valor_Cristal ' ,valor_Cristal)
//  let valor_Asmepriv = functions.valor_Asmepriv(aporte_OS,buscar_mi_coeficiente('Asmepriv'), group, bonAfinidad, prices.precioAsmepriv.precios, prices.precioAdmenorUno.precios, prices.precioAsmeprivHijoHasta21.precios, prices.precioAsmeprivRecargoHijo21a29.precios);
//  // console.log(' valor_Asmepriv ' ,valor_Asmepriv)
//  let valor_Luispasteur = functions.valor_Luispasteur(aporte_OS,buscar_mi_coeficiente('Luispasteur'), group, bonAfinidad, prices.precioLuispasteurAdultos.precios, prices.precioLuispasteurNieto.precios, prices.precioLuispasteurAdicional.precios, prices.precioLuispasteurHijo.precios );

//  // console.log(' valor_Luispasteur ' ,valor_Luispasteur);
//  let valor_Bayresplan = functions.valor_Bayresplan(aporte_OS,buscar_mi_coeficiente('Bayresplan'), group, bonAfinidad, prices.precioBayresAdultos.precios, prices.precioBayresHijoHasta25.precios, prices.precioBayresAd18a49.precios, prices.precioBayresJovenSinMaternidad.precios, prices.precioBayresInd18a29.precios );
//  // console.log(' valor_Bayresplan ' ,valor_Bayresplan)
//  let valor_Hominis = functions.valor_Hominis(aporte_OS,buscar_mi_coeficiente('Hominis'), group, bonAfinidad, prices.precioHominis.precios );
//  // console.log(' valor_Bayresplan ' ,valor_Bayresplan)










// for ( let i=0 ; i < prices.length ; i++){
// console.log(prices[i])
// }

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
const concatenarPrecios = valor_OMINT.concat(valor_SanCor, valor_Premedic,valor_Galeno,valor_Swiss,valor_Doctored,valor_Prevencion, valor_Avalian


);
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