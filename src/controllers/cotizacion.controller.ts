import { Request, Response } from 'express';
import { collections } from "../conection/database";
import { WithId, Filter } from 'mongodb';
import { Precios } from '../interfaces/precios';
import { combinePlansWithPrices } from '../funciones'; // Reemplaza './combineArrays' con la ruta real al archivo

// import { productIdOmint, grupoFamiliar, tipoAsociado, productID,valorSancorSalud,valorOmint } from '../funciones';
import * as functions from '../funciones';

export const  calcularPrecio = async (req: Request, res: Response) => {

    const formCotizar = req.body;
    const preciosCollection = collections.precios;
    const planesCollection = collections.todoslosplanes;    
    
    console.log('Datos recibidos en el servidor del formulario:', formCotizar);
    const { edad_1 } = formCotizar; // edad1
    const { edad_2 } = formCotizar; // edad2
    const { numkids } = formCotizar; // kids
    const { grupofamilia } = formCotizar;
    const { empresa_prepaga } = formCotizar; // prepaga
    const { tipo } = formCotizar; // tipoIngreso
    const { agree } = formCotizar;
    const { aporteOS } = formCotizar; // Tipo_de_Dato
    const { sueldo } = formCotizar; // sueldo
    const { aporte } = formCotizar;
    const { monoadic } = formCotizar; // monoAdicional
    const { cantAport } = formCotizar; // cantAport
    const { afinidad } = formCotizar; // afinidadCheck
    const { bonAfinidad } = formCotizar; // bonifAf
    const { supras } = formCotizar; // supras
    const { segvida } = formCotizar; // segVida1
    const { segvida1 } = formCotizar; // segVida2
    const { region } = formCotizar;
    
      // const { name } = formCotizar;
      // const { email } = formCotizar;
      // const { phone } = formCotizar;
      // const { region } = formCotizar;
      // const { name } = formCotizar;
      // const { email } = formCotizar;
      // const { phone } = formCotizar;
      // const { region } = formCotizar;
    let grupo = functions.grupoFamiliar(edad_1, edad_2, numkids);
    let num_adultos = grupo[0]; //checked
    let numhijo1 = grupo[1]; //checked
    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];

    
    let tipoAsociadoSanCor = functions.tipoAsociado(tipo,grupoFam,cantAport);
    
    let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos);
let edadID1 : Filter<Precios> = { _id: idSancor[0]};  console.log(edadID1)
let hijoId : Filter<Precios> = { _id: idSancor[2]}; console.log(hijoId)
let hijo2Id : Filter<Precios> = { _id: idSancor[3]}; console.log(hijo2Id)
console.log(edad_2)
let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos);
let edadID2 : Filter<Precios> = { _id: idSancor1[1]};  console.log(edadID2);

// <! -----------------------------ID GALENO START---------------------------------------------------->
let edadIdGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos);
// <! -----------------------------ID GALENO END---------------------------------------------------->


// <! -----------------------------ID PREMEDIC START---------------------------------------------------->
let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos);
let hijoIdmenor1preme : Filter<Precios> = { _id: 'premedic'+tipo + 'AD-1anio'};
let hijoIdmenor25preme : Filter<Precios> = { _id: 'premedic'+tipo + 'AD-25'};

console.log("Este es el id del titular de PREMEDIC " + edadIdPremedic)
console.log("Este es el id del hijo menor de 1 año PREMEDIC " + hijoIdmenor1preme)
console.log("Este es el id del hijo menor de 25 año PREMEDIC " +hijoIdmenor25preme)
// <! -----------------------------ID PREMEDIC END---------------------------------------------------->


// <! -----------------------------ID OMINT START---------------------------------------------------->
let idOmint =  functions.productIdOmint(edad_1, tipo, 'titular');
// console.log("este es el del componente 1 :" + idOmint[0]);
// console.log("este es el del componente 2:" + idOmint[1]);
// console.log("este es el del componente 3:" + idOmint[2]);
// console.log("este es el del componente 4:" + idOmint[3]);

let edadID1OMINT : Filter<Precios> = { _id: idOmint[0]};
let edadID2OMINT : Filter<Precios> = {_id: functions.productIdOmint(edad_2, tipo, 'conyuge')[1]};
let hijoIdOMINT : Filter<Precios> = { _id: idOmint[2]};
let hijo2IdOMINT : Filter<Precios> = { _id: idOmint[3]};
// <! -----------------------------ID OMINT END---------------------------------------------------->

// <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
let price1Hijo : WithId<Precios> = await preciosCollection.findOne(hijoId);
let precio1Hijo = price1Hijo.precios;
// console.log('precio hijo1 Sancor : ');
// console.log(precio1Hijo);

let price2Hijo : WithId<Precios> = await preciosCollection.findOne(hijo2Id);    
let precio2Hijo = price2Hijo.precios;
// console.log('precio hijo2 Sancor : ');
// console.log(precio2Hijo);

