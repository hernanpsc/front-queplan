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
exports.valor_Swiss = void 0;
const functions = __importStar(require("./functions"));
// Swiss = valor_Swiss(aporte_OS,edad_2,numHijos,numhijo2,prices.precioTitularSwiss.precios,prices.precioConyugeSwiss.precios,prices.precioHijo1Swiss.precios,prices.precioHijo2Swiss.precios,afinidad,factores,grupo[0],arrayDeducciones)
function valor_Swiss(prices, grupo, arrayDeducciones) {
    let edad2 = grupo[8];
    console.log(' SWISS edad2 ', edad2);
    let hijos = grupo[3];
    console.log(' SWISS hijos ', hijos);
    let restoHijos = grupo[2];
    let hijo1 = prices.precioHijo1Swiss.precios.precios || {};
    console.log(' SWISS hijo1', hijo1);
    let hijo2 = prices.precioHijo2Swiss.precios.precios || {};
    console.log(' SWISS hijo2', hijo2);
    let empresa = 'Swiss Medical';
    console.log(' SWISS empresa  ', empresa);
    let familia = grupo[9];
    let precioTitular = prices.precioTitularSwiss.precios.precios;
    console.log(' SWISS precioTitular  ', precioTitular);
    let precioConyuge = prices.precioConyugeSwiss.precios.precios;
    console.log(' SWISS precioConyuge  ', precioConyuge);
    console.log(' SWISS  familia :  ', familia);
    if (familia === 1 || familia === 3) {
        hijos = 0; // Correct assignment
    }
    let adultos = {};
    let precios = {};
    console.log('LINEA 26 swiss arrayDeducciones : ', arrayDeducciones);
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    console.log(' SWISS promociones  ', promociones);
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    console.log('LINEA 26 omint factores : ', factores);
    console.log(' SWISS tipoAsociado  ', tipoAsociado);
    let array = [];
    if (familia >= 3) {
        adultos = Object.entries(precioConyuge).reduce((acc, [key, value]) => // matrimonio
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precioTitular
        });
    }
    else {
        adultos = precioTitular;
        // console.log(' SWISS adultos ',adultos);
    }
    if (hijos == 1) {
        precios = Object.entries(hijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...adultos
        });
    }
    else if (hijos > 1) {
        hijo1 = Object.entries(hijo2).reduce((acc, [key, value]) => // dis hijos o mas
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value * restoHijos)
        }), {
            ...hijo1 // caca me dice que hijo uno no esta inicilizado
        });
        precios = Object.entries(hijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...adultos
        });
    }
    else {
        precios = adultos;
        // console.log(' SWISS precios ',precios);
    }
    //	<!-----------------------Bucle SANCOR start------------------------>							
    for (let j in precios) {
        let _id = [j][0];
        let nombre = _id.substring(3);
        let confirmaSiTieneBonificaciones = con_afinidad;
        let porcentajeBonificado = bonAfinidad;
        let precioInicial = precios[j];
        // Llamar a la función y desestructurar el array devuelto
        let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);
        // Asignar los valores a nuevas variables
        let precioTotal = valor_total_plan;
        let bonificacionAplicada = valorBonificacion;
        // Mostrar los resultados en consola
        // console.log(' SWISS precioTotal :');
        // console.log(precioTotal);
        // console.log(' SWISS bonificacionAplicada :');
        // console.log(bonificacionAplicada);
        // let precio = precioTotal;
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        //	<!--------------------Crear Objeto SWISS end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Swiss Medical ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precioInicial;
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //	<!-----------------------Bucle SANCOR end------------------------>											
    return array;
}
exports.valor_Swiss = valor_Swiss;
//# sourceMappingURL=swissmedical.js.map