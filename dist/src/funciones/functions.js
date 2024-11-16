"use strict";
//	<!----------------------FUNCIONES QUE SE USAN EL CONTROLADOR CORIZACION ANTES DE ENTREGAR EL RESULTADO------------------------>							
Object.defineProperty(exports, "__esModule", { value: true });
exports.valor_prepagas = exports.imprimirPrecios = exports.suprasSalud = exports.planNombre = exports.segVidaPlus = exports.final = exports.promoDescuento = exports.calculodescOS = exports.agruparYTransformarPlanes = exports.combinePlansWithPrices = void 0;
function combinePlansWithPrices(planes, precios) {
    const combinedArray = [];
    //   console.log(planes)
    planes.forEach((plan) => {
        // console.log(plan)
        const matchingPrecio = precios.find((precio) => precio.item_id === plan.item_id);
        //   console.log(plan.item_id);
        //   console.log(precios.item_id);
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
// let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])
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
function imprimirPrecios(prices, tipo_IngresoPDMI, group, idAdultosMedife, idPrevencion, IdDoctored, IdsAvalian, idsCristalyRas, idsLuisPasteur, idsAsmepriv, idsBayresPlan, idsHominis) {
    console.log(' ID Prevencion  :  ' + idPrevencion);
    console.log(' precioPrevencion  :');
    console.log(prices.precioPrevencion.precios);
    console.log(" id:  IdDoctored[0]  :  " + IdDoctored[0]);
    console.log(' precioDoctoredGrupo  :');
    console.log(prices.precioDoctoredGrupo.precios);
    console.log(" id:  IdDoctored[1]   :  " + IdDoctored[1]);
    console.log(' precioDoctoredHijo3  :');
    console.log(prices.precioDoctoredHijo3.precios);
    console.log(" id:  IdDoctored[2]   :  " + IdDoctored[2]);
    console.log(' precioDoctoredAd  :');
    console.log(prices.precioDoctoredAd.precios);
    console.log('idAdultosMedife :' + idAdultosMedife);
    console.log(' precioMedifeAdultos  :');
    console.log(prices.precioMedifeAdultos.precios);
    console.log('IDMedifeHijo0a1  :' + 'medife' + tipo_IngresoPDMI + 'HIJO0a1');
    console.log(' precioMedifeHijo0a1  :');
    console.log(prices.precioMedifeHijo0a1.precios);
    console.log('IDMedifeHijo0a20 :' + 'medife' + tipo_IngresoPDMI + 'HIJO2a20');
    console.log(' precioMedifeHijo0a20  :');
    console.log(prices.precioMedifeHijo0a20.precios);
    console.log('IDMedifeHijo0a25 :' + 'medife' + tipo_IngresoPDMI + 'HIJO25');
    console.log(' precioMedifeHijo0a25  :');
    console.log(prices.precioMedifeHijo0a25.precios);
    console.log('IDAvalianTitular  :' + IdsAvalian[0]);
    console.log(' precioAvalianTitular  :');
    console.log(prices.precioAvalianTitular.precios);
    console.log('IDAvalianConyuge  :' + IdsAvalian[1]);
    console.log(' precioAvalianConyuge  :');
    console.log(prices.precioAvalianConyuge.precios);
    console.log('IDAvalianHijo1  :' + IdsAvalian[2]);
    console.log(' precioAvalianHijo1  :');
    console.log(prices.precioAvalianHijo1.precios);
    console.log('IDAvalianHijo2  :' + IdsAvalian[3]);
    console.log(' precioAvalianHijo2  :');
    console.log(prices.precioAvalianHijo2.precios);
    console.log('IDAvalianHijo3  :' + IdsAvalian[4]);
    console.log(' precioAvalianHijo3  :');
    console.log(prices.precioAvalianHijo3.precios);
    console.log('IDAvalianHijo25  :' + IdsAvalian[5]);
    console.log(' precioAvalianHijo25  :');
    console.log(prices.precioAvalianHijo25.precios);
    console.log(" id:  'ras' + idsCristalyRas[0]   :  " + idsCristalyRas[0]);
    console.log(' precioTitularRas  :');
    console.log(prices.precioTitularRas.precios);
    if (group == 3 || group == 4) {
        console.log(" id:  'ras' + idsCristalyRas[1]   :  " + idsCristalyRas[1]);
        console.log(' precioConyugeRas  :');
        console.log(prices.precioConyugeRas.precios);
    }
    console.log(" id:  'ras' + idsCristalyRas[2]   :  " + idsCristalyRas[2]);
    console.log(' precioHijo3Ras  :');
    console.log(prices.precioHijo3Ras.precios);
    console.log(" id:  'ras' + idsCristalyRas[3]   :  " + idsCristalyRas[3]);
    console.log(' precioHijo2Ras  :');
    console.log(prices.precioHijo2Ras.precios);
    console.log(" id:  'ras' + idsCristalyRas[4]   :  " + idsCristalyRas[4]);
    console.log(' precioHijo1Ras  :');
    console.log(prices.precioHijo1Ras.precios);
    console.log(" id:  =  +  idsCristalyRas[5]   :  " + idsCristalyRas[5]);
    console.log(' precioTitularCristal  :');
    console.log(prices.precioTitularCristal.precios);
    if (group == 3 || group == 4) {
        console.log(" id:  =  +  idsCristalyRas[6]   :  " + idsCristalyRas[6]);
        console.log(' precioConyugeCristal  :');
        console.log(prices.precioConyugeCristal.precios);
    }
    console.log(" id:  =  +  idsCristalyRas[7]   :  " + idsCristalyRas[7]);
    console.log(' precioHijo3Cristal  :');
    console.log(prices.precioHijo3Cristal.precios);
    console.log(" id:  =  +  idsCristalyRas[8]   :  " + idsCristalyRas[8]);
    console.log(' precioHijo2Cristal  :');
    console.log(prices.precioHijo2Cristal.precios);
    console.log(" id:  =  +  idsCristalyRas[9]   :  " + idsCristalyRas[9]);
    console.log(' precioHijo1Cristal  :');
    console.log(prices.precioHijo1Cristal.precios);
    console.log(" id:  =  +  idsLuisPasteur[0]  :  " + idsLuisPasteur[0]);
    console.log(' precioLuispasteurAdultos  :');
    console.log(prices.precioLuispasteurAdultos.precios);
    console.log(" id:  =  +  idsLuisPasteur[1]  :  " + idsLuisPasteur[1]);
    console.log(' precioLuispasteurNieto  :');
    console.log(prices.precioLuispasteurNieto.precios);
    console.log(" id:  =  +  idsLuisPasteur[2]  :  " + idsLuisPasteur[2]);
    console.log(' precioLuispasteurAdicional  :');
    console.log(prices.precioLuispasteurAdicional.precios);
    console.log(" id:  =  +  idsLuisPasteur[3]  :  " + idsLuisPasteur[3]);
    console.log(' precioLuispasteurHijo  :');
    console.log(prices.precioLuispasteurHijo.precios);
    console.log(" id:  =  +  idsAsmepriv[0]  :  " + idsAsmepriv[0]);
    console.log(' precioAsmepriv  :');
    console.log(prices.precioAsmepriv.precios);
    console.log(" id:  =  +  idsAsmepriv[1]  :  " + idsAsmepriv[1]);
    console.log(' precioAdmenorUno  :');
    console.log(prices.precioAdmenorUno.precios);
    console.log(" id:  =  +  idsAsmepriv[2]  :  " + idsAsmepriv[2]);
    console.log(' precioAsmeprivHijoHasta21  :');
    console.log(prices.precioAsmeprivHijoHasta21.precios);
    console.log(" id:  =  +  idsAsmepriv[3]  :  " + idsAsmepriv[3]);
    console.log(' precioAsmeprivRecargoHijo21a29  :');
    console.log(prices.precioAsmeprivRecargoHijo21a29.precios);
    console.log(" id:  =  +  idsBayresPlan[0]  :  " + idsBayresPlan[0]);
    console.log(' precioBayresAdultos  :');
    console.log(prices.precioBayresAdultos.precios);
    console.log(" id:  =  +  idsBayresPlan[1]  :  " + idsBayresPlan[1]);
    console.log(' precioBayresHijoHasta25  :');
    console.log(prices.precioBayresHijoHasta25.precios);
    console.log(" id:  =  +  idsBayresPlan[2]  :  " + idsBayresPlan[2]);
    console.log(' precioBayresAd18a49  :');
    console.log(prices.precioBayresAd18a49.precios);
    console.log(" id:  =  +  idsBayresPlan[3]  :  " + idsBayresPlan[3]);
    console.log(' precioBayresJovenSinMaternidad  :');
    console.log(prices.precioBayresJovenSinMaternidad.precios);
    console.log(" id:  =  +  idsBayresPlan[4]  :  " + idsBayresPlan[4]);
    console.log(' precioBayresInd18a29  :');
    console.log(prices.precioBayresInd18a29.precios);
    console.log(" id:  =  +  precioHominis  :  " + idsHominis);
    console.log(' precioHominis  :');
    console.log(prices.precioHominis.precios);
}
exports.imprimirPrecios = imprimirPrecios;
// Función de búsqueda de coeficientes (sin tipos de TypeScript)
function buscar_mi_coeficiente(type, coeficientesCopia) {
    return coeficientesCopia[type]; // Devuelve el coeficiente correspondiente
}
const index_1 = require("./index");
function valor_prepagas(aporte_OS, edad_2, numHijos, numhijo2, prices, idOmint, afinidad, bonAfinidad, group, grupo, edadIdPremedic, edad_1, grupoFam, segvida, segvida1, supras, gen, numkids, coeficientesCopia) {
    console.log('valor_prepagas');
    let omint = (0, index_1.valorOmint)(aporte_OS, edad_2, numHijos, numhijo2, prices.precio_titular_Omint.precios, prices.precio_conyuge_Omint.precios, prices.precio_hijo1_Omint.precios, prices.precio_hijo2_Omint.precios, idOmint[0], afinidad, bonAfinidad, buscar_mi_coeficiente('OMINT', coeficientesCopia), group);
    console.log(' valor_OMINT ', omint);
    let Premedic = (0, index_1.valor_Premedic)(aporte_OS, buscar_mi_coeficiente('Premedic', coeficientesCopia), grupo[3], prices.priceAdultosPr.precios, prices.pricePrHijoMenir25.precios, prices.pricePrHijoMenir1.precios, edadIdPremedic, afinidad, bonAfinidad, group);
    console.log(' valor_Premedic ', Premedic);
    let SanCor = (0, index_1.valor_SanCor)(aporte_OS, buscar_mi_coeficiente('SanCor Salud', coeficientesCopia), edad_1, edad_2, grupo[3], prices.precioSanCor1Hijo.precios, prices.precioSanCor2Hijo.precios, prices.precioSanCorTitular.precios, prices.precioConyugeSanCor.precios, numhijo2, grupoFam, segvida, segvida1, supras, afinidad, bonAfinidad, gen);
    console.log(' valor_SanCor ', SanCor);
    let Galeno = (0, index_1.valor_Galeno)(aporte_OS, prices.priceGrupoGaleno.precios, buscar_mi_coeficiente('Galeno', coeficientesCopia));
    console.log(' valor_Galeno ', Galeno);
    let Swiss = (0, index_1.valor_Swiss)(aporte_OS, edad_2, numkids, numhijo2, prices.precioTitularSwiss.precios, prices.precioConyugeSwiss.precios, prices.precioHijo1Swiss.precios, prices.precioHijo2Swiss.precios, buscar_mi_coeficiente('Swiss Medical', coeficientesCopia), group);
    console.log(' valor_Swiss ', Swiss);
    let Doctored = (0, index_1.valor_Doctored)(aporte_OS, buscar_mi_coeficiente('Doctored', coeficientesCopia), grupo[3], prices.precioDoctoredGrupo.precios, prices.precioDoctoredHijo3.precios, group);
    console.log(' valor_Doctored ', Doctored);
    let Prevencion = (0, index_1.valor_Prevencion)(aporte_OS, buscar_mi_coeficiente('Prevencion', coeficientesCopia), grupo[3], prices.precioPrevencion.precios, group);
    console.log(' valor_Prevencion ', Prevencion);
    let Avalian = (0, index_1.valor_Avalian)(aporte_OS, buscar_mi_coeficiente('Avalian', coeficientesCopia), edad_1, edad_2, grupo[3], grupoFam, afinidad, bonAfinidad, prices.precioAvalianTitular.precios, prices.precioAvalianConyuge.precios, prices.precioAvalianHijo1.precios, prices.precioAvalianHijo2.precios, prices.precioAvalianHijo3.precios, prices.precioAvalianHijo25.precios);
    console.log(' valor_Avalian ', Avalian);
    // let Ras = valor_Ras(aporte_OS,buscar_mi_coeficiente('Ras', coeficientesCopia), group, bonAfinidad, prices.precioTitularRas.precios, prices.precioConyugeRas.precios, prices.precioHijo1Ras.precios, prices.precioHijo2Ras.precios, prices.precioHijo3Ras.precios);
    // // console.log(' valor_Ras ' , Ras)
    //  let Cristal = valor_Cristal(aporte_OS,buscar_mi_coeficiente('Cristal', coeficientesCopia), group, bonAfinidad, prices.precioTitularCristal.precios, prices.precioConyugeCristal.precios, prices.precioHijo1Cristal.precios, prices.precioHijo2Cristal.precios, prices.precioHijo3Cristal.precios);
    // // console.log(' valor_Cristal ' , Cristal)
    //  let Asmepriv = valor_Asmepriv(aporte_OS,buscar_mi_coeficiente('Asmepriv', coeficientesCopia), group, bonAfinidad, prices.precioAsmepriv.precios, prices.precioAdmenorUno.precios, prices.precioAsmeprivHijoHasta21.precios, prices.precioAsmeprivRecargoHijo21a29.precios);
    //  // console.log(' valor_Asmepriv ' , Asmepriv)
    //  let Luispasteur = valor_Luispasteur(aporte_OS,buscar_mi_coeficiente('Luispasteur', coeficientesCopia), group, bonAfinidad, prices.precioLuispasteurAdultos.precios, prices.precioLuispasteurNieto.precios, prices.precioLuispasteurAdicional.precios, prices.precioLuispasteurHijo.precios );
    //  // console.log(' valor_Luispasteur ' , Luispasteur);
    //  let Bayresplan = valor_Bayresplan(aporte_OS,buscar_mi_coeficiente('Bayresplan', coeficientesCopia), group, bonAfinidad, prices.precioBayresAdultos.precios, prices.precioBayresHijoHasta25.precios, prices.precioBayresAd18a49.precios, prices.precioBayresJovenSinMaternidad.precios, prices.precioBayresInd18a29.precios );
    //  // console.log(' valor_Bayresplan ' , Bayresplan)
    //  let Hominis = valor_Hominis(aporte_OS,buscar_mi_coeficiente('Hominis', coeficientesCopia), group, bonAfinidad, prices.precioHominis.precios );
    //  // console.log(' valor_Hominis ' , Hominis)
    let concat = omint.concat(SanCor, Premedic, Galeno, Swiss, Doctored, Prevencion, Avalian);
    console.log('concat   : ' + concat);
    return concat;
}
exports.valor_prepagas = valor_prepagas;
//# sourceMappingURL=functions.js.map