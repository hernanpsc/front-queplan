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
exports.valor_Saludcentral = void 0;
const functions = __importStar(require("./functions"));
function valor_Saludcentral(prices, grupo, arrayDeducciones) {
    let familia = grupo[9];
    let capitas = grupo[5];
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let hijos = grupo[3];
    let precioTitular = prices.precioSaludcentralTitular.precios.precios;
    let precioConyuge = prices.precioSaludcentralConyuge.precios.precios;
    let precioHijo1 = prices.precioSaludcentralHijo1.precios.precios;
    let precioHijo2 = prices.precioSaludcentralHijo2.precios.precios;
    let grupo_array = grupo;
    let numhijo2 = grupo[2];
    let empresa = 'Salud Central';
    console.log('familia Saludcentral :  ' + familia);
    console.log('capitas Saludcentral :  ' + capitas);
    console.log('edad_1 Saludcentral :  ' + edad_1);
    console.log('edad_2 Saludcentral :  ' + edad_2);
    console.log('hijos Saludcentral :  ' + hijos);
    console.log('precioTitular Saludcentral :  ', precioTitular); // console.log(precioTitular);
    console.log('precioConyuge Saludcentral :  ', precioConyuge); // console.log(precioConyuge);
    console.log('precioHijo1 Saludcentral :  ', precioHijo1); // console.log(precioHijo1);
    console.log('precioHijo2 Saludcentral :  ', precioHijo2); // console.log(precioHijo2);
    switch (familia) {
        case 1:
            precioHijo1 = {};
            precioHijo2 = {};
            break;
        case 2:
            precioConyuge = {};
            break;
        case 3:
            precioHijo1 = {};
            precioHijo2 = {};
            break;
        case 4:
            // No changes here, maybe you want to add logic for case 4?
            break;
        default:
            // Handle unknown group cases, if necessary
            break;
    }
    // Reseteamos valores según el grupo
    if (familia === 1) {
        precioHijo1 = {};
        precioHijo2 = {};
    }
    else if (familia === 2) {
        precioConyuge = {};
    }
    else if (familia === 3) {
        precioHijo1 = {};
        precioHijo2 = {};
    }
    else { }
    ;
    console.log('precioHijo1 2 Saludcentral :  ' + precioHijo1);
    console.log('precioHijo2 2 Saludcentral :  ' + precioHijo2);
    let array = [];
    //   let precios = {};
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
    precios = { ...precioTitular, ...precioConyuge, ...precioHijo1, ...precioHijo2 };
    precios = Object.entries(precios).reduce((acc, [key, value]) => {
        acc[key] = (acc[key] || 0) + parseInt(value);
        return acc;
    }, {});
    console.log('precios  :', precios);
    // // //	<!-----------------------Bucle SALUD CENTRAL start------------------------>							
    for (let j in precios) {
        console.log('Valores iniciales:', {
            precios,
            con_afinidad,
            bonAfinidad,
            tipoAsociado,
            factores
        });
        let _id = [j][0];
        let nombre = _id.substring(3);
        let confirmaSiTieneBonificaciones = con_afinidad;
        let porcentajeBonificado = bonAfinidad;
        let precioInicial = precios[j];
        // Dentro de functions.promoDescuento
        console.log('Entrando a promoDescuento con:', { precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones });
        // Llamar a la función y desestructurar el array devuelto
        let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);
        console.log('Saliendo de promoDescuento con:', [valor_total_plan, valorBonificacion]);
        // Asignar los valores a nuevas variables
        let precioTotal = valor_total_plan;
        let bonificacionAplicada = valorBonificacion;
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        console.log('precio   :', precio);
        //	<!--------------------Crear Objeto SWISS end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Salud Central ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precioInicial;
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    console.log('array   :', array);
    return array;
}
exports.valor_Saludcentral = valor_Saludcentral;
//# sourceMappingURL=saludcentral.js.map