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
exports.valor_Doctored = void 0;
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC start---------------------------->
const functions = __importStar(require("./functions"));
function valor_Doctored(prices, grupo, arrayDeducciones) {
    let hijos = grupo[3];
    console.log('hijos   :', hijos);
    let precio_Grupo = prices.precioDoctoredGrupo.precios.precios;
    console.log('precio grupo  :', precio_Grupo);
    let precio_3hijo = prices.precioDoctoredHijo3.precios.precios;
    console.log('precio_3hijo ', precio_3hijo);
    let empresa = 'Doctored';
    console.log('Doctored');
    let familia = grupo[9];
    console.log('familia   :', familia);
    if (familia === 1 || familia === 3) {
        precio_3hijo = {};
    }
    let precios = {};
    let factores = arrayDeducciones.find(item => item.name === empresa);
    console.log('factores   :', factores);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    console.log('tipoAsociado   :', tipoAsociado);
    let promociones = factores.bonificaciones;
    console.log('promociones   :', promociones);
    let bonAfinidad = promociones[promociones[0]];
    console.log('bonAfinidad   :', bonAfinidad);
    let con_afinidad = false;
    console.log('con_afinidad   :', con_afinidad);
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    let array = [];
    if (hijos > 0) {
        precios = Object.entries(precio_3hijo).reduce((acc, [key, value]) => // tres hijos o mas
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
        }), {
            ...precio_Grupo
        });
    }
    else {
        precios = precio_Grupo;
    }
    console.log('precios   :', precios);
    //Funcion para el calculo de aportes
    //	<!-----------------------Bucle PREMEDIC start------------------------>
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
        let empresaPlan = [j][0];
        console.log('empresaPlan   :', empresaPlan);
        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Doctored ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precioInicial;
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //	<!-----------------------Bucle PREMEDIC end------------------------>								
    // console.log( 'array PREMEDIC')	
    // console.log(array)							
    return array;
}
exports.valor_Doctored = valor_Doctored;
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC end---------------------------->
//# sourceMappingURL=doctored.js.map