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
exports.valor_Premedic = void 0;
const functions = __importStar(require("./functions"));
function valor_Premedic(prices, grupo, arrayDeducciones) {
    //	<!------------------------------ VARIABLES DE prices start------------------------------------>							
    let adultos = prices.priceAdultosPr.precios.precios;
    // console.log('PREMEDIC adultos : ',adultos);
    let preciohm25 = prices.pricePrHijoMenir25.precios.precios;
    // console.log('PREMEDIC preciohm25 : ',preciohm25);
    let preciohm1 = prices.pricePrHijoMenir1.precios.precios;
    // console.log('PREMEDIC preciohm1 : ',preciohm1);
    let idprecio = prices.priceAdultosPr.precios._id;
    // console.log('PREMEDIC idprecio : ',idprecio);
    //	<!------------------------------ VARIABLES DE prices end------------------------------------>							
    //	<!------------------------------ VARIABLES DE grupo start------------------------------------>							
    let hijos = grupo[3];
    // console.log('PREMEDIC hijos : ',hijos);
    let familia = grupo[9];
    // console.log('PREMEDIC familia : ',familia);
    //	<!------------------------------ VARIABLES DE grupo end------------------------------------>							
    //	<!------------------------------ AJUSTES DE familia start-------------------------------------->							
    switch (familia) {
        case 1:
            preciohm1 = {};
            preciohm25 = {};
            break;
        case 2:
            break;
        case 3:
            preciohm1 = {};
            preciohm25 = {};
            break;
        case 4:
            // No changes here, maybe you want to add logic for case 4?
            break;
        default:
            // Handle unknown group cases, if necessary
            break;
    }
    //	<!------------------------------ AJUSTES DE familia end-------------------------------------->							
    //	<!------------------------------ CALCULO DE DEDUCCIONES start arrayDeducciones------------------------------------>							
    let empresa = 'Premedic';
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    //	<!------------------------------ CALCULO DE DEDUCCIONES end arrayDeducciones------------------------------------>							
    //	<!------------------------------ COTIZACION START ------------------------------------>							
    let precios = {};
    if (idprecio.includes('I') == true) {
        precios = Object.entries(preciohm25).reduce((acc, [key, value]) => // dos hijos o mas
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
        }), {
            ...adultos
        });
    }
    else {
        precios = adultos;
    }
    //	<!------------------------------ COTIZACION END ------------------------------------>							
    //	<!-----------------------Bucle PREMEDIC start------------------------>
    let array = [];
    for (let j in precios) {
        let _id = [j][0];
        let nombre = _id.substring(3);
        nombre = nombre.replace(/_/g, ' '); // Reemplaza todos los guiones bajos por un espacio        nombre = nombre.replace(/_/g, ' '); // Reemplaza todos los guiones bajos por un espacio
        let confirmaSiTieneBonificaciones = con_afinidad;
        let porcentajeBonificado = bonAfinidad;
        let precioInicial = precios[j];
        // Llamar a la función y desestructurar el array devuelto
        let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);
        // Asignar los valores a nuevas variables
        let precioTotal = valor_total_plan;
        let bonificacionAplicada = valorBonificacion;
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        //	<!--------------------Crear Objeto SWISS start------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = empresa + ' ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precioInicial;
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //	<!-----------------------Bucle PREMEDIC end------------------------>								          
    return array;
}
exports.valor_Premedic = valor_Premedic;
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC end---------------------------->
//# sourceMappingURL=premedic.js.map