let priceTitular : WithId<Precios> = await preciosCollection.findOne(edadID1);
let precioTitular = priceTitular.precios;
// console.log('precio Titular Sancor : ');
// console.log(precioTitular);
// console.log(edadID2);

let precioConyuge
if (edad_2 > 17) {
  let priceConyuge : WithId<Precios> = await preciosCollection.findOne(edadID2);
  // console.log(priceConyuge.precios)
  precioConyuge = priceConyuge.precios;
  // console.log('precio Conyuge Sancor : ');
  // console.log(precioConyuge);
}else {}

let valorSanCor = functions.valorSancorSalud(
  edad_2, // dato del formulario - edad del conyuge
  numkids, // dato del formulario - cantidad total de hijos
  precio1Hijo, // busqueda por _id en lista de precio
  precio2Hijo, // busqueda por _id en lista de precio
  precioTitular, // busqueda por _id en lista de precio
  precioConyuge, // busqueda por _id en lista de precio
  numhijo2, // respuesta funcion grupoFamiliar
  tipoAsociadoSanCor, // funcion sobro condicion de ingreso
  aporteOS, // dato del formulario - tipo de dato, si es el aporte del recibo o el sueldo bruto
  sueldo, // dato del formulario - El monto
  cantAport, // dato del formulario - cantidad de aportantes al monotributo
  grupoFam, // respuesta funcion grupoFamiliar
  segvida, // dato del formulario ( check = true/false )
  segvida1, // dato del formulario ( check = true/false )
  supras, // dato del formulario ( check = true/false )
  afinidad, // dato del formulario ( check = true/false )
  bonAfinidad, // dato del formulario 
  gen  // respuesta funcion grupoFamiliars

  );
// console.log( ' Valor SanCor ')
// console.log( valorSanCor);
// <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->

// <! -----------------------------VALOR PRECIO OMINT START------------------------------------------------------>
let price_titular_Omint: WithId<Precios> = await preciosCollection.findOne(edadID1OMINT);
let precio_titular_Omint= price_titular_Omint.precios;
// console.log('Precio titular OMINT :');
// console.log(precio_titular_Omint);

let price_conyuge_Omint: WithId<Precios> = await preciosCollection.findOne(edadID2OMINT);
let precio_conyuge_Omint = price_conyuge_Omint.precios;
// console.log('Precio Conyuge OMINT :');
// console.log(precio_conyuge_Omint);

let price_hijo1_Omint: WithId<Precios> = await preciosCollection.findOne(hijoIdOMINT);
let precio_hijo1_Omint = price_hijo1_Omint.precios;
// console.log('Precio Hijo 1 OMINT :'  );
// console.log(precio_hijo1_Omint);


let price_hijo2_Omint: WithId<Precios> = await preciosCollection.findOne(hijo2IdOMINT);
let precio_hijo2_Omint = price_hijo2_Omint.precios;
// console.log('Precio Hijo 2 OMINT :');
// console.log(precio_hijo2_Omint);

let valor_Omint = functions.valorOmint(
  edad_2, // dato del formulario - edad del conyuge
  numHijos,  // respuesta funcion grupoFamiliar
  numhijo2, // hijos a partir del segundo 
  precio_titular_Omint,  // busqueda por _id en lista de precio
  precio_conyuge_Omint,  // busqueda por _id en lista de precio
  precio_hijo1_Omint,  // busqueda por _id en lista de precio
  precio_hijo2_Omint,  // busqueda por _id en lista de precio
  edadID1OMINT, // id Titular
  afinidad, // dato del formulario ( check = true/false )
  bonAfinidad, // dato del formulario % de descuento
  tipo,  // dato del formulario
  aporteOS, // dato del formulario - tipo de dato, si es el aporte del recibo o el sueldo bruto
  sueldo, // dato del formulario - El monto
  cantAport // dato del formulario - cantidad de aportantes al monotributo

  );
  // console.log(' Valor OMINT  :')
  // console.log(valor_Omint);

  // <! -----------------------------VALOR PRECIO OMINT END---------------------------------------------------->

  let preciosDetodos =  [valorSanCor,valor_Omint];

  const preciosTodos = valorSanCor.concat(valor_Omint);
 // console.log('precios de todos : ');
  // console.log(preciosTodos);


      const precioCalculado = preciosTodos; 

// Utiliza Promesas para realizar la consulta y obtener los documentos
const obtenerPlanes = () => {
  return new Promise((resolve, reject) => {
    planesCollection.find({}).toArray()
      .then((planes) => {
        resolve(planes);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
obtenerPlanes()
  .then((planes) => {
    // Combinar los planes con precioCalculado
    const combinedPlans = combinePlansWithPrices(planes, precioCalculado);
    // Enviar la respuesta con el resultado combinado
    res.status(200).json({ planes: combinedPlans });  })
  .catch((error) => {
    // Manejar cualquier error que ocurra durante la obtención de los planes
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los planes' });
  });



    
};

