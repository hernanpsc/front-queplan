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
exports.valor_Hominis = void 0;
const functions = __importStar(require("./functions"));
function valor_Hominis(prices, grupo, arrayDeducciones) {
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
    console.log('hominis 1');
    let precioPrincipal = prices.precioHominis.precios.precios;
    let empresa = 'Hominis';
    console.log('hominis 2 precioPrincipal : ', precioPrincipal);
    let precio_Hominis = {};
    let precios = {};
    console.log('hominis 3 ', precios);
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
    if (promociones[0] >= 1) {
        con_afinidad === true;
    }
    let array = [];
    console.log('hominis 3');
    precios = precioPrincipal;
    // // //	<!-----------------------Bucle HOMINIS start------------------------>							
    for (let j in precios) {
        // console.log('imprimir j')
        // console.log(j)
        let conPromo = con_afinidad;
        let promocion = bonAfinidad;
        // console.log('promocion Hominis :  '  + promocion);
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
        //         //	<!--------------------Crear Objeto HOMINIS end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Hominis ' + nombre;
        plan.precio = precioTotal;
        // plan.valorLista = precios[j];
        // plan.promoPorcentaje = promo;
        // plan.promoDescuento = descPromo;
        // plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //      //	<!-----------------------Bucle HOMINIS end------------------------>											
    // //                 console.log( 'array HOMINIS')							
    // //                 console.log(array)							
    // return "hola"
    return array;
}
exports.valor_Hominis = valor_Hominis;
//# sourceMappingURL=hominis.js.map