  // <!----------------------Funcion VALOR DEL PLAN OMINT start----------------------------> 
  import * as functions from './functions';

  export function valorOmint(aportesOS,edad_2,numHijos,numhijo_2, precio_titular, precio_conyuge, precio_hijo1, precio_hijo2, edad_ID1OMINT,conPromo,promocion,coeficiente) {
    let edad2 = edad_2;

    let edadID1OMINT = edad_ID1OMINT;
    let precios = {};
    let precio_adultos_Omint = {};
    //Funcion para el calculo de aportes
    let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])
    let hijos = numhijo_2;
    let  titular = precio_titular ;
    let  conyuge = precio_conyuge ;
    let  hijo_1 = precio_hijo1;
    let  hijo_2 = precio_hijo2;
    let array = [];
    if (edad2 > 17) {
        precio_adultos_Omint = Object.entries(conyuge).reduce((acc, [key, value]) => // matrimonio
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value)
            }), {
                ...titular
            });
    } else {
        precio_adultos_Omint = titular
    }
    if (numHijos == 1) {
        precios = Object.entries(hijo_1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Omint
        });
    } else if (numHijos > 1) {
        let precio_hijos_Omint = Object.entries(hijo_2).reduce((acc, [key, value]) => // dis hijos o mas
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
            }), {
                ...hijo_1
            });
        precios = Object.entries(precio_hijos_Omint).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Omint
        });
    } else {
        precios = precio_adultos_Omint;
    };
    if (typeof edadID1OMINT === 'string' && edadID1OMINT.includes('P')) {
        precios = precios;
      }
    // return precios
// <!---------------------Funcion VALOR DEL PLAN OMINT end----------------------------> 
for ( let j in precios) {
         let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
        let descPromo = functions.promoDescuento(precios[j],promo, conPromo)[1];
        let precioTotal = functions.promoDescuento(precios[j],promo, conPromo)[0];
        let precio = functions.final(aportesOS[0],descOS,precioTotal);

var plan = new Object();
                plan.item_id = _id;
                plan.name = 'OMINT  ' + nombre;
                plan.precio = precio;
                plan.promoPorcentaje = promo;
                plan.promoDescuento = descPromo;
                plan.valorLista = precios[j];
                plan.aporteOS = descOS;
                array.push(plan);		
            }
//	<!-----------------------Bucle OMINT end------------------------>								
console.log( 'array OMINT')
console.log(array)													
        return array					
        }
// <!----------------------Funcion VALOR DEL PLAN OMINT end---------------------------->