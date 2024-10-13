"use strict";
//	<!-----------------------FUNCIONES QUE SE USAN EL CONTROLADOR CORIZACION ANTES DE ENTREGAR EL RESULTADO------------------------>							
Object.defineProperty(exports, "__esModule", { value: true });
exports.suprasSalud = exports.planNombre = exports.segVidaPlus = exports.final = exports.promoDescuento = exports.calculodescOS = exports.agruparYTransformarPlanes = exports.combinePlansWithPrices = void 0;
function combinePlansWithPrices(planes, precios) {
    const combinedArray = [];
    // console.log(planes)
    planes.forEach((plan) => {
        // console.log(plan)
        const matchingPrecio = precios.find((precio) => precio.item_id === plan.item_id);
        //   // console.log(plan.item_id);
        //   // console.log(precios.item_id);
        if (matchingPrecio) {
            // Combina todas las propiedades de planes y precios en un nuevo objeto
            const combinedPlan = {
                ...plan._doc,
                ...matchingPrecio,
            };
            // console.log(combinedPlan)
            // Agrega el objeto combinado al array resultado
            combinedArray.push(combinedPlan);
        }
    });
    return combinedArray;
}
exports.combinePlansWithPrices = combinePlansWithPrices;
// Función para agrupar y transformar elementos de omintPlanes
function agruparYTransformarPlanes(omintPlanes) {
    // Crear un objeto para agrupar los elementos por los primeros 7 caracteres de item_id
    const grupos = {};
    omintPlanes.forEach((plan) => {
        const item_idPrefix = plan.item_id.substring(0, 7);
        if (!grupos[item_idPrefix]) {
            // Si el grupo no existe, crearlo con un elemento inicial
            grupos[item_idPrefix] = {
                item_id: item_idPrefix,
                name: plan.name.substring(0, 4),
                precio: [{ name: plan.item_id.split('_')[2], precio: plan.precio }],
            };
        }
        else {
            // Si el grupo ya existe, agregar el precio al array de precios
            grupos[item_idPrefix].precio.push({ name: plan.item_id.split('_')[2], precio: plan.precio });
        }
        // Copiar todas las propiedades del plan original al grupo
        for (const prop in plan) {
            if (plan.hasOwnProperty(prop) && !grupos[item_idPrefix].hasOwnProperty(prop)) {
                grupos[item_idPrefix][prop] = plan[prop];
            }
        }
    });
    // Obtener los elementos agrupados como un array
    const planesAgrupados = Object.values(grupos);
    return planesAgrupados;
}
exports.agruparYTransformarPlanes = agruparYTransformarPlanes;
//	<!-----------------------FUNVIONES QUE SE USAN EN LOS ARCHIVOS DE ESTA MISMA CARPETA PARA EL CALCULO DELOS PRECIOS------------------------>							
function calculodescOS(tipo_IngresoPDMI, eleccionSueldoOAporte, sueldoSueldoOAporte, porporsentajeDeAPorte, categoria_Mono, arrayValorMonotXCategoria, beneficiariosF184) {
    let descXCapita = arrayValorMonotXCategoria[categoria_Mono];
    let deduccionAportesObraSocial = 0;
    if (tipo_IngresoPDMI == "D") {
        if (tipo_IngresoPDMI == "D") {
            if (eleccionSueldoOAporte.includes('Sueldo')) {
                deduccionAportesObraSocial = sueldoSueldoOAporte * porporsentajeDeAPorte / 100;
            }
            else if (eleccionSueldoOAporte.includes('Aporte')) {
                deduccionAportesObraSocial = sueldoSueldoOAporte / 3 * porporsentajeDeAPorte;
            }
            else if (beneficiariosF184 > 0) {
                deduccionAportesObraSocial = deduccionAportesObraSocial + (beneficiariosF184 * descXCapita);
            }
            ;
        }
        else if (tipo_IngresoPDMI === "M") {
            deduccionAportesObraSocial = beneficiariosF184 * descXCapita;
        }
        else {
            deduccionAportesObraSocial = '';
        }
        ;
    }
    return deduccionAportesObraSocial;
}
exports.calculodescOS = calculodescOS;
function promoDescuento(valor_plan, promo_Porcentaje, afiche) {
    let bonAfinidad = 0;
    let valor_total_plan = 0;
    let bonAfinidadporcentaje = promo_Porcentaje;
    if (afiche == true) {
        bonAfinidad = parseInt(valor_plan) * bonAfinidadporcentaje;
        valor_total_plan = parseInt(valor_plan) - parseInt(bonAfinidad.toFixed());
    }
    else {
        bonAfinidad = 0;
        valor_total_plan = valor_plan;
    }
    return [valor_total_plan, bonAfinidad, bonAfinidadporcentaje];
}
exports.promoDescuento = promoDescuento;
function final(tipo_IngresoPDMI, deduccionAportesObraSocial, valor_total_plan) {
    let tipoIngresoPDMI = tipo_IngresoPDMI;
    let deduccion_AportesObraSocial = deduccionAportesObraSocial;
    let valortotal_plan = valor_total_plan;
    let precio_final_a_pagar = valortotal_plan;
    if (tipoIngresoPDMI === "M" || tipoIngresoPDMI === "D") {
        deduccion_AportesObraSocial = parseInt(deduccion_AportesObraSocial);
        precio_final_a_pagar = parseInt(valor_total_plan) - deduccion_AportesObraSocial;
    }
    else {
        precio_final_a_pagar = valortotal_plan;
    }
    if (precio_final_a_pagar < 0) {
        precio_final_a_pagar = 0;
    }
    return precio_final_a_pagar;
}
exports.final = final;
//	<!-----------------------ESTAS FUNCIONES LAS USA SOLO SANCOR SALUD------------------------>							
function segVidaPlus(segVidacheck, segVida2check, edad1, edad2, segVidaPrecio) {
    let segVidaTotal = 0;
    let segVida = 0;
    let segVida1 = 0;
    if (segVidacheck == true) {
        if (edad1 >= 18 && edad1 <= 45) {
            segVida = segVidaPrecio[0]['col_2'];
        }
        else if (edad1 >= 46 && edad1 <= 54) {
            segVida = segVidaPrecio[1]['col_2'];
        }
        else {
            segVida = segVidaPrecio[2]['col_2'];
        }
        ;
    }
    if (segVida2check == true) {
        if (edad2 < 18) {
            segVida1 = 0;
        }
        else if (edad2 >= 18 && edad2 <= 45) {
            segVida1 = segVidaPrecio[0]['col_2'];
        }
        else if (edad1 >= 46 && edad1 <= 54) {
            segVida1 = segVidaPrecio[1]['col_2'];
        }
        else {
            segVida1 = segVidaPrecio[2]['col_2'];
        }
        ;
        segVidaTotal = segVida + segVida1;
    }
    segVidaTotal = segVida + segVida1;
    return segVidaTotal;
}
exports.segVidaPlus = segVidaPlus;
function planNombre(gen, plan_gen, plan_nombre) {
    if (gen === 'GEN' && plan_gen >= 100 && plan_gen <= 450) {
        plan_nombre = 'GEN' + plan_nombre;
    }
    else {
        plan_nombre = plan_nombre;
    }
    ;
    return plan_nombre;
}
exports.planNombre = planNombre;
function suprasSalud(supras, gen, plan_nombre, otrosBenPrecios, grupoFam) {
    let otrosBen = 0;
    if (supras === true && gen === '') {
        otrosBen = 0;
        if (plan_nombre.includes('B')) {
            otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSPRO'];
            otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSOD'];
        }
        else {
            otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSPRO'];
            otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSOD'];
            otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSAC'];
            otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SUF'];
        }
        ;
    }
    return otrosBen;
}
exports.suprasSalud = suprasSalud;
//# sourceMappingURL=functions.js.map