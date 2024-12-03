  // <!----------------------Funcion VALOR DEL PLAN OMINT start----------------------------> 
import * as functions from './functions';

// return [num_adultos, primerhijo, restohijos, totalhijos, gen, capitas,arrayEdadesHijos,edad_1,edad_2,familia,grupoSigla];

  export function valor_Omint(prices,grupo,arrayDeducciones) {
 
 
    let empresa = 'OMINT';
    let familia = grupo[9];
    


    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
  if (promociones[0] >= 1 ){
      con_afinidad === true;
  }


    let  precio_titular = prices.precio_titular_Omint.precios.precios;
    let  precio_conyuge = prices.precio_conyuge_Omint.precios.precios;
    let  precio_hijo_1 = prices.precio_hijo1_Omint.precios.precios;
    let  precio_hijo_2 = prices.precio_hijo2_Omint.precios.precios;
    let numHijos = grupo[3];
    // console.log('familia 36 omint  : ');

    if (familia === 1) {
      // No hay hijos, ni cónyuge, solo titular

      precio_hijo_1 = {};
      precio_hijo_2 = {};
      precio_conyuge = {};
    } else if (familia === 2) {
      // titular con hijos

      precio_conyuge = {};
    } else if (familia === 3) {
      // Familia con titular y cónyuge, no hay hijos
      precio_hijo_1 = {};
      precio_hijo_2 = {};
    } else {
            // Familia con titular y cónyuge y tambien hijos

      // Caso para otros grupos (por ejemplo, grupo con hijos)
      // Deja los objetos de hijos como están, si es necesario puedes agregarlos aquí
    }
    // console.log('familia 60 omint  : ');
    // console.log('precio_titular  : ' );console.log(precio_titular);
    // console.log('precio_conyuge  : ' );console.log(precio_conyuge);
    // console.log('precio_hijo_1  : ' );console.log(precio_hijo_1);
    // console.log('precio_hijo_2  : ' );console.log(precio_hijo_2);
    let array = [];

    let precios = {}

    // Iterar sobre las claves de uno de los objetos (todos tienen las mismas claves)
// Iterar sobre las claves de uno de los objetos (todos tienen las mismas claves)
Object.keys(precio_titular).forEach(key => {
  // Inicializar el valor total para cada clave
  let total = 0;

  // Asegurarse de que los valores sean números y sumar los precios del titular y cónyuge
  total += parseInt(precio_titular[key]) || 0;
  total += parseInt(precio_conyuge[key]) || 0;

  // Verificar si existen precios para hijo_1 y sumar solo si no están vacíos
  if (precio_hijo_1 && precio_hijo_1[key] !== undefined) {
    total += parseInt(precio_hijo_1[key]) || 0;
  }

  // Verificar si existen precios para hijo_2 y sumar solo si no están vacíos
  if (precio_hijo_2 && precio_hijo_2[key] !== undefined) {
    total += (numHijos - 2) * (parseInt(precio_hijo_2[key]) || 0); // Multiplica por los hijos adicionales
  }

  // Asignar el valor calculado al objeto precios
  precios[key] = total;
});
    //  else if (numHijos > 1) {
    //     let precio_hijos_Omint = Object.entries(hijo_2).reduce((acc, [key, value]) => // dis hijos o mas
    //         ({
    //             ...acc,
    //             [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
    //         }), {
    //             ...hijo_1
    //         });
    //     precios = Object.entries(precio_hijos_Omint).reduce((acc, [key, value]) => ({
    //         ...acc,
    //         [key]: parseInt((acc[key]) || 0) + parseInt(value)
    //     }), {
    //         ...precio_adultos_Omint
    //     });
    // } else {
    //     precios = precio_adultos_Omint;
    // };
    // if (aportes_OS[0]==='P') {
    //     precios = precios;
    //   }
    // console.log('Precios del grupo familiar completo:', precios);

  
// <!---------------------Funcion VALOR DEL PLAN OMINT end----------------------------> 
for ( let j in precios) {
        let confirmaSiTieneBonificaciones = con_afinidad;
        let porcentajeBonificado = bonAfinidad;

        let precioInicial = precios[j];
        // console.log('precioInicial :');console.log(precioInicial)
        let _id = [j][0];
        // console.log('_id :');console.log(_id)
        let nombre = _id.substring(3);
        // console.log('nombre :');console.log(nombre)


        // Llamar a la función y desestructurar el array devuelto
        let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);

        // Asignar los valores a nuevas variables
        let precioTotal = valor_total_plan;
        let bonificacionAplicada = valorBonificacion;

        // Mostrar los resultados en consola
        // console.log('precioTotal :');
         // console.log('precioTotal);

        // console.log('bonificacionAplicada :');
         // console.log('bonificacionAplicada);
        // console.log('tipoIngreso aportes_OS[0]  :',aportes_OS[0]);
        // console.log('bonificacion por aportes factores.deduction  :',factores.deduction);

        let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
        // console.log('precio :');console.log(precio)


var plan = new Object();
                plan.item_id = _id;
                plan.name = 'OMINT  ' + nombre;
                plan.precio = precio;
                plan.promoPorcentaje = bonificacionAplicada;
                plan.promoDescuento = porcentajeBonificado;
                plan.valorLista = precios[j];
                plan.aporteOS = factores.deduction;
                array.push(plan);		
            }
//	<!-----------------------Bucle OMINT end------------------------>								
// console.log('array OMINT : ');console.log(array);


        return array					
        }
// <!----------------------Funcion VALOR DEL PLAN OMINT end---------------------------->