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
exports.valor_Cristal = void 0;
const functions = __importStar(require("./functions"));
// export function valor_Cristal(aportes_OS, valorCoeficiente, edad_1, edad_2,numHijos, group, grupo, con_afinidad,  bonAfinidad,Titular, Hijo1, Hijo2, Hijo3, Conyuge){
function valor_Cristal(prices, grupo, arrayDeducciones) {
    // export function valor_Cristal(aportes_OS, valorCoeficiente, edad_1, edad_2,numHijos, group, grupo, con_afinidad,  bonAfinidad, Titular, Hijo1, Hijo2, Hijo3, Conyuge){
    // console.log(' valor_Cristal ' , Cristal)
    let num_adultos = grupo[0];
    let numhijo1 = grupo[1];
    let numhijo = grupo[3];
    let gen = grupo[4];
    let arrayEdades = grupo[6];
    let numhijo2 = grupo[2];
    let numHijos = grupo[3];
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let hijos = grupo[3];
    let familia = grupo[9];
    let precioTitular = prices.precioTitularCristal.precios.precios;
    let precioConyuge = prices.precioConyugeCristal.precios.precios;
    let precioHijo1 = prices.precioHijo1Cristal.precios.precios;
    let precioHijo2 = prices.precioHijo2Cristal.precios.precios;
    let precioHijo3 = prices.precioHijo3Cristal.precios.precios;
    let empresa = 'Cristal';
    // console.log('edad_1 Cristal :  '  + edad_1);
    // console.log('edad_2 Cristal :  '  + edad_2);
    // console.log('familia Cristal :  '  + familia);
    // console.log('hijos Cristal :  '  + hijos);
    // console.log('precioTitular Cristal :  '  );// console.log(precioTitular);
    // console.log('precioHijo1 Cristal :  '  );// console.log(precioHijo1);
    // console.log('precioHijo2 Cristal :  '  );// console.log(precioHijo2);
    // console.log('precioHijo3 Cristal :  '  );// console.log(precioHijo3);
    // console.log('descuento_promo Cristal :  '  + descuento_promo);
    // console.log('grupo_array Cristal :  '  + grupo_array);
    if (familia === 1) {
        precioConyuge = [];
        // console.log('hijos 45 Cristal :  '  + hijos);
    }
    else if (familia === 2) {
        precioConyuge = [];
        // console.log('hijos 51 Cristal :  '  + hijos);
    }
    else if (familia === 3) {
        // console.log('precioConyuge Cristal :  '  + precioConyuge);
    }
    else if (familia == 4) {
        // console.log('precioConyuge Cristal :  '  + precioConyuge);
    }
    let precio_adultos_Cristal = {};
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
        precio_adultos_Cristal = Object.entries(precioConyuge).reduce((acc, [key, value]) => // matrimonio
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precioTitular
        });
    }
    else {
        precio_adultos_Cristal = precioTitular;
    }
    if (hijos >= 1) {
        precios = Object.entries(precioHijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Cristal
        });
    }
    else if (hijos >= 2) {
        precios = Object.entries(precioHijo2).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Cristal
        });
    }
    else if (hijos >= 3) {
        precios = Object.entries(precioHijo3).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Cristal
        });
    }
    else {
        precios = precio_adultos_Cristal;
    }
    // // //	<!-----------------------Bucle CRISTAL start------------------------>							
    for (let j in precios) {
        // console.log('imprimir j')
        // console.log(j)
        let conPromo = con_afinidad;
        let promocion = bonAfinidad;
        // console.log('promocion Cristal :  '  + promocion);
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
        // console.log('precioTotal  >');
        // console.log(precioTotal)
        //  console.log('factores');
        //   console.log(factores)
        // let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
        // console.log('precio ')
        // console.log(precio)
        //         //	<!--------------------Crear Objeto CRISTAL end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Cristal ' + nombre;
        plan.precio = precioTotal;
        // plan.valorLista = precios[j];
        // plan.promoPorcentaje = promo;
        // plan.promoDescuento = descPromo;
        // plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //      //	<!-----------------------Bucle CRISTAL end------------------------>											
    // //                 console.log( 'array CRISTAL')							
    // //                 console.log(array)							
    // return "hola"
    return array;
}
exports.valor_Cristal = valor_Cristal;
//# sourceMappingURL=cristal.js.map