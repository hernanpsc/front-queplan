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
exports.valorGaleno = void 0;
const functions = __importStar(require("../funciones/"));
function valorGaleno(aportesOS, valor_plan_galeno, coeficiente) {
    let tipo_IngresoPDMI = aportesOS[0];
    let beneficiariosF184 = aportesOS[1];
    let eleccionSueldoOAporte = aportesOS[2];
    let sueldoSueldoOAporte = aportesOS[3];
    let categoria_Mono = aportesOS[4];
    let arrayValorMonotXCategoria = aportesOS[5];
    let porporsentajeDeAPorte = coeficiente;
    let array = [];
    //Funcion para el calculo de aportes
    let deduccionAportesObraSocial = functions.calculoDescuentoPorAportes(tipo_IngresoPDMI, eleccionSueldoOAporte, sueldoSueldoOAporte, porporsentajeDeAPorte, categoria_Mono, arrayValorMonotXCategoria, beneficiariosF184);
    for (let j in valor_plan_galeno) {
        let empresaPlan = [j][0];
        let plan_id = empresaPlan;
        let plan_nombre = empresaPlan.substring(3);
        let valor_total_plan = valor_plan_galeno[j];
        //funcion para que impacten los descuentos y bonificaciones
        let precio_final_a_pagar = functions.final(tipo_IngresoPDMI, deduccionAportesObraSocial, valor_total_plan);
        var plan = new Object();
        plan.item_id = plan_id;
        plan.name = 'Galeno  ' + plan_nombre;
        plan.precio = precio_final_a_pagar;
        plan.valorLista = valor_plan_galeno[j];
        plan.aporteOS = deduccionAportesObraSocial;
        array.push(plan);
    }
    //	<!-----------------------Bucle GALENO end------------------------>	
    console.log('array Galeno');
    console.log(array);
    return array;
}
exports.valorGaleno = valorGaleno;
//# sourceMappingURL=galeno.js.map