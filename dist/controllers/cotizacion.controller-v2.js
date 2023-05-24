"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPrecio = void 0;
const funciones = __importStar(require("../funciones"));
const database_1 = require("../conection/database");
const calcularPrecio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formCotizar = req.body;
    const preciosCollection = database_1.collections.precios;
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
    let grupo = funciones.grupoFamiliar(edad_1, edad_2, numkids);
    let num_adultos = grupo[0]; //checked
    let numhijo1 = grupo[1]; //checked
    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];
    let tipoAsociadoSanCor = funciones.tipoAsociado(tipo, grupoFam, cantAport);
    let idSancor = funciones.productID(edad_1, tipo, gen, 'titular', numHijos);
    let edadID1 = { _id: 'sancor' + idSancor[0] };
    let edadID2 = { _id: 'sancor' + funciones.productID(edad_2, tipo, gen, 'conyuge', numHijos)[1] };
    let hijoId = { _id: 'sancor' + idSancor[2] };
    let hijo2Id = { _id: 'sancor' + idSancor[3] };
    let edadIdGaleno = { _id: 'galeno' + funciones.productIdGaleno(edad_1, edad_2, tipo, numHijos) };
    let edadIdPremedic = { _id: 'premedic' + funciones.productIdPremedic(edad_1, edad_2, tipo, numHijos) };
    let hijoIdmenor1preme = { _id: 'premedic' + tipo + 'AD-1anio' };
    let hijoIdmenor25preme = { _id: 'premedic' + tipo + 'AD-25' };
    let idOmint = { _id: funciones.productIdOmint(edad_1, tipo, 'titular') };
    let edadID1OMINT = { _id: 'omint' + idOmint[0] };
    let edadID2OMINT = { _id: 'omint' + funciones.productIdOmint(edad_2, tipo, 'conyuge')[1] };
    let hijoIdOMINT = { _id: 'omint' + idOmint[2] };
    let hijo2IdOMINT = { _id: 'omint' + idOmint[3] };
    // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
    let price1Hijo = yield preciosCollection.findOne(hijoId);
    let precio1Hijo = price1Hijo.precios;
    let price2Hijo = yield preciosCollection.findOne(hijo2Id);
    let precio2Hijo = price2Hijo.precios;
    let priceTitular = yield preciosCollection.findOne(edadID1);
    let precioTitular = priceTitular.precios;
    let precioConyuge = null;
    if (edad_2 > 17) {
        precioConyuge = yield preciosCollection.findOne(edadID2);
    }
    let valorSanCor = funciones.valorSancorSalud(edad_2, // dato del formulario - edad del conyuge
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
    gen // respuesta funcion grupoFamiliars
    );
    console.log(valorSanCor);
    // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO PREMEDIC START---------------------------------------------------->
    let valueAdultosPremedic = yield preciosCollection.findOne(edadIdPremedic);
    let valorAdultosPremedic = valueAdultosPremedic.precios;
    let pricehm1 = yield preciosCollection.findOne(hijoIdmenor1preme);
    let preciohm1 = pricehm1.precios;
    let pricehm25 = yield preciosCollection.findOne(hijoIdmenor25preme);
    let preciohm25 = pricehm25.precios;
    let valor_Premedic = funciones.valorPremedic(edad_2, // dato del formulario - edad del conyuge
    numkids, valorAdultosPremedic, preciohm25, preciohm1, edadIdPremedic, afinidad, // dato del formulario ( check = true/false )
    bonAfinidad, // dato del formulario % de descuento
    tipo // dato del formulario
    );
    console.log(valor_Premedic);
    // <! -----------------------------VALOR PRECIO PREMEDIC END----------------------------------------------------->
    // <! -----------------------------VALOR PRECIO GALENO START----------------------------------------------------->
    // let valueGaleno : WithId<Precios> = await preciosCollection.findOne(edadIdGaleno);
    // let valorGaleno = valueGaleno.precios;
    // <! -----------------------------VALOR PRECIO GALENO END----------------------------------------------------->
    // <! -----------------------------VALOR PRECIO OMINT START------------------------------------------------------>
    let price_titular_Omint = yield preciosCollection.findOne(edadID1OMINT);
    let precio_titular_Omint = price_titular_Omint;
    let price_conyuge_Omint = yield preciosCollection.findOne(edadID2OMINT);
    let precio_conyuge_Omint = price_conyuge_Omint;
    let price_hijo1_Omint = yield preciosCollection.findOne(hijoIdOMINT);
    let precio_hijo1_Omint = price_hijo1_Omint;
    let price_hijo2_Omint = yield preciosCollection.findOne(hijo2IdOMINT);
    let precio_hijo2_Omint = price_hijo2_Omint;
    let valor_Omint = funciones.valorOmint(edad_2, // dato del formulario - edad del conyuge
    numHijos, // respuesta funcion grupoFamiliar
    precio_titular_Omint, // busqueda por _id en lista de precio
    precio_conyuge_Omint, // busqueda por _id en lista de precio
    precio_hijo1_Omint, // busqueda por _id en lista de precio
    precio_hijo2_Omint, // busqueda por _id en lista de precio
    edadID1OMINT // id Titular
    );
    // <! -----------------------------VALOR PRECIO OMINT END---------------------------------------------------->
    let preciosDetodos = [valorSanCor, valor_Omint];
    // const preciosTodos = valorSanCor.concat(valor_Omint);
    // console.log(preciosTodos);
    // const precioCalculado = preciosTodos; 
    // res.status(200).json({ precio: precioCalculado });
});
exports.calcularPrecio = calcularPrecio;
//# sourceMappingURL=cotizacion.controller-v2.js.map