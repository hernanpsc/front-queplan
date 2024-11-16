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
exports.valor_Prevencion = void 0;
const functions = __importStar(require("./functions"));
function valor_Prevencion(aporte_OS, coeficiente, grupo, precioPrevencion, group) {
    let aportesOS = aporte_OS;
    let mi_coeficiente = coeficiente;
    let grup = grupo;
    let precios = precioPrevencion;
    let grou = group;
    let array = [];
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    for (let j in precios) {
        let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let precioTotal = precios[j];
        // console.log(aportesOS[0])
        // console.log(descOS)
        // console.log(precioTotal)
        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(aportesOS[0], descOS, precioTotal);
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Prevencion-Salud  ' + nombre;
        plan.precio = precio;
        plan.valorLista = precios[j];
        plan.aportesOS = descOS;
        array.push(plan);
    }
    //	<!-----------------------Bucle GALENO end------------------------>	
    // console.log( 'array Galeno')
    // console.log(array)													
    return array;
}
exports.valor_Prevencion = valor_Prevencion;
//# sourceMappingURL=prevencionsalud.js.map