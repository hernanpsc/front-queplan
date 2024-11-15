
	//	<!----------------------FUNCIONES QUE SE USAN EL CONTROLADOR CORIZACION ANTES DE ENTREGAR EL RESULTADO------------------------>							

  	
	export function combinePlansWithPrices(planes, precios) {
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
	  
	  
	  
	  
	
	 // Función para agrupar y transformar elementos de omintPlanes
	 export function agruparYTransformarPlanes(omintPlanes) {
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
		  } else {
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
	
	
	
	
		//	<!-----------------------FUNVIONES QUE SE USAN EN LOS ARCHIVOS DE ESTA MISMA CARPETA PARA EL CALCULO DELOS PRECIOS------------------------>							
		// let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])

	 export function calculodescOS(
		tipo_IngresoPDMI,
		eleccionSueldoOAporte,
		sueldoSueldoOAporte,
		porporsentajeDeAPorte,
		categoria_Mono,
		arrayValorMonotXCategoria,
		beneficiariosF184,
		){
	let	descXCapita = arrayValorMonotXCategoria[categoria_Mono]
	
	
	let deduccionAportesObraSocial = 0;
	if (tipo_IngresoPDMI == "D") {
					
			
		if (tipo_IngresoPDMI == "D") {
			if (eleccionSueldoOAporte.includes('Sueldo')) {
				deduccionAportesObraSocial = sueldoSueldoOAporte * porporsentajeDeAPorte/100;
	
			} else if (eleccionSueldoOAporte.includes('Aporte')) {
				deduccionAportesObraSocial = sueldoSueldoOAporte /3*porporsentajeDeAPorte;
			} else if (beneficiariosF184 > 0) {
	
				deduccionAportesObraSocial = deduccionAportesObraSocial + (beneficiariosF184 * descXCapita);
			};
		} else if (tipo_IngresoPDMI === "M") {
			deduccionAportesObraSocial = beneficiariosF184 * descXCapita;
		} else {
			deduccionAportesObraSocial = '';
		};
	}	return deduccionAportesObraSocial
	}
	
	
	export function promoDescuento(valor_plan,promo_Porcentaje, afiche){
		let bonAfinidad = 0;
		let valor_total_plan = 0;
		let bonAfinidadporcentaje = promo_Porcentaje;
		if (afiche == true) {
			bonAfinidad = parseInt(valor_plan) * bonAfinidadporcentaje;
			valor_total_plan = parseInt(valor_plan) - parseInt(bonAfinidad.toFixed());
		} else {
			bonAfinidad = 0;
			valor_total_plan = valor_plan
		}
		return [valor_total_plan,bonAfinidad,bonAfinidadporcentaje]
	}
	
	
	export function final(tipo_IngresoPDMI,deduccionAportesObraSocial,valor_total_plan){
		let tipoIngresoPDMI = tipo_IngresoPDMI;
		let deduccion_AportesObraSocial = deduccionAportesObraSocial;
		let valortotal_plan = valor_total_plan;
		let precio_final_a_pagar = valortotal_plan;
		if (tipoIngresoPDMI === "M" || tipoIngresoPDMI === "D") {
			deduccion_AportesObraSocial = parseInt(deduccion_AportesObraSocial);
			precio_final_a_pagar = parseInt(valor_total_plan)- deduccion_AportesObraSocial;
		} else {
			precio_final_a_pagar = valortotal_plan;
		}
		if (precio_final_a_pagar < 0){
			precio_final_a_pagar = 0;
		}
		return precio_final_a_pagar
		}
	
	
	
		//	<!-----------------------ESTAS FUNCIONES LAS USA SOLO SANCOR SALUD------------------------>							
	
		export function segVidaPlus(segVidacheck,segVida2check,edad1,edad2,segVidaPrecio){
			let segVidaTotal = 0;
			let segVida = 0;
			let segVida1 = 0;
			if (segVidacheck == true) {
				if (edad1 >= 18 && edad1 <= 45) {
					segVida = segVidaPrecio[0]['col_2']
				} else if (edad1 >= 46 && edad1 <= 54) {
					segVida = segVidaPrecio[1]['col_2']
				} else {
					segVida = segVidaPrecio[2]['col_2']
				};
			}
			if (segVida2check == true) {
				if (edad2 < 18) {
					segVida1 = 0;
				} else if (edad2 >= 18 && edad2 <= 45) {
					segVida1 = segVidaPrecio[0]['col_2']
				} else if (edad1 >= 46 && edad1 <= 54) {
					segVida1 = segVidaPrecio[1]['col_2']
				} else {
					segVida1 = segVidaPrecio[2]['col_2']
				};
				segVidaTotal = segVida + segVida1;
			}
			segVidaTotal = segVida + segVida1;
		 return segVidaTotal
		}
	
	
	
	export function planNombre(gen,plan_gen,plan_nombre){
		if (gen === 'GEN' && plan_gen >= 100 && plan_gen <= 450) {
			plan_nombre = 'GEN' + plan_nombre;
		} else {
			plan_nombre = plan_nombre;
		};
		return plan_nombre
	}
		
	export function suprasSalud(supras,gen,plan_nombre,otrosBenPrecios,grupoFam){
		
		
		
		
		
		
		
		
		
		
	
		let otrosBen = 0;
		if (supras === true && gen === '') {
			otrosBen = 0;
			if (plan_nombre.includes('B')) {
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSPRO'];
				
		
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSOD'];
				
		
			} else {
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSPRO'];
	
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSOD'];
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSAC'];
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SUF'];
			};
		}return otrosBen
	}
	
export function imprimirPrecios (prices,tipo_IngresoPDMI,group,idAdultosMedife,idPrevencion,IdDoctored,IdsAvalian,idsCristalyRas,idsLuisPasteur,idsAsmepriv,idsBayresPlan,idsHominis){

console.log(' ID Prevencion  :  ' + idPrevencion);
console.log(' precioPrevencion  :');
console.log(prices.precioPrevencion.precios );

console.log(" id:  IdDoctored[0]  :  "   + IdDoctored[0] );
console.log(' precioDoctoredGrupo  :');
console.log( prices.precioDoctoredGrupo.precios );

console.log(" id:  IdDoctored[1]   :  "   +  IdDoctored[1]);
console.log(' precioDoctoredHijo3  :');
console.log( prices.precioDoctoredHijo3.precios );

console.log(" id:  IdDoctored[2]   :  "   +  IdDoctored[2]);
console.log(' precioDoctoredAd  :');
console.log( prices.precioDoctoredAd.precios );

console.log('idAdultosMedife :' + idAdultosMedife);
console.log(' precioMedifeAdultos  :');
console.log( prices.precioMedifeAdultos.precios );

console.log('IDMedifeHijo0a1  :' + 'medife'+ tipo_IngresoPDMI + 'HIJO0a1');
console.log(' precioMedifeHijo0a1  :');
console.log( prices.precioMedifeHijo0a1.precios );

console.log('IDMedifeHijo0a20 :' + 'medife'+ tipo_IngresoPDMI + 'HIJO2a20');
console.log(' precioMedifeHijo0a20  :');
console.log( prices.precioMedifeHijo0a20.precios );

console.log('IDMedifeHijo0a25 :' + 'medife'+ tipo_IngresoPDMI + 'HIJO25');
console.log(' precioMedifeHijo0a25  :');
console.log( prices.precioMedifeHijo0a25.precios );

console.log('IDAvalianTitular  :' + IdsAvalian[0]);
console.log(' precioAvalianTitular  :');
console.log( prices.precioAvalianTitular.precios );

console.log('IDAvalianConyuge  :' + IdsAvalian[1]);
console.log(' precioAvalianConyuge  :');
console.log( prices.precioAvalianConyuge.precios );

console.log('IDAvalianHijo1  :' + IdsAvalian[2]);
console.log(' precioAvalianHijo1  :');
console.log( prices.precioAvalianHijo1.precios );

console.log('IDAvalianHijo2  :' + IdsAvalian[3]);
console.log(' precioAvalianHijo2  :');
console.log( prices.precioAvalianHijo2.precios );

console.log('IDAvalianHijo3  :' + IdsAvalian[4]);
console.log(' precioAvalianHijo3  :');
console.log( prices.precioAvalianHijo3.precios );

console.log('IDAvalianHijo25  :' + IdsAvalian[5]);
console.log(' precioAvalianHijo25  :');
console.log( prices.precioAvalianHijo25.precios );

console.log(" id:  'ras' + idsCristalyRas[0]   :  "   + idsCristalyRas[0]);
console.log(' precioTitularRas  :');
console.log( prices.precioTitularRas.precios );

if(group== 3 || group == 4) {
console.log(" id:  'ras' + idsCristalyRas[1]   :  "   + idsCristalyRas[1]);
console.log(' precioConyugeRas  :');
console.log( prices.precioConyugeRas.precios );
}

console.log(" id:  'ras' + idsCristalyRas[2]   :  "   + idsCristalyRas[2]);
console.log(' precioHijo3Ras  :');
console.log( prices.precioHijo3Ras.precios );

console.log(" id:  'ras' + idsCristalyRas[3]   :  "   + idsCristalyRas[3]);
console.log(' precioHijo2Ras  :');
console.log( prices.precioHijo2Ras.precios );

console.log(" id:  'ras' + idsCristalyRas[4]   :  "   + idsCristalyRas[4]);
console.log(' precioHijo1Ras  :');
console.log( prices.precioHijo1Ras.precios );

console.log(" id:  =  +  idsCristalyRas[5]   :  "   +  idsCristalyRas[5]);
console.log(' precioTitularCristal  :');
console.log( prices.precioTitularCristal.precios );

if(group== 3 || group == 4) {
console.log(" id:  =  +  idsCristalyRas[6]   :  "   +  idsCristalyRas[6]);
console.log(' precioConyugeCristal  :');
console.log( prices.precioConyugeCristal.precios );
}

console.log(" id:  =  +  idsCristalyRas[7]   :  "   +  idsCristalyRas[7] );
console.log(' precioHijo3Cristal  :');
console.log( prices.precioHijo3Cristal.precios );


console.log(" id:  =  +  idsCristalyRas[8]   :  "  +   idsCristalyRas[8] );
console.log(' precioHijo2Cristal  :');
console.log( prices.precioHijo2Cristal.precios );

console.log(" id:  =  +  idsCristalyRas[9]   :  "   +  idsCristalyRas[9]);
console.log(' precioHijo1Cristal  :');
console.log( prices.precioHijo1Cristal.precios );

console.log(" id:  =  +  idsLuisPasteur[0]  :  "   +  idsLuisPasteur[0] );
console.log(' precioLuispasteurAdultos  :');
console.log( prices.precioLuispasteurAdultos.precios );

console.log(" id:  =  +  idsLuisPasteur[1]  :  "   +  idsLuisPasteur[1] );
console.log(' precioLuispasteurNieto  :');
console.log( prices.precioLuispasteurNieto.precios );

console.log(" id:  =  +  idsLuisPasteur[2]  :  "   +  idsLuisPasteur[2] );
console.log(' precioLuispasteurAdicional  :');
console.log( prices.precioLuispasteurAdicional.precios );

console.log(" id:  =  +  idsLuisPasteur[3]  :  "   +  idsLuisPasteur[3] );
console.log(' precioLuispasteurHijo  :');
console.log( prices.precioLuispasteurHijo.precios );

console.log(" id:  =  +  idsAsmepriv[0]  :  "   +  idsAsmepriv[0] );
console.log(' precioAsmepriv  :');
console.log( prices.precioAsmepriv.precios );

console.log(" id:  =  +  idsAsmepriv[1]  :  "   +  idsAsmepriv[1] );
console.log(' precioAdmenorUno  :');
console.log( prices.precioAdmenorUno.precios );

console.log(" id:  =  +  idsAsmepriv[2]  :  "   +  idsAsmepriv[2] );
console.log(' precioAsmeprivHijoHasta21  :');
console.log( prices.precioAsmeprivHijoHasta21.precios );

console.log(" id:  =  +  idsAsmepriv[3]  :  "   +  idsAsmepriv[3] );
console.log(' precioAsmeprivRecargoHijo21a29  :');
console.log( prices.precioAsmeprivRecargoHijo21a29.precios );

console.log(" id:  =  +  idsBayresPlan[0]  :  "   +  idsBayresPlan[0] );
console.log(' precioBayresAdultos  :');
console.log( prices.precioBayresAdultos.precios );

console.log(" id:  =  +  idsBayresPlan[1]  :  "   +  idsBayresPlan[1] );
console.log(' precioBayresHijoHasta25  :');
console.log( prices.precioBayresHijoHasta25.precios );

console.log(" id:  =  +  idsBayresPlan[2]  :  "   +  idsBayresPlan[2] );
console.log(' precioBayresAd18a49  :');
console.log( prices.precioBayresAd18a49.precios );

console.log(" id:  =  +  idsBayresPlan[3]  :  "   +  idsBayresPlan[3] );
console.log(' precioBayresJovenSinMaternidad  :');
console.log( prices.precioBayresJovenSinMaternidad.precios );

console.log(" id:  =  +  idsBayresPlan[4]  :  "   +  idsBayresPlan[4] );
console.log(' precioBayresInd18a29  :');
console.log( prices.precioBayresInd18a29.precios );

console.log(" id:  =  +  precioHominis  :  "   +  idsHominis );
console.log(' precioHominis  :');
console.log( prices.precioHominis.precios );
}
