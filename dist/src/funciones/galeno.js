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
exports.valor_Galeno = void 0;
const functions = __importStar(require("./functions"));
function valor_Galeno(prices, arrayDeducciones) {
    let empresa = "Galeno";
    let array = [];
    let precios = prices.priceGrupoGaleno.precios.precios;
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    for (let j in precios) {
        console.log('GALENO j :', j);
        console.log('GALENO precios :', precios);
        let empresaPlan = [j][0];
        console.log('GALENO empresaPlan :', empresaPlan);
        let _id = empresaPlan;
        console.log('GALENO _id :', _id);
        let nombre = empresaPlan.substring(3);
        console.log('GALENO nombre :', nombre);
        let precioTotal = precios[j];
        console.log('GALENO precioTotal :', precioTotal);
        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        console.log('GALENO precio :', precio);
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Galeno  ' + nombre;
        plan.precio = precio;
        plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        console.log('GALENO plan :', plan);
        array.push(plan);
    }
    //	<!-----------------------Bucle GALENO end------------------------>	
    // console.log( 'array Galeno')
    // console.log(array)													
    return array;
}
exports.valor_Galeno = valor_Galeno;
//# sourceMappingURL=galeno.js.map