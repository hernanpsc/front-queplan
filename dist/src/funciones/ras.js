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
exports.valor_Ras = void 0;
const functions = __importStar(require("./functions"));
// export function valor_Ras(con_afinidad,  bonAfinidad,Titular, Hijo1, Hijo2, Hijo3, Conyuge,grupo,arrayDeducciones){
function valor_Ras(prices, grupo, arrayDeducciones) {
    let uno = 'Ras';
    let precioTitular = prices.precioTitularRas.precios.precios;
    let precioConyuge = prices.precioConyugeRas.precios.precios;
    let precioHijo1 = prices.precioHijo1Ras.precios.precios;
    let precioHijo2 = prices.precioHijo2Ras.precios.precios;
    let precioHijo3 = prices.precioHijo3Ras.precios.precios;
    let empresa = 'RAS';
    let hijos = grupo[3];
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let familia = grupo[9];
    console.log('empresa :  ');
    console.log('edad1 :  ', edad_1);
    console.log('edad_2 :  ', edad_2);
    console.log('familia :  ', familia);
    console.log('hijos :  ', hijos);
    console.log('precioTitular :  ', precioTitular);
    console.log('precioConyuge :  ', precioConyuge);
    console.log('precioHijo1 :  ', precioHijo1);
    console.log('precioHijo2 :  ', precioHijo2);
    console.log('precioHijo3 :  ', precioHijo3);
    // console.log('descuento_promo :  '  , descuento_promo);
    if (familia === 1) {
        precioConyuge = {};
    }
    else if (familia === 2) {
        precioConyuge = {};
    }
    else {
    }
    let precio_adultos_Ras = {};
    let precios = {};
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    let array = [];
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
    // //	<!-----------------------Bucle RAS start------------------------>							
    for (let j in precios) {
        //     console.log('imprimir j')
        //     console.log(j)
        let conPromo = con_afinidad;
        let promocion = bonAfinidad;
        // console.log('promocion :  '  + promocion);
        let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        // console.log('conPromo : ' + conPromo)
        // console.log('precios[j] : ' + precios[j])
        // let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
        // console.log('promo : ' + promo)
        // let descPromo = functions.promoDescuento(precios[j],promo, conPromo)[1];
        // console.log('descPromo  >');
        // console.log(descPromo)
        // let precioTotal = functions.promoDescuento(precios[j],promo, conPromo)[0];
        let precioTotal = precios[j];
        //  console.log('precioTotal  >');
        //  console.log(precioTotal)
        //  console.log('factores');
        //   console.log(factores)
        // let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
        // console.log('precio ')
        // console.log(precio)
        //	<!--------------------Crear Objeto RAS end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'RAS ' + nombre;
        plan.precio = precioTotal;
        // plan.valorLista = precios[j];
        // plan.promoPorcentaje = promo;
        // plan.promoDescuento = descPromo;
        // plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //	<!-----------------------Bucle RAS end------------------------>											
    //                 console.log( 'array RAS')							
    //                 console.log(array)							
    return array;
}
exports.valor_Ras = valor_Ras;
//# sourceMappingURL=ras.js.map