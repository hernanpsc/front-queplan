  // <!----------------------Funcion VALOR DEL PLAN OMINT start----------------------------> 
  import * as functions from '../funciones/';

  export function valorOmint(aportesOS,edad_2,numHijos,numhijo_2, precio_titular, precio_conyuge, precio_hijo1, precio_hijo2, edad_ID1OMINT,afiche,bonAfinidad_porcentaje,coeficiente) {
    let tipo_IngresoPDMI= aportesOS[0];
    let beneficiariosF184 = aportesOS[1];
    let eleccionSueldoOAporte = aportesOS[2];
    let sueldoSueldoOAporte = aportesOS[3];
    let categoria_Mono = aportesOS[4];
    let arrayValorMonotXCategoria  = aportesOS[5];	

    let porporsentajeDeAPorte = coeficiente;
    let edad2 = edad_2;
    
    let edadID1OMINT = edad_ID1OMINT;
    let valor_plan_omint = {};
    let precio_adultos_Omint = {};
    let deduccionAportesObraSocial =0;
    let numhijo2 = numhijo_2;
    let  precio_titular_Omint = precio_titular ;
    let  precio_conyuge_Omint = precio_conyuge ;
    let  precio_hijo1_Omint = precio_hijo1;
    let  precio_hijo2_Omint = precio_hijo2;
    let array = [];

    if (edad2 > 17) {
        precio_adultos_Omint = Object.entries(precio_conyuge_Omint).reduce((acc, [key, value]) => // matrimonio
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value)
            }), {
                ...precio_titular_Omint
            });
    } else {
        precio_adultos_Omint = precio_titular_Omint
    }
    if (numHijos == 1) {
        valor_plan_omint = Object.entries(precio_hijo1_Omint).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Omint
        });
    } else if (numHijos > 1) {
        let precio_hijos_Omint = Object.entries(precio_hijo2_Omint).reduce((acc, [key, value]) => // dis hijos o mas
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value * numhijo2)
            }), {
                ...precio_hijo1_Omint
            });

        valor_plan_omint = Object.entries(precio_hijos_Omint).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Omint
        });
    } else {
        valor_plan_omint = precio_adultos_Omint;
    };
    if (typeof edadID1OMINT === 'string' && edadID1OMINT.includes('P')) {
        valor_plan_omint = valor_plan_omint;
      }
    // return valor_plan_omint
// <!---------------------Funcion VALOR DEL PLAN OMINT end----------------------------> 
//Funcion para el calculo de aportes
deduccionAportesObraSocial=functions.calculoDescuentoPorAportes(tipo_IngresoPDMI,eleccionSueldoOAporte,sueldoSueldoOAporte,porporsentajeDeAPorte,categoria_Mono,arrayValorMonotXCategoria,beneficiariosF184)
//
for ( let j in valor_plan_omint) {
         let empresaPlan = [j][0];
        let plan_id = empresaPlan;
        let plan_nombre = empresaPlan.substring(3);
        let bonAfinidadporcentaje = functions.promoDescuento(valor_plan_omint[j],bonAfinidad_porcentaje, afiche)[2];
        let bonAfinidad = functions.promoDescuento(valor_plan_omint[j],bonAfinidadporcentaje, afiche)[1];
        let valor_total_plan = functions.promoDescuento(valor_plan_omint[j],bonAfinidadporcentaje, afiche)[0];
        let precio_final_a_pagar = functions.final(tipo_IngresoPDMI,deduccionAportesObraSocial,valor_total_plan);

var plan = new Object();
                plan.item_id = plan_id;
                plan.name = 'OMINT  ' + plan_nombre;
                plan.precio = precio_final_a_pagar;
                plan.promoPorcentaje = bonAfinidadporcentaje;
                plan.promoDescuento = bonAfinidad;
                plan.valorLista = valor_plan_omint[j];
                plan.aporteOS = deduccionAportesObraSocial;
                array.push(plan);		
            }
//	<!-----------------------Bucle OMINT end------------------------>								
console.log( 'array OMINT')
console.log(array)													
        return array					
        }
// <!----------------------Funcion VALOR DEL PLAN OMINT end---------------------------->