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
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC start---------------------------->
const functions = __importStar(require("./functions"));
function valor_Premedic(prices, grupo, arrayDeducciones) {
    console.log('Premedic  :');
    let empresa = 'Premedic';
    let hijos = grupo[3];
    let adultos = prices.priceAdultosPr.precios.precios;
    console.log('PREMEDIC  adultos : ', adultos);
    let preciohm25 = prices.pricePrHijoMenir25.precios.precios;
    let preciohm1 = prices.pricePrHijoMenir1.precios.precios;
    let idprecio = prices.priceAdultosPr.precios._id;
    console.log('PREMEDIC  idprecio : ', idprecio);
    let familia = grupo[9];
    console.log('PREMEDIC hijos : ', hijos);
    console.log('PREMEDIC adultos : ', adultos);
    console.log('PREMEDIC preciohm25 : ', preciohm25);
    console.log('PREMEDIC preciohm1 : ', preciohm1);
    console.log('PREMEDIC idprecio : ', idprecio);
    console.log('PREMEDIC familia : ', familia);
    if (familia === 1 || familia === 3) {
        hijos = 0;
        preciohm1 = 0;
        preciohm25 = 0;
    }
    let precios = {};
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    console.log('factores premedic :', factores);
    let array = [];
    if (idprecio.includes('I') == true) {
        console.log('precios premedoc :1', precios);
        precios = Object.entries(preciohm25).reduce((acc, [key, value]) => // dis hijos o mas
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
    console.log('precios premedoc :', precios);
    //Funcion para el calculo de aportes
    //	<!-----------------------Bucle PREMEDIC start------------------------>
    for (let j in precios) {
        let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let confirmaSiTieneBonificaciones = con_afinidad;
        let porcentajeBonificado = bonAfinidad;
        let precioInicial = precios[j];
        console.log('precioInicial Premedic  :'); // console.log(precioInicial)
        // Llamar a la función y desestructurar el array devuelto
        let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);
        // Asignar los valores a nuevas variables
        let precioTotal = valor_total_plan;
        let bonificacionAplicada = valorBonificacion;
        // Mostrar los resultados en consola
        console.log('precioTotal Premedic  :');
        console.log(precioTotal);
        console.log('bonificacionAplicada Premedic  :');
        console.log(bonificacionAplicada);
        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Premedic ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //	<!-----------------------Bucle PREMEDIC end------------------------>								
    console.log('array PREMEDIC');
    console.log(array);
    return array;
}
exports.valor_Premedic = valor_Premedic;
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC end---------------------------->
//# sourceMappingURL=premedic.js.map