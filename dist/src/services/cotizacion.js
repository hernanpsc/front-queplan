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
        const formCotizar = req.body;
        const { group, empresa_prepaga, edad_1, edad_2, numkids, plan_type, tipo, agree, aporteOS, sueldo, aporte, monoadic, cantAport, afinidad, bonAfinidad, supras, segvida, segvida1, region, } = formCotizar;
        console.log('formCotizar  : ');
        console.log(formCotizar);
        const calcularGrupo = (edad_1, edad_2, numkids, group) => {
            let edad1 = edad_1;
            let edad2 = edad_2;
            let num_kids = numkids;
            if (group === '1') {
                edad2 = 0;
                num_kids = 0;
            }
            else if (group === '2') {
                edad2 = 0;
            }
            else if (group === '3') {
                num_kids = 0;
            }
            else { }
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
        let tipo_IngresoPDMI = functions.tipoAsociado(tipo);
        const aporte_OS = [tipo_IngresoPDMI, beneficiariosF184, eleccionSueldoOAporte, sueldoSueldoOAporte, categoria_Mono, arrayValorMonotXCategoria];
        // // <! ----------SANCOR---------------------------------------------------->
        let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos, group);
        let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos, group);
        let idSancorConyuge;
        if (grupo[0] == 2) {
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
        // <! ----------MEDIFE---------------------------------------------------->
        let idAdultosMedife = functions.productIdMedife(edad_1, edad_1, tipo_IngresoPDMI);
        // <! ----------PREVENCION---------------------------------------------------->
        let idPrevencion = functions.productIdPrevencion(edad_1, edad_1, numkids, tipo_IngresoPDMI);
        // <! ----------DOCTORED---------------------------------------------------->
        let IdDoctored = functions.productIdDoctored(edad_1, edad_2, tipo_IngresoPDMI, numkids, group);
        // <! ----------AVALIAN---------------------------------------------------->
        let IdsAvalian = functions.productIdAvalian(edad_1, edad_2, tipo_IngresoPDMI, group);
        // <! ----------CRISTAL y RAS---------------------------------------------------->
        let idsCristalyRas = functions.productIdRasCristal(edad_1, edad_2, tipo_IngresoPDMI, group);
        // <! ----------LUIS PASTEUR---------------------------------------------------->
        let idsLuisPasteur = functions.productIdLuisPasteur(edad_1, edad_2, numkids, tipo_IngresoPDMI, group);
        // <! ----------ASMEPRIV---------------------------------------------------->
        let idsAsmepriv = functions.productIdAsmepriv(edad_1, edad_2, numkids, tipo_IngresoPDMI, group);
        // <! ----------BAYRES PLAN---------------------------------------------------->
        let idsBayresPlan = functions.productIBayres(edad_1, edad_2, group);
        // <! ----------HOMINIS---------------------------------------------------->
        let idsHominis = functions.productIdHominis(edad_1, edad_2, tipo_IngresoPDMI, numkids, group);
        async function fetchProductPrice(id) {
            // console.log( ' funcion en linea 183 : id: ', id)
            return await (0, precios_1.getProduct)(id);
        }
        // Obtener todas las empresas de la base de datos (suponiendo que 'EmpresaModel' es un modelo de mongoose o algo similar)
        const companies = await empresas_1.default.find({});
        // Crear un objeto con nombre de empresa como clave y coeficiente como valor
        const coeficientes = companies.reduce((acc, empresa) => {
            const nombre = String(empresa.name); // Asegúrate de que el nombre sea una cadena
            const coeficiente = empresa.factores?.coeficiente;
            if (coeficiente !== undefined) { // Solo agregamos si el coeficiente existe
                acc[nombre] = coeficiente;
            }
            return acc;
        }, {}); // Tipamos el objeto como clave: valor de tipo string: número
        // Llevarse la variable completa, creando una copia superficial del objeto
        const coeficientesCopia = { ...coeficientes };
        // Opción de crear una copia profunda (en caso de tener objetos anidados dentro de los coeficientes, lo cual no parece ser el caso aquí)
        const coeficientesCopiaProfunda = JSON.parse(JSON.stringify(coeficientes));
        // Función para buscar el coeficiente de una empresa por su nombre
        function buscar_mi_coeficiente(type) {
            if (coeficientes[type] !== undefined) {
                return coeficientes[type]; // Retorna el coeficiente si se encuentra
            }
            else {
                // Si no se encuentra, puedes manejar el caso de alguna manera, por ejemplo:
                console.log(`No se encontró la empresa ${type}.`);
                return null; // Retorna null si no se encuentra
            }
        }
        // Ejemplo de cómo usar la función de búsqueda
        async function fetchPrices() {
            const prices = {};
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
                { variable: 'precioHominis', id: idsHominis }
            ];
            const promises = productQueries.map(async (query) => {
                // console.log(`Fetching price for ${query.variable} with ID: ${query.id}`);
                try {
                    const result = await fetchProductPrice(query.id);
                    return { [query.variable]: result };
                }
                catch (error) {
                    // console.error(`Error fetching price for ${query.id}:`, error);
                    return { [query.variable]: null };
                }
            });
            const results = await Promise.all(promises);
            results.forEach((result) => Object.assign(prices, result));
            return prices;
        }
        const prices = await fetchPrices();
        // // <! -----------------------------ID PREMEDIC START---------------------------------------------------->
        let concatenarPrecios = functions.valor_prepagas(aporte_OS, edad_2, numHijos, numhijo2, prices, idOmint, afinidad, bonAfinidad, group, grupo, edadIdPremedic, edad_1, grupoFam, segvida, segvida1, supras, gen, numkids, coeficientesCopia);
        // for ( let i=0 ; i < prices.length ; i++){
        // console.log(prices[i])
        // }
        let empresas = [];
        let planesPorEmpresa = {};
        async function obtenerEmpresasDisponibles() {
            empresas = await planes_1.default.distinct('empresa');
            return empresas;
        }
        empresas = await obtenerEmpresasDisponibles();
        // console.log('empresas : ' + empresas)
        let allPlanes = await planes_1.default.find({}); // Consulta a la base de datos para obtener los planes
        // console.log('allPlanes : ')  
        // console.log(allPlanes)  
        // const concatenarPrecios = valor_OMINT.concat(valor_SanCor, valor_Premedic,valor_Galeno,valor_Swiss,valor_Doctored,valor_Prevencion, valor_Avalian);
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
        const planesSwiss = combinedPlans.filter((plan) => plan.empresa === 'Swiss Medical');
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
        // console.log('resultado   :')
        // console.log(resultado)
        res.status(200).json(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.calcularPrecio = calcularPrecio;
//# sourceMappingURL=cotizacion.js.map