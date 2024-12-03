import * as functions from './functions';

export function valor_Galeno(prices,arrayDeducciones) {
  let empresa = "Galeno";
	let array = [];


    let precios = prices.priceGrupoGaleno.precios.precios;

    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
let bonAfinidad = promociones[promociones[0]];
let con_afinidad = false;
if (promociones[0] >= 1 ){
  con_afinidad === true;
}

for ( let j in precios) {
	console.log('GALENO j :',j)
	console.log('GALENO precios :',precios)

   let empresaPlan = [j][0];
   console.log('GALENO empresaPlan :',empresaPlan)

   let _id = empresaPlan;
   console.log('GALENO _id :',_id)

   let nombre = empresaPlan.substring(3);
   console.log('GALENO nombre :',nombre)

   let precioTotal = precios[j];
   console.log('GALENO precioTotal :',precioTotal)


   //funcion para que impacten los descuentos y bonificaciones
   let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
   console.log('GALENO precio :',precio);

	var plan = new Object();
						plan.item_id = _id;
						plan.name = 'Galeno  ' + nombre;
						plan.precio = precio;
					 	plan.valorLista = precios[j]
						plan.aportes_OS = factores.deduction;
						console.log('GALENO plan :',plan)
						array.push(plan);	
			
					}
//	<!-----------------------Bucle GALENO end------------------------>	
	// console.log( 'array Galeno')
	// console.log(array)													
			return array					
}
