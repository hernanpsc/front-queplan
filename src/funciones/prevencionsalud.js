import * as functions from './functions';

export function valor_Prevencion(
     prices,
    arrayDeducciones
){
     // console.log('precios   :',precioPrevencion);



   let empresa = 'Prevencion Salud';


   let precios = prices.precioPrevencion.precios.precios;
   
   let array = [];
   let factores = arrayDeducciones.find(item => item.name === empresa);
   let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
   let promociones = factores.bonificaciones;
let bonAfinidad = promociones[promociones[0]];
let con_afinidad = false;
if (promociones[0] >= 1 ){
  con_afinidad === true;
}
  
   // console.log('precios   :',precioPrevencion);
   // console.log('factores   : ',factores);

   for ( let j in precios) {
    let empresaPlan = [j][0];
    let _id = empresaPlan;
    let nombre = empresaPlan.substring(3);
    nombre = nombre.replace(/_/g, ' '); // Reemplaza todos los guiones bajos por un espacio        nombre = nombre.replace(/_/g, ' '); // Reemplaza todos los guiones bajos por un espacio

    let precioTotal = precios[j];
 
 // console.log(factores)
 // console.log(precioTotal)
 
 
    //funcion para que impacten los descuentos y bonificaciones
    let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
 
     var plan = new Object();
                         plan.item_id = _id;
                         plan.name = 'Prevencion-Salud  ' + nombre;
                         plan.precio = precio;
                         plan.valorLista = precios[j]
                         plan.aportes_OS = factores.deduction;
                         array.push(plan);					
                     }
 //	<!-----------------------Bucle PREVENCIO SALUD end------------------------>	
     // console.log( 'array PREVENCIO SALUD')
     // console.log(array)													
             return array					
 }
 
