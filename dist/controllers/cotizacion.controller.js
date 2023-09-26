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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPrecio = void 0;
const database_1 = require("../conection/database");
// import { productIdOmint, grupoFamiliar, tipoAsociado, productID,valorSancorSalud,valorOmint } from '../funciones';
const functions = __importStar(require("../funciones"));
// Puedes acceder a cada función por su nombre
const calcularPrecio = async (req, res) => {
    const formCotizar = req.body;
    const preciosCollection = database_1.collections.precios;
    const planesCollection = database_1.collections.todoslosplanes;
    const empresasCollection = database_1.collections.empresas;
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
    const { coeficientes } = formCotizar;
    // const { name } = formCotizar;
    // const { email } = formCotizar;
    // const { phone } = formCotizar;
    // const { region } = formCotizar;
    // const { name } = formCotizar;
    // const { email } = formCotizar;
    // const { phone } = formCotizar;
    // const { region } = formCotizar;
    let grupo = functions.grupoFamiliar(edad_1, edad_2, numkids);
    // console.log("edad_1" + edad_1);
    // console.log("edad_2" + edad_2);
    // console.log("numkids" + numkids);
    // console.log("coeficientes");
    // console.log(coeficientes);
    // console.log(grupo)
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
    // console.log(coeficientesConComillas)
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
    let num_adultos = grupo[0]; //checked
    let numhijo1 = grupo[1]; //checked
    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];
    const objetoResultadoConComillasSimples = {};
    empresasCollection.find({}).toArray()
        .then(empresas => {
        // Crear el objeto con las propiedades deseadas
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
        // console.log(objetoResultadoConComillasSimples);
    })
        .catch(err => {
        // console.error('Error al obtener los documentos de la colección:', err);
    });
    let tipo_IngresoPDMI = functions.tipoAsociado(tipo);
    // console.log('tipo_IngresoPDMI')
    // console.log(tipo_IngresoPDMI)
    const aporte_OS = [tipo_IngresoPDMI, beneficiariosF184, eleccionSueldoOAporte, sueldoSueldoOAporte, categoria_Mono, arrayValorMonotXCategoria];
    let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos);
    let edadID1 = { _id: idSancor[0] }; // console.log(edadID1)
    let hijoId = { _id: idSancor[2] }; // console.log(hijoId)
    let hijo2Id = { _id: idSancor[3] }; // console.log(hijo2Id)
    // console.log(edad_2)
    let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos);
    let edadID2 = { _id: idSancor1[1] }; // console.log(edadID2);
    // <! -----------------------------ID GALENO START---------------------------------------------------->
    let idGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos);
    let edadIdGaleno = { _id: 'galeno' + idGaleno };
    let priceGrupoGaleno = await preciosCollection.findOne(edadIdGaleno);
    // console.log('edad ID galeno  ');
    // console.log(edadIdGaleno);
    let precioGrupoGaleno = priceGrupoGaleno.precios;
    // console.log(precioGrupoGaleno);
    // <! -----------------------------ID GALENO END---------------------------------------------------->
    // <! -----------------------------ID PREMEDIC START---------------------------------------------------->
    let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos);
    let edadAdultos = { _id: 'premedic' + edadIdPremedic };
    let hijoIdmenor1preme = { _id: 'premedic' + tipo + 'AD-1anio' };
    let hijoIdmenor25preme = { _id: 'premedic' + tipo + 'AD-25' };
    let priceAdultosPr = await preciosCollection.findOne(edadAdultos);
    let pricePrHijoMenir1 = await preciosCollection.findOne(hijoIdmenor1preme);
    let pricePrHijoMenir25 = await preciosCollection.findOne(hijoIdmenor25preme);
    // console.log(priceAdultosPr)
    let precioAdultosPr = priceAdultosPr.precios;
    let precioPrHijoMenir1 = pricePrHijoMenir1.precios;
    let precioPrHijoMenir25 = pricePrHijoMenir25.precios;
    let valorpREMEDIC = functions.valorPremedic(aporte_OS, coeficienteSanCorSalud, numkids, precioAdultosPr, precioPrHijoMenir25, precioPrHijoMenir1, edadIdPremedic, afinidad, bonAfinidad);
    // console.log( ' Valor PREMEDIC ')
    // console.log(valorpREMEDIC)
    // <! -----------------------------ID PREMEDIC END---------------------------------------------------->
    // <! -----------------------------ID OMINT START---------------------------------------------------->
    let idOmint = functions.productIdOmint(edad_1, tipo, 'titular');
    // console.log("este es el del componente 1 :" + idOmint[0]);
    // console.log("este es el del componente 2:" + idOmint[1]);
    // console.log("este es el del componente 3:" + idOmint[2]);
    // console.log("este es el del componente 4:" + idOmint[3]);
    let edadID1OMINT = { _id: idOmint[0] };
    let edadID2OMINT = { _id: functions.productIdOmint(edad_2, tipo, 'conyuge')[1] };
    let hijoIdOMINT = { _id: idOmint[2] };
    let hijo2IdOMINT = { _id: idOmint[3] };
    // <! -----------------------------ID OMINT END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
    let price1Hijo = await preciosCollection.findOne(hijoId);
    let precio1Hijo = price1Hijo.precios;
    // console.log('precio hijo1 Sancor : ');
    // console.log(precio1Hijo);
    let price2Hijo = await preciosCollection.findOne(hijo2Id);
    let precio2Hijo = price2Hijo.precios;
    // console.log('precio hijo2 Sancor : ');
    // console.log(precio2Hijo);
    let priceTitular = await preciosCollection.findOne(edadID1);
    let precioTitular = priceTitular.precios;
    // console.log('precio Titular Sancor : ');
    // console.log(precioTitular);
    // console.log(edadID2);
    let precioConyuge;
    if (edad_2 > 17) {
        let priceConyuge = await preciosCollection.findOne(edadID2);
        // console.log(priceConyuge.precios)
        precioConyuge = priceConyuge.precios;
        // console.log('precio Conyuge Sancor : ');
        // console.log(precioConyuge);
    }
    else { }
    let valorSanCor = functions.valorSancorSalud(aporte_OS, coeficienteSanCorSalud, edad_1, // dato del formulario - edad del titular
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
    // console.log( ' Valor SanCor ')
    // console.log( valorSanCor);
    // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO OMINT START------------------------------------------------------>
    let price_titular_Omint = await preciosCollection.findOne(edadID1OMINT);
    let precio_titular_Omint = price_titular_Omint.precios;
    // console.log('Precio titular OMINT :');
    // console.log(precio_titular_Omint);
    let price_conyuge_Omint = await preciosCollection.findOne(edadID2OMINT);
    let precio_conyuge_Omint = price_conyuge_Omint.precios;
    // console.log('Precio Conyuge OMINT :');
    // console.log(precio_conyuge_Omint);
    let price_hijo1_Omint = await preciosCollection.findOne(hijoIdOMINT);
    let precio_hijo1_Omint = price_hijo1_Omint.precios;
    // console.log('Precio Hijo 1 OMINT :'  );
    // console.log(precio_hijo1_Omint);
    let price_hijo2_Omint = await preciosCollection.findOne(hijo2IdOMINT);
    let precio_hijo2_Omint = price_hijo2_Omint.precios;
    // console.log('Precio Hijo 2 OMINT :');
    // console.log(precio_hijo2_Omint);
    let valor_Omint = functions.valorOmint(aporte_OS, edad_2, // dato del formulario - edad del conyuge
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
    // console.log(' Valor OMINT  :')
    // console.log(valor_Omint);
    // <! -----------------------------VALOR PRECIO OMINT END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
    let valorGaleno = functions.valorGaleno(aporte_OS, precioGrupoGaleno, coeficienteGaleno);
    // console.log( ' Valor GALENO ')
    // console.log(valorGaleno)
    // <! -----------------------------VALOR PRECIO GALENO END---------------------------------------------------->
    // <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
    let idTitularSwiss = functions.productIdSwiss(edad_1, tipo_IngresoPDMI);
    // console.log('edad_2 SWISS ')
    // console.log(edad_2)
    let idConyugeSwiss = functions.productIdSwiss(edad_2, tipo_IngresoPDMI);
    let idHijo1Swiss = tipo_IngresoPDMI + '1h';
    let idHijo2Swiss = tipo_IngresoPDMI + '2h';
    ;
    let titular_Swiss = { _id: 'swiss' + idTitularSwiss };
    let conyuge_Swiss = { _id: 'swiss' + idConyugeSwiss };
    let hijo1Swiss = { _id: 'swiss' + idHijo1Swiss };
    let hijo2Swiss = { _id: 'swiss' + idHijo2Swiss };
    // console.log(idTitularSwiss);
    // console.log(idConyugeSwiss);
    // console.log(idHijo1Swiss);
    // console.log(idHijo2Swiss);
    // console.log(titular_Swiss);
    // console.log(conyuge_Swiss);
    // console.log(hijo1Swiss);
    // console.log(hijo2Swiss);
    let priceTitularSwiss = await preciosCollection.findOne(titular_Swiss);
    let priceConyugeSwiss = await preciosCollection.findOne(conyuge_Swiss);
    let priceHijo1Swiss = await preciosCollection.findOne(hijo1Swiss);
    let priceHijo2Swiss = await preciosCollection.findOne(hijo2Swiss);
    let precioTitularSwiss = priceTitularSwiss.precios;
    let precioConyugeSwiss = priceConyugeSwiss.precios;
    let precioHijo1Swiss = priceHijo1Swiss.precios;
    let precioHijo2Swiss = priceHijo2Swiss.precios;
    let valorSwiss = functions.valorSwiss(aporte_OS, edad_1, edad_2, numkids, numhijo2, precioTitularSwiss, precioConyugeSwiss, precioHijo1Swiss, precioHijo2Swiss, coeficienteSwissMedical);
    // console.log( ' Valor SWISS ')
    // console.log(valorSwiss)
    let preciosDetodos = [valorSanCor, valor_Omint, valorpREMEDIC, valorGaleno, valorSwiss];
    const preciosTodos = valorSanCor.concat(valor_Omint, valorpREMEDIC, valorGaleno, valorSwiss);
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
        const planesFiltradosOmint = planes.filter((plan) => { return plan.empresa === 'OMINT'; });
        const planesFiltradosGaleno = planes.filter((plan) => { return plan.empresa === 'Galeno'; });
        const planesFiltradosPremedic = planes.filter((plan) => { return plan.empresa === 'Premedic'; });
        const planesFiltradosSancor = planes.filter((plan) => { return plan.empresa === 'SanCor Salud'; });
        const planesFiltradosSwiss = planes.filter((plan) => { return plan.empresa === 'Swiss Medical'; });
        // console.log(valorGaleno)
        const combinedPlansOmint = functions.combinePlansWithPrices(planesFiltradosOmint, valor_Omint);
        const combinedPlansSancor = functions.combinePlansWithPrices(planesFiltradosSancor, valorSanCor);
        const combinedPlansPremedic = functions.combinePlansWithPrices(planesFiltradosPremedic, valorpREMEDIC);
        const combinedPlansGaleno = functions.combinePlansWithPrices(planesFiltradosGaleno, valorGaleno);
        const combinedPlansSwiss = functions.combinePlansWithPrices(planesFiltradosSwiss, valorSwiss);
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
        // console.log('este es omintPlanes: ' + omintPlanes)
        // console.log('este es otrasEmpresasPlanes: ' + otrasEmpresasPlanes)
        // console.log('este es planesOmintAgrupados: ' + planesOmintAgrupados)
        // console.log('este es resultadoFinal: ' + resultadoFinal)
        const concatenarPlanes = combinedPlansOmintFiltrados.concat(combinedPlansSancor, combinedPlansPremedic, combinedPlansGaleno, combinedPlansSwiss);
        const resultado_final = concatenarPlanes.filter((plan) => {
            if (tipo === 'P' && plan.precio === 0) {
                return false;
            }
            return true;
        });
        console.log(resultado_final);
        res.status(200).json({ planes: resultado_final });
    })
        .catch((error) => {
        // Manejar cualquier error que ocurra durante la obtención de los planes
        // // console.error(error);
        res.status(500).json({ error: 'Error al obtener los planes' });
    });
};
exports.calcularPrecio = calcularPrecio;
//# sourceMappingURL=cotizacion.controller.js.map