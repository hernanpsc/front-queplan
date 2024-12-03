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
exports.valor_Asmepriv = void 0;
const functions = __importStar(require("./functions"));
function valor_Asmepriv(prices, grupo, arrayDeducciones) {
    let familia = grupo[9];
    console.log('familia Asmepriv :  ', familia);
    let capitas = grupo[5];
    console.log('capitas Asmepriv :  ', capitas);
    let edad_1 = grupo[7];
    console.log('edad_1 Asmepriv :  ', edad_1);
    let edad_2 = grupo[8];
    console.log('edad_2 Asmepriv :  ', edad_2);
    let hijos = grupo[3];
    console.log('hijos Asmepriv :  ', hijos);
    let precioPrincipal = prices.precioAsmepriv.precios.precios;
    console.log('precioPrincipal Asmepriv :  ', precioPrincipal); // console.log(precioPrincipal);
    let precioAdmenorUnAnio = prices.precioAdmenorUno.precios.precios;
    console.log('precioAdmenorUnAnio Asmepriv :  ', precioAdmenorUnAnio); // console.log(precioAdmenorUnAnio);
    let precioHijoHasta21 = prices.precioAsmeprivHijoHasta21.precios.precios;
    console.log('precioHijoHasta21 Asmepriv :  ', precioHijoHasta21); // console.log(precioHijoHasta21);
    let precioRecargoHijo21a29 = {};
    let precioModuloMaternidad = {};
    if (prices.precioAsmeprivRecargoHijo21a29) {
        precioRecargoHijo21a29 = prices.precioAsmeprivRecargoHijo21a29.precios.precios;
        precioModuloMaternidad = prices.precioAsmeprivModuloMat.precios.precios;
    }
    let empresa = 'Asmepriv';
    switch (familia) {
        case 1:
            precioAdmenorUnAnio = {};
            precioHijoHasta21 = {};
            precioRecargoHijo21a29 = {};
            break;
        case 2:
            break;
        case 3:
            precioAdmenorUnAnio = {};
            precioHijoHasta21 = {};
            precioRecargoHijo21a29 = {};
            break;
        case 4:
            // No changes here, maybe you want to add logic for case 4?
            break;
        default:
            // Handle unknown group cases, if necessary
            break;
    }
    let precio_Asmepriv = {};
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
    console.log('  precios :', precios);
    // // //	<!-----------------------Bucle ASMEPRIV start------------------------>							
    for (let j in precios) {
        // console.log('imprimir j')
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
        let conPromo = con_afinidad;
        let promocion = bonAfinidad;
        console.log('promocion Asmepriv :  ' + promocion);
        let empresaPlan = [j][0];
        console.log('conPromo : ' + conPromo);
        console.log('precios[j] : ' + precios[j]);
        // let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
        // console.log('promo : ' + promo)
        // let descPromo = functions.promoDescuento(precios[j],promo, conPromo)[1];
        // console.log('descPromo  >');
        // console.log(descPromo)
        // let precioTotal = functions.promoDescuento(precios[j],promo, conPromo)[0];
        // console.log('precioTotal  >');
        // console.log(precioTotal)
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        console.log('precio ');
        console.log(precio);
        //         //	<!--------------------Crear Objeto ASMEPRIV end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Asmepriv ' + nombre;
        plan.precio = precioTotal;
        // plan.valorLista = precios[j];
        // plan.promoPorcentaje = promo;
        // plan.promoDescuento = descPromo;
        // plan.valorLista = precios[j];
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //      //	<!-----------------------Bucle ASMEPRIV end------------------------>											
    // //                 console.log( 'array ASMEPRIV')							
    // //                 console.log(array)							
    return array;
}
exports.valor_Asmepriv = valor_Asmepriv;
//# sourceMappingURL=asmepriv.js.map