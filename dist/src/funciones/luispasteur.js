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
exports.valor_Luispasteur = void 0;
const functions = __importStar(require("./functions"));
function valor_Luispasteur(prices, grupo, arrayDeducciones) {
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let hijos = grupo[3];
    let precioPrincipal = prices.precioLuispasteurAdultos.precios.precios;
    let precioNieto = prices.precioLuispasteurNieto.precios.precios;
    let precioAdicional = prices.precioLuispasteurAdicional.precios.precios;
    let precioHijo = prices.precioLuispasteurHijo.precios.precios;
    let empresa = 'Luis Pasteur';
    let familia = grupo[9];
    // console.log('aportesOS Luis_Pasteur :  '  + aportesOS);
    // console.log('edad_1 Luis_Pasteur :  '  + edad_1);
    // console.log('edad_2 Luis_Pasteur :  '  + edad_2);
    // console.log('hijos Luis_Pasteur :  '  + hijos);
    // console.log('precioPrincipal Luis_Pasteur :  '  );// console.log(precioPrincipal);
    // console.log('precioNieto Luis_Pasteur :  '  );// console.log(precioNieto);
    // console.log('precioAdicional Luis_Pasteur :  '  );// console.log(precioAdicional);
    // console.log('precioHijo Luis_Pasteur :  '  );// console.log(precioHijo);
    // console.log('descuento_promo Luis_Pasteur :  '  + descuento_promo);
    // console.log('grupo_array Luis_Pasteur :  '  + grupo_array);
    if (familia === 1) {
        edad_2 = 0;
        precioNieto = [];
        precioAdicional = [];
        precioHijo = [];
        hijos = 0;
        // console.log('hijos 45 Luis Pasteur :  '  + hijos);
    }
    else if (familia === 2) {
        edad_2 = 0;
    }
    else if (familia === 3) {
        hijos = 0;
        // console.log('hijos 51 Luis Pasteur :  '  + hijos);
        precioNieto = [];
        precioAdicional = [];
        precioHijo = [];
    }
    else if (familia == 4) {
    }
    let precio_LuisPasteur = {};
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
    precios = precioPrincipal;
    // // //	<!-----------------------Bucle LUIS PASTEUR start------------------------>							
    for (let j in precios) {
        // console.log('imprimir j')
        // console.log(j)
        let conPromo = con_afinidad;
        let promocion = bonAfinidad;
        // console.log('promocion Luis Pasteur :  '  + promocion);
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
        //         //	<!--------------------Crear Objeto LUIS PASTEUR end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Luis Pasteur ' + nombre;
        plan.precio = precioTotal;
        // plan.valorLista = precios[j];
        // plan.promoPorcentaje = promo;
        // plan.promoDescuento = descPromo;
        // plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //      //	<!-----------------------Bucle LUIS PASTEUR end------------------------>											
    // //                 console.log( 'array LUIS PASTEUR')							
    // //                 console.log(array)							
    // return "hola"
    return array;
}
exports.valor_Luispasteur = valor_Luispasteur;
//# sourceMappingURL=luispasteur.js.map