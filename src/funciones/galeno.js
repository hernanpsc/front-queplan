import * as functions from '../funciones/';

export function valorGaleno(aportesOS,valor_plan_galeno,coeficiente) {
	let tipo_IngresoPDMI= aportesOS[0];
	let beneficiariosF184 = aportesOS[1];
	let eleccionSueldoOAporte = aportesOS[2];
	let sueldoSueldoOAporte = aportesOS[3];
	let categoria_Mono = aportesOS[4];
	let arrayValorMonotXCategoria  = aportesOS[5];	
	let porporsentajeDeAPorte = coeficiente;
	let array = [];
//Funcion para el calculo de aportes
    let deduccionAportesObraSocial=functions.calculoDescuentoPorAportes(tipo_IngresoPDMI,eleccionSueldoOAporte,sueldoSueldoOAporte,porporsentajeDeAPorte,categoria_Mono,arrayValorMonotXCategoria,beneficiariosF184)

for ( let j in valor_plan_galeno) {
   let empresaPlan = [j][0];
   let plan_id = empresaPlan;
   let plan_nombre = empresaPlan.substring(3);
   let valor_total_plan = valor_plan_galeno[j];

   //funcion para que impacten los descuentos y bonificaciones
   let precio_final_a_pagar = functions.final(tipo_IngresoPDMI,deduccionAportesObraSocial,valor_total_plan);

	var plan = new Object();
						plan.item_id = plan_id;
						plan.name = 'Galeno  ' + plan_nombre;
						plan.precio = precio_final_a_pagar;
					 	plan.valorLista = valor_plan_galeno[j]
						plan.aporteOS = deduccionAportesObraSocial;
						array.push(plan);					
					}
//	<!-----------------------Bucle GALENO end------------------------>	
	console.log( 'array Galeno')
	console.log(array)													
			return array					
}
