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
const functions = __importStar(require("../funciones"));
const precios_1 = require("./precios");
const error_handle_1 = require("../utils/error.handle");
const planes_1 = __importDefault(require("./../models/planes"));
const empresas_1 = __importDefault(require("./../models/empresas"));
const calcularPrecio = async (req, res) => {
    try {
        // console.log(req.body.grupo);
        // console.log(req.body.empresa_prepaga);
        // console.log(req.body.edad_1);
        // console.log(req.body.edad_2);    
        // console.log(req.body.numkids); 
        // console.log(req.body.plan_type);
        // console.log(req.body.tipo);
        // console.log(req.body.agree);
        // console.log(req.body.aporteOS);
        // console.log(req.body.sueldo);
        // console.log(req.body.aporte);
        // console.log(req.body.monoadic);
        // console.log(req.body.cantAport);
        // console.log(req.body.afinidad);
        // console.log(req.body.bonAfinidad);
        // console.log(req.body.supras);
        // console.log(req.body.segvida);
        // console.log(req.body.segvida1);
        // console.log(req.body.region);
        // console.log(req.body.coeficientes);
        // const group = req.body.grupo;
        // const empresa_prepaga = req.body.empresa_prepaga;
        // const edad_1 = req.body.edad_1;
        // const edad_2 = req.body.edad_2;    
        // const numkids = req.body.numkids; 
        // const plan_type = req.body.plan_type;
        // const tipo = req.body.tipo;
        // const agree = req.body.agree;
        // const aporteOS = req.body.aporteOS;
        // const sueldo = req.body.sueldo;
        // const aporte = req.body.aporte;
        // const monoadic = req.body.monoadic;
        // const cantAport = req.body.cantAport;
        // const afinidad = req.body.afinidad;
        // const bonAfinidad = req.body.bonAfinidad;
        // const supras = req.body.supras;
        // const segvida = req.body.segvida;
        // const segvida1 = req.body.segvida1;;
        // const region = req.body.region;
        // const coeficientes = req.body.coeficientes;
        const formCotizar = req.body;
        // Extraer datos del formulario
        const { group, empresa_prepaga, edad_1, edad_2, numkids, plan_type, tipo, agree, aporteOS, sueldo, aporte, monoadic, cantAport, afinidad, bonAfinidad, supras, segvida, segvida1, region, } = formCotizar;
        const calcularGrupo = (edad_1, edad_2, numkids, group) => {
            let edad1 = edad_1;
            let edad2 = edad_2;
            let num_kids = numkids;
            if (edad_2 === null) {
                edad2 = 0;
            }
            else if (numkids === null) {
                num_kids = 0;
            }
            let grupo = functions.grupoFamiliar(edad1, edad2, num_kids, group);
            return grupo;
        };
        // Llamada a la función para obtener el grupo
        const grupo = calcularGrupo(edad_1, edad_2, numkids, group);
        // Ahora puedes usar la variable 'grupo' en el resto de tu código
        // console.log('esta es la variable grupo ' , grupo)
        const porcentaje = {};
        const beneficiariosF184 = cantAport;
        const eleccionSueldoOAporte = aporteOS;
        const sueldoSueldoOAporte = sueldo;
        const categoria_Mono = "";
        const arrayValorMonotXCategoria = [];
        let numhijo2 = grupo[2]; //checked
        let numHijos = grupo[3]; //checked
        let gen = grupo[4]; //checked
        let grupoFam = grupo[5];
        // console.log('grupoFam')
        // console.log(grupoFam)
        let tipo_IngresoPDMI = functions.tipoAsociado(tipo);
        // console.log(tipo_IngresoPDMI)
        const aporte_OS = [tipo_IngresoPDMI, beneficiariosF184, eleccionSueldoOAporte, sueldoSueldoOAporte, categoria_Mono, arrayValorMonotXCategoria];
        // console.log(tipo_IngresoPDMI)
        // <! ----------SANCOR---------------------------------------------------->
        let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos, group);
        let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos, group);
        // console.log(idSancor1)
        let idSancorConyuge;
        if (grupoFam >= 3) {
            idSancorConyuge = idSancor1[1];
            // console.log(idSancorConyuge)
        }
        else {
            idSancorConyuge
                = idSancor[0];
        }
        // console.log(idSancorConyuge)
        // <! -----------------------------OMINT---------------------------------------------------->
        let idOmint = functions.productIdOmint(edad_1, tipo, 'titular', group);
        // <! -----------------------------GALENO--------------------------------------------------->
        let idGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos, group);
        // <! ----------PREMEDIC-------------------------------------------------------------------->
        let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos, group);
        // <! ----------SWISS----------------------------------------------------------------------->
        let idTitularSwiss = functions.productIdSwiss(edad_1, tipo_IngresoPDMI, group);
        let idConyugeSwiss = functions.productIdSwiss(edad_2, tipo_IngresoPDMI, group);
        let idHijo1Swiss = tipo_IngresoPDMI + '1h';
        let idHijo2Swiss = tipo_IngresoPDMI + '2h';
        // <! ----------MEDIFE---------------------------------------------------->
        let idAdultosMedife = functions.productIdMedife(edad_1, edad_1, tipo_IngresoPDMI);
        // <! ----------PREVENCION---------------------------------------------------->
        let idPrevencion = functions.productIdPrevencion(edad_1, edad_1, numkids, tipo_IngresoPDMI);
        let schema = "precios";
        // async function fetchProductPrice(id: string) {
        //   // console.log( ' funcion en linea 183 : id: ', id)
        //  return await getProduct(id);
        // }
        const companies = await empresas_1.default.find({});
        const empresasConCoeficientes = companies.map(empresa => {
            return { [empresa.name]: empresa.factores.coeficiente };
        });
        // console.log('Coeficientes de todas las empresas:', empresasConCoeficientes);
        // Acceder al coeficiente de una empresa en particular por su nombre
        async function buscar_mi_coeficiente(type) {
            const coeficiente = empresasConCoeficientes.find(empresa => empresa[type]);
            if (coeficiente) {
                return coeficiente;
            }
            else {
                // console.log(`No se encontró la empresa ${type}.`);
            }
        }
        // async function fetchPrices() {
        //  const prices: { [key: string]: any } = {};
        // console.log(idSancor)
        // console.log(idSancor1)
        //  const productQueries = [
        //    { variable: 'priceAdultosPr', id: 'premedic' + functions.productIdPremedic(edad_1, edad_2, tipo, numHijos,group)},
        //    { variable: 'pricePrHijoMenir1', id: 'premedic' + tipo + 'AD-1anio'},
        //    { variable: 'pricePrHijoMenir25', id: 'premedic' + tipo + 'AD-25'},
        //    { variable: 'precioTitularSwiss', id: 'swiss' + idTitularSwiss},
        //    { variable: 'precioConyugeSwiss', id: 'swiss' + idConyugeSwiss},
        //    { variable: 'precioHijo1Swiss', id: 'swiss' + tipo_IngresoPDMI+'1h'},
        //    { variable: 'precioHijo2Swiss', id: 'swiss' + tipo_IngresoPDMI +'2h'},
        //    { variable: 'precio_titular_Omint', id: idOmint[0]},
        //    { variable: 'precio_conyuge_Omint', id: functions.productIdOmint(edad_2, tipo, 'conyuge',group)[1]},
        //    { variable: 'precio_hijo1_Omint', id: idOmint[2]},
        //    { variable: 'precio_hijo2_Omint', id: idOmint[3]},
        //    { variable: 'precio1Hijo', id: idSancor[2]},
        //    { variable: 'precio2Hijo', id: idSancor[3]},
        //    { variable: 'precioTitular', id: idSancor[0]},
        //    { variable: 'precioConyuge', id: idSancorConyuge},
        //    { variable: 'priceGrupoGaleno', id: 'galeno' + idGaleno}
        //   //  { variable: 'idAdultosMedife', id: idAdultosMedife},
        //   //  { variable: 'idHIjo0a1', id: tipo_IngresoPDMI + 'HIJO0a1'},
        //   //  { variable: 'idHIjo0a20', id: tipo_IngresoPDMI + 'HIJO2a20'},
        //   //  { variable: 'idHIjo0a25', id: tipo_IngresoPDMI + 'HIJO25'}
        // // { variable: 'idPrevencion', id: idPrevencion}
        //  ];  
        //  for (const query of productQueries) {
        // console.log(query.id)
        //    const result = await fetchProductPrice(query.id);
        // console.log(result)
        //    prices[query.variable] = result;
        //  }
        //  return prices;
        // }
        //    const prices = await fetchPrices();
        // console.log(' prices ' ,prices)
        // <! -----------------------------ID GALENO START---------------------------------------------------->
        // <! -----------------------------ID GALENO END---------------------------------------------------->
        // <! -----------------------------ID PREMEDIC START---------------------------------------------------->
        let priceAdultosPr = await (0, precios_1.getProduct)('premedic' + functions.productIdPremedic(edad_1, edad_2, tipo, numHijos, group));
        let pricePrHijoMenir1 = await (0, precios_1.getProduct)('premedic' + tipo + 'AD-1anio');
        let pricePrHijoMenir25 = await (0, precios_1.getProduct)('premedic' + tipo + 'AD-25');
        let precioTitularSwiss = await (0, precios_1.getProduct)('swiss' + idTitularSwiss);
        let precioConyugeSwiss = await (0, precios_1.getProduct)('swiss' + idConyugeSwiss);
        let precioHijo1Swiss = await (0, precios_1.getProduct)('swiss' + idHijo1Swiss);
        let precioHijo2Swiss = await (0, precios_1.getProduct)('swiss' + idHijo2Swiss);
        let precio_titular_Omint = await (0, precios_1.getProduct)(idOmint[0]);
        let precio_conyuge_Omint = await (0, precios_1.getProduct)(functions.productIdOmint(edad_2, tipo, 'conyuge', group)[1]);
        let precio_hijo1_Omint = await (0, precios_1.getProduct)(idOmint[2]);
        let precio_hijo2_Omint = await (0, precios_1.getProduct)(idOmint[3]);
        let precio1Hijo = await (0, precios_1.getProduct)(idSancor[2]);
        let precio2Hijo = await (0, precios_1.getProduct)(idSancor[3]);
        let precioTitular = await (0, precios_1.getProduct)(idSancor[0]);
        let precioConyuge = await (0, precios_1.getProduct)(idSancorConyuge);
        let priceGrupoGaleno = await (0, precios_1.getProduct)('galeno' + idGaleno);
        // console.log('priceAdultosPr  ', priceAdultosPr);
        // console.log('pricePrHijoMenir25  ', pricePrHijoMenir25);
        // console.log('pricePrHijoMenir1  ', pricePrHijoMenir1);
        //  priceAdultosPr =  priceAdultosPr.toObject();
        //  pricePrHijoMenir25 = pricePrHijoMenir25.toObjet();
        //  pricePrHijoMenir1 =  pricePrHijoMenir1.toObjet();
        // console.log('priceAdultosPr  ', priceAdultosPr.precios);
        // console.log('pricePrHijoMenir25  ', pricePrHijoMenir25.precios);
        // console.log('pricePrHijoMenir1  ', pricePrHijoMenir1.precios);
        let valor_Premedic = functions.valor_Premedic(aporte_OS, buscar_mi_coeficiente('Premedic'), numkids, priceAdultosPr.precios, pricePrHijoMenir25.precios, pricePrHijoMenir1.precios, edadIdPremedic, afinidad, bonAfinidad, group);
        // console.log('valor_Premedic')
        // console.log(valor_Premedic)
        // <! -----------------------------ID PREMEDIC END---------------------------------------------------->
        // <! -----------------------------ID OMINT START---------------------------------------------------->
        // <! -----------------------------ID OMINT END---------------------------------------------------->
        // <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->
        // Use the toObject method to convert Mongoose Documents to plain JavaScript objects
        // precio1Hijo = precio1Hijo.toObject();
        // precio2Hijo = precio2Hijo.toObject();
        // precioTitular = precioTitular.toObject();
        // precioConyuge = precioConyuge.toObject();
        // console.log('precio1Hijo.precios:', precio1Hijo.precios);
        // console.log('precio2Hijo.precios:', precio2Hijo.precios);
        // console.log('precioTitular.precios:', precioTitular.precios);
        // console.log('precioConyuge.precios:', precioConyuge.precios);
        let valor_SanCor = functions.valor_SanCor(aporte_OS, buscar_mi_coeficiente('SanCor Salud'), edad_1, // dato del formulario - edad del titular
        edad_2, // dato del formulario - edad del conyuge
        numkids, // dato del formulario - cantidad total de hijos
        precio1Hijo.precios, // busqueda por _id en lista de precio
        precio2Hijo.precios, // busqueda por _id en lista de precio
        precioTitular.precios, // busqueda por _id en lista de precio
        precioConyuge.precios, // busqueda por _id en lista de precio
        numhijo2, // respuesta funcion grupoFamiliar
        grupoFam, // respuesta funcion grupoFamiliar
        segvida, // dato del formulario ( check = true/false )
        segvida1, // dato del formulario ( check = true/false )
        supras, // dato del formulario ( check = true/false )
        afinidad, // dato del formulario ( check = true/false )
        bonAfinidad, // dato del formulario 
        gen // respuesta funcion grupoFamiliars
        );
        // console.log('valor_SanCor')
        // console.log(valor_SanCor)
        // <! -----------------------------VALOR PRECIO SANCOR END---------------------------------------------------->
        // <! -----------------------------VALOR PRECIO OMINT START------------------------------------------------------>
        // precio_titular_Omint = precio_titular_Omint.toObject();
        // precio_conyuge_Omint = precio_conyuge_Omint.toObject();
        // precio_hijo1_Omint = precio_hijo1_Omint.toObject();
        // precio_hijo2_Omint = precio_hijo2_Omint.toObject();
        // console.log('precio_titular_Omint',precio_titular_Omint.precios);
        // console.log('precio_conyuge_Omint',precio_conyuge_Omint.precios);
        // console.log('precio_hijo1_Omint',precio_hijo1_Omint.precios);
        // console.log('precio_hijo2_Omint',precio_hijo2_Omint.precios);
        let valor_OMINT = functions.valorOmint(aporte_OS, edad_2, // dato del formulario - edad del conyuge
        numHijos, // respuesta funcion grupoFamiliar
        numhijo2, // hijos a partir del segundo 
        precio_titular_Omint.precios, // busqueda por _id en lista de precio
        precio_conyuge_Omint.precios, // busqueda por _id en lista de precio
        precio_hijo1_Omint.precios, // busqueda por _id en lista de precio
        precio_hijo2_Omint.precios, // busqueda por _id en lista de precio
        idOmint[0], // id Titular
        afinidad, // dato del formulario ( check = true/false )
        bonAfinidad, // dato del formulario % de descuento
        buscar_mi_coeficiente('OMINT'));
        // console.log('valor_OMINT')
        // console.log(valor_OMINT)
        // <! -----------------------------VALOR PRECIO OMINT END---------------------------------------------------->
        // <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
        // ...
        let valor_Galeno = functions.valor_Galeno(aporte_OS, priceGrupoGaleno.precios, buscar_mi_coeficiente('Galeno'));
        // console.log('valor_Galeno')
        // console.log(valor_Galeno)
        // <! -----------------------------VALOR PRECIO GALENO END----------------------------------prices------------------>
        // <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
        // precioTitularSwiss = precioTitularSwiss.toObjet();
        // precioConyugeSwiss = precioConyugeSwiss.toObjet();
        // precioHijo1Swiss = precioHijo1Swiss.toObjet();
        // precioHijo2Swiss = precioHijo2Swiss.toObjet();
        // console.log('precioTitularSwiss  ',precioTitularSwiss.precios);
        // console.log('precioConyugeSwiss  ',precioConyugeSwiss.precios);
        // console.log('precioHijo1Swiss  ',precioHijo1Swiss.precios);
        // console.log('precioHijo2Swiss  ',precioHijo2Swiss.precios);
        let valor_Swiss = functions.valor_Swiss(aporte_OS, edad_1, edad_2, numkids, numhijo2, precioTitularSwiss.precios, precioConyugeSwiss.precios, precioHijo1Swiss.precios, precioHijo2Swiss.precios, buscar_mi_coeficiente('Swiss Medical'), group);
        // console.log('valor_Swiss')
        // console.log(valor_Swiss)
        // for ( let i=0 ; i < prices.length ; i++){
        // console.log(prices[i])
        // }
        // <! -----------------------------VALOR PRECIO MEDIFE START---------------------------------------------------->
        // let valorMedife = functions.valorMedife(
        //  aporte_OS,
        //  edad_1, 
        //  edad_2, 
        //  numkids,
        //  numhijo2,
        //  precioTitularMedife.precios,
        //  precioHijo1Medife.precios,
        //  precioHijo20Medife.precios,
        //  precioHijo25Medife.precios,
        //  buscar_mi_coeficiente('Medife')
        // )
        // <! -----------------------------VALOR PRECIO MEDIFE END---------------------------------------------------->
        // <! -----------------------------VALOR PRECIO PREVENCION SALUD ---------------------------------------------------->
        // <! -----------------------------VALOR PRECIO PREVENCION SALUD END------------------------------------------------->
        let empresas = [];
        let planesPorEmpresa = {};
        async function obtenerEmpresasDisponibles() {
            const empresas = await planes_1.default.distinct('empresa');
            return empresas;
        }
        empresas = await obtenerEmpresasDisponibles();
        // console.log('empresas 297')
        // console.log(empresas)
        // Ahora puedes acceder a los resultados por empresa
        // console.log(resultados['GBA-Norte']);
        // Combinar los planes con precioCalculado
        // Define el array de funciones con sus tipos específicos
        let allPlanes = await planes_1.default.find({}); // Consulta a la base de datos para obtener los planes
        // console.log(allPlanes)
        const concatenarPrecios = valor_OMINT.concat(valor_SanCor, valor_Premedic, valor_Galeno, valor_Swiss);
        const combinedPlans = functions.combinePlansWithPrices(allPlanes, concatenarPrecios);
        // console.log(combinedPlans)
        for (const plan of combinedPlans) {
            const empresa = 'planes_' + plan.empresa;
            planesPorEmpresa[empresa] = planesPorEmpresa[empresa] || [];
            planesPorEmpresa[empresa].push(plan);
        }
        // console.log(planesPorEmpresa); 
        const planesSwiss = combinedPlans.filter((plan) => plan.empresa === 'Swiss Medical');
        // console.log(planesSwiss)
        const filteredPlansGaleno = combinedPlans.filter((plan) => plan.precio > 0);
        // Filtrar los planes con precioCalculado mayor que 0
        const galenoPlanes = combinedPlans.filter((plan) => plan.empresa !== 'GALENO');
        const filteredPlans = combinedPlans.filter((plan) => plan.precio > 0);
        const otrasEmpresasPlanes = combinedPlans.filter((plan) => plan.empresa !== 'OMINT');
        // Separar en dos arrays: uno para OMINT y otro para las otras empresas
        const planesOmint = combinedPlans.filter((plan) => plan.empresa === 'OMINT');
        const combinedPlansOmintFiltrados = planesOmint.filter((plan) => {
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
        let planesOmintAgrupados = functions.agruparYTransformarPlanes(combinedPlansOmintFiltrados);
        const resultadoFinal = otrasEmpresasPlanes.concat(planesOmintAgrupados);
        const resultado = combinedPlans.filter((plan) => {
            if (tipo === 'P' && plan.precio === 0) {
                return false;
            }
            return true;
        });
        // console.log(resultado)
        res.status(200).json(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.calcularPrecio = calcularPrecio;
//# sourceMappingURL=cotizacion.js.map