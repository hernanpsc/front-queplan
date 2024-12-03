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
exports.valor_Medife = void 0;
const functions = __importStar(require("./functions"));
function valor_Medife(prices, grupo, arrayDeducciones) {
    let empresa = 'Medife';
    let edadesHijos = grupo[6];
    console.log('edadesHijos :', edadesHijos);
    let precioPrincipal = prices.precioMedifeAdultos.precios.precios;
    console.log('precioPrincipal :', precioPrincipal);
    let precioHijo1 = prices.precioMedifeHIJO0a1.precios.precios;
    console.log('precioHijo1 :', precioHijo1);
    let precioHijo20 = prices.precioMedifeHIJO2a20.precios.precios;
    console.log('precioHijo20 :', precioHijo20);
    let precioHijo29 = prices.precioMedifeHIJO21a29.precios.precios;
    console.log('precioHijo29 :', precioHijo29);
    // Inicializamos contadores
    let menoresQueUno = 0;
    console.log('menoresQueUno :', menoresQueUno);
    let deCeroA20 = 0;
    console.log('deCeroA20 :', deCeroA20);
    let familia = grupo[9];
    console.log('familia :', familia);
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
    let de21A29 = 0;
    console.log('de21A29   :', de21A29);
    console.log('promociones :', promociones);
    // Contamos las edades de los hijos según los rangos
    for (let edad of edadesHijos) {
        if (edad <= 0) {
            menoresQueUno++; // Edad menor que 1 (o igual a 0)
        }
        else if (edad >= 1 && edad <= 20) {
            deCeroA20++; // Edad entre 0 y 20
        }
        else if (edad >= 21 && edad <= 29) {
            de21A29++; // Edad entre 21 y 29
        }
    }
    console.log('menoresQueUno  2 :', menoresQueUno);
    console.log('deCeroA20  2 :', deCeroA20);
    console.log('de21A29  2 :', de21A29);
    // Reseteamos valores según el grupo
    if (familia === 1) {
        precioHijo1 = {};
        precioHijo20 = {};
        precioHijo29 = {};
        menoresQueUno = {};
        deCeroA20 = {};
        de21A29 = {};
    }
    else if (familia === 2) {
        precioHijo1 = {};
        precioHijo20 = {};
        precioHijo29 = {};
    }
    else if (familia === 3) {
        precioHijo1 = {};
        precioHijo20 = {};
        precioHijo29 = {};
        menoresQueUno = {};
        deCeroA20 = {};
        de21A29 = {};
    }
    else { }
    ;
    console.log('precioHijo1  3 :', precioHijo1);
    console.log('precioHijo20  3 :', precioHijo20);
    console.log('precioHijo29  3 :', precioHijo29);
    console.log('menoresQueUno  3 :', menoresQueUno);
    console.log('deCeroA20  3 :', deCeroA20);
    console.log('de21A29  3 :', de21A29);
    // Calculamos los precios finales
    precios = precioPrincipal;
    console.log('precios  3 :', precios);
    if (menoresQueUno > 0) {
        precios = Object.entries(precioHijo1).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: (acc[key] || 0) + value * menoresQueUno
            };
        }, { ...precios });
        console.log('precios  4 :', precios);
    }
    else if (deCeroA20 > 0) {
        precios = Object.entries(precioHijo20).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: (acc[key] || 0) + value * deCeroA20
            };
        }, { ...precios });
        console.log('precios  5 :', precios);
    }
    else if (de21A29 > 0) {
        precios = Object.entries(precioHijo29).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: (acc[key] || 0) + value * de21A29
            };
        }, { ...precios });
    }
    console.log('precios  6 :', precios);
    let array = [];
    //	<!-----------------------Bucle MEDIFE start------------------------>							
    for (let j in precios) {
        let _id = [j][0];
        let nombre = _id.substring(3);
        let confirmaSiTieneBonificaciones = con_afinidad;
        let porcentajeBonificado = bonAfinidad;
        let precioInicial = precios[j];
        console.log('nombre  6 :', nombre);
        console.log('confirmaSiTieneBonificaciones  6 :', confirmaSiTieneBonificaciones);
        console.log('porcentajeBonificado  6 :', porcentajeBonificado);
        console.log('precioInicial  6 :', precioInicial);
        // Llamar a la función y desestructurar el array devuelto
        let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);
        console.log('valor_total_plan  6 :', valor_total_plan);
        console.log('valorBonificacion  6 :', valorBonificacion);
        // Asignar los valores a nuevas variablessss
        let precioTotal = valor_total_plan;
        let bonificacionAplicada = valorBonificacion;
        console.log('tipoAsociado  6 :', tipoAsociado);
        console.log('factores.deduction  6 :', factores.deduction);
        console.log('precioTotal  6 :', precioTotal);
        let precio = functions.final(tipoAsociado, factores.deduction, precioTotal);
        console.log('precio  6 :', precio);
        //	<!--------------------Crear Objeto MEDIFE end------------------------------>																            			
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Medife ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precioInicial;
        plan.aportes_OS = factores.deduction;
        array.push(plan);
        plan.precio = precio;
        plan.promoPorcentaje = porcentajeBonificado;
        plan.promoDescuento = bonificacionAplicada;
        plan.valorLista = precioInicial;
        plan.aportes_OS = factores.deduction;
        array.push(plan);
    }
    //	<!-----------------------Bucle MEDIFE end------------------------>											
    return array;
}
exports.valor_Medife = valor_Medife;
//# sourceMappingURL=medife.js.map