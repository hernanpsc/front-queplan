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
grupo[3]
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
     console.log('tipo_IngresoPDMI  :',tipo_IngresoPDMI)
    // let ids = functions.ids_prepagas(edad_1, edad_2, tipo, numHijos,grupo[3],group,tipo_IngresoPDMI)
    // let idSancor = ids[0];let idSancorConyuge: any; idSancorConyuge = ids[2]; let idOmint = ids[3];let idGaleno = ids[4];let edadIdPremedic = ids[5];let idTitularSwiss = ids[6];let idConyugeSwiss = ids[7];let idAdultosMedife = ids[8];let idPrevencion = ids[9];let IdDoctored = ids[10];let IdsAvalian = ids[11];let idsCristalyRas = ids[12];let idsLuisPasteur = ids[13];let idsAsmepriv = ids[14];let idsBayresPlan = ids[15];let  idsHominis = ids[16];


    // <! ----------SANCOR---------------------------------------------------->
let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos,group);
let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos,group);
let idSancorConyuge: string

if (grupo[0] == 2) {
  idSancorConyuge = idSancor1[1];
console.log(idSancorConyuge)
}else {idSancorConyuge
  =idSancor[0]}
console.log(idSancorConyuge)
// <! -----------------------------OMINT---------------------------------------------------->
let idOmint =  functions.productIdOmint(edad_1, edad_2,tipo, group);console.log(idOmint)
// <! -----------------------------GALENO--------------------------------------------------->
let idGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos,group);console.log(idGaleno)
// <! ----------PREMEDIC-------------------------------------------------------------------->
let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos,group);console.log(edadIdPremedic)
// <! ----------SWISS----------------------------------------------------------------------->
let idSwiss = functions.productIdSwiss(edad_1, edad_2,tipo_IngresoPDMI,group);console.log(idSwiss)
// <! ----------MEDIFE---------------------------------------------------->
let idsMedife = functions.productIdMedife(edad_1,edad_1, tipo_IngresoPDMI);console.log(idsMedife)
// <! ----------PREVENCION---------------------------------------------------->
let idPrevencion = functions.productIdPrevencion(edad_1,edad_1, grupo[3], tipo_IngresoPDMI);console.log(idPrevencion)
// <! ----------DOCTORED---------------------------------------------------->
let IdDoctored = functions.productIdDoctored(edad_1, edad_2, tipo_IngresoPDMI, grupo[3],group);console.log(IdDoctored)
// <! ----------AVALIAN---------------------------------------------------->
let IdsAvalian = functions.productIdAvalian(edad_1, edad_2, tipo_IngresoPDMI, group);console.log(IdsAvalian)
// <! ----------CRISTAL y RAS---------------------------------------------------->
let idsCristalyRas = functions.productIdRasCristal(edad_1, edad_2, tipo_IngresoPDMI, group);  console.log(idsCristalyRas)
// <! ----------LUIS PASTEUR---------------------------------------------------->
let idsLuisPasteur = functions.productIdLuisPasteur(edad_1, edad_2,grupo[3], tipo_IngresoPDMI, group);console.log(idsLuisPasteur)
// <! ----------ASMEPRIV---------------------------------------------------->
let idsAsmepriv = functions.productIdAsmepriv(edad_1, edad_2,grupo[3], tipo_IngresoPDMI, group);console.log(idsAsmepriv)
// <! ----------BAYRES PLAN---------------------------------------------------->
let idsBayresPlan = functions.productIBayres(edad_1, edad_2, group);console.log(idsBayresPlan)
// <! ----------HOMINIS---------------------------------------------------->
let idsHominis = functions.productIdHominis(edad_1, edad_2, tipo_IngresoPDMI, grupo[3], group);console.log(idsHominis)
// <! ----------SALUD CENTRAL---------------------------------------------------->
let idsSaludcentral = functions.productIdSaludcentral(edad_1, edad_2);console.log(idsSaludcentral)


async function fetchProductPrice(id: string) {
  // console.log( ' funcion en linea 183 : id: ', id)
 return await getProduct(id);
}

// const companies = await EmpresaModel.find({ "factores.mono": { $exists: true } });
const companies = await EmpresaModel.find({});

const factores = companies.map(empresa => {
  // Asegúrate de que el campo 'name' esté definido y conviértelo a string.
  const nombre = empresa.name ? String(empresa.name) : '';

  // Verifica si 'factores' está definido, luego extrae 'coeficiente' y 'mono'.
  const coeficiente = empresa.factores?.coeficiente || null;  // Si no existe, asigna null
  const monotributo = Array.isArray(empresa.factores?.mono) ? empresa.factores?.mono : []; // Verifica que 'mono' sea un array
  const os = Array.isArray(empresa.factores?.monotributo) ? empresa.factores?.monotributo : []; // Verifica que 'mono' sea un array

  return {
      nombre,
      coeficiente,
      monotributo
  };
});



console.log('Factores de todas las empresas:', factores);


const aporte_OS = [tipo_IngresoPDMI,beneficiariosF184,eleccionSueldoOAporte,sueldoSueldoOAporte,categoria_Mono,factores]

// <! ----------FIN DE LA SECCION COEFICIENTES---------------------------------------------------->

