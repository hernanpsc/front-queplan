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
exports.valor_Avalian = void 0;
const functions = __importStar(require("./functions"));
function valor_Avalian(aportes_OS, coeficiente, edad_1, edad_2, numHijos, grupo_Fam, con_afinidad, promocion, Titular, Conyuge, Hijo1, Hijo2, Hijo3, Hijo25) {
    let edad1 = edad_1;
    let edad2 = edad_2;
    let hijos = numHijos;
    let aportesOS = aportes_OS;
    let grupoFam = grupo_Fam;
    let precioTitular = Titular;
    let precioConyuge = Conyuge;
    let precioHijo1 = Hijo1;
    let precioHijo2 = Hijo2;
    let precioHijo3 = Hijo3;
    let precioHijo4 = Hijo25;
    console.log('aportesOS :  ' + aportes_OS);
    console.log('grupoFam :  ' + grupoFam);
    console.log('hijos :  ' + numHijos);
    console.log('precioTitular :  ' + Titular);
    console.log('precioConyuge :  ' + Conyuge);
    console.log('precioHijo1 :  ' + Hijo1);
    console.log('precioHijo2 :  ' + Hijo2);
    console.log('precioHijo3 :  ' + Hijo3);
    console.log('precioHijo4 :  ' + Hijo25);
    if (grupoFam === 1) {
        edad2 = 0;
        precioConyuge = 0;
        hijos = 0;
    }
    else if (grupoFam == 2) {
        precioConyuge = 0;
        edad2 = 0;
    }
    else if (grupoFam == 3) {
        hijos = 0;
    }
    let precio_adultos_Avalian = {};
    let precios = {};
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let array = [];
    if (grupoFam >= 3) {
        precio_adultos_Avalian = Object.entries(precioConyuge).reduce((acc, [key, value]) => // matrimonio
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precioTitular
        });
    }
    else {
        precio_adultos_Avalian = precioTitular;
    }
    if (hijos >= 1) {
        precios = Object.entries(precioHijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Avalian
        });
    }
    else if (hijos >= 2) {
        precios = Object.entries(precioHijo2).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Avalian
        });
    }
    else if (hijos >= 3) {
        precios = Object.entries(precioHijo3).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Avalian
        });
    }
    else {
        precios = precio_adultos_Avalian;
    }
    // //	<!-----------------------Bucle AVALIAN start------------------------>							
    for (let j in precios) {
        //     console.log('imprimir j')
        //     console.log(j)
        let conPromo = con_afinidad;
        let empresaPlan = [j][0];
        console.log('empresaPlan ');
        console.log(empresaPlan);
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        console.log('conPromo : ' + conPromo);
        let promo = functions.promoDescuento(precios[j], promocion, conPromo)[2];
        let descPromo = functions.promoDescuento(precios[j], promo, conPromo)[1];
        let precioTotal = functions.promoDescuento(precios[j], promo, conPromo)[0];
        console.log('precioTotal');
        console.log(precioTotal);
        console.log('descOS');
        console.log(descOS);
        console.log('aportes_OS[0]');
        console.log(aportesOS[0]);
        let precio = functions.final(aportesOS[0], descOS, precioTotal);
        console.log('precio ');
        console.log(precio);
        //	<!--------------------Crear Objeto AVALIAN end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Avalian ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = promo;
        plan.promoDescuento = descPromo;
        plan.valorLista = precios[j];
        plan.aportesOS = descOS;
        array.push(plan);
    }
    //	<!-----------------------Bucle AVALIAN end------------------------>											
    console.log('array AVALIAN');
    console.log(array);
    return array;
}
exports.valor_Avalian = valor_Avalian;
//# sourceMappingURL=avalian.js.map