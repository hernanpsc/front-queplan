import { Request, Response } from 'express';
import * as funciones from '../funciones';
import { collections } from "../conection/database";
import { WithId, Filter } from 'mongodb';
import { Precios } from '../interfaces/precios';

export const  calcularPrecio = async (req: Request, res: Response) => {

    const formCotizar = req.body; // RECIBO DATA FORMULARIOS

    
    const preciosCollection = collections.precios; // IMPORTO LISTA DE PRECIOS
 
// <! -----------------------------DEFINO PROPIEDADES DATOS DE FORMULARIO DE COTIZACION----------------------------------------------------->
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
    
// <! -----------------------------RECIBO DATOS DE FORMULARIO DE CONTACTO----------------------------------------------------->
      // const { name } = formCotizar;
      // const { email } = formCotizar;
      // const { phone } = formCotizar;
      // const { region } = formCotizar;
      // const { name } = formCotizar;
      // const { email } = formCotizar;
      // const { phone } = formCotizar;
      // const { region } = formCotizar;
    
    
// <! -----------------------------DEFINIR VARIABLES COMUNES----------------------------------------------------->
    let grupo = funciones.grupoFamiliar(edad_1, edad_2, numkids);
    let num_adultos = grupo[0]; //checked
    let numhijo1 = grupo[1]; //checked
    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];
    let tipoAsociadoSanCor = funciones.tipoAsociado(tipo,grupoFam,cantAport);

// <! -----------------------------DEFINIR DE VARIABLES SANCOR SALUD----------------------------------------------------->    
    let idSancor = funciones.productID(edad_1, tipo, gen, 'titular', numHijos);
    let edadID1 : Filter<Precios> = { _id:  'sancor'+ idSancor[0]}; 
    let edadID2 : Filter<Precios> = { _id:  'sancor'+ funciones.productID(edad_2, tipo, gen, 'conyuge', numHijos)[1]}; 
    let hijoId : Filter<Precios> = { _id:  'sancor' + idSancor[2]};
    let hijo2Id : Filter<Precios> = { _id: 'sancor' + idSancor[3]};

// <! -----------------------------DEFINIR DE VARIABLES GALENO----------------------------------------------------->

    let edadIdGaleno : Filter<Precios> = { _id: 'galeno'+ funciones.productIdGaleno(edad_1, edad_2, tipo, numHijos)};

// <! -----------------------------DEFINIR DE VARIABLES PREMEDIC----------------------------------------------------->
let edadIdPremedic : Filter<Precios> = { _id: 'premedic'+ funciones.productIdPremedic(edad_1, edad_2, tipo, numHijos)};
let hijoIdmenor1preme : Filter<Precios> = { _id: 'premedic'+tipo + 'AD-1anio'};
let hijoIdmenor25preme : Filter<Precios> = { _id: 'premedic'+tipo + 'AD-25'};

// <! -----------------------------DEFINIR DE VARIABLES OMINT----------------------------------------------------->
let idOmint : Filter<Precios> = { _id: funciones.productIdOmint(edad_1, tipo, 'titular')};
let edadID1OMINT : Filter<Precios> = { _id: 'omint'+ idOmint[0]};
let edadID2OMINT : Filter<Precios> = { _id: 'omint'+ funciones.productIdOmint(edad_2, tipo, 'conyuge')[1]};
let hijoIdOMINT : Filter<Precios> = { _id: 'omint'+ idOmint[2]};
let hijo2IdOMINT : Filter<Precios> = { _id: 'omint'+ idOmint[3]};
// <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
let price1Hijo : WithId<Precios> = await preciosCollection.findOne(hijoId);
let precio1Hijo = price1Hijo.precios;

let price2Hijo : WithId<Precios> = await preciosCollection.findOne(hijo2Id);    
let precio2Hijo = price2Hijo.precios;

let priceTitular : WithId<Precios> = await preciosCollection.findOne(edadID1);
let precioTitular = priceTitular.precios;

let precioConyuge: WithId<Precios> | null = null;
if (edad_2 > 17) {
  precioConyuge = await preciosCollection.findOne(edadID2);
}


// <! -----------------------------LLAMO FUNCION PRECIO SANCOR START---------------------------------------------------->
let valorSanCor = funciones.valorSancorSalud(
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
console.log(valorSanCor);
// <! -----------------------------LLAMO FUNCION PRECIO SANCOR END---------------------------------------------------->


// <! -----------------------------LLAMO FUNCION PRECIO PREMEDIC START---------------------------------------------------->
let valueAdultosPremedic : WithId<Precios> = await preciosCollection.findOne(edadIdPremedic);
let valorAdultosPremedic = valueAdultosPremedic.precios;

let pricehm1 : WithId<Precios> = await preciosCollection.findOne(hijoIdmenor1preme);
let preciohm1 = pricehm1.precios;

let pricehm25 : WithId<Precios> = await preciosCollection.findOne(hijoIdmenor25preme);
let preciohm25 = pricehm25.precios;

let valor_Premedic = funciones.valorPremedic(
edad_2, // dato del formulario - edad del conyuge
numkids,
valorAdultosPremedic,
preciohm25,
preciohm1,
edadIdPremedic,
afinidad, // dato del formulario ( check = true/false )
bonAfinidad, // dato del formulario % de descuento
tipo  // dato del formulario
);
console.log(valor_Premedic);

// <! -----------------------------LLAMO FUNCION PRECIO PREMEDIC END----------------------------------------------------->

// <! -----------------------------LLAMO FUNCION PRECIO GALENO START----------------------------------------------------->
// let valueGaleno : WithId<Precios> = await preciosCollection.findOne(edadIdGaleno);
// let valorGaleno = valueGaleno.precios;
// <! -----------------------------LLAMO FUNCION PRECIO GALENO END----------------------------------------------------->

// <! -----------------------------LLAMO FUNCION PRECIO OMINT START------------------------------------------------------>
let price_titular_Omint: WithId<Precios> = await preciosCollection.findOne(edadID1OMINT);
let precio_titular_Omint= price_titular_Omint;

let price_conyuge_Omint: WithId<Precios> = await preciosCollection.findOne(edadID2OMINT);
let precio_conyuge_Omint = price_conyuge_Omint;

let price_hijo1_Omint: WithId<Precios> = await preciosCollection.findOne(hijoIdOMINT);
let precio_hijo1_Omint = price_hijo1_Omint;

let price_hijo2_Omint: WithId<Precios> = await preciosCollection.findOne(hijo2IdOMINT);
let precio_hijo2_Omint = price_hijo2_Omint;

let valor_Omint = funciones.valorOmint(
  edad_2, // dato del formulario - edad del conyuge
  numHijos,  // respuesta funcion grupoFamiliar
  precio_titular_Omint,  // busqueda por _id en lista de precio
  precio_conyuge_Omint,  // busqueda por _id en lista de precio
  precio_hijo1_Omint,  // busqueda por _id en lista de precio
  precio_hijo2_Omint,  // busqueda por _id en lista de precio
  edadID1OMINT // id Titular
  );
  // <! -----------------------------LLAMO FUNCION PRECIO OMINT END---------------------------------------------------->

  let preciosDetodos =  [valorSanCor,valor_Omint];

  const preciosTodos = valorSanCor.concat(valor_Omint);
 
  console.log(preciosTodos);


      const precioCalculado = preciosTodos; 
      res.status(200).json({ precio: precioCalculado });
    
};

