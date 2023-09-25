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
exports.valorSwiss = void 0;
const functions = __importStar(require("./functions"));
function valorSwiss(aportesOS, edad_1, edad_2, numHijos, numhijo2, titular, conyuge, hijo1, hijo2, coeficiente) {
    let edad1 = edad_1;
    let edad2 = edad_2;
    let hijos = numHijos;
    let adultos = {};
    let precios = {};
    console.log('aportesOS ');
    console.log(aportesOS);
    console.log('edad1 ');
    console.log(edad1);
    console.log('edad2 ');
    console.log(edad2);
    console.log('hijos ');
    console.log(hijos);
    console.log('numhijo2 ');
    console.log(numhijo2);
    console.log('titular ');
    console.log(titular);
    console.log('conyuge ');
    console.log(conyuge);
    console.log('hijo1 ');
    console.log(hijo1);
    console.log('hijo2 ');
    console.log(hijo2);
    console.log('coeficiente ');
    console.log(coeficiente);
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let array = [];
    console.log('descuentos por aportes ' + descOS);
    if (edad2 > 17) {
        adultos = Object.entries(conyuge).reduce((acc, [key, value]) => // matrimonio
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...titular
        });
    }
    else {
        adultos = titular;
        console.log('adultos');
        console.log(adultos);
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
        let hijo1 = Object.entries(hijo2).reduce((acc, [key, value]) => // dis hijos o mas
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value * numhijo2)
        }), {
            ...hijo1
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
        console.log('adultos');
        console.log(adultos);
        console.log('precios 74');
        console.log(precios);
    }
    //	<!-----------------------Bucle SANCOR start------------------------>							
    for (let j in precios) {
        console.log('imprimir j');
        console.log(j);
        let conPromo = false;
        let promocion = 0;
        let empresaPlan = [j][0];
        console.log(empresaPlan);
        let _id = empresaPlan;
        console.log(_id);
        let nombre = empresaPlan.substring(3);
        console.log(nombre);
        let promo = functions.promoDescuento(precios[j], promocion, conPromo)[2];
        let descPromo = functions.promoDescuento(precios[j], promo, conPromo)[1];
        let precioTotal = functions.promoDescuento(precios[j], promo, conPromo)[0];
        let precio = functions.final(aportesOS[0], descOS, precioTotal);
        console.log('precio ');
        console.log(precio);
        //	<!--------------------Crear Objeto SWISS end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Swiss Medical ' + nombre;
        plan.precio = precio;
        //    plan.promoPorcentaje = promo;
        //    plan.promoDescuento = descPromo;
        plan.valorLista = precios[j];
        plan.aporteOS = descOS;
        array.push(plan);
    }
    //	<!-----------------------Bucle SANCOR end------------------------>											
    console.log('array SWISS');
    console.log(array);
    return array;
}
exports.valorSwiss = valorSwiss;
//# sourceMappingURL=swissmedical.js.map