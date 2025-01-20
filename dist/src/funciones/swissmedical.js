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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.valor_Swiss = valor_Swiss;
const functions = __importStar(require("./functions"));
function valor_Swiss(prices, grupo, arrayDeducciones) {
    //	<!------------------------------ VARIABLES DE prices start------------------------------------>							
    let precioTitular = prices.precioTitularSwiss.precios.precios;
    // console.log(' SWISS precioTitular  ',precioTitular);
    let precioConyuge = prices.precioConyugeSwiss.precios.precios;
    // console.log(' SWISS precioConyuge  ',precioConyuge);
    let hijo1 = prices.precioHijo1Swiss.precios.precios || {};
    // console.log(' SWISS hijo1',hijo1);
    let hijo2 = prices.precioHijo2Swiss.precios.precios || {};
    // console.log(' SWISS hijo2',hijo2);;
    //	<!------------------------------ VARIABLES DE prices end------------------------------------>							
    //	<!------------------------------ VARIABLES DE grupo start------------------------------------>							
    let edad2 = grupo[8];
    // console.log(' SWISS edad2 ',edad2);
    let hijos = grupo[3];
    // console.log(' SWISS hijos ',hijos);
    let restoHijos = grupo[2];
    // console.log(' restoHijos hijos ',restoHijos);
    let familia = grupo[9];
    // console.log(' SWISS familia  ',familia);
    //	<!------------------------------ VARIABLES DE grupo end ------------------------------------>							
    //	<!------------------------------ CALCULO DE DEDUCCIONES start arrayDeducciones------------------------------------>							    
    let empresa = 'Swiss Medical';
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    //    console.log(' SWISS promociones  ',promociones);
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    //	<!------------------------------ CALCULO DE DEDUCCIONES end arrayDeducciones------------------------------------>							
    //	<!------------------------------ COTIZACION START ------------------------------------>							
    let adultos = {};
    let precios = {};
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
    }
    //	<!------------------------------ COTIZACION END ------------------------------------>							
    //	<!------------------------------ Bucle start ------------------------------------>							
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
    //	<!------------------------------ Bucle end ------------------------------------>							
    return array;
}
//# sourceMappingURL=swissmedical.js.map