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
exports.valor_Ras = valor_Ras;
const functions = __importStar(require("./functions"));
function valor_Ras(prices, grupo, arrayDeducciones) {
    //	<!------------------------------ VARIABLES DE prices start------------------------------------>							
    let precioTitular = prices.precioTitularRas.precios.precios;
    let precioConyuge = prices.precioConyugeRas.precios.precios;
    let precioHijo1 = prices.precioHijo1Ras.precios.precios;
    let precioHijo2 = prices.precioHijo2Ras.precios.precios;
    let precioHijo3 = prices.precioHijo3Ras.precios.precios;
    // console.log('precioTitular :  '  , precioTitular);
    // console.log('precioConyuge :  '  , precioConyuge);
    // console.log('precioHijo1 :  '  , precioHijo1);
    // console.log('precioHijo2 :  '  , precioHijo2);
    // console.log('precioHijo3 :  '  , precioHijo3);
    //	<!------------------------------ VARIABLES DE prices end------------------------------------>							
    //	<!------------------------------ VARIABLES DE grupo start------------------------------------>							
    let hijos = grupo[3];
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let familia = grupo[9];
    // console.log('edad1 :  '  , edad_1);
    // console.log('edad_2 :  '  , edad_2);
    // console.log('familia :  '  , familia);
    // console.log('hijos :  '  , hijos);
    //	<!------------------------------ VARIABLES DE grupo end------------------------------------>							
    //	<!------------------------------ AJUSTES DE familia start-------------------------------------->							
    if (familia === 1) {
        precioConyuge = {};
    }
    else if (familia === 2) {
        precioConyuge = {};
    }
    else { }
    //	<!------------------------------ AJUSTES DE familia end-------------------------------------->							
    //	<!------------------------------ CALCULO DE DEDUCCIONES start arrayDeducciones------------------------------------>							    
    let empresa = 'RAS';
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
    let precio_adultos_Ras = {};
    let precios = {};
    if (familia >= 3) {
        precio_adultos_Ras = Object.entries(precioConyuge).reduce((acc, [key, value]) => // matrimonio
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precioTitular
        });
    }
    else {
        precio_adultos_Ras = precioTitular;
    }
    if (hijos >= 1) {
        precios = Object.entries(precioHijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Ras
        });
    }
    else if (hijos >= 2) {
        precios = Object.entries(precioHijo2).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Ras
        });
    }
    else if (hijos >= 3) {
        precios = Object.entries(precioHijo3).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Ras
        });
    }
    else {
        precios = precio_adultos_Ras;
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
        //	<!--------------------Crear Objeto RAS end--------------------------------------->																            			
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
    //	<!------------------------------ Bucle end ----------------------------------------->							
    return array;
}
//# sourceMappingURL=ras.js.map