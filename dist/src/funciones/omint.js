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
exports.valor_Omint = valor_Omint;
// <!----------------------Funcion VALOR DEL PLAN OMINT start----------------------------> 
const functions = __importStar(require("./functions"));
function valor_Omint(prices, grupo, arrayDeducciones) {
    //	<!------------------------------ VARIABLES DE prices start------------------------------------>							
    let precio_titular = prices.precio_titular_Omint.precios.precios;
    // console.log('precio_titular  :',precio_titular);
    let precio_conyuge = prices.precio_conyuge_Omint.precios.precios;
    // console.log('precio_conyuge  :',precio_conyuge);
    let precio_hijo_1 = prices.precio_hijo1_Omint.precios.precios;
    // console.log('precio_hijo_1  :',precio_hijo_1);
    let precio_hijo_2 = prices.precio_hijo2_Omint.precios.precios;
    // console.log('precio_hijo_2  :',precio_hijo_2);
    //	<!------------------------------ VARIABLES DE prices end------------------------------------>							
    //	<!------------------------------ VARIABLES DE grupo start------------------------------------>							
    let numHijos = grupo[3];
    let familia = grupo[9];
    //	<!------------------------------ VARIABLES DE grupo end------------------------------------>							
    //	<!------------------------------ CALCULO DE DEDUCCIONES start arrayDeducciones------------------------------------>							
    let empresa = 'OMINT';
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    //	<!------------------------------ CALCULO DE DEDUCCIONES end arrayDeducciones------------------------------------>							
    //	<!------------------------------ AJUSTES DE familia start-------------------------------------->							
    switch (familia) {
        case 1:
            precio_hijo_1 = {};
            precio_hijo_2 = {};
            precio_conyuge = {};
            break;
        case 2:
            precio_conyuge = {};
            break;
        case 3:
            precio_hijo_1 = {};
            precio_hijo_2 = {};
            break;
        case 4:
            // No changes here, maybe you want to add logic for case 4?
            break;
        default:
            // Handle unknown group cases, if necessary
            break;
    }
    //	<!------------------------------ AJUSTES DE familia end-------------------------------------->							
    let precios = {};
    // Iterar sobre las claves de uno de los objetos (todos tienen las mismas claves)
    // Iterar sobre las claves de uno de los objetos (todos tienen las mismas claves)
    Object.keys(precio_titular).forEach(key => {
        // Inicializar el valor total para cada clave
        let total = 0;
        // Asegurarse de que los valores sean números y sumar los precios del titular y cónyuge
        total += parseInt(precio_titular[key]) || 0;
        total += parseInt(precio_conyuge[key]) || 0;
        // Verificar si existen precios para hijo_1 y sumar solo si no están vacíos
        if (precio_hijo_1 && precio_hijo_1[key] !== undefined) {
            total += parseInt(precio_hijo_1[key]) || 0;
        }
        // Verificar si existen precios para hijo_2 y sumar solo si no están vacíos
        if (precio_hijo_2 && precio_hijo_2[key] !== undefined) {
            total += (numHijos - 2) * (parseInt(precio_hijo_2[key]) || 0); // Multiplica por los hijos adicionales
        }
        // Asignar el valor calculado al objeto precios
        precios[key] = total;
    });
    //  else if (numHijos > 1) {
    //     let precio_hijos_Omint = Object.entries(hijo_2).reduce((acc, [key, value]) => // dis hijos o mas
    //         ({
    //             ...acc,
    //             [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
    //         }), {
    //             ...hijo_1
    //         });
    //     precios = Object.entries(precio_hijos_Omint).reduce((acc, [key, value]) => ({
    //         ...acc,
    //         [key]: parseInt((acc[key]) || 0) + parseInt(value)
    //     }), {
    //         ...precio_adultos_Omint
    //     });
    // } else {
    //     precios = precio_adultos_Omint;
    // };
    // if (aportes_OS[0]==='P') {
    //     precios = precios;
    //   }
    // console.log('Precios del grupo familiar completo:', precios);
    // <!---------------------Funcion VALOR DEL PLAN OMINT end----------------------------> 
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
    //	<!-----------------------Bucle OMINT end------------------------>								
    return array;
}
// <!----------------------Funcion VALOR DEL PLAN OMINT end---------------------------->
//# sourceMappingURL=omint.js.map