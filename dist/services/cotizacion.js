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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPrecio = void 0;
const database_1 = require("../config/database");
const index_1 = __importDefault(require("./index"));
const index_2 = require("./index");
const funciones = __importStar(require("../funciones"));
(0, index_2.importModules)();
// Puedes acceder a cada función por su nombre
const calcularPrecio = async (req, res) => {
    const formCotizar = req.body;
    const empresasCollection = database_1.collections.empresas;
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
    const { coeficientes } = formCotizar;
    // const { name } = formCotizar;
    // const { email } = formCotizar;
    // const { phone } = formCotizar;
    // const { region } = formCotizar;
    // const { name } = formCotizar;
    // const { email } = formCotizar;
    // const { phone } = formCotizar;
    // const { region } = formCotizar;
    console.log(edad_1 + " ; " + edad_2 + " ; " + numkids);
    let grupo = funciones.grupoFamiliar(edad_1, edad_2, numkids);
    console.log(grupo);
    const coeficientesConComillas = {};
    for (const nombreEmpresa in coeficientes) {
        if (Object.prototype.hasOwnProperty.call(coeficientes, nombreEmpresa)) {
            coeficientesConComillas[nombreEmpresa] = coeficientes[nombreEmpresa];
        }
    }
    const beneficiariosF184 = cantAport;
    const eleccionSueldoOAporte = aporteOS;
    const sueldoSueldoOAporte = sueldo;
    const categoria_Mono = "";
    const arrayValorMonotXCategoria = [];
    const coeficienteSwissMedical = coeficientesConComillas['Swiss Medical'];
    const coeficienteOMINT = coeficientesConComillas['OMINT'];
    const coeficienteAvalian = coeficientesConComillas['Avalian'];
    const coeficienteMedife = coeficientesConComillas['Medife'];
    const coeficienteGaleno = coeficientesConComillas['Galeno'];
    const coeficientePremedic = coeficientesConComillas['Premedic'];
    const coeficienteOSDE = coeficientesConComillas['OSDE'];
    const coeficienteBayresPlan = coeficientesConComillas['Bayres Plan'];
    const coeficienteSaludCentral = coeficientesConComillas['Salud Central'];
    const coeficienteSanCorSalud = coeficientesConComillas['SanCor Salud'];
    const coeficienteDoctored = coeficientesConComillas['Doctored'];
    const coeficientePrevencionSalud = coeficientesConComillas['Prevencion Salud'];
    console.log(beneficiariosF184);
    let num_adultos = grupo[0]; //checked
    let numhijo1 = grupo[1]; //checked
    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];
    console.log(beneficiariosF184);
    const objetoResultadoConComillasSimples = {};
    empresasCollection?.find({}).toArray()
        .then(empresas => {
        const objetoResultado = {};
        empresas.forEach(empresa => {
            if (empresa.name && empresa.factores && empresa.factores.coeficiente !== undefined) {
                objetoResultado[empresa.name] = empresa.factores.coeficiente;
            }
        });
        for (const nombreEmpresa in objetoResultado) {
            if (Object.prototype.hasOwnProperty.call(objetoResultado, nombreEmpresa)) {
                objetoResultadoConComillasSimples[nombreEmpresa] = objetoResultado[nombreEmpresa];
            }
        }
        // El objeto resultado contiene { name: coeficiente } para cada empresa válida
    })
        .catch(err => {
        // console.error('Error al obtener los documentos de la colección:', err);
    });
    let tipo_IngresoPDMI = funciones.tipoAsociado(tipo);
    console.log(tipo_IngresoPDMI);
    const aporte_OS = [tipo_IngresoPDMI, beneficiariosF184, eleccionSueldoOAporte, sueldoSueldoOAporte, categoria_Mono, arrayValorMonotXCategoria];
    let idSancor = funciones.productID(edad_1, tipo, gen, 'titular', numHijos);
    let edadID1 = { _id: idSancor[0] };
    let hijoId = { _id: idSancor[2] };
    let hijo2Id = { _id: idSancor[3] };
    let idSancor1 = funciones.productID(edad_2, tipo, gen, 'conyuge', numHijos);
    let edadID2 = { _id: idSancor1[1] };
    // <! -----------------------------ID GALENO START---------------------------------------------------->
    let idGaleno = funciones.productIdGaleno(edad_1, edad_2, tipo, numHijos);
    let edadIdGaleno = { _id: 'galeno' + idGaleno };
    let priceGrupoGaleno = await index_1.default.getPrecioById(edadIdGaleno);
    let precioGrupoGaleno = priceGrupoGaleno?.precios;
    // <! -----------------------------ID GALENO END---------------------------------------------------->
    // <! -----------------------------ID PREMEDIC START---------------------------------------------------->
    let edadIdPremedic = funciones.productIdPremedic(edad_1, edad_2, tipo, numHijos);
    let edadAdultos = { _id: 'premedic' + edadIdPremedic };
    let hijoIdmenor1preme = { _id: 'premedic' + tipo + 'AD-1anio' };
    let hijoIdmenor25preme = { _id: 'premedic' + tipo + 'AD-25' };
    let priceAdultosPr = await index_1.default.getPrecioById(edadAdultos);
    let pricePrHijoMenir1 = await index_1.default.getPrecioById(hijoIdmenor1preme);
    let pricePrHijoMenir25 = await index_1.default.getPrecioById(hijoIdmenor25preme);
    let precioAdultosPr = priceAdultosPr?.precios;
    let precioPrHijoMenir1 = pricePrHijoMenir1?.precios;
    let precioPrHijoMenir25 = pricePrHijoMenir25?.precios;
    console.log(precioAdultosPr);
    console.log(precioPrHijoMenir1);
    console.log(precioPrHijoMenir25);
    let valorpREMEDIC = funciones.valorPremedic(aporte_OS, coeficienteSanCorSalud, numkids, precioAdultosPr, precioPrHijoMenir25, precioPrHijoMenir1, edadIdPremedic, afinidad, bonAfinidad);
    console.log(valorpREMEDIC);
    // <! -----------------------------ID PREMEDIC END---------------------------------------------------->
    // <! -----------------------------ID OMINT START---------------------------------------------------->
    let idOmint = funciones.productIdOmint(edad_1, tipo, 'titular');
    let edadID1OMINT = { _id: idOmint[0] };
    let edadID2OMINT = { _id: funciones.productIdOmint(edad_2, tipo, 'conyuge')[1] };
    let hijoIdOMINT = { _id: idOmint[2] };
    let hijo2IdOMINT = { _id: idOmint[3] };
    // <! -----------------------------ID OMINT END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
    let price1Hijo = await index_1.default.getPrecioById(hijoId);
    let precio1Hijo = price1Hijo?.precios;
    let price2Hijo = await index_1.default.getPrecioById(hijo2Id);
    let precio2Hijo = price2Hijo?.precios;
    let priceTitular = await index_1.default.getPrecioById(edadID1);
    let precioTitular = priceTitular?.precios;
    let precioConyuge;
    if (edad_2 > 17) {
        let priceConyuge = await index_1.default.getPrecioById(edadID2);
        precioConyuge = priceConyuge?.precios;
    }
    else { }
    let valorSanCor = funciones.valorSancorSalud(aporte_OS, coeficienteSanCorSalud, edad_1, // dato del formulario - edad del titular
    edad_2, // dato del formulario - edad del conyuge
    numkids, // dato del formulario - cantidad total de hijos
    precio1Hijo, // busqueda por _id en lista de precio
    precio2Hijo, // busqueda por _id en lista de precio
    precioTitular, // busqueda por _id en lista de precio
    precioConyuge, // busqueda por _id en lista de precio
    numhijo2, // respuesta funcion grupoFamiliar
    grupoFam, // respuesta funcion grupoFamiliar
    segvida, // dato del formulario ( check = true/false )
    segvida1, // dato del formulario ( check = true/false )
    supras, // dato del formulario ( check = true/false )
    afinidad, // dato del formulario ( check = true/false )
    bonAfinidad, // dato del formulario 
    gen // respuesta funcion grupoFamiliars
    );
    // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO OMINT START------------------------------------------------------>
    let price_titular_Omint = await index_1.default.getPrecioById(edadID1OMINT);
    let precio_titular_Omint = price_titular_Omint?.precios;
    let price_conyuge_Omint = await index_1.default.getPrecioById(edadID2OMINT);
    let precio_conyuge_Omint = price_conyuge_Omint?.precios;
    let price_hijo1_Omint = await index_1.default.getPrecioById(hijoIdOMINT);
    let precio_hijo1_Omint = price_hijo1_Omint?.precios;
    let price_hijo2_Omint = await index_1.default.getPrecioById(hijo2IdOMINT);
    let precio_hijo2_Omint = price_hijo2_Omint?.precios;
    let valor_Omint = funciones.valorOmint(aporte_OS, edad_2, // dato del formulario - edad del conyuge
    numHijos, // respuesta funcion grupoFamiliar
    numhijo2, // hijos a partir del segundo 
    precio_titular_Omint, // busqueda por _id en lista de precio
    precio_conyuge_Omint, // busqueda por _id en lista de precio
    precio_hijo1_Omint, // busqueda por _id en lista de precio
    precio_hijo2_Omint, // busqueda por _id en lista de precio
    edadID1OMINT, // id Titular
    afinidad, // dato del formulario ( check = true/false )
    bonAfinidad, // dato del formulario % de descuento
    coeficienteOMINT);
    // <! -----------------------------VALOR PRECIO OMINT END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
    let valorGaleno = funciones.valorGaleno(aporte_OS, precioGrupoGaleno, coeficienteGaleno);
    // <! -----------------------------VALOR PRECIO GALENO END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
    let idTitularSwiss = funciones.productIdSwiss(edad_1, tipo_IngresoPDMI);
    let idConyugeSwiss = funciones.productIdSwiss(edad_2, tipo_IngresoPDMI);
    let idHijo1Swiss = tipo_IngresoPDMI + '1h';
    let idHijo2Swiss = tipo_IngresoPDMI + '2h';
    ;
    let titular_Swiss = { _id: 'swiss' + idTitularSwiss };
    let conyuge_Swiss = { _id: 'swiss' + idConyugeSwiss };
    let hijo1Swiss = { _id: 'swiss' + idHijo1Swiss };
    let hijo2Swiss = { _id: 'swiss' + idHijo2Swiss };
    let priceTitularSwiss = await index_1.default.getPrecioById(titular_Swiss);
    let priceConyugeSwiss = await index_1.default.getPrecioById(conyuge_Swiss);
    let priceHijo1Swiss = await index_1.default.getPrecioById(hijo1Swiss);
    let priceHijo2Swiss = await index_1.default.getPrecioById(hijo2Swiss);
    let precioTitularSwiss = priceTitularSwiss?.precios;
    let precioConyugeSwiss = priceConyugeSwiss?.precios;
    let precioHijo1Swiss = priceHijo1Swiss?.precios;
    let precioHijo2Swiss = priceHijo2Swiss?.precios;
    let valorSwiss = funciones.valorSwiss(aporte_OS, edad_1, edad_2, numkids, numhijo2, precioTitularSwiss, precioConyugeSwiss, precioHijo1Swiss, precioHijo2Swiss, coeficienteSwissMedical);
    // <! -----------------------------VALOR PRECIO MEDIFE START---------------------------------------------------->
    let idAdultosMedife = funciones.productIdMedife(edad_1, edad_1, tipo_IngresoPDMI);
    let idHIjo0a1 = tipo_IngresoPDMI + 'HIJO0a1';
    let idHIjo0a20 = tipo_IngresoPDMI + 'HIJO2a20';
    let idHIjo0a25 = tipo_IngresoPDMI + 'HIJO25';
    let id_AdultosMedife = { _id: 'medife' + idAdultosMedife };
    let id_HIjo0a1 = { _id: 'medife' + idHIjo0a1 };
    let id_HIjo0a20 = { _id: 'medife' + idHIjo0a20 };
    let id_HIjo0a25 = { _id: 'medife' + idHIjo0a25 };
    let priceTitularMedife = await index_1.default.getPrecioById(id_AdultosMedife);
    let priceHijo1Medife = await index_1.default.getPrecioById(id_HIjo0a1);
    let priceHijo20Medife = await index_1.default.getPrecioById(id_HIjo0a20);
    let priceHijo25Medife = await index_1.default.getPrecioById(id_HIjo0a25);
    let precioTitularMedife = priceTitularMedife?.precios;
    let precioHijo1Medife = priceHijo1Medife?.precios;
    let precioHijo20Medife = priceHijo1Medife?.precios;
    let precioHijo25Medife = priceHijo25Medife;
    // let valorMedife = funciones.valorMedife(
    //   aporte_OS,
    //   edad_1, 
    //   edad_2, 
    //   numkids,
    //   numhijo2,
    //   precioTitularMedife,
    //   precioHijo1Medife,
    //   precioHijo20Medife,
    //   precioHijo25Medife,
    //   coeficienteMedife
    // )
    // <! -----------------------------VALOR PRECIO MEDIFE END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO PREVENCION SALUD ---------------------------------------------------->
    let idPrevencion = funciones.productIdPrevencion(edad_1, edad_1, numkids, tipo_IngresoPDMI);
    let id_Prevencion = { _id: 'prevencion' + idPrevencion };
    let pricePrevencion = await index_1.default.getPrecioById(id_Prevencion);
    let precioPrevencion = pricePrevencion?.precios;
    // let valorMedife = funciones.valorMedife(
    //   aporte_OS,
    //   edad_1, 
    //   edad_2, 
    //   numkids,
    //   numhijo2,
    //   precioTitularMedife,
    //   precioHijo1Medife,
    //   precioHijo20Medife,
    //   precioHijo25Medife,
    //   coeficienteMedife
    // )
    // <! -----------------------------VALOR PRECIO PREVENCION SALUD END---------------------------------------------------->
    let preciosDetodos = [valorSanCor, valor_Omint, valorpREMEDIC, valorGaleno, valorSwiss];
    const preciosTodos = valorSanCor.concat(valor_Omint, valorpREMEDIC, valorGaleno, valorSwiss);
    const precioCalculado = preciosTodos;
    // Utiliza Promesas para realizar la consulta y obtener los documentos
    const obtenerPlanes = () => {
        return new Promise((resolve, reject) => {
            index_1.default.getPlanes()
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
        const planesFiltradosOmint = planes.filter((plan) => { return plan.empresa === 'OMINT'; });
        const planesFiltradosGaleno = planes.filter((plan) => { return plan.empresa === 'Galeno'; });
        const planesFiltradosPremedic = planes.filter((plan) => { return plan.empresa === 'Premedic'; });
        const planesFiltradosSancor = planes.filter((plan) => { return plan.empresa === 'SanCor Salud'; });
        const planesFiltradosSwiss = planes.filter((plan) => { return plan.empresa === 'Swiss Medical'; });
        const combinedPlansOmint = funciones.combinePlansWithPrices(planesFiltradosOmint, valor_Omint);
        const combinedPlansSancor = funciones.combinePlansWithPrices(planesFiltradosSancor, valorSanCor);
        const combinedPlansPremedic = funciones.combinePlansWithPrices(planesFiltradosPremedic, valorpREMEDIC);
        const combinedPlansGaleno = funciones.combinePlansWithPrices(planesFiltradosGaleno, valorGaleno);
        const combinedPlansSwiss = funciones.combinePlansWithPrices(planesFiltradosSwiss, valorSwiss);
        //  const filteredPlansGaleno = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);    
        // Filtrar los planes con precioCalculado mayor que 0
        // const galenoPlanes = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa !== 'GALENO');
        // const filteredPlans = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);    
        // Separar en dos arrays: uno para OMINT y otro para las otras empresas
        const combinedPlansOmintMayora0 = combinedPlansOmint.filter((plan) => plan.precio > 0);
        const combinedPlansOmintFiltrados = combinedPlansOmintMayora0.filter((plan) => {
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
            }
            if (tipo === 'D') {
                if (plan.item_id.endsWith('S')) {
                    return true;
                }
            }
            return false;
        });
        // let planesOmintAgrupados  = functions.agruparYTransformarPlanes(combinedPlansOmintFiltrados);
        // const resultadoFinal = otrasEmpresasPlanes.concat(planesOmintAgrupados);
        const concatenarPlanes = combinedPlansOmintFiltrados.concat(combinedPlansSancor, combinedPlansPremedic, combinedPlansGaleno, combinedPlansSwiss);
        const resultado_final = concatenarPlanes.filter((plan) => {
            if (tipo === 'P' && plan.precio === 0) {
                return false;
            }
            return true;
        });
        res.status(200).json({ planes: resultado_final });
    })
        .catch((error) => {
        // Manejar cualquier error que ocurra durante la obtención de los planes
        // // console.error(error);
        res.status(500).json({ error: 'Error al obtener los planes' });
    });
};
exports.calcularPrecio = calcularPrecio;
//# sourceMappingURL=cotizacion.js.map