async function fetchPrices() {
  const prices: { [key: string]: any } = {};

  const productQueries = [
    { variable: 'priceAdultosPr', id: 'premedic' + functions.productIdPremedic(edad_1, edad_2, tipo, numHijos, group) },
    { variable: 'pricePrHijoMenir1', id: 'premedic' + tipo + 'AD-1anio' },
    { variable: 'pricePrHijoMenir25', id: 'premedic' + tipo + 'AD-25' },
    { variable: 'precioTitularSwiss', id: idSwiss[0] },
    { variable: 'precioConyugeSwiss', id: idSwiss[1] },
    { variable: 'precioHijo1Swiss', id: idSwiss[2] },
    { variable: 'precioHijo2Swiss', id: idSwiss[3] },
    { variable: 'precio_titular_Omint', id: idOmint[0] },
    { variable: 'precio_conyuge_Omint', id: idOmint[1] },
    { variable: 'precio_hijo1_Omint', id: idOmint[2] },
    { variable: 'precio_hijo2_Omint', id: idOmint[3] },
    { variable: 'precioSanCor1Hijo', id: idSancor[2] },
    { variable: 'precioSanCor2Hijo', id: idSancor[3] },
    { variable: 'precioSanCorTitular', id: idSancor[0] },
    { variable: 'precioConyugeSanCor', id: idSancorConyuge },
    { variable: 'priceGrupoGaleno', id: idGaleno },
    { variable: 'precioMedifeAdultos', id: idsMedife[0] },
    { variable: 'precioMedifeHIJO0a1', id: idsMedife[1] },
    { variable: 'precioMedifeHIJO2a20', id: idsMedife[2] },
    { variable: 'precioMedifeHIJO21a29', id: idsMedife[3] },
    { variable: 'precioPrevencion', id: idPrevencion },
    { variable: 'precioDoctoredGrupo', id: IdDoctored[0] },
    { variable: 'precioDoctoredHijo3', id: IdDoctored[1] },
    { variable: 'precioDoctoredAd', id: IdDoctored[2] },
    { variable: 'precioAvalianTitular', id: IdsAvalian[0] },
    { variable: 'precioAvalianConyuge', id: IdsAvalian[1] },
    { variable: 'precioAvalianHijo1', id: IdsAvalian[2] },
    { variable: 'precioAvalianHijo2', id: IdsAvalian[3] },
    { variable: 'precioAvalianHijo3', id: IdsAvalian[4] },
    { variable: 'precioAvalianHijo25', id: IdsAvalian[5] },
    { variable: 'precioTitularRas', id: idsCristalyRas[0] },
    { variable: 'precioConyugeRas', id: idsCristalyRas[1] },
    { variable: 'precioHijo1Ras', id: idsCristalyRas[2] },
    { variable: 'precioHijo2Ras', id: idsCristalyRas[3] },
    { variable: 'precioHijo3Ras', id: idsCristalyRas[4] },
    { variable: 'precioTitularCristal', id: idsCristalyRas[5] },
    { variable: 'precioConyugeCristal', id: idsCristalyRas[6] },
    { variable: 'precioHijo1Cristal', id: idsCristalyRas[7] },
    { variable: 'precioHijo2Cristal', id: idsCristalyRas[8] },
    { variable: 'precioHijo3Cristal', id: idsCristalyRas[9] },
    { variable: 'precioLuispasteurAdultos', id: idsLuisPasteur[0] },
    { variable: 'precioLuispasteurNieto', id: idsLuisPasteur[1] },
    { variable: 'precioLuispasteurAdicional', id: idsLuisPasteur[2] },
    { variable: 'precioLuispasteurHijo', id: idsLuisPasteur[3] },
    { variable: 'precioAsmepriv', id: idsAsmepriv[0] },
    { variable: 'precioAdmenorUno', id: idsAsmepriv[1] },
    { variable: 'precioAsmeprivHijoHasta21', id: idsAsmepriv[2] },
    { variable: 'precioAsmeprivRecargoHijo21a29', id: idsAsmepriv[3] },
    { variable: 'precioAsmeprivModuloMat', id: idsAsmepriv[4] },
    { variable: 'precioBayresAdultos', id: idsBayresPlan[0] },
    { variable: 'precioBayresHijoHasta25', id: idsBayresPlan[1] },
    { variable: 'precioBayresAd18a49', id: idsBayresPlan[2] },
    { variable: 'precioBayresJovenSinMaternidad', id: idsBayresPlan[3] },
    { variable: 'precioBayresInd18a29', id: idsBayresPlan[4] },
    { variable: 'precioHominis', id: idsHominis },
    { variable: 'precioSaludcentralTitular', id: idsSaludcentral[0] },
    { variable: 'precioSaludcentralConyuge', id: idsSaludcentral[1] },
    { variable: 'precioSaludcentralHijo1', id: idsSaludcentral[2] },
    { variable: 'precioSaludcentralHijo2', id: idsSaludcentral[3] }
  ];

  const promises = productQueries.map(async (query) => {
      try {
          const result = await fetchProductPrice(query.id);
          
      //     // Si el resultado es null, undefined o vacío, devolvemos el objeto con la propiedad "precios" vacía
      //     return { [query.variable]: result ? { precios: result } : { precios: {} } };
      // } catch (error) {
      //     // Si hay un error, devolvemos un objeto con la propiedad "precios" vacía
      //     return { [query.variable]: { precios: {} } };
       
      
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


  //  const ids = functions.imprimirPrecios(prices,tipo_IngresoPDMI,group,idAdultosMedife,idPrevencion,IdDoctored,IdsAvalian,idsCristalyRas,idsLuisPasteur,idsAsmepriv,idsBayresPlan,idsHominis)

   let concatenarPrecios = functions.valor_prepagas(aporte_OS,edad_1,edad_2,numHijos,numhijo2,prices,afinidad,bonAfinidad,group,grupo,idOmint,edadIdPremedic,grupoFam,segvida,segvida1,supras,gen,grupo[3]);